db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    let: { airlines: "$airlines" },
    pipeline: [
      { $match: { $expr: { $eq: ["$$airlines", "$airline.name"] }, airplane: { $in: ["747", "380"] } } }],
    as: "routes",
  } },
  { $addFields: { n: { $size: "$routes" } } },
  { $match: { n: { $ne: 0 } } },
  { $unwind: "$routes" },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
