db.trips.aggregate([
  {
    $group: {
      _id: {
        diaDaSemana: { $dayOfWeek: "$startTime" },
        station: "$startStationName",
      },
      trips: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.station",
      total: "$trips",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
