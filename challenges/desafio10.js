db.trips.aggregate([
  {
    $addFields: { hour: 60 * 60 * 1000 },
  },
  {
    $group:
    {
      _id: "$usertype",
      duracaoMedia: {
        $avg:
        {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            "$hour",
          ],
        },
      },
    },
  },
  {
    $project:
    {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
