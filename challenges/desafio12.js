db.trips.aggregate([
  { $project: {
    dayOfWeek: { $dayOfWeek: "$startTime" },
    startStationName: 1,
  } },
  { $match: {
    dayOfWeek: 5,
  } },
  { $group: {
    _id: "$startStationName",
    total: { $sum: 1 },
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: {
    nomeEstacao: "$_id",
    total: "$total",
    _id: 0,
  } },
]);
