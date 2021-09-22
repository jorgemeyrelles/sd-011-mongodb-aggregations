db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      let: {
        alliances_name: "$name",
        alliances_airlines_name: "$airlines",
      },
      pipeline: [
        {
          $match: {
            airplane: {
              $in: ["747", "380"],
            },
          },
        },
      ],
      as: "totalRotas",
    },
  },
  { $unwind: "$totalRotas" },
  {
    $group: {
      rotas: { $sum: 1 },
    },
  },
]);
