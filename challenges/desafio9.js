db.trips.aggregate([
  { $match: { birthYear: { $ne: "" } } },
  { $group: {
    _id: null,
    maiorAno: { $max: { $toInt: "$birthYear" } },
    menorAno: { $min: { $toInt: "$birthYear" } },
  },
  },
  {
    $project: {
      maiorAnoNascimento: "$maiorAno",
      menorAnoNascimento: "$menorAno",
      _id: 0,
    },
  },
]);
