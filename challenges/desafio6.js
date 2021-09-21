db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /^won.*oscar/i },
    },
  },
  {
    $addFields: {
      extractNumberOscars: { $split: ["$awards", " "] },
    },
  },
  {
    $addFields: {
      numberOscars: { $slice: ["$extractNumberOscars", 1, 1] },
    },
  },
  {
    $group: {
      _id: null,
      max: { $max: "$imdb.rating" },
      min: { $min: "$imdb.rating" },
      media: { $avg: "$imdb.rating" },
      desvP: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: "$max",
      menor_rating: "$min",
      media_rating: { $round: ["$media", 1] },
      desvio_padrao: { $round: ["$desvP", 1] },
    },
  },
]);
