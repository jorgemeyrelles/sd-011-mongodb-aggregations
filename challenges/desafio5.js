const favorites = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": {
        $gte: 3,
      },
    },
  },
  {
    $addFields: {
      favs: { $setIntersection: ["$cast", favorites] },
    },
  },
  {
    $addFields: {
      num_favs: { $size: { $ifNull: ["$favs", []] } },
    },
  },
  {
    $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      title: 1,
      _id: 0,
    },
  },
]);
