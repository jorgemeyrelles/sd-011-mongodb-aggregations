db.trips.aggregate([
  {
    $group: {
      _id: {
        dia_semana: { $dayOfWeek: "$startTime" },
        ponto: "$startStationName",
      },
      count: { $sum: 1 },
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.ponto",
      total: "$count",
    },
  },
  {
    $limit: 1,
  },
]);
