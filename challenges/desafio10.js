/* Desafio 10
Encontre a duração média de viagens por tipo de usuário.
Exiba o valor em horas com apenas duas casas decimais
Exiba a média de viagens ordenada de forma crescente. */
db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 60 * 1000],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
]);
