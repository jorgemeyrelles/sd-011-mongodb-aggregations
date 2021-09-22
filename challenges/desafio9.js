db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $exists: true, // filtra os que tem birthYear, e retira os campos vazios.
        $ne: "",
      },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
