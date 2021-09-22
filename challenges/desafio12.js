db.trips.aggregate(
  {
    $group: {
      _id: {
        nomeEstacao: "$startStationName",
        diaDaSemana: { $dayOfWeek: "$startTime" },
      },
      total: { $sum: 1 },
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $project: {
      nomeEstacao: "$_id.nomeEstacao",
      total: 1,
      _id: 0,
    },
  },
);
