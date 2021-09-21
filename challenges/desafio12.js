db.trips.aggregate([
  {
    $addFields: {
      dia_da_semana: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: {
        startDay: "$dia_da_semana",
        startName: "$startStationName",
      },
      total_de_viagens: { $sum: 1 },
    },
  },
  {
    $sort: { total_de_viagens: -1 },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.startName",
      total: "$total_de_viagens",
    },
  },
  {
    $limit: 1,
  },
]);
