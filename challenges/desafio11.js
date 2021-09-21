// use("aggregations");
db.trips.aggregate([
  {
    $set: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$diaDaSemana",
      total: { $sum: 1 },
    },
  },
  { $sort: { total: -1 } },
  { $project: { diaDaSemana: "$_id", _id: 0, total: "$total" } },
  { $limit: 1 },
]);
