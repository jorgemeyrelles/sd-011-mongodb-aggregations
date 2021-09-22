db.trips.aggregate([
  { $project: {
    usertype: 1,
    time: {
      $subtract: ["$stopTime", "$startTime"],
    },
  } },
  { $project: {
    usertype: 1,
    time: { $divide: ["$time", 3600000] },
  } },
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: "$time" },
  } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$duracaoMedia", 2] },
  } },
]);
