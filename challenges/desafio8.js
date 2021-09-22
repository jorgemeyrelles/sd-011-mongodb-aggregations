db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { rotas: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$$rotas", "$airline.name"] } } },
      ],
      as: "totalRotas",
    },
  },
  {
    $unwind: "$totalRotas",
  },
  {
    $match: {
      "totalRotas.airplane": { $in: ["747", "380"] },
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
// parte de agrupamento realizado com ajuda da Gabriela Azevedo;
