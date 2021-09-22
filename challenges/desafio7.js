db.movies.aggregate([
  {
    $match: {
      languages: { $all: ["English"] },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $addFields: {
      imdbRating: "$imdb.rating",
    },
  },
  {
    $group:
    {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdbRating" },
    },
  },
  {
    $project:
    {
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  {
    $sort:
    {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
