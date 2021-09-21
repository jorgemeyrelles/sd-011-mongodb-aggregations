// use("aggregations");
db.movies.aggregate([
  {
    $match: { languages: { $in: ["English"] } },
  },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  { $project: { mediaIMDB: { $round: ["$mediaIMDB", 1] }, numeroFilmes: 1 } },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);
