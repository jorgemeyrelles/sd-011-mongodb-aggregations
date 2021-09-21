db.movies.aggregate([
  {
    $match: {
      $and: [
        { "imb.rating": { $gte: 7 } },
        { genres: { $nin: ["Crime", "Horror"] } },
        { rated: { $in: ["PG", "G"] } },
        { languages: { $all: ["English", "Spanish"] } },
      ],
    },
  },
]);
