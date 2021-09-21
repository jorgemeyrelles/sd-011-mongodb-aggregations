db.trips.aggregate([
  {
    $group: {
      _id: {
        diaInicial: { $dayOfWeek: "$startTime" },
        stationName: "$startStationName",
      },

      totalTrips: { $sum: 1 },
    },
  },
  {
    $project: { _id: 0, nomeEstacao: "$_id.stationName", total: "$totalTrips" },
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
