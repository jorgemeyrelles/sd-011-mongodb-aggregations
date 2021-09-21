const favorites = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  { $match: { countries: { $gt: "USA" } } },
  { $match: { "tomatoes.viewer.rating": { $gte: 3 } } },
  { $match: { title: { $skip: 24 } } },
  { $match: { title: { $limit: 1 } } },
  { $addFields: { num_favs: { $size: { $setIntersection: [favorites, "$cast"] } } },
  },
  { $project: { _id: 0, title: 1 } },
  { $sort: { num_fav: 1, "tomatoes.viewer.rating": 1, title: 1, _id: 0 } },
]);
