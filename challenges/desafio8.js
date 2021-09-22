db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup:
    {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "foreign_field",
    },
  },
  {
    $unwind: "$foreign_field",
  },
  {
    $match:
    {
      "foreign_field.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group:
    {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  // sourcehttps://github.com/tryber/sd-011-mongodb-aggregations/blob/richard-freitas-mongodb-aggregations/challenges/desafio8.js
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);
