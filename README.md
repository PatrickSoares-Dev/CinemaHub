# CinemaHub

CinemaHub é uma aplicação web em React que permite explorar filmes por meio da API do [The Movie Database](https://www.themoviedb.org/). É possível pesquisar títulos, filtrar por gênero, ordenar resultados e salvar seus favoritos no navegador.

## Tecnologias Utilizadas
- React
- React Router DOM
- Axios

## Pré-requisitos
- Node.js e npm instalados em sua máquina

## Instalação
1. Clone este repositório:
   ```bash
   git clone https://github.com/usuario/CinemaHub.git
   cd CinemaHub
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz com sua API Key do TMDB:
   ```env
   REACT_APP_TMDB_API_KEY=SUAS_CHAVE_AQUI
   ```

## Como executar
Para iniciar o projeto em modo de desenvolvimento, rode:
```bash
npm start
```
A aplicação ficará disponível em `http://localhost:3000`.

## Descrição da API (TMDB)
Os dados de filmes são fornecidos pela [API do TMDB](https://developer.themoviedb.org/reference/intro). Principais endpoints utilizados:
- `GET /movie/popular` – lista de filmes populares
- `GET /movie/{id}` – detalhes de um filme
- `GET /search/movie` – busca por títulos
- `GET /discover/movie` – descoberta de filmes com filtros
- `GET /genre/movie/list` – lista de gêneros

Para utilizar a API você precisa de uma chave gratuita obtida após cadastro no site do TMDB.

## Rotas da aplicação
- `/` – listagem de filmes e filtros
- `/movie/:id` – página de detalhes do filme
- `/favorites` – filmes marcados como favoritos
- `*` – página de erro (404)

## Link do Projeto
Todo o código está disponível em [https://github.com/usuario/CinemaHub](https://github.com/usuario/CinemaHub).

## Como contribuir
1. Realize um fork do repositório.
2. Crie uma branch para sua modificação:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça seus commits e envie para o seu fork:
   ```bash
   git commit -m "Minha feature"
   git push origin minha-feature
   ```
4. Abra um Pull Request.
