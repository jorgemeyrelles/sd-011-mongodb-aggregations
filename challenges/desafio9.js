db.trips.aggregate([
  { $match: { birthYear: { $exists: true, $ne: "" } } },
  { $addFields: { convertedBirth: { $toInt: "$birthYear" } } },
  { $group: { _id: null, maiorAnoNascimento: { $max: "$convertedBirth" }, menorAnoNascimento: { $min: "$convertedBirth" } } },
  { $project: { _id: 0 } },
]);
