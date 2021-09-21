db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      as: "routes_targeted_airplanes",
      let: { alliance_airlines: "$airlines" },
      pipeline: [
        { $match: {
          $expr: { $and: [
            { $in: ["$airplane", ["747", "380"]] },
            { $in: ["$airline.name", "$$alliance_airlines"] },
          ] },
        } },
      ],
    },
  },
  {
    $project: {
      _id: "$name",
      totalRotas: { $size: "$routes_targeted_airplanes" },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);
