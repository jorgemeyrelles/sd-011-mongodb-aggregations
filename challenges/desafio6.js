db.movies.aggregate([
  {
    $match: {
      awards: {
        // Referência: https://regexr.com/
        /* Deve dar match com as Palavras Won e Oscar, case sensitive
           ter ao meio um ou mais caracteres (de 0-9) */
        $regex: /(Won \d+ Oscar)/,
      },
    },
  },
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
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);
