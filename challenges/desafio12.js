db.trips.aggregate([
  {
    $group: {
      _id: {
        nomeDaEstacao: "$startStationName",
        diaDaSemana: { $dayOfWeek: "$startTime" } },
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
    $project: {
      nomeDaEstacao: "$_id.nomeDaEstacao",
      total: "$total",
      _id: 0,
    },
  },
]);
