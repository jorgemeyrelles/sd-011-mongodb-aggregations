db.trips.aggregate([
  {
    $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } },
  },
  { $match: { diaDaSemana: 5 } },
  {
    $group: {
      _id: "$startStationName",
      num: { $sum: 1 },
    },
  },
  { $sort: { num: -1 } },
  {
    $project: {
      nomeEstacao: "$_id",
      total: "$num",
      _id: 0,
    },
  },
  { $limit: 1 },
]);
