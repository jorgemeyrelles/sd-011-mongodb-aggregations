// https://docs.mongodb.com/manual/reference/operator/aggregation/dayOfWeek/
db.trips.aggregate([
  { $addFields: { weekDayStartTrip: { $dayOfWeek: "$startTime" } } },
  { $group: {
    _id: "$weekDayStartTrip",
    total: { $sum: 1 },
  } },
  { $project: {
    _id: 0,
    diaDaSemana: "$_id",
    total: "$total",
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
