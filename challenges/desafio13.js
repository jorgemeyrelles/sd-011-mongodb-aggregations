db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00Z"),
        $lte: ISODate("2016-03-10T23:59:59Z"),
      },
    },
  },
  {
    $addFields: {
      time: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000],
      },
    },
  },
  {
    $group: {
      _id: null,
      avgTime: { $avg: "$time" },
    },
  },
  {
    $project: { duracaoMediaEmMinutos: { $ceil: "$avgTime" }, _id: 0 },
  },
]);
