db.trips.aggregate([
  {
    $addFields: {
      total: {
        $divide:[
          {$subtract: [ "$stopTime", "$startTime" ]},
          1000 * 60 * 60
        ]
      }
    }
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMediaInt: { $avg: "$total"}
    }
  },
  {
    $project: {
      usertype: 1,
      duracaoMedia: { $round: ["$duracaoMediaInt", 2]}
    }
  }
]);