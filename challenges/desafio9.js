db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: true, $ne: "" },
    },
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
      _id: 0,
    },
  },
]);
