db.trips.aggregate([
  {
    $match: { birthYear: { $exists: true, $nin: [""] } },
  },
  {
    $addFields: { year: { $toInt: "$birthYear" } },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$year" },
      menorAnoNascimento: { $min: "$year" },
    },
  },
  {
    $project: { _id: 0 },
  },
]);
