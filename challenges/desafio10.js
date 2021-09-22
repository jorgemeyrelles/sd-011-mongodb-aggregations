db.trips.aggregate([
  {
    $addFields: {
      duracao: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 60 * 1000],
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
    $sort: { duracaoMedia: 1 },
  },
  {
    $project: { tipo: "$_id", duracaoMedia: { $round: ["$duracaoMedia", 2] }, _id: 0 },
  },
]);
