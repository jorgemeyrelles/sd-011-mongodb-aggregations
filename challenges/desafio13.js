db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: ISODate("2016-03-10") },
    },
  },
  {
    $addFields: {
      duracaoM: {
        $abs: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] },
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: { $avg: "$duracaoM" },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $round: "$duracaoMedia" },
      _id: 0,
    },
  },
]);
