db.trips.aggregate([
  { $match: {} },
  { $group:
    {
      _id: "$bikeid",
      duration: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } },
    },
  },
  {
    $project:
    {
      _id: 0, bikeId: "$_id", duracaoMedia: { $ceil: "$duration" },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
