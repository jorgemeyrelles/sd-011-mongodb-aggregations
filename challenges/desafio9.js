db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: 1, $ne: "" },
    },
  },
  {
    $addFields: {
      convertedBirthYear: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: "",
      maiorAnoNascimento: { $max: "$convertedBirthYear" },
      menorAnoNascimento: { $min: "$convertedBirthYear" },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
