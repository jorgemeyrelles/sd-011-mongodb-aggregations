db.trips.aggregate([
  {
    $addFields: {
      viagens: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60 * 1000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      media: { $avg: "$viagens" },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$media" },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
