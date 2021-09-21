db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $all: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"] },
    },
  },
  {
    $project: {
      title: 1,
      _id: 0,
      num_favs: {
        $size: { $setIntersection: ["$cast", ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"]] },
      },
      cast: 1,
    },
  },
  {
    $skip: 25,
  },
  {
    $limit: 1,
  },
]);
