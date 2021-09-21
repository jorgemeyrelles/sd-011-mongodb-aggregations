db.movies.aggregate([{ $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { genres: { $nin: ["Crime", "Horror"] } } },
  { $match: { rated: { $in: ["PG", "G"] } } },
  { $match: { languages: { $all: ["English", "Spanish"] } } },
  { $addFields: { titulo: "$title",
    avaliado: "$rated",
    notaIMDB: "$imdb.rating",
    votosIMDB: "$imdb.votes",
    ano: "$year" } },
  { $project: { titulo: 1, avaliado: 1, notaIMDB: 1, votosIMDB: 1, ano: 1, _id: 0 } }]);
