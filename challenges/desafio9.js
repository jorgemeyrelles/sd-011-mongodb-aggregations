db.trips.aggregate([
  {
    $match: {
      $and: [
        { birthYear: { $exists: true } },
        { birthYear: { $not: { $eq: "" } } },
      ],
    },
  },
  {
    $group: {
      _id: null,
      maior: { $max: { $toInt: "$birthYear" } },
      menor: { $min: { $toInt: "$birthYear" } },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: "$maior",
      menorAnoNascimento: "$menor",
    },
  },
]);
