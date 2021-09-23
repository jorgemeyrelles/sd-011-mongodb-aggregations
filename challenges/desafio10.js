db.trips.aggregate([
  {
    $addFields: {
      // 1 hora = 60 min * 60 seg (descobre segundos) * 1000 = 1 milisegundo
      hoursToMilliseconds: 60 * 60 * 1000,
      timeSub: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      avgTime: {
        $avg: {
          $divide: ["$timeSub", "$hoursToMilliseconds"],
        },
      },
    },
  },
  {
    $sort: { avgTime: 1 },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$avgTime", 2] },
    },
  },
]);
