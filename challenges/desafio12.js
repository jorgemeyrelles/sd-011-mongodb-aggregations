db.trips.aggregate([
  {
    $group: {
      _id: {
        diaSemana: { $dayOfWeek: "$startTime" },
        nomeEstacao: "$startStationName",
      },
      day_count: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      day_count: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeEstacao",
      total: "$day_count",
    },
  },
]);
