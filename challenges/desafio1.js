db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 },
    genres: { $nin: ["Crime", "Horror"] },
    rated: { $in: ["PG", "G"] },
    languages: { $all: ["English", "Spanish"] },
  } },
]);

// https://docs.mongodb.com/manual/reference/operator/update/rename/

// scripts/evaluate.sh desafioN
