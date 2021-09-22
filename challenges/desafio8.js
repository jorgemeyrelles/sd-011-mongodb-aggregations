db.air_routes.aggregate([
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "em_comum",
    },
  },
  {
    $unwind: "$em_comum",
  },
  {
    $set: {
      _id: "$em_comum.name",
    },
  },
  {
    $match: {
      $or: [
        { airplane: { $eq: "747" } },
        { airplane: { $eq: "380" } },
      ],
    },
  },
  {
    $group: {
      _id: "$_id",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  { $limit: 1 },
  {
    $project: {
      _id: 1,
      totalRotas: 1,
    },
  },
]);
