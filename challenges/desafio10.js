db.trips.aggregate(
  {
    $addFields: {
      timeDiff: {
        $subtract: [
          "$stopTime",
          "$startTime",
        ],
      },
      hourToMs: 60 * 60 * 1000,
    },
  },
  {
    $group: {
      _id: "$usertype",
      time: {
        $avg: {
          $divide: [
            "$timeDiff",
            "$hourToMs",
          ],
        },
      },
    },
  },
  {
    $sort: {
      time: 1,
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: ["$time", 2],
      },
    },
  },
);
