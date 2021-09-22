db.air_routes.aggregate([
  {
    $match: { airplane: { $in: ["747", "380"] } },
  },
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "empresas",
    },
  },
  {
    $group: {
      _id: "$empresas.name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $unwind: "$_id",
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);
