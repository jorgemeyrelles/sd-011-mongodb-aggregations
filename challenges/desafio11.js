db.trips.aggregate([
  {
    $addFields: {
      dayWeek: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$dayWeek",
      total: { $sum: 1 },
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
  {
    $project: { diaDaSemana: "$_id", total: "$total", _id: 0 },
  },
]);
