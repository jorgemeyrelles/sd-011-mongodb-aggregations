db.trips.aggregate([
  {
    $addFields: {
      duracao: {
        $divide: [
          {
            $subtract: [
              "$stopTime", "$startTime",
            ],
          }, 3600000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duracao" },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
]);
