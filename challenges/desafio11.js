db.trips.aggregate([
  {
    $addFields: {
      weekDay: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$weekDay",
      total_de_viagens: { $sum: 1 },
    },
  },
  {
    $sort: {
      total_de_viagens: -1,
    },
  },
  { $limit: 1 },
  {
    $project: {
      diaDaSemana: "$_id",
      total: "$total_de_viagens",
      _id: 0,
    },
  },
]);
