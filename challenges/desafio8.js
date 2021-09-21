db.air_routes.aggregate([
  { $match: { airplane: { $in: ["747", "380"] } } },
]);

{ $group: { _id: "$airline.name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },