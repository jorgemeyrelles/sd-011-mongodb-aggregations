const DATETIME_TO_MINUTES = 1000 * 60;

db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: ISODate("2016-03-10T00:00:00Z"), $lte: ISODate("2016-03-10T23:59:59Z") },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, DATETIME_TO_MINUTES] },
      },
    },
  },
  { $project: { _id: false, duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" } } },
]);
