db.trips.aggregate([
  {
    $addFields: {
      duracao: {
        $divide: [
          {
            $subtract: [
              "$stopTime", "$startTime",
            ],
          }, 60000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracao_media: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracao_media" },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $limit: 5,
  },
]).pretty();
