// use("aggregations");

db.trips.aggregate( 
  { $match: { birthYear: { $exists: true, $ne: "" } } },
  { $addFields: { birthYear: { $toInt:  "$birthYear" } } },
  { $group: {
    maiorAnoNascimento: { $max: "$birthYear" },
    menorAnoNascimento: { $min: "$birthYear" },
    _id: "Paz na vida"
  } },
  { $project: { 
      maiorAnoNascimento: "$maiorAnoNascimento",
      menorAnoNascimento: "$menorAnoNascimento",
      _id: 0,
    },
  }
);
