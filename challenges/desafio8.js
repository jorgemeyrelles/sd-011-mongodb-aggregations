db.air_alliances.aggregate([
  { $lookup: { from: "air_routes",
    let: { lines: "$airlines" },
    pipeline: [
      { $match: { $expr: { $in: ["$airline.name", "$$lines"] }, airplane: { $in: ["747", "380"] } } },
    ],
    as: "totalRotas" },
  },
  { $project: { _id: "$name", totalRotas: { $size: "$totalRotas" } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
