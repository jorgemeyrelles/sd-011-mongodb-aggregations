db.trips.aggregate([
  {
    $match: { birthYear: { $exists: true } },
  },
  {
    $match: { birthYear: { $ne: " " } },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$birthYear" },
      menorAnoNascimento: { $min: "$birthYear" },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: { $toInt: "$maiorAnoNascimento" },
      menorAnoNascimento: { $toInt: "$menorAnoNascimento" },
    },
  },
]);
