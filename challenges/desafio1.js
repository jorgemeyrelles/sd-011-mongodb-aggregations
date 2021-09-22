db.movies.aggregate([
  {
    $match: {
      $and: [
        { "imdb.rating": { $gte: 7 } },
        { genres: { $not: { $in: ["Crime", "Horror"] } } },
        { rated: { $in: ["PG", "G"] } },
        { $and: [{ languages: "English" }, { languages: "Spanish" }] },
      ],
    },
  },
]);
