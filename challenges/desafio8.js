db.air_alliances.aggregate([
  {
    $lookup: { // união das duas coleções.
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "parcerias",
    },
  },
  {
    $unwind: "$parcerias", // após unir as duas coleções se divide cada um dos itens.
  },
  {
    $match: {
      airplane: { $in: ["747", "380"] }, // primeiro filtro.
    },
  },
  {
    $group: {
      _id: "$parcerias.name",
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
