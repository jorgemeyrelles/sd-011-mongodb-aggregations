db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: true, $not: { $eq: "" } },
    },
  },
  {
    $addFields: {
      birthYearInt: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$birthYearInt" },
      menorAnoNascimento: { $min: "$birthYearInt" },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
