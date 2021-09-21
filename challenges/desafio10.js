db.trips.aggregate([
  {
    $group:
    {
      _id: "$usertype",
      duracao_media:
      {
        $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 60 * 1000] },
      },
    },
  },
  { $project: { _id: 0, tipo: "$_id", duracaoMedia: { $round: ["$duracao_media", 2] } } },
]);
