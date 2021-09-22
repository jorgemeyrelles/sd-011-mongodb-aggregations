db.trips.aggregate([
  { $addFields: {
    dayOf: { $dayOfWeek: "$startTime" },
  } },
  { $match: { dayOf: 5 } },
  { $group:
    {
      _id: "$startStationName",
      total: { $sum: 1 },
    },
  },
  {
    $project:
    {
      _id: 0, nomeEstacao: "$_id", total: "$total",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
