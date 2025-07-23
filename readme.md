# 🗺️ Guia Maranhão - API de Serviços Públicos

### 🎯 Sobre o Projeto

O Guia Maranhão é um projeto Full-Stack com a missão de facilitar o acesso da população do estado do Maranhão a informações sobre unidades de serviços públicos. A plataforma visa centralizar e disponibilizar dados sobre locais de saúde, educação, cultura e assistência social em todos os municípios maranhenses.

🏗️ Status Atual: Foco no Back-End
Atualmente, o projeto encontra-se na fase de desenvolvimento do back-end. Estou construindo uma API RESTful robusta, segura e resiliente que servirá como a espinha dorsal para todas as futuras aplicações cliente (web e posteriormente mobile).

A decisão de focar primeiramente no back-end garante que terei uma base de dados sólida, regras de negócio bem definidas e integrações com serviços externos (como Google Maps e IBGE) funcionando perfeitamente antes de iniciar a construção da interface para o usuário final.

## Funcionalidades já Implementadas (Back-End):

✅ Importação de Municípios: Sistema para buscar e salvar todos os municípios do Maranhão a partir da API do IBGE.

✅ Sincronização de Serviços: Busca de locais públicos (hospitais, escolas, etc.) na API do Google Places e armazenamento no banco de dados local.

✅ Sistema de Autenticação: Registro e Login de usuários com JWT (JSON Web Tokens).

✅ Gestão de Favoritos: Endpoints protegidos para que usuários autenticados possam salvar e gerenciar seus locais de interesse.

✅ Resiliência (Fallback): A API é capaz de funcionar com dados locais caso os serviços do Google fiquem indisponíveis.

---


# 🚀 Próximos Passos e Melhorias Futuras


Este projeto está em constante evolução. Os próximos passos planejados são:

Back-End:
[ ] Cálculo de Rotas: Integração com a Google Routes API.

[ ] Tratamento de Erros Centralizado: Implementação de um middleware para padronizar as respostas de erro.

[ ] Documentação da API: Geração de uma documentação interativa com Swagger.

[ ] Sistema de Logs: Implementação de logs detalhados de eventos e erros com Winston.

[ ] Testes Automatizados: Criação de testes unitários e de integração.

Front-End (Fase Futura):
[ ] Desenvolvimento de uma aplicação web (React/Angular) para consumir a API.

[ ] Visualização dos serviços em um mapa interativo.

[ ] Interface para o usuário traçar rotas até os locais.

[ ] Perfil de usuário para gerenciar favoritos e preferências.

🔧 Tecnologias (Back-End)
Runtime: Node.js

Framework: Express.js

Banco de Dados: MongoDB com Mongoose

Autenticação: JSON Web Tokens (JWT)

APIs Externas:

IBGE (Localidades)

Google Cloud (Places API, Routes API)

⚙️ Como Executar o Projeto (Back-End)
Clone o repositório:

git clone <https://github.com/Coehlo-Gab-Dev/Guia-Maranhao>
cd guia-maranhao-api

Instale as dependências:

npm install

Configure as variáveis de ambiente:

Renomeie o arquivo .env.example para .env.

Preencha as variáveis necessárias, como a DB_URI do seu MongoDB e a GOOGLE_MAPS_API_KEY.

Inicie o servidor em modo de desenvolvimento:

npm run dev

O servidor estará rodando em http://localhost:3000 (ou na porta que você definir no .env).