db.trips.aggregate([
  { $match: { startTime: { $gte: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") } } },
  { $addFields: { duracaoMedia: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] } } },
  { $group: { _id: null, duracaoMedia: { $avg: "$duracaoMedia" } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" } } },
]);
