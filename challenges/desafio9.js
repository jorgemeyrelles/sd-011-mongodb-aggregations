db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $exists: true,
        $ne: "",
      },
    },
  },
  {
    $addFields: { year: { $toInt: "$birthYear" } },
  },
  {
    $group: {
      _id: null,
      greatest_year: { $max: "$year" },
      smallest_year: { $min: "$year" },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: "$greatest_year",
      menorAnoNascimento: "$smallest_year",
    },
  },
]);
