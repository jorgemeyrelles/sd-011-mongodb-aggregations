db.trips.aggregate([
  { $project: {
    dayOfWeek: { $dayOfWeek: "$startTime" },
  } },
  { $group: {
    _id: "$dayOfWeek",
    total: { $sum: 1 },
  } },
  { $project: {
    diaDaSemana: "$_id",
    total: 1,
    _id: 0,
  } },
  { $sort: {
    total: -1,
  } },
  { $limit: 1 },
  { $project: {
    diaDaSemana: "$diaDaSemana",
    total: "$total",
  } },
]);
