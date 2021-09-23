db.trips.aggregate([
  {
    $match:
    {
      startTime: {
        $gte: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11"),
      },
    },
  },
  {
    $group:
    {
      _id: null,
      duracaoMediaEmMinutos:
      {
        $avg: { $abs: { $subtract: [{ $minute: "$startTime" }, { $minute: "$stopTime" }] } },
      },
    },
  },
  {
    $project:
    {
      _id: 0,
      duracaoMediaEmMinutos:
      {
        $ceil: "$duracaoMediaEmMinutos",
      },
    },
  },
]);
