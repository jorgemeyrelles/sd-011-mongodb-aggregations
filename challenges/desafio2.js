db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $not: {
        $in: ["Crime", "Horror"],
      } },
      rated: { $in: ["PG", "G"] },
      languages: ["English", "Spanish"],
    },
  },
  {
    $project: {
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "year",
    },
  },
]);
