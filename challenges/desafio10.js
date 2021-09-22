db.trips.aggregate([

  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] },
      },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
]);

// https://docs.mongodb.com/manual/reference/operator/aggregation/group/#accumulator-operator.
