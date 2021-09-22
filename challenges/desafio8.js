db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { alliances_airlines: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$$alliances_airlines", "$airline.name"] },
            airplane: { $in: ["747", "380"] },
          },
        },
      ],
      as: "flights",
    },
  },
  {
    $addFields: {
      routes: { $size: "$flights" },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: "$routes" },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
