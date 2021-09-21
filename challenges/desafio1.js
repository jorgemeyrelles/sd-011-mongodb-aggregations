db.movies.aggregate(
  [
    {
      $match: {
        $and: [
          { "imdb.rating": { $gte: 7 } },
          { $and: [
            { genres: { $ne: "Crime" } },
            { genres: { $ne: "Horror" } },
          ] },
          { $or: [
            { rated: { $eq: "G" } },
            { rated: { $eq: "PG" } },
          ] },
          { $and: [
            { languages: { $eq: "English" } },
            { languages: { $eq: "Spanish" } },
          ] },
        ],
      },
    },
  ],
);
