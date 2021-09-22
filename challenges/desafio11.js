db.trips.aggregate([
  { $group: {
    _id: { $dayOfWeek: "$startTime" },
    totalPorSemana: { $count: {} },
  } },
  { $sort: { totalPorSemana: -1 } },
  { $limit: 1 },
  { $project: {
    _id: 0,
    diaDaSemana: "$_id",
    total: "$totalPorSemana",
  } },
]);
