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

