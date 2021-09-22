const DATETIME_TO_MINUTES = 1000 * 60;

db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, DATETIME_TO_MINUTES] },
      },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  {
    $project: {
      _id: false,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
  { $limit: 5 },
]);
