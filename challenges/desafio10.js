db.trips.aggregate([
  { $group: { _id: "$usertype", duracaoMedia: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] } } } },
  { $project: { _id: 1, duracaoMedia: { $round: ["$duracaoMedia", 2] } } },
  { $sort: { duracaoMedia: 1 } },
]);
