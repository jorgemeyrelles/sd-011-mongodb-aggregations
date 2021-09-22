db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$duracao", 3600000] }, 2] },
    }, // divisao para mostrar o valor em horas, e duas casas decimais.
  },
]);
