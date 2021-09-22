db.movies.aggregate([
  {
    $match:
      {
        $and:
        [
          { genres: { $nin: ["Crime", "Horror"] } },
          { "imdb.rating": { $gte: 7 } },
          { rated: { $in: ["PG", "G"] } },
          { languages: { $all: ["English", "Spanish"] } },
        ],
      },
  },
  {
    $project: {
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$ano",
    },
  },
  {
    $sort: {
      titulo: 1,
      notaIMDB: -1,
      ano: -1,
    },
  },
]);
