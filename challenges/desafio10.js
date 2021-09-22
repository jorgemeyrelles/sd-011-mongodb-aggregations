db.trips.aggregate([{ $group:
  { _id: "$usertype",
    duracaoMediaMs: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } },
{ $addFields: { tipo: "$_id",
  duracaoMedia: { $round: [{ $divide: ["$duracaoMediaMs", 3600000] }, 2] } } },
{ $project: { tipo: 1, duracaoMedia: 1, _id: 0 } }]);
