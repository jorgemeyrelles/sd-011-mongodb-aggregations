// db.air_routes.aggregate([
//   { $match: { airplane: { $in: ["747", "380"] } } },
//   {
//     $lookup: {
//       from: "air_alliances",
//       localField: "airline.name",
//       foreignField: "airlines",
//       as: "rotas",
//     },
//   },
//   {
//     $unwind: "$rotas",
//   }
//   ]);
  