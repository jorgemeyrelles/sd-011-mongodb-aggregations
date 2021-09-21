db.movies.aggregate([
  { $match: {
    "tomatoes.viewer.rating": { $gte: 3 },
    countries: { $in: ["USA"] },
    cast: { $exists: true },
  } },
  { $addFields: {
    favs_intersection: { $let: {
      vars: {
        people_fav: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"] },
      in: { $setIntersection: ["$$people_fav", "$cast"] }
    } } } },
  { $addFields: { num_favs: { $size: "$favs_intersection" },
  } },
  { $sort: {
    num_favs: -1,
    "tomatoes.viewer.rating": -1,
    title: -1,
  } },
  { $skip: 24 },
  { $limit: 1 },
  { $project: {
    _id: 0,
    title: 1,
  } },
]);
