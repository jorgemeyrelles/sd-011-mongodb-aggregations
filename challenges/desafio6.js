db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /Won\s\d+.Oscars?/ },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      mediaRating: { $avg: "$imdb.rating" },
      desvioPadrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$mediaRating", 1] },
      desvio_padrao: { $round: ["$desvioPadrao", 1] },
    },
  },
]);
