db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $multiply: [{$subtract: ["$stopTime", "$startTime"]}, 1000, 60, 60],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: 1,
    },
  },
]);
