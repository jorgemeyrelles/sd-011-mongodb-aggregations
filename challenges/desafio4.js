db.movies.aggregate([
  {
    $project: {
      title_split: {
        $split: ["$title", " "],
      },
      _id: 0,
    },
  },
  {
    $match: {
      title_split: {
        $size: 1,
      },
    },
  },
  // {
  //   $group: {
  //     _id: null,
  //     count: { $sum: 1 },
  //   },
  // },
]);
