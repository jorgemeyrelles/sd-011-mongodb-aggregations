db.movies.aggregate([
  { $match: { awards: { $regex: /oscar/gi } } },
  { $match: { awards: { $regex: /won/gi } } },
  { $group: {
    _id: null,
    maior_rating: { $max: "$imdb.rating" },
    menor_rating: { $min: "$imdb.rating" },
    media_rating: { $avg: "$imdb.rating" },
    desvio_padrao: { $stdDevSamp: "$imdb.rating" },
  } },
  { $project: { maior_rating: 1, menor_rating: 1, media_rating: { $round: ["$media_rating", 1] }, desvio_padrao: { $round: ["$desvio_padrao", 1] } } },
]);
