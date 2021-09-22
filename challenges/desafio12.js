db.trips.aggregate([
  {
    $addFields: {
      dayWeek: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: {
        local: "$startStationName",
        day: "$dayWeek",
      },
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
    $project: { nomeEstacao: "$_id.local", total: "$total", _id: 0 },
  },
]);
