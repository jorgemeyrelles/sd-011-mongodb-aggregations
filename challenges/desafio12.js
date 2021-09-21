db.trips.aggregate([
  {
    $project: {
      _id: 0,
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$diaDaSemana",
      _total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$_total",
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
  {
    $lookup: {
      from: "trips",
      as: "stations",
      let: { targetDay: "$diaDaSemana" },
      pipeline: [
        { 
          $match: {
            $expr: { $eq: [{ $dayOfWeek: "$startTime" }, "$$targetDay"] },
          }
        },
        {
          $group: {
            _id: "$startStationName",
            count: { $sum: 1 },
          }
        },
      ],
    },
  },
  {
    $project: {
      stations: 1,
    },
  },
  {
    $unwind: "$stations",
  },
  {
    $project: {
      nomeEstacao: "$stations._id",
      total: "$stations.count",
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
]);
