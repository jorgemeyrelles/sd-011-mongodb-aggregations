const favoriteActressAndActors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  { $match: { $and: [{ countries: { $all: ["USA"] } },
    { "tomatoes.viewer.rating": { $gte: 3 } },
    { cast: { $exists: true } }] } },
  { $addFields: { num_favs: { $setIntersection: [favoriteActressAndActors, "$cast"] } } },
  { $skip: 24 },
  { $limit: 1 },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { _id: 0, title: 1 } },
]);
