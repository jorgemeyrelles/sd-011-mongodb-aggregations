db.trips.aggregate([
  {
    $match: {
      birthYear: { $not: { $eq: "" } } }
  },
  {
    $addFields: {
      birthYearConv: {
        $toInt: "$birthYear"} 
    }
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$birthYearConv" },
      menorAnoNascimento: { $min: "$birthYearConv" }
    }
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1
    }
  }
])