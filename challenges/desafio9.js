db.trips.aggregate([
  {
    $match: { birthYear: { $exists: true, $ne: "" } },
  },
  {
    $addFields: {
      newBirthYear: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$newBirthYear" },
      menorAnoNascimento: { $min: "$newBirthYear" },
    },
  },
  {
    $project: {
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
      _id: 0,
    },
  },
]);
