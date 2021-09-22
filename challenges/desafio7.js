db.movies.aggregate([
  {
    $match: {
      languages: {
        $in: ["English"] },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numerosFilmes: { $sum: 1 },
      media: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 1,
      numerosFilmes: 1,
      mediaIMDB: { $round: ["$media", 1],
      },
    },
  },
  {
    $sort: {
      numerosFilmes: -1,
      _id: -1,
    },
  },
]);
