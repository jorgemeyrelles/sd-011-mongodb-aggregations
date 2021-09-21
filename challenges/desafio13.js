db.trips.aggregate([
  { $match: {
    startTime: { $gte: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") },
  } },
  { $group: {
    _id: null,
    duracaoAvg: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
  } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoAvg", 60 * 1000] } } } },
]);
