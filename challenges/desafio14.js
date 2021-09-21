db.trips.aggregate([
  { $addFields: { duracao: { $abs: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] } } } },
  { $group: { _id: "$bikeid", duracao: { $avg: "$duracao" } } },
  { $sort: { duracao: -1 } },
  { $limit: 5 },
  { $project: { bikeId: "$_id", duracaoMedia: { $ceil: "$duracao" }, _id: 0 } },
]);
