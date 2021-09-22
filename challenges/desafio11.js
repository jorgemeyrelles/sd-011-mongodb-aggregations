db.trips.aggregate([{ $addFields: { diaSemana: { $dayOfWeek: "$startTime" } } },
  { $group: { _id: "$diaSemana", total: { $sum: 1 } } },
  { $addFields: { diaDaSemana: "$_id" } }, { $sort: { total: -1 } },
  { $project: { _id: 0, diaDaSemana: 1, total: "$total" } },
  { $limit: 1 }]);
