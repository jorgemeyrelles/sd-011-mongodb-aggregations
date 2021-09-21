db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: true, $ne: "" },
    },
  },
  {
    $addFields: {
      year: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$year" },
      menorAnoNascimento: { $min: "$year" },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    },
  },
]);
