db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracao: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: [{ $divide: ["$duracao", 1000] }, 3600] }, 2] },
    },
  },
]);
