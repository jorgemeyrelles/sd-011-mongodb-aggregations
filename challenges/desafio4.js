db.movies.aggregate([
  {
    $project: {
      _id: 0,
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $sort: { title: 1 },
  },
  {
    $match: {
      title_split: { $size: 1 },
    },
  },
]);
