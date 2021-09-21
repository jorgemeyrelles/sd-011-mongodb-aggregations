db.trips.aggregate([
  {
    $match: {
      startTime:
        { $gte: ISODate("2016-03-10T00:00:00Z"),
          $lte: ISODate("2016-03-10T23:59:59Z") },
    },
  },
  {
    $addFields: {
      dateID: 1,
    },
  },
  {
    $group: {
      _id: "$dateID",
      duracao: {
        $avg:
          {
            $divide: [
              { $subtract: ["$stopTime", "$startTime"] },
              60000,
            ],
          },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos:
        { $ceil: "$duracao" },
    },
  },
]);
