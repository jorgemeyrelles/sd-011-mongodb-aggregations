db.movies.aggregate([
  {
    $match: {
      $and: [
        {
          "imdb.rating": {
            $gte: 7,
          },
        },
        {
          $nor: [
            { genres: "Crime" },
            { genres: "Horror" },
          ],
        },
        {
          $or: [
            { rated: "PG" },
            { rated: "G" },
          ],
        },
        {
          $and: [
            { languages: "English" },
            { languages: "Spanish" },
          ],
        },
      ],
    },
  },
  {
    $project: {
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
      _id: 0,
    },
  },
]);
