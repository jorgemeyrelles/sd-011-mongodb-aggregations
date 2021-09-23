/* Desafio 14
Baseado na duração média das viagens, determine quais são as 5 bicicletas que foram mais utilizadas.
Exiba o resultado em minutos arredondados para cima e em ordem decrescente. */
db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000],
        },
      },
    },
  },
  { $sort: { duracaoMediaEmMinutos: -1 } },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
  { $limit: 5 },
]);
