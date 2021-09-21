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
    $project: {
      title_split: {
        $size: 1,
      },
    },
  },
]);
