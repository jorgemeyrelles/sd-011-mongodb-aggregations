db.trips.aggregate([
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
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00"),
        $lte: ISODate("2016-03-10T23:59:59"),
      },
    },
  },
  {
    $group: {
      _id: null,
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
      duracaoMediaEmMinutos: {
        $ceil: "$duracaoMedia",
      },
    },
  },
]);
