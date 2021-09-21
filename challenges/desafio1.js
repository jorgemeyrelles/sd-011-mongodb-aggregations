db.movies.aggregate([
  {
    $match: { languages: { $all: ["English", "Spanish"] } },
  },
  {
    $match: { rated: { $in: ["PG", "G"] } },
  },
  {
    $match: { genres: { $nin: ["Crime", "Horror"] } },
  },
  {
    $match: { "imdb.rating": { $gte: 7 } },
  },
]);
