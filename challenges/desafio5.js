db.movies.aggregate([
  {
    $match: {
      $and: [
        { countries: "USA" },
        { "tomatoes.viewer.rating": { $gte: 3 } },
        { cast: { $exists: 1 } },
      ],
    },
  },
  {
    $addFields: {
      favorites: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
    },
  },
  {
    $addFields: {
      intersection: {
        $setIntersection: ["$cast", "$favorites"],
      },
    },
  },
  {
    $addFields: {
      num_favs: { $size: "$intersection" },
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
      _id: 0,
      title: 1,
    },
  },
]);
