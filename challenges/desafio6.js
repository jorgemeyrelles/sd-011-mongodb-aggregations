db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /Won [0-9]+ Oscars?/ },
    },
  },
  {
    $addFields: {
      _id: 0,
      myRating: {
        $cond: {
          if: { $eq: ["$imdb.rating", ""] },
          then: null,
          else: "$imdb.rating",
        },
      },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$myRating" },
      menor_rating: { $min: "$myRating" },
      media_rating: { $avg: "$myRating" },
      desvio_padrao: { $stdDevSamp: "$myRating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: { $round: ["$maior_rating", 1] },
      menor_rating: { $round: ["$menor_rating", 1] },
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);
