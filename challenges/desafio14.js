db.trips.aggregate([
  {
    $group:
    {
      _id: "$bikeId",
      duracaoStartTimeMedia:
      {
        $avg: { $minute: "$startTime" },
      },
      duracaoStopTimeMedia:
      {
        $avg: { $minute: "$stopTime" },
      },
    },
  },
]);
