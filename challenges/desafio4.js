db.movies.aggregate(
  {
    $sort: {
      title: 1,
    },
  },
  {
    $addFields: {
      title_split: {
        $split: ["$title", " "],
      },
      count: { $size: { $split: ["$title", " "] } },
    },
  },
  {
    $match: {
      count: { $eq: 1 },
    },
  },
  {
    $project: {
      title_split: 1,
      _id: 0,
    },
  },
);
