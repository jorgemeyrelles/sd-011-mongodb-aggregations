db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $group: {
      _id: "$cast",
      num_favs: { $sum: 1 },
    },
  },
]);


db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $group: {
      _id: "$cast",
      num_favs: { $sum: 1 },
    },
  },
  {
    $sort: { num_favs: -1, "tomatoes.viewer.rating": 1, title: 1 },
  },
  {
    $project: {
      titulo: "$title",
      _id: 0,
    }
  }
]);