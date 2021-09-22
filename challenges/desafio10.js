db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracao: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$duracao", 3600000] }, 2] },
    }, // divisao para mostrar o valor em horas, e duas casas decimais.
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
