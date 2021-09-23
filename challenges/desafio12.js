db.trips.aggregate([
  {
    $addFields: {
      dayOfWeek: { $dayOfWeek: "$startTime" },
    },
  },
  {
    //
    $group: {
      _id: [
        { nomeEstacao: "$startStationName" },
        { diaDaSemana: "$dayOfWeek" },
      ], // KaioPHS
      total: {
        $sum: 1,
      },
    },
  },
  {
    $unwind: "$_id",
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeEstacao",
      total: "$total",
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
]);
