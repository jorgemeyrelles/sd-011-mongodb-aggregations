db.air_alliances.aggregate([
  {
    $match: {
      airplane: { $in: ["747", "380"] }, // primeiro filtro.
    },
  },
  {
    $lookup: { // união das duas coleções.
      from: "air_routes",
      localField: "airline",
      foreignField: "airline.name",
      as: "parcerias",
    },
  },
  {
    $unwind: "$parcerias", // após unir as duas coleções se divide cada um dos itens.
  },
  {
    $group: {
      _id: "$parcerias.name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $limit: 1,
  },
  {
    $sort: { totalRotas: -1 },
  },
]);
