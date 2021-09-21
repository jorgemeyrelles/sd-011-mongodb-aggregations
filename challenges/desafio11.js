db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      total_week: { $sum: 1 },
    },
  },
  { $sort: { total_week: -1 } },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total_week",
    },
  },
]);
