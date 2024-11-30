import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import axios, { AxiosResponse } from 'axios';

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

// Rota da página inicial --> sendo validado a possibilidade

app.get('/emailVerificado/:token', async (req: Request, res: Response) => {
    const tokenVerificar = req.params.token
    res.render('emailVerificado', {token: tokenVerificar})
});

app.post('/emailVerificado/:token', async (req: Request, res: Response) => {
  const tokenValidarEmail = req.params.token

  const response = await axios.post(`http://localhost:3000/auth/verificar/Email/${tokenValidarEmail}`, {
  });

  console.log("OLHA A VERIFICAÇÃO",response);
  res.redirect('/login?mensagem=Email+verificado');
});

app.get('/', async (req: Request, res: Response) => {
  try {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      console.log("Acess_token vazio");
      return res.redirect('login');
    }

    // Tentando buscar as notas com verificação de erro
    const notasResponse: AxiosResponse | void = await axios.get('http://localhost:3000/nota', {
      headers: { Authorization: `Bearer ${access_token}` },
    }).catch(error => {
      if (error.response && error.response.status === 401) {
        console.log("Token expirado ou inválido");
        return res.redirect('/login');
      }
      throw error;
    });

    // Verifica se a resposta de notas está válida
    if (!notasResponse || !notasResponse.data) {
      throw new Error("Erro ao buscar notas");
    }

    // Tentando buscar as tags com verificação de erro
    const tagsResponse: AxiosResponse | void = await axios.get('http://localhost:3000/tags', {
      headers: { Authorization: `Bearer ${access_token}` },
    }).catch(error => {
      if (error.response && error.response.status === 401) {
        console.log("Token expirado ou inválido");
        return res.redirect('/login');
      }
      throw error;
    });

    const notaExcluidasResponse = await axios.get('http://localhost:3000/nota/excluir/excluida', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  

    // Verifica se a resposta de tags está válida
    if (!tagsResponse || !tagsResponse.data) {
      throw new Error("Erro ao buscar tags");
    }

    console.log("Notas excluidas aqui -> ",notaExcluidasResponse.data)
    // Renderiza a página com os dados válidos
    return res.render('home', { notas: notasResponse.data, tags: tagsResponse.data, notasExcluidas: notaExcluidasResponse.data});

  } catch (error) {
    console.error("Erro ao buscar notas ou tags:", error);
    return res.render('home'); // Renderiza sem dados em caso de erro
  }
});



// Rota de login
app.get('/login', async (req: Request, res: Response) => {
  const mensagem = req.query.mensagem;
  try {
    const access_token = req.cookies.access_token;
    console.log(access_token + "<-- acess token") // validar se esta chamado o acess token
    if (access_token) {
      const response = await axios.get('http://localhost:3000/auth/profile', {
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
    res.render('login', {mensagem: mensagem});
    // Pode adicionar uma mensagem de erro ou logar o problema
  }
  res.render('login', {mensagem: mensagem});
});

app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email,
      password
    });

    

    const { access_token } = response.data;

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,// 1 dia em milisegundos
      path: '/'
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
    await axios.post("http://localhost:3000/auth/cadastro", {
      name,
      email,
      password,
    });

    await axios.post("http://localhost:3000/auth/enviar/Email", {
      email
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


// CRUD Notas
// Funcionando
app.post('/criarNota', async (req: Request, res: Response) => {
  const { titulo, conteudo, tags } = req.body;


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
      { titulo, desc: conteudo, tags }, // Dados da nota
      {
        headers: {
          Authorization: `Bearer ${access_token}`, // Cabeçalhos da requisição
        },
      }
    );

    // console.log(tagsConvertidas); // Exemplo: [1, 2, 3]
    return res.redirect('/'); // Redireciona para a home após criar a nota
  } catch (error) {
    console.error("Erro ao criar nota:", error);
    return res.redirect('/'); // Redireciona para a home em caso de erro
  }
});

app.post('/editarNota/:id', async (req: Request, res: Response) => {
  const { titulo, conteudo, data, tags } = req.body
  try {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      console.log("Token de acesso não encontrado");
      return res.redirect('/login'); // Redireciona para o login se o token não estiver presente
    }

    const response = await axios.put(
      `http://localhost:3000/nota/editar/${req.params.id}`,
      { titulo, desc: conteudo, data, tags },
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )

    return res.redirect('/'); // Redireciona para a home após editar a nota
  } catch (error) {
    console.error("Erro ao atualizar nota:");
    return res.redirect('/'); // Redireciona para a home em caso de erro
  }
})
// Funcionando
app.post('/excluirNota/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      console.log("Token de acesso não encontrado");
      return res.redirect('/login'); // Redireciona para o login se o token não estiver presente
    }

    const response = await axios.delete(
      `http://localhost:3000/nota/deletar/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
  } catch (error) {
    console.error("Erro ao excluir nota:");
    return res.redirect('/');
  }

  res.status(200).json({ success: true, message: `Tag com ID ${id} excluída com sucesso!` });
});
// CRUD DE TAGS FUNCIONANDO (ARRUMAR 'VER TAGS')
// Funcionando
app.post('/criarTag', async (req: Request, res: Response) => {
  const { tagColor, tagName } = req.body
  try {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      console.log("Token de acesso não encontrado");
      return res.redirect('/login');
    }

    const response = await axios.post(
      `http://localhost:3000/tags/criar`,
      { cor: tagColor, titulo: tagName },
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    return res.redirect('/'); // Redireciona para a home após criar tag
  } catch (error) {
    console.error("Erro ao criar tag:", error);
    return res.redirect('/'); // Redireciona para a home em caso de erro
  }
})
// Funcionando
app.post('/excluirTag/:id', async (req: Request, res: Response) => {
  try {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      console.log("Token de acesso não encontrado para excluir tag");
      return res.redirect('/login'); // Redireciona para o login se o token não estiver presente
    }

    const response = await axios.delete(
      `http://localhost:3000/tags/deletar/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    console.log("Tag excluida com sucesso:", response.data);
    res.status(200).json({ success: true, message: `Tag com ID editada com sucesso!` });
    return res.redirect('/'); // Redireciona para a home após excluir a tag
  } catch (error) {

  }
})
// Funcionando
app.post('/editarTag/:id', async (req: Request, res: Response) => {
  const { titulo, cor } = req.body;
  console.log("valores a serem editados aqui ->", titulo, cor)
  try {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      console.log("Token de acesso não encontrado para excluir tag");
      return res.redirect('/login'); // Redireciona para o login se o token não estiver presente
    }

    console.log('Breakpoint: dados ->', cor, titulo) // não sei

    const response = await axios.put(
      `http://localhost:3000/tags/editar/${req.params.id}`,
      {
        titulo,
        cor
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )

  } catch (error) {

  }

  // Simulação de sucesso
  res.status(200).json({ success: true, message: `Tag com ID editada com sucesso!` });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


