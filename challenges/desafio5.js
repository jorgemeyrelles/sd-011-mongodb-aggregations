db.movies.aggregate([
  {
    $match: {
      $and: [
        { countries: { $eq: "USA" } },
        { $or: [
          { cast: { $eq: "Sandra Bullock" } },
          { cast: { $eq: "Tom Hanks" } },
          { cast: { $eq: "Julia Roberts" } },
          { cast: { $eq: "Kevin Spacey" } },
          { cast: { $eq: "George Clooney" } },
        ] },
        { "tomatoes.viewer.rating": { $gte: 3 } },
      ],
    },
  },
  { $addFields: {
    favs: { $setIntersection: ["$cast",
      ["Sandra Bullock", "Tom Hanks",
        "Julia Roberts", "Kevin Spacey", "George Clooney",
      ]] },
  } },
  { $addFields: {
    num_favs: { $size: "$favs" },
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
