db.movies.aggregate([{
  $addFields: {
    title_split: {
      $split: ["$title", " "],
    },
  },
}, {
  $match: {
    title_split: {
      $size: 1,
    },
  },
}, {
  $project: {
    _id: 0,
    title: 1,
  },
}, {
  $sort: {
    title: 1,
  },
}]);
