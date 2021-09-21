db.trips.aggregate([
  { $match: { birthYear: { $exists: true, $nin: [""] } } },
  { $group: { maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
    menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
    _id: 0 } },
  { $project: { maiorAnoNascimento: 1, menorAnoNascimento: 1, _id: 0 } },
]);
