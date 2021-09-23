db.movies.aggregate([
  { $match: { awards: /won.*oscar/i } },
  { $group: {
    _id: null,
    maior_rating: { $max: "$imdb.rating" },
    menor_rating: { $min: "$imdb.rating" },
    media_rating: { $avg: "$imdb.rating" },
    desvio_rating: { $stdDevSamp: "$imdb.rating" },
  } },
  {
    $project: {
      _id: 0,
      maior_rating: "$maior_rating",
      menor_rating: "$menor_rating",
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_rating", 1] },
    },
  },
]);
