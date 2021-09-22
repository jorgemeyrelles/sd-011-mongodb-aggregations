db.trips.aggregate(
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  { $addFields: { tempo: 60 * 60 * 1000 } },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: {
        $round: [{ $divide: ["$duracaoMedia", "$tempo"] }, 2],
      },
      _id: 0,
    },
  },
);
