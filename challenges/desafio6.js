db.movies.aggregate([
  { $match: {
    awards: { $regex: /Won.*Oscar/i },
  } },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating_int: { $avg: "$imdb.rating" },
      desvio_padrao_int: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating_int", 1] },
      desvio_padrao: { $round: ["$desvio_padrao_int", 1] },
    },
  },
]);
