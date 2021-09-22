// busca por filme em inglês
db.movies.aggregate([
  {
    $match: {
      languages: { $all: ["English"] },
    },
  },
  {
    $project:
    {
      _id: 0,
      languages: 1,
    },
  },
]);

// busca pelo nome das pessoas atrizes
db.movies.aggregate([
  {
    $unwind: "$cast",
  },
  {
    $project:
    {
      _id: 0,
      cast: 1,
    },
  },
]);

