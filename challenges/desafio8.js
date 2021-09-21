db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { airlines_alliances: "$airlines" },
      pipeline: [
        { $match: { $expr: { $eq: ["$$airlines_alliances", "$airline.name"] } } },
      ],
      as: "voos",
    },
  },
  {
    $unwind: "$voos",
  },
  {
    $match: { "voos.airplane": { $in: ["747", "380"] } },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);
