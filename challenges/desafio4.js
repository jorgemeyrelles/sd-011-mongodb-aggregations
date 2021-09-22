db.movies.aggregate([
  {
    $project: {
      _id: 0,
      title_split: { $split: ["$title", " "] }, // documentação: https://docs.mongodb.com/manual/reference/operator/aggregation/split/
    },
  },
  {
    $match: {
      title_split: { $size: 1 },
    },
  },
  {
    $sort: { title_split: 1 },
  },
]);
