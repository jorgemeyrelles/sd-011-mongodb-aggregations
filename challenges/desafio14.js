db.trips.aggregate([
  {
    $addFields: {
      time: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      avgTime: { $avg: "$time" },
    },
  },
  {
    $sort: { avgTime: -1 },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$avgTime" },
      _id: 0,
    },
  },
]);
