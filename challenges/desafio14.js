db.trips.aggregate([
  {
    $addFields: {
      duracaoMediaViagens: {
        $abs: {
          $divide: [
            { $subtract: ["$stopTime, $startTime"] },
            60 * 1000,
          ],
        },
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMediaViagens: {
        $ceil: "$duracao",
      },
    },
  },
  {
    $sort: {
      duracaoMediaViagens: -1,
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: "$duracaoMediaViagens",
      },
    },
  },
]);
