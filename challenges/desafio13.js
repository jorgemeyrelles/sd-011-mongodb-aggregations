db.trips.aggregate([
  {
    $match: {
      startTime: { $gt: ISODate("2016-03-10T00:00:00Z"), $lt: ISODate("2016-03-10T24:00:00Z") },
    },
  },
  {
    $group: {
      _id: "",
      duracaoMediaEmMinutos: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] } },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);
