db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      let: { alliances: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $in: ["$airline.name", "$$alliances"] },
                { $in: ["$airplane", ["747", "380"]] },
              ],
            },
          },
        },
        {
          $group: {
            _id: null,
            totalRotas: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            totalRotas: 1,
          },
        },
      ],
      as: "totalRotas",
    },
  },
  { $unwind: "$totalRotas" },
  {
    $project: {
      _id: "$name",
      totalRotas: "$totalRotas.totalRotas",
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
