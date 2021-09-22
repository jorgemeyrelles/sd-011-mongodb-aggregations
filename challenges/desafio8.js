db.air_routes.aggregate([
  {
    $match: {
      airplane: { $in: ["380", "747"] },
    },
  },
  {
    $group: {
      _id: "$airline.name",
      totalVoos: { $sum: 1 },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      localField: "_id",
      foreignField: "airlines",
      as: "alliance",
    },
  },
  {
    $unwind: "$alliance",
  },
  {
    $group: {
      _id: "$alliance.name",
      totalRotas: { $sum: "$totalVoos" },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
