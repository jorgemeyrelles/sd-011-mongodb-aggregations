db.trips.aggregate([
  {
    $group: {
      _id: {
        diaDaSemana: { $dayOfWeek: "$startTime" },
        nomeEstacao: "$startStationName",
      },
      total_week: { $sum: 1 },
    },
  },
  { $sort: { total_week: -1 } },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeEstacao",
      total: "$total_week",
    },
  },
]);
