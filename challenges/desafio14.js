db.trips.aggregate([
  { $group:
    {
      _id: "$bikeid",
      total: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60],
        },
      },
    },
  },
  { $project: { _id: 0, bikeId: "$_id", duracaoMedia: { $ceil: "$total" } } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
