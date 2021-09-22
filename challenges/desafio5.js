const favs = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: ["$cast", favs],
        },
      },
    },
  },
  // {$match: {
  //   countries: "USA",
  //   "tomatoes.viewer.rating": {$gte: 3},
  //   }
  // },
  {
    $match: {
      countries: {
        $in: ["USA"],
      },
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: {
        $in: favs,
      },
    },
  },
  { $sort: { num_favs: -1, "tomatoe.viewer.rating": -1, title: -1 } },
  { $project: { title: 1, _id: 0 } },
  { $skip: 24 },
  { $limit: 1 },
]);
