// source: https://docs.mongodb.com/manual/reference/operator/aggregation/dayOfWeek/
db.trips.aggregate([
  {
    $group:
    {
      _id:
      {
        $dayOfWeek: "$startTime",
      },
      totalDays: { $sum: 1 },
    },
  },
  {
    $project:
    {
      _id: 0,
      diaDaSemana: "$_id",
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
