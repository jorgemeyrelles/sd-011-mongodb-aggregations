db.trips.aggregate([
{ $match: { birthYear: { $ne: "" } } },
{ $group: {
	_id: "$usertype",
	teste: { $subtract: ["$stopTime", "$startTime"]},
} },
// { $project: {
// 	_id: 0,
// 	// tipo: "$usertype",
// 	teste: 1,
// } },
]);
