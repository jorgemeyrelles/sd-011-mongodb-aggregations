// use("aggregations");
db.trips.aggregate([
  {
    $project: {
      _id: 0,
      usertype: 1,
      flightDuration: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 60 * 1000],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$flightDuration" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
]);
