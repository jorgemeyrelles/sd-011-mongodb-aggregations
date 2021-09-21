db.trips.aggregate([
  {
    $group: {
      _id: {
        $dayOfWeek: "$startTime",
      },
      day_count: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      day_count: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$day_count",
    },
  },
]);
