db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00Z"),
      },
    },
  },
  {
    $set: {
      duracaoMediaEmMinutos: {
        $divide: [
          {
            $subtract: ["$stopTime", "$startTime"],
          },
          60000,
        ],
      },
    },
  },

  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: "$duracaoMediaEmMinutos",
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $round: ["$duracaoMediaEmMinutos", 0] },
    },
  },
]);
