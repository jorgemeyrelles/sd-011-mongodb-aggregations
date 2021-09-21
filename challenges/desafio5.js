const actors = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate([
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [actors, "$cast"],
        },
      },
    },
  },
  {
    $match: {
      countries: { $eq: "USA" },
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $in: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"] },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
]);
