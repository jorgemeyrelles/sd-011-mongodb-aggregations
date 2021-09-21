const calc = 1000 * 60 * 60;

db.trips.aggregate([
  {
    $addFields: {
      dateDifference: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      dateDifference: { $avg: "$dateDifference" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [{ $divide: ["$dateDifference", calc] }, 2],
      },
    },
  },
]);
