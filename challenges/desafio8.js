db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "alliance_routes",
    },
  },
  {
    $unwind: "$alliance_routes",
  },
  {
    $match: {
      "alliance_routes.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$name",
      total_de_rotas: { $sum: 1 },
    },
  },
  {
    $sort: { total_de_rotas: -1 },
  },
  {
    $project: {
      _id: "$_id",
      totalRotas: "$total_de_rotas",
    },
  },
  {
    $limit: 1,
  },
]);
