db.movies.aggregate(
  [
    {
      $match: {
        $and: [
          { "imdb.rating": { $gte: 7 } },
          { genres: { $not: { $elemMatch: { $eq: "Crime" } } } },
          { genres: { $not: { $elemMatch: { $eq: "Horror" } } } },
          { rated: { $in: ["PG", "G"] } },
          { languages: { $elemMatch: { $eq: "English" } } },
          { languages: { $elemMatch: { $eq: "Spanish" } } },
        ],
      },
    },
  ],
);
