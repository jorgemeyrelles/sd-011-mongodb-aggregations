db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11"),
      },
    },
  },
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
      _id: null,
      duracao_media_em_minutos: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracao_media_em_minutos" },
    },
  },
]).pretty();
