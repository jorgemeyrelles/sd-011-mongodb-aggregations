// movieNumber: 25

// Crie um novo campo chamado num_favs, que represente quantos atores ou atrizes
// da nossa lista de favoritos aparecem no elenco (informação do campo cast no banco)
//  do filme, caso ele possua favoritos.
// Ordene os resultados por num_favs, tomatoes.viewer.rating e title, todos em ordem decrescente.
// Dica: coloque a lista de atores e atrizes favoritos em uma variável e
// explore operadores como $size e $setIntersection.

// O resultado da sua query deve ter exatamente o seguinte formato (incluindo a ordem dos campos):

// { "title" : <nome_do_filme> }

// [ "Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney" ]

// use("aggregations");
db.movies.aggregate([
  {
    $match: {
      "tomatoes.viewer.rating": { $gte: 3 },
      countries: ["USA"],
    },
  },
  {
    $addFields: {
      favs: {
        $setIntersection: [
          [
            "Sandra Bullock",
            "Tom Hanks",
            "Julia Roberts",
            "Kevin Spacey",
            "George Clooney",
          ],
          "$cast",
        ],
      },
    },
  },
  { $match: { favs: { $ne: [], $type: "array" } } },

  {
    $project: {
      _id: 0,
      title: 1,
      num_favs: {
        $size: "$favs",
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  { $project: { title: 1, _id: 0 } },
  { $skip: 25 },
  { $limit: 1 },
]);
