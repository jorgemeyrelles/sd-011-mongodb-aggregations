db.trips.aggregate(
  {
    $group: {
      _id: "$usertype",
      duracaMedia: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaMedia: {
        $round: [{ $divide: ["$duracaMedia", 60 * 60 * 1000] }, 2],
      },
      _id: 0,
    },
  }
);
