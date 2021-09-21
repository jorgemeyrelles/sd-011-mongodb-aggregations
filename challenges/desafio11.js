db.trips.aggregate([
  {
    $addFields: {
      tripStart: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$tripStart",
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      diaDaSemana: "$_id",
      total: "$total",
      _id: 0,
    },
  },
  {
    $sort: { total: -1 },
  },
  { $limit: 1 },
]);
