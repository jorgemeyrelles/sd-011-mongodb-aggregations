db.trips.aggregate([
  { $addFields: {
    start: { $dateToString: { format: "%d/%m/%Y", date: "$startTime" } },
  } },
  { $match: {
    start: { $eq: "10/03/2016" },
  } },
  { $group: {
    _id: "$start",
    duracaoMediaEmMinutos: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
  } },
]);
