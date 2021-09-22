db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      mediaUtilizacao: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $sort: {
      mediaUtilizacao: -1,
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: { $divide: ["$mediaUtilizacao", 1000 * 60] } },
    },
  },
]);
