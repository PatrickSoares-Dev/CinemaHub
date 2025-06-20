# CinemaHub

Catálogo de filmes em React usando a API pública do [TMDB](https://www.themoviedb.org/). A aplicação permite navegar pelos filmes populares, visualizar detalhes e manter uma lista de favoritos salva no navegador.

## Tecnologias utilizadas
- React
- React Router DOM
- Axios

## Como rodar o projeto
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo `.env` na raiz contendo a variável `REACT_APP_TMDB_API_KEY` com a sua API Key do TMDB.
3. Execute o projeto:
   ```bash
   npm start
   ```

## Informações sobre a API TMDB
Os dados de filmes são obtidos através da API do TMDB, que exige uma API Key.
Endpoints utilizados:
- `GET /movie/popular` – lista de filmes populares
- `GET /movie/:id` – detalhes de um filme

Mais informações em [https://developer.themoviedb.org/reference/intro](https://developer.themoviedb.org/reference/intro).

## Vídeo de apresentação
(Adicionar link aqui)

## Sugestões de melhorias visuais
- Utilizar Bootstrap ou Tailwind para facilitar a estilização
- Explorar flexbox ou grid para melhorar a responsividade
- Adicionar animações sutis em transições de páginas e botões
