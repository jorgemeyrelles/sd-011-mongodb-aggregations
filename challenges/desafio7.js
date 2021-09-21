db.movies.aggregate([
  { $match: {
    cast: { $exists: true },
    languages: { $in: ["English"] },
  } },
  { $unwind: "$cast" },
  { $group: {
    _id: "$cast",
    numeroFilmes: { $count: {} },
    mediaIMDB: { $avg: "$imdb.rating" },
  } },
  { $project: {
    numeroFilmes: 1,
    mediaIMDB: { $round: ["$mediaIMDB", 1] },
  } },
  { $sort: {
    numeroFilmes: -1,
    _id: -1,
  } },
]);
