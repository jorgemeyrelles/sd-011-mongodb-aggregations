db.air_alliances.aggregate([{ $unwind: "$airlines" },
  { $lookup: { from: "air_routes",
    let: { airline_name: "$airlines" },
    pipeline: [{ $match: { airplane: { $in: ["380", "747"] },
      $expr: { $eq: ["$$airline_name", "$airline.name"] } } }],
    as: "spcf_routes" } },
  { $unwind: "$spcf_routes" },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 }]);
