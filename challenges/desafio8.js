db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup:
    {
      from: "air_routes",
      let: { airline: "$airlines" },
      pipeline:
      [
        { $match: { $expr: { $eq: ["$$airline", "$airline.name"] } } },
      ],
      as: "airline",
    },
  },
  { $unwind: "$airline" },
  { $match: { "airline.airplane": { $in: ["747", "380"] } } },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
