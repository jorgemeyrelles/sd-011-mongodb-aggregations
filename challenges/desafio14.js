// Determine a duração média das viagens iniciadas no dia 10/03/2016, em minutos.
// use("aggregations");
db.trips.aggregate([
  {
    $set: {
      duracaoMedia: {
        $divide: [
          {
            $subtract: ["$stopTime", "$startTime"],
          },
          60000,
        ],
      },
    },
  },

  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: "$duracaoMedia",
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
