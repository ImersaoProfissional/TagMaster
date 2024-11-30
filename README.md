
# TagMaster

TagMaster é uma aplicação voltada para o gerenciamento de notas. Com este sistema, você pode criar, editar, excluir e visualizar suas notas, além de categorizá-las com tags. As tags permitem uma organização eficiente, tornando mais fácil encontrar e classificar suas informações.

## Tecnologias Utilizadas

### Backend
- **Framework:** [NestJS](https://nestjs.com/)
- **Banco de Dados:** MySQL 8 (em execução como uma imagem Docker)

### Frontend
- **Framework de Estilização:** [Bootstrap](https://getbootstrap.com/)
- **Requisições HTTP:** [Axios](https://axios-http.com/)
- **Renderização:** [EJS](https://ejs.co/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)

## Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado.
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) configurados.

### Passo a Passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/ProjectTagMaster/TagMaster.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd TagMaster
   ```

3. O projeto contém duas pastas principais:
   - `api`: Código da API backend.
   - `frontend`: Código do frontend.

#### Configuração do Backend (API)

4. Entre na pasta `api`:
   ```bash
   cd api
   ```

5. Instale as dependências:
   ```bash
   npm install
   ```

6. Inicie o Docker para o banco de dados e outros serviços necessários:
   ```bash
   docker-compose up -d
   ```

7. Rode o servidor em ambiente de desenvolvimento:
   ```bash
   npm run start:dev
   ```

#### Configuração do Frontend

8. Volte para o diretório principal e entre na pasta `frontend`:
   ```bash
   cd ../frontend
   ```

9. Instale as dependências:
   ```bash
   npm install
   ```

10. Inicie o servidor do frontend:
    ```bash
    npm run dev
    ```

## Rotas da API

### Autenticação (Auth)
- **POST** `/auth/login` - Realiza login do usuário.  
- **POST** `/auth/cadastro` - Cria um novo usuário.  
- **POST** `/auth/temp` - Endpoint temporário para testes.  
- **POST** `/auth/enviar/Email` - Envia um e-mail de verificação.  
- **POST** `/auth/verificar/Email/:token` - Verifica o e-mail do usuário com base no token.  
- **GET** `/auth/profile` - Retorna o perfil do usuário autenticado.  

### Notas (Nota)
- **POST** `/nota/criar` - Cria uma nova nota.  
- **PUT** `/nota/editar/:id` - Edita uma nota existente pelo ID.  
- **PUT** `/nota/recuperar/:id` - Recupera uma nota excluída pelo ID.  
- **DELETE** `/nota/deletar/:id` - Deleta uma nota pelo ID.  
- **GET** `/nota` - Lista todas as notas.  
- **GET** `/nota/:titulo` - Busca uma nota pelo título.  
- **GET** `/nota/:desc` - Busca uma nota pela descrição.  
- **GET** `/nota/excluir/excluida` - Lista notas marcadas como excluídas.  

### Tags
- **GET** `/tags` - Lista todas as tags.  
- **POST** `/tags/criar` - Cria uma nova tag.  
- **PUT** `/tags/editar/:id` - Edita uma tag existente pelo ID.  
- **DELETE** `/tags/deletar/:id` - Deleta uma tag pelo ID.  

### Assista ao vídeo explicativo de como compilar o projeto
[![Texto Alternativo](https://www.ocasaldafoto.com/wp-content/uploads/2018/09/Foto-de-Paisagem-Lago-da-Pampulha-Belo-Horizonte-Charles-Torres.jpg)]()
