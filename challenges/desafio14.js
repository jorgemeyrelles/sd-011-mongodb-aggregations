db.trips.aggregate([
  { $addFields: { time: { $divide: [{ $subtract: ["$stopTime", "$startTime"] },
    60 * 1000] } } },
  { $group: {
    _id: "$bikeid",
    duration: { $avg: "$time" },
  } },
  { $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: { $ceil: "$duration" },
  } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
