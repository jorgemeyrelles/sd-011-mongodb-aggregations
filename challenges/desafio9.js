db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    pipeline: [
      {
        $match: {
          $expr: { $eq: ["$airlines", "$airlines.nome"] },
          airplane: { $in: ["747", "380"] },
        },
      },
    ],
    as: rotas,
  },
  },
]);
