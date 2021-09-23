db.movies.aggregate([
  {
    $match: {
      cast: { $exists: true },
      languages: "English",
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numMovies: { $sum: 1 },
      avgImdb: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: { $round: ["$numMovies", 1] },
      mediaIMDB: { $round: ["$avgImdb", 1] },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
