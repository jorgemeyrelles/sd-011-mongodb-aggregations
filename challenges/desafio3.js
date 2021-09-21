use("aggregations");
// Desafio 3
// Agora que você tem os campos essenciais, aplique mais um estágio na pipeline do desafio anterior que atenda a seguinte demanda:

// Retorne esses filmes ordenados por ano e nota IMDB de forma decrescente e título por ordem alfabética.

db.movies.aggregate(
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
  {
    $project: {
      title: 1,
      rated: 1,
      "imdb.rating": 1,
      "imdb.votes": 1,
      year: 1,
      _id: 0,
    }
  },
  {
    $sort: {
      year: -1,
      "imdb.rating": -1,
      title: 1,
    }
  }
);
