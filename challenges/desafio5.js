const favActors = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate([
  { $match: {
    countries: { $all: ["USA"] },
    "tomatoes.viewer.rating": { $gte: 3 },
    cast: { $ne: null },
  } },
  { $project: {
    title: 1,
    "tomatoes.viewer.rating": 1,
    match_favs: { $setIntersection: ["$cast", favActors] },
  } },
  { $project: {
    num_favs: { $size: "$match_favs" },
    title: 1,
    "tomatoes.viewer.rating": 1,
  } },
  { $sort: {
    num_favs: -1,
    "tomatoes.viewer.rating": -1,
    title: -1,
  } },
  { $project: { title: 1, _id: 0 } },
  { $skip: 24 },
  { $limit: 1 },
]);
