db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /won.\d.oscar/i }, // . é para qualquer coisa e o \d é para qualquer dígito
    },
  },
  {
    $group: {
      _id: "",
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_rating: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_rating", 1] },
      _id: 0,
    },
  },
]);
