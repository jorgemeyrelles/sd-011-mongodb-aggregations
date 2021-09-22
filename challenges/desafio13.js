// $dateToString encontrado em https://docs.mongodb.com/manual/reference/operator/aggregation/dateToString/
db.trips.aggregate([
  { $addFields: { formatDate: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } } } },
  { $match: {
    formatDate: { $in: ["2016-03-10"] },
  } },
  { $group: {
    _id: null,
    duracao: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } } },
  },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$duracao" },
  } },
]);
