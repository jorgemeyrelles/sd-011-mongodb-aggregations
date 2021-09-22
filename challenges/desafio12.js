db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $addFields: {
      nomeEstacao: "$startStationName",
    },
  },
  {
    $group: {
      _id: { diaDaSemana: "$diaDaSemana", nomeEstacao: "$nomeEstacao" },
      total_station: { $sum: 1 },
    },
  },
  {
    $sort: { total_station: -1 },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeEstacao",
      total: "$total_station",
    },
  },
  {
    $limit: 1,
  },
]);
