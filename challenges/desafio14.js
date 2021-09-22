const miliseconds = 60 * 1000;
db.trips.aggregate([
  {
    $addFields: {
      times: {
        $abs: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            miliseconds,
          ],
        },
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracao: { $avg: "$times" },
    },
  },
  {
    $sort: { duracao: -1 },
  },
  { $limit: 5 },
  {
    $project: {
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracao" },
      _id: 0,
    },
  },
]);
