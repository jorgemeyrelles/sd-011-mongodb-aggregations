const preferidas = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate([
  { $match: { countries: "USA" }, "tomatoes.viewer.rating": { $gte: 3 }, cast: { $in: preferidas } },
  { $project: { num_favs: { $size: { $setIntersection: ["$cast", preferidas] } } } },
  { $project: { title: 1, _id: 0 } },
  { $skip: 24 },
  { $limit: 1 },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
]);
