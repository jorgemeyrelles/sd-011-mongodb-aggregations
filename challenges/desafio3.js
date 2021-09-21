db.movies.aggregate([{ $match: { languages: { $all: ["English", "Spanish"] } } },
  { $match: { rated: { $in: ["PG", "G"] } } },
  { $match: { genres: { $nin: ["Crime", "Horror"] } } },
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $project: {
    _id: 0,
    titulo: "$title",
    avaliado: "$rated",
    notaIMDB: "$imdb.rating",
    votosIMDB: "$imdb.votes",
    ano: "$year",
  } },
  { $sort: { ano: -1, notaIMDB: -1, titulo: 1 } },
]);
