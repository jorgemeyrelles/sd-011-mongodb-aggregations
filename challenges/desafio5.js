/*
  source: {
    mongodbDocumentation: {
      let: https://docs.mongodb.com/manual/reference/operator/aggregation/let/,
      setIntersection: https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/,
    },
    pullRequests: {
      anaClara: https://github.com/tryber/sd-011-mongodb-aggregations/blob/anaclarabck-mongodb-aggregations/challenges/desafio5.js
      richard: https://github.com/tryber/sd-011-mongodb-aggregations/blob/richard-freitas-mongodb-aggregations/challenges/desafio5.js
      inacio: https://github.com/tryber/sd-011-mongodb-aggregations/blob/heyset-aggregations-project/challenges/desafio5.js
    }
  }
*/

db.movies.aggregate([
  {
    $match: {
      cast: {
        $exists: true,
        $in: [
          "Sandra Bullock",
          "Tom Hanks",
          "Julia Roberts",
          "Kevin Spacey",
          "George Clooney",
        ],
      },
      countries: { $in: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      cast: 1,
      rating: "$tomatoes.viewer.rating",
      num_favs: {
        $size: {
          $setIntersection: [
            [
              "Sandra Bullock",
              "Tom Hanks",
              "Julia Roberts",
              "Kevin Spacey",
              "George Clooney",
            ],
            "$cast",
          ],
        },
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      rating: -1,
      title: -1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      title: 1,
      rating: "$tomatoes.viewer.rating",
    },
  },
]);
