db.movies.aggregate([
  {
    $match: {
      languages: { $in: ["English"] },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numero_filmes: { $sum: 1 },
      media_imdb: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: "$_id",
      numeroFilmes: "$numero_filmes",
      mediaIMDB: { $round: ["$media_imdb", 1] },
    },
  },
  {
    $sort: { numeroFilmes: -1, _id: -1 },
  },
]);
