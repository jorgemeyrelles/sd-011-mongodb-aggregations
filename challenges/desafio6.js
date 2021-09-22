db.movies.aggregate([
  {
    $match: {
      awards: {
        $exists: true,
        $all: [/won/i, /oscar/i],
      },
    },
  },
  {
    $project: {
      imdbRating: "$imdb.rating",
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdbRating" },
      menor_rating: { $min: "$imdbRating" },
      media_rating: { $avg: "$imdbRating" },
      desvio_padrao: { $stdDevSamp: "$imdbRating" },
    },
  },
  {
    $project: {
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
      _id: 0,
    },
  },
]);
