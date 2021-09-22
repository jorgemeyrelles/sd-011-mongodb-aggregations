db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $project: { _id: "$airplane" },
  },
]);
