db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: true, $ne: "" },
    },
  },
  {
    $addFields: {
      ano: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$ano" },
      menorAnoNascimento: { $min: "$ano" },
    },
  },
  {
    $project: { maiorAnoNascimento: 1, menorAnoNascimento: 1, _id: 0 },
  },
]);
