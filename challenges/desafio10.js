db.trips.aggregate([
  {
    $addFields: {
      duracao: {
        $abs: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 60 * 1000] },
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
      _id: 0,
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
