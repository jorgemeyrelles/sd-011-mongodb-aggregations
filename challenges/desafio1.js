db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      $nor: [{ genres: "Crime" }, { genres: "Horror" }],
      $or: [{ rated: "PG" }, { rated: "G" }, { languages: "English" }, { languages: "Spanish" }],
    },
  },
]);
