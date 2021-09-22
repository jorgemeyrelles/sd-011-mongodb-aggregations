db.trips.aggregate(
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  { $addFields: { tempo: 60 * 60 * 1000 } },
  {
    $sort: { duracaoMedia: 1 },
  },
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
