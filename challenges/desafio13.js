db.trips.aggregate([
  { $match: { $expr: { $eq: [{ $dateToString: { format: "%Y-%m-%d", date: "$startTime" } }, "2016-03-10"] } } },
  { $group: { _id: null, duracao: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracao", 60000] } } } },
]);
