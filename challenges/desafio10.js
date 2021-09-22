db.trips.aggregate([
  { $addFields: { hours: 3600000 } },
  { $group: {
    _id: "$usertype",
    duracaoMedia: {
      $avg: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, "$hours"] } },
  } },
  { $sort: { duracaoMedia: 1 } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$duracaoMedia", 2] },
  } },
]);
