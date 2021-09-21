db.trips.aggregate(
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00.0Z"),
        $lte: ISODate("2016-03-11T00:00:00.0Z"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMediaEmMinutos", 60 * 1000] } },
      _id: 0,
    },
  },
);

// dateString: {
//     $dateToString: {
//         format: "%y-%m-%d",
//         date: "$startTime"
//     }
// }
