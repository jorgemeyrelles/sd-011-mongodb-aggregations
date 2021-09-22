db.trips.aggregate([
  { $group: { _id: {
    diaDaSemana: { $dayOfWeek: "$startTime" },
    nomeEstacao: "$startStationName",
  },
  count: { $sum: 1 } } },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id.nomeEstacao",
    total: "$count" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
