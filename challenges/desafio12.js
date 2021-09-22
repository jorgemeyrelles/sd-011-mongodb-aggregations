db.trips.aggregate([
  { $addFields: {
    diaDaSemana: { $dayOfWeek: "$startTime" } } },
  { $group: {
    _id: { dia: "$diaDaSemana", estacao: "$startStationName" },
    totalDiaDaSemanaEEstacao: { $count: {} },
  } },
  { $sort: { totalDiaDaSemanaEEstacao: -1 } },
  { $limit: 1 },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id.estacao",
    total: "$totalDiaDaSemanaEEstacao",
  } },
]);
