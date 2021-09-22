db.trips.aggregate([
  { $addFields: { weekDayStartTrip: { $dayOfWeek: "$startTime" } } },
  { $group: {
    _id: {
      diaDaSemana: "$weekDayStartTrip",
      nomeEstacao: "$startStationName",
    },
    total: { $sum: 1 },
  } },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id.nomeEstacao",
    total: "$total",
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
