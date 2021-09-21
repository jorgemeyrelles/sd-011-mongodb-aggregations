use("aggregations");
db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: new Date("2016-03-10"), $lt: new Date("2016-03-11") },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $round: { $divide: [{ $divide: ["$duracaoMediaEmMinutos", 1000] }, 60] } },
    },
  },
  {
    $limit: 1,
  },
]);
