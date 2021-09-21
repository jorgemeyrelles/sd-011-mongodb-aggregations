db.movies.aggregate([
  { $project: {
    _id: 0,
    title: 1,
    title_split: { $split: ["$title", " "] },
  } },
  { $match: { title_split: { $size: 1 } } },
  { $sort: { title: 1 } },
  { $project: { title: 0 } },
]);
