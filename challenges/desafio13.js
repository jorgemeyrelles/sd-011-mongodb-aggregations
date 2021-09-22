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
      duracao: {
        $abs: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            60 * 1000,
          ],
        },
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" },
      _id: 0,
    },
  },
]);
