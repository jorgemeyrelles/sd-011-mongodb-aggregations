db.movies.aggregate([
  {
    $match: {
      countries: { $in: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $exists: true },
    },
  },
  {
    $project: {
      _id: 0,
      tomatoes_viewer_rating: "$tomatoes.viewer.rating",
      title: 1,
      num_favs: { $size: {
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
      cast: 1,
    },
  },
  {
    $sort: {
      num_favs: -1,
      tomatoes_viewer_rating: -1,
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
    },
  },
]);
