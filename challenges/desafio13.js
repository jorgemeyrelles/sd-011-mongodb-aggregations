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
    $addFields: {
      milisegundos: 1000 * 60,
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            "$milisegundos",
          ],
        },
      },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: {
        $ceil: "$duracaoMediaEmMinutos",
      },
      _id: 0,
    },
  },
);
