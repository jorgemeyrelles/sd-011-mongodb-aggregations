db.air_routes.aggregate([
  {
    $match: {
      airplane: { $in: ["747", "380"] },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      let: { airline_name: "$airline.name" },
      pipeline: [
        {
          $unwind: {
            path: "$airlines",
          },
        },
        {
          $match: {
            $expr: { $eq: ["$airlines", "$$airline_name"] },
          },
        },
      ],
      as: "alliance_data",
    },
  },
  {
    $unwind: {
      path: "$alliance_data",
    },
  },
  {
    $group: {
      _id: "$alliance_data.name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 1,
      totalRotas: 1,
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
