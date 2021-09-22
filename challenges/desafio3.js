db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      $or: [{ rated: "PG" }, { rated: "G" }],
      languages: { $all: ["English", "Spanish"] },
    },
  },
  { $limit: 41 },
  { $addFields: {
    titulo: "$title",
    avaliado: "$rated",
    notaIMDB: "$imdb.rating",
    votosIMDB: "$imdb.votes",
    ano: "$year",
  } },
  { $project: {
    _id: 0,
    titulo: 1,
    avaliado: 1,
    notaIMDB: 1,
    votosIMDB: 1,
    ano: 1,
  } },
  { $sort: {
    ano: -1,
    notaIMDB: -1,
    titulo: 1,
  } },
]);
