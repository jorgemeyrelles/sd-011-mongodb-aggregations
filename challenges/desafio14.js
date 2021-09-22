db.trips.aggregate(
  {
    $addFields: {
      timeDiff: {
        $subtract: [
          "$stopTime",
          "$startTime",
        ],
      },
      minToMs: 60 * 1000,
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: {
          $divide: [
            "$timeDiff",
            "$minToMs",
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: "$duracaoMedia",
      },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $limit: 5,
  },
);
