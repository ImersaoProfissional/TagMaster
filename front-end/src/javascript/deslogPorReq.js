
// Verifica se há um token armazenado no cookie

const token = document.cookie ; // Obtém o token do cookie
const currentPath = window.location.pathname;
console.log("OPA RODEI", token);

// Se não houver token e o usuário não estiver na página de login, redireciona para o login
if (!token && currentPath !== '/login') {
  window.location.href = '/login'; // Redireciona para login se não houver token e não estiver na página de login
}

// Agora, adicione a lógica de inatividade ao seu código existente
if (typeof window !== 'undefined') {
  let inactivityTimer;
  const MAX_INACTIVITY_TIME = 30 * 1000; // 30 minutos em milissegundos

  // Função para remover o token quando a sessão expira
  function handleTokenExpiration() {
    // Remove o token do cookie
    Cookies.remove('access_token');
    // Evita o redirecionamento repetido para a página de login
    if (window.location.pathname !== '/login') {
      window.location.href = '/login'; // Redireciona para a tela de login
    }
  }

  // Função que reseta o timer de inatividade
  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(handleTokenExpiration, MAX_INACTIVITY_TIME); // Inicia o temporizador de 30 minutos
  }

  // Interceptador para monitorar requisições (inatividade)
  axios.interceptors.request.use(
    (config) => {
      resetInactivityTimer(); // Sempre que uma requisição for feita, reinicia o temporizador
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptador para verificar a resposta da requisição (ex: token expirado)
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Verifica se o erro é devido a um token expirado (status 401)
      if (error.response && error.response.status === 401) {
        handleTokenExpiration(); // Expiração do token
      }
      return Promise.reject(error);
    }
  );
}

// Garantir que o redirecionamento para login aconteça caso o token expire
if (!token) {
  window.location.href = '/login';
}
