db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00.000Z"),
        $lte: ISODate("2016-03-11T00:59:59.000Z"),
      },
    },
  },
  {
    $addFields: {
      duracaoMediaEmMinutos: {
        $divide: [{
          $subtract: ["$stopTime", "$startTime"] }, 60000],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $sum: "$duracaoMediaEmMinutos",
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $round: "$duracaoMediaEmMinutos" },
    },
  },
]);
