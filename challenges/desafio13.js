db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00.000Z"),
        $lte: ISODate("2016-03-10T23:59:59.999Z"),
      },
    },
  },
  {
    $addFields: {
      duracaoMedia: {
        $abs: {
          $subtract: [
            "$startTime",
            "$stopTime",
          ],
        },
      },
    },
  },
  {
    $group: {
      _id: null,
      ducaraoMedia: {
        $avg: "$duracaoMedia",
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: {
          $divide: ["$ducaraoMedia", 60 * 1000],
        },
      },
    },
  },
]);
