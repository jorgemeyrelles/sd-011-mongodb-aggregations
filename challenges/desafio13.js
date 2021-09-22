db.trips.aggregate([{ $addFields:
  { ano: { $year: "$startTime" },
    mes: { $month: "$startTime" },
    dia: { $dayOfMonth: "$startTime" } } },
{ $match: { ano: 2016, mes: 3, dia: 10 } },
{ $addFields: { duracaoMedia: { $subtract: ["$stopTime", "$startTime"] } } },
{ $addFields: { duracaoMediaMinutos: { $divide: ["$duracaoMedia", 60000] } } },
{ $group: { _id: "$dia", duracaoMediaEmMinutos: { $avg: "$duracaoMediaMinutos" } } },
{ $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" } } }]);
