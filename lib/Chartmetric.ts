import axios from "axios";

const refreshToken = "ctnHv2yBnJwuHBslUlvtHEaFDwBN0fAPLG2eqo6ChDYzay3eHXbVZRc5sALZ3RyH";

const ChartMetricIntegrador = axios.create({
  baseURL: "https://api.chartmetric.com/api",
});

// Variável para armazenar o token de acesso
let accessToken: string = "";

// Função para gerar um novo token de acesso
async function generateAccessToken(): Promise<string> {
  const response = await axios.post("https://api.chartmetric.com/api/token", { refreshtoken: refreshToken }, { headers: { "Content-Type": "application/json" } });
  accessToken = response.data.token; // Assumindo que o token vem como `response.data.token`
  return accessToken;
}

// Interceptor para adicionar o token de acesso a todas as requisições
ChartMetricIntegrador.interceptors.request.use(
  async (config) => {
    if (!accessToken) {
      // Gera um token se não existir
      accessToken = await generateAccessToken();
    }
    // Adiciona o token no cabeçalho Authorization
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
ChartMetricIntegrador.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Gera um novo token caso o atual expire
      accessToken = await generateAccessToken();
      // Repete a requisição original com o novo token
      error.config.headers.Authorization = `Bearer ${accessToken}`;
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);

export default ChartMetricIntegrador;
