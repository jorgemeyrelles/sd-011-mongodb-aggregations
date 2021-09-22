db.trips.aggregate([
  { $match: {} },
  { $group:
    {
      _id: "$usertype",
      avgDuration: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] } },
    },
  },
  {
    $project:
    {
      _id: 0, tipo: "$_id", duracaoMedia: { $round: ["$avgDuration", 2] },
    },
  },
]);
