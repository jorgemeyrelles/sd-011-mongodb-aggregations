const DECIMAL_POINTS = 1;

db.movies.aggregate([
  { $match: { awards: { $all: [/won/i, /oscar/i] } } },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: false,
      maior_rating: true,
      menor_rating: true,
      media_rating: { $round: ["$media_rating", DECIMAL_POINTS] },
      desvio_padrao: { $round: ["$desvio_padrao", DECIMAL_POINTS] },
    },
  },
]);
