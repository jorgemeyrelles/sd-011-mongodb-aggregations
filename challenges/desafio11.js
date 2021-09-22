db.trips.aggregate([
  {
    $group: {
      _id: null,
      diaDaSemana: { $dayOfWeek: "$startTime" },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
