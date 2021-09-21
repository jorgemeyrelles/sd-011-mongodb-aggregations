db.movies.aggregate([
  { $unwind: "$cast" },
  {
    $match: {
      cast: { $exists: true },
      languages: { $exists: true, $all: ["English"] },
    },
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
      numeroFilmes: 1,
    },
  },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);
