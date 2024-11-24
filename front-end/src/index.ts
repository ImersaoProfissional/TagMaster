import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import axios from 'axios';

const app = express();
const port = 3001;

// Configurar o EJS como motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para processar dados de formulários
app.use(express.urlencoded({ extended: true }));
// Middleware para receber dados em JSON (ex: AJAX)
app.use(express.json());
// Middleware para trabalhar com Cookies
app.use(cookieParser());
// Middleware para arquivos estáticos (opcional)
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('src'));

// Rota de login
app.get('/login', async (req: Request, res: Response) => {
  try {
    const access_token = req.cookies.access_token;
    console.log(access_token + "<-- acess token") // validar se esta chamado o acess token
    if (access_token) {
      const response = await axios.get('http://localhost:3000/auth/login', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // Valida o status da resposta antes de redirecionar
      if (response.status === 200) {
        return res.redirect('/');
      }
    }
  } catch (error) {
    console.error('Erro ao validar o token:', error);
    res.render('login');
    // Pode adicionar uma mensagem de erro ou logar o problema
  }
  res.render('login');
});

app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email,
      password
    });

    console.log(response)

    const { access_token } = response.data;

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000 // 1 dia em milisegundos
    });

  } catch (error) {
    console.log("Erro ao fazer login :" + error)
    return res.redirect('login');
  }

  return res.redirect('/');
})

// Rota de cadastro
app.get('/cadastro', async (req: Request, res: Response) => {
  res.render('cadastro')
})

// Rota criar cadastro
app.post('/cadastro', async (req: Request, res: Response) => {
  const { name, email, password, confirmpassword } = req.body;

  if (password !== confirmpassword) {
    console.log('As senhas não coincidem!');
    return res.redirect('/cadastro?error=passwordMismatch');
  }

  try {
    // Envio para a API de criação de usuário
    await axios.post("http://localhost:3000/user/cadastro", {
      name,
      email,
      password,
    });

    // Redireciona para login em caso de sucesso
    return res.redirect('/login');
  } catch (error) {
    console.error('Erro na criação de usuário:', error);

    // Verifica detalhes do erro (exemplo: se a API retorna mensagens específicas)
    const errorMessage = 'Erro desconhecido';
    return res.redirect(`/cadastro?error=${encodeURIComponent(errorMessage)}`);
  }
});

// Rota da página inicial --> sendo validado a possibilidade
app.get('/', async (req: Request, res: Response) => {
  try {
    // Valida se o token está presente
    const access_token = req.cookies.access_token;

    // if (!access_token) {
    //   console.log("Acess_token vazio")
    //   return res.redirect('login');
    // }

    const response = await axios.post( // Requisição com configuração correta
      'http://localhost:3000/nota',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.render('home', { notas: response.data });// Renderiza a página com as notas retornadas
  } catch (error) {
    console.error("Erro ao buscar notas");
    return res.render('home'); // Renderiza a página sem as notas, exibindo o erro (se necessário)
  }
});

// CRUD Notas
app.post('/criarNota', async (req: Request, res: Response) => {
  const { titulo, conteudo, tags } = req.body;
  console.log(titulo, conteudo, tags)
  try {
    const access_token = req.cookies.access_token;

    // Verifica se o token de acesso existe
    if (!access_token) {
      console.log("Token de acesso não encontrado");
      return res.redirect('/login'); // Redireciona para o login se o token não estiver presente
    }

    // Envia a requisição para a API de backend
    const response = await axios.post(
      'http://localhost:3000/nota/criar',
      { nome: titulo, desc: conteudo, tags }, // Dados da nota
      {
        headers: {
          Authorization: `Bearer ${access_token}`, // Cabeçalhos da requisição
        },
      }
    );

    console.log("Nota criada com sucesso:", response.data);
    return res.redirect('/'); // Redireciona para a home após criar a nota
  } catch (error) {
    console.error("Erro ao criar nota:", error);
    return res.redirect('/'); // Redireciona para a home em caso de erro
  }
});

app.post('/editarNota/:id', async (req: Request, res: Response) => {
  const { titulo, conteudo, data, tags } = req.body
  console.log(titulo, conteudo, data, tags)
  try {
    const access_token = req.cookies.acess_token

    if (!access_token) {
      console.log("Token de acesso não encontrado");
      return res.redirect('/login'); // Redireciona para o login se o token não estiver presente
    }

    const response = await axios.put(
      `http://localhost:3000/nota/editar/${req.params.id}`,
      { titulo, conteudo, data, tags },
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )

    console.log("Nota atualizada com sucesso:", response.data);
    return res.redirect('/'); // Redireciona para a home após editar a nota
  } catch (error) {
    console.error("Erro ao atualizar nota:");
    return res.redirect('/'); // Redireciona para a home em caso de erro
  }
})

app.post('/excluirNota/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try{
    const access_token = req.cookies.acess_token

    if (!access_token) {
      console.log("Token de acesso não encontrado");
      return res.redirect('/login'); // Redireciona para o login se o token não estiver presente
    }

    const response = await axios.delete(
      `http://localhost:3000/nota/editar/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })

  }catch(error){
    console.error("Erro ao atualizar nota:");
    return res.redirect('/');
  }

  res.status(200).json({ success: true, message: `Tag com ID ${id} excluída com sucesso!` });
});

app.post('/criarTag', async (req: Request, res: Response) => {
  const { tagColor, tagName } = req.body
  try {
    const access_token = req.cookies.acess_token

    if (!access_token) {
      console.log("Token de acesso não encontrado");
      return res.redirect('/login'); // Redireciona para o login se o token não estiver presente
    }

    const response = await axios.post(
      `http://localhost:3000/criarTag/`,
      { tagColor, tagName },
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    console.log("Tag criada com sucesso:", response.data);
    return res.redirect('/'); // Redireciona para a home após criar tag
  } catch (error) {
    console.error("Erro ao criar tag:", error);
    return res.redirect('/'); // Redireciona para a home em caso de erro
  }
})

app.post('/excluirTag/:id', async (req: Request, res: Response) => {
  try {
    const access_token = req.cookies.acess_token

    if (!access_token) {
      console.log("Token de acesso não encontrado para excluir tag");
      return res.redirect('/login'); // Redireciona para o login se o token não estiver presente
    }

    const response = await axios.delete(
      `http://localhost:3000/excluirTag/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    console.log("Tag excluida com sucesso:", response.data);
    return res.redirect('/'); // Redireciona para a home após excluir a tag
  } catch (error) {
    console.error("Erro ao excluir Tag:", error);
    return res.redirect('/'); // Redireciona para a home em caso de erro
  }
})

app.post('/editarTag/:id', async (req: Request, res: Response) => {
  const { titulo, cor } = req.body;
  console.log("valores a serem editados aqui ->",titulo,cor)
  try{
    const access_token = req.cookies.acess_token

    if (!access_token) {
      console.log("Token de acesso não encontrado para excluir tag");
      return res.redirect('/login'); // Redireciona para o login se o token não estiver presente
    }

    const response = await axios.delete(
      `http://localhost:3000/excluirTag/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )

  }catch(error){

  }

  // Simulação de sucesso
  res.status(200).json({ success: true, message: `Tag com ID editada com sucesso!` });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


