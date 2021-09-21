db.air_routes.aggregate([
  {
    $match: { airplane: { $regex: { $in: ["747", "380"] } } },
  },
  {
    $project: { _id: "$airplane" },
  },
]);
