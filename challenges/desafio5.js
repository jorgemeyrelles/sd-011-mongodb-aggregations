// armazena a lista de artistas do requisito:
const favoriteArtists = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney"];

db.movies.aggregate([
// Formata as condições e verifica o campo cast para posterior intersection:
  { $match: {
    countries: { $eq: "USA" },
    "tomatoes.viewer.rating": { $gte: 3 },
    cast: { $exists: true },
  } },
  // Insere o campo num_favs verificando e retornando nele os elementos em comum entre a lista de
  // artistas (favoriteArtists) do requisito e o campo $cast:
  { $addFields: {
    num_favs: { $size: { $setIntersection: [favoriteArtists, "$cast"] } },
  },
  },
  // ordena o retorno de acordo com o requisito:
  { $sort:
    { num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },

  // "Retorna" skipando os 24 primeiros e restringindo a projeção a 1 elemento:
  { $project: { title: 1, _id: 0 } },
  { $skip: 24 },
  { $limit: 1 },

]);
// scripts/evaluate.sh desafioN
