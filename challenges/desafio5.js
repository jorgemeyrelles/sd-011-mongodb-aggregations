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
      ],
    },

  },
  { $addFields: {
    num_favs: { $add: ["$num_favs", 1] },
  } },
  { $sort: {
    num_favs: 1,
    "tomatoes.viewer.rating": 1,
    title: 1,
  } },
  { $limit: 1 },
  { $project: {
    _id: 0,
    title: 1,
  } },
]);
