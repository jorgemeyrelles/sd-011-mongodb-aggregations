db.air_routes.aggregate([
  {
    $group: {
      _id: "$airplane",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $match: { _id: { $in: ["747", "380"] } },
  },
  {
    $sort: { _id: -1 },
  },
  { $limit: 1 },
]);

// {
//   $lookup:
//   {
//     from: "air_alliances",
//     localField: "airline.name",
//     foreignField: "airlines",
//     as: "airlines_result",
//   },
// },
