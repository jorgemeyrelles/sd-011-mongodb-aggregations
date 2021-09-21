use("aggregations");

db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    duracaoMedia: {
      $avg: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  } },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 60 * 60 * 1000] }, 2] },
      _id: 0,
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
