db.trips.aggregate([
  {
    $match: {
      $and: [
        {
          birthYear: { $exists: true },
        },
        {
          birthYear: { $ne: "" },
        },
      ],
    },
  },
  {
    $project: {
      _id: 0,
      ok: {
        $toInt: "$birthYear",
      },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: {
        $max: "$ok",
      },
      menorAnoNascimento: {
        $min: "$ok",
      },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
