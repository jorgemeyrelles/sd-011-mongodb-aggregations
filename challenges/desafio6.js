db.movies.aggregate([
  { $match: { awards: { $regex: /won \d+ oscar/i} } },
  { $group: { 
      _id: null,
      maiorValor: { $max: "$imdb.rating" },
      menorValor: { $min: "$imdb.rating" },
      mediaValor: { $avg: "$imdb.rating" },
      desvioPadrao: { $stdDevSamp: "$imdb.rating" },
  }},
  { $project: { 
    _id: 0,
    maior_rating: "$maiorValor",
    menor_rating: "$menorValor",
    media_rating: { $round: ["$mediaValor", 1] },
    desvio_padrao: { $round: ["$desvioPadrao", 1] },
  } }
]);
