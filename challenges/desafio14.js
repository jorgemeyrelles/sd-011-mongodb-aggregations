db.trips.aggregate(
  {
    $addFields: {
      tempoMedio: { $divide: [
        { $subtract: ["$stopTime", "$startTime"] },
        60 * 1000,
      ] },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: "$tempoMedio",
      },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
);

// fix: ajuda do julio filizzola
