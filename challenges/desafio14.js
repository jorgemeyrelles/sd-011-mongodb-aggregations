db.trips.aggregate([
  {
    $addFields: {
      duracaoM: {
        $abs: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] },
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoM: { $avg: "$duracaoM" },
    },
  },
  {
    $sort: { duracaoM: -1 },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoM" },
      _id: 0,
    },
  },
]);
