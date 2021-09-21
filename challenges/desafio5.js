db.movies.aggregate([
  {
    $match: {
      "tomatoes.viewer.rating": { $gte: 3 },
      countries: ["USA"],
    },
  },
  {
    $addFields: {
      favs: {
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
  { $match: { favs: { $ne: [], $type: "array" } } },

  {
    $project: {
      _id: 0,
      title: 1,
      num_favs: {
        $size: "$favs",
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  { $project: { title: 1, _id: 0 } },
  { $skip: 25 },
  { $limit: 1 },
]);
