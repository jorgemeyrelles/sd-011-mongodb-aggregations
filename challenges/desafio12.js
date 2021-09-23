// source: https://docs.mongodb.com/manual/reference/operator/aggregation/dayOfWeek/
db.trips.aggregate([
  {
    $group:
    {
      _id:
      {
        test:
        {
          $dayOfWeek: "$startTime",
        },
        startStationName: "$startStationName",
      },
      totalDays: { $sum: 1 },
    },
  },
  {
    $project:
    {
      _id: 0,
      nomeEstacao: "$_id.startStationName",
      total: "$totalDays",
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
]);
