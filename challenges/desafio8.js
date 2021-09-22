/* Desafio 8

Trocando de contexto, vamos utilizar nossa outra coleção que contém dados
de empresas aéreas, suas rotas, seus voos e parcerias.

Liste todas as parcerias da coleção air_alliances, que voam rotas com um
Boing 747 ou um Airbus A380 , para descobrir qual delas tem o maior número
de rotas com esses aviões.
No campo airplane, na coleção air_routes:

- Boing 747 está abreviado para 747
- Airbus A380 está abreviado para 380

O resultado da sua query deve ter exatamente o seguinte formato (incluindo a ordem dos campos):

{ "_id" : <nome_da_alianca>, "totalRotas" : <total_de_rotas> } */

// se("aggregations");
db.air_routes.aggregate([
  {
    $match: {
      airplane: { $in: ["747", "380"] },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      let: { airline: "$airline.name" },
      pipeline: [
        { $unwind: "$airlines" },
        {
          $match: {
            $expr: {
              $eq: ["$airlines", "$$airline"],
            },
          },
        },
        {
          $project: {
            _id: 0,
            name: 1,
          },
        },
      ],
      as: "alliance",
    },
  },
  { $unwind: "$alliance" },
  {
    $group: {
      _id: "$alliance.name",
      totalRotas: { $sum: 1 },

    },
  },
  // { $count: "totlaRotas"}, usei o group pois prcisava do id com o nome da aliança
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
