db.trips.aggregate([
  {
    $addFields: {
      startDayOfWeek: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: {
        startDayOfWeek: "$startDayOfWeek",
        startStationName: "$startStationName",
      },
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.startStationName",
      total: "$count",
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
]);
