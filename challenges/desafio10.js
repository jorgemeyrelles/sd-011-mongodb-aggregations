const miliseconds = 60 * 60 * 1000;
db.trips.aggregate([
  {
    $addFields: {
      times: {
        $abs: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            miliseconds,
          ],
        },
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$times" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
