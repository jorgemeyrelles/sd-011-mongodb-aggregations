db.trips.aggregate([
  {
    $addFields: {
      dayWeek: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $match: {
      dayWeek: 5,
    },
  },
  {
    $group: {
      _id: "$startStationName",
      viagens: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$viagens",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
