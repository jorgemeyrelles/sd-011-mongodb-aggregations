db.air_routes.aggregate([
  { $match: {
    airplane: { $in: ["747", "380"] },
  } },
  { $lookup:
     {
       from: "air_alliances",
       localField: "airline.name",
       foreignField: "airlines",
       as: "airlines_match",
     } },
  { $unwind: "$airlines_match" },
  { $group: {
    _id: "$airlines_match.name",
    totalRotas: { $sum: 1 },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
