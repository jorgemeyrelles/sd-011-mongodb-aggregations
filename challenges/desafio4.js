db.movies.aggregate([
  { $match: { title: { $regex: /^\S+$/ } } },
  { $project: { title_split: ["$title"], _id: 0 } },
  { $sort: { title_split: 1 } },
]);
