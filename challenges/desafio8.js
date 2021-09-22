db.air_routes.aggregate([
  { $match: {
    airplane: { $in: ["747", "380"] },
  } },
  { $project: { "airline.name": 1, _id: 0 } },
  { $lookup: {
    from: "air_alliances",
    localField: "airline.name",
    foreignField: "airlines",
    as: "group",
  } },
  { $group: {
    _id: "$group.name",
    totalRotas: { $sum: 1 },
  } },
  { $match: {
    _id: { $size: 1 },
  } },
  { $sort: {
    totalRotas: -1,
  } },
  { $limit: 1 },
  { $unwind: "$_id" },
]);
