db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      total: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            1000 * 60 * 60,
          ],
        },
      },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$total", 2] },
      _id: 0,
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
