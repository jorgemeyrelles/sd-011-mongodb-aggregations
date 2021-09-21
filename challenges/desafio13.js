// Determine a duração média das viagens iniciadas no dia 10/03/2016, em minutos.
// use("aggregations");
db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00Z"),
      },
    },
  },
  {
    $set: {
      duracaoMediaEmMinutos: {
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
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: "$duracaoMediaEmMinutos",
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $round: ["$duracaoMediaEmMinutos", 0] },
    },
  },
]);
