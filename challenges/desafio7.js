const DECIMAL_POINTS = 1;

db.movies.aggregate([
  { $match: { languages: { $all: ["English"] } } },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  { $sort: { numeroFilmes: -1, _id: -1 } },
  {
    $project: {
      _id: true,
      numeroFilmes: true,
      mediaIMDB: { $round: ["$mediaIMDB", DECIMAL_POINTS] },
    },
  },
]);
