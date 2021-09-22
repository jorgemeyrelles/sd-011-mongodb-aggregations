db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { alliances: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$$alliances", "$airline.name"] },
          },
        },
      ],
      as: "alliances_routes",
    },
  },
  {
    $unwind: "$alliances_routes",
  },
  {
    $match: {
      "alliances_routes.airplane": { $in: ["747", "380"] },
    },
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
