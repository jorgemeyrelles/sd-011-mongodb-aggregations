db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 },
    genres: { $nin: ["Crime", "Horror"] },
    rated: { $in: ["PG", "G"] },
    languages: { $all: ["English", "Spanish"] },
  } },
  { $project: {
    _id: 0,
    titulo: "$title",
    avaliado: "$rated",
    notaIMDB: "$imdb.rating",
    votosIMDB: "$imdb.votes",
    ano: "$year",
  } },
]);
// Reference: https://www.ti-enxame.com/pt/mongodb/como-renomear-campos-ao-executar-pesquisa-projecao-no-mongodb/1047436986/
// scripts/evaluate.sh desafioN
