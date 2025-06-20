# CinemaHub

Catálogo de filmes em React que utiliza a API pública do [TMDB](https://www.themoviedb.org/).

## Tecnologias
- React
- React Router DOM
- Axios

## Como rodar
1. Instale as dependências:
   ```
   npm install
   ```
2. Crie um arquivo `.env` com a variável `REACT_APP_TMDB_API_KEY` contendo sua API Key do TMDB.
3. Execute o projeto:
   ```
   npm start
   ```

## API TMDB
As informações de filmes são obtidas através dos seguintes endpoints:
- `GET /movie/popular` – lista os filmes populares
- `GET /movie/:id` – detalhes do filme

A documentação completa está disponível em [https://developer.themoviedb.org/reference/intro](https://developer.themoviedb.org/reference/intro).

## Vídeo de apresentação
(Adicionar link aqui)

## Sugestões de melhorias visuais
- Utilizar bibliotecas como Bootstrap ou Tailwind para estilização.
- Explorar flexbox ou grid para melhorar a responsividade.
