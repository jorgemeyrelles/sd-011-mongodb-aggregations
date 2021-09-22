db.trips.aggregate([{ $addFields:
  { duracao: { $subtract: ["$stopTime", "$startTime"] } } },
{ $addFields: { duracaoMinutos: { $divide: ["$duracao", 60000] } } },
{ $group: { _id: "$bikeid", duracaoMedia: { $avg: "$duracaoMinutos" } } },
{ $project: { _id: 0, bikeId: "$_id", duracaoMedia: { $ceil: "$duracaoMedia" } } },
{ $sort: { duracaoMedia: -1 } },
{ $limit: 5 }]);
