const miliseconds = 60 * 1000;
db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11"),
      },
    },
  },
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
      _id: null,
      duracaoMedia: { $avg: "$times" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" },
    },
  },
]);
