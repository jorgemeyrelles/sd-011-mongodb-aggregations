const favActors = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $exists: true },
    },
  },
  {
    $addFields: {
      num_favs_array: {
        $setIntersection: ["$cast", favActors],
      },
    },
  },
  {
    $match: {
      num_favs_array: {
        $setIntersection: ["$cast", favActors],
      },
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: "$num_favs_array",
      },
    },
  },
  {
    $project: {
      title: 1,
      _id: 0,
      cast: 1,
    },
  },
  {
    $skip: 25,
  },
]);
