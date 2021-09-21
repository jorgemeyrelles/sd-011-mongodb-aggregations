const DATETIME_TO_HOURS = 1000 * 60 * 60;
const DECIMAL_POINTS = 2;

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, DATETIME_TO_HOURS] },
      },
    },
  },
  { $sort: { duracaoMedia: 1 } },
  {
    $project: {
      _id: false,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", DECIMAL_POINTS] },
    },
  },
]);