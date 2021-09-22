/* Desafio 10

Encontre a duração média de viagens por tipo de usuário.

- Exiba o valor em horas com apenas duas casas decimais

- Exiba a média de viagens ordenada de forma crescente.

Para arredondar a média use o $round.

O resultado da sua query deve ter exatamente o seguinte formato (incluindo a ordem dos campos):

{ "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }
*/

// use('aggregations');
db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: { $divide: [
          { $subtract: ["$stopTime", "$startTime"] }, 1000 * 60 * 60] } },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
