const minutes = 60 * 1000;

db.trips.aggregate([
  {
    $addFields: {
      dataFormatada: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } },
    },
  },
  {
    $match: { dataFormatada: /2016-03-10/ },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: {
        $avg: { $subtract: ["$stopTime", "$startTime"] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMedia", minutes] } },
    },
  },
]);
