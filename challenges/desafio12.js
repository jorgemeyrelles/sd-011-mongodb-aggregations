db.trips.aggregate([
  { $lookup: {
    from: "trips",
    pipeline: [
      { $group: {
        _id: { $dayOfWeek: "$startTime" },
        totalPorSemana: { $count: {} },
      } },
      { $sort: { totalPorSemana: -1 } },
      { $limit: 1 },
      { $project: { _id: 1 } },
    ],
    as: "diaDaSemana",
  } },
  { $unwind: "$diaDaSemana" },
  { $match: { $expr: { $eq: [{ $dayOfWeek: "$startTime" }, "$diaDaSemana._id"] } } },
  { $group: {
    _id: "$startStationName",
    totalDiaEstacao: { $count: {} },
  } },
  { $sort: { totalDiaEstacao: -1 } },
  { $limit: 1 },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id",
    total: "$totalDiaEstacao",
  } },
]);
