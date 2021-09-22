db.movies.aggregate([
  { $match: {
    languages: { $eq: "English" },
  } },
  { $unwind: "$cast" },
  { $set: {
    _id: "$cast",
  } },
  { $group: {
    _id: "$_id",
    numeroFilmes: { $sum: 1 },
    mediaIMDB_int: { $avg: "$imdb.rating" },
  } },
  { $sort: {
    numeroFilmes: -1,
    _id: -1,
  } },
  { $project: {
    _id: 1,
    title: 1,
    numeroFilmes: 1,
    mediaIMDB: { $round: ["$mediaIMDB_int", 1] },
  } },
]);
