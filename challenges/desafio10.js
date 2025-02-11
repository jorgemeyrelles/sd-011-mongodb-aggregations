db.trips.aggregate([
  { $match: {} },
  { $group:
    {
      _id: "$usertype",
      avgDurat: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] } },
    },
  },
  {
    $project:
    {
      _id: 0, tipo: "$_id", duracaoMedia: { $round: ["$avgDurat", 2] },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
