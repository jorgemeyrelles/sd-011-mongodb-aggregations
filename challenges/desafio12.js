db.trips.aggregate([
  {
    $group: {
      _id: { diaDaSemana: { $dayOfWeek: "$startTime" }, nomeEstacao: "$startStationName" },
      total: { $sum: 1 },
    },
  },
  { $sort: { total: -1 } },
  { $project: { _id: false, nomeEstacao: "$_id.nomeEstacao", total: "$total" } },
  { $limit: 1 },
]);
