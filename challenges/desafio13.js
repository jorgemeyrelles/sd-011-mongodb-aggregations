db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: new Date("2016-03-10T00:00:00Z"),
        $lt: new Date("2016-03-11T00:00:00Z"),
      },
    },
  },
  {
    $addFields: {
      difTime: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: "$difTime",
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: "$duracaoMediaEmMinutos",
      },
    },
  },
]);
