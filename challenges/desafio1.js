db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { genres: { $ne: ["Crime", "Horror"] } } },
  { $match: { $or: [{ rated: { $eq: "G" } }, { rated: { $eq: "PG" } }] } },
  { $match: { languages: { $all: ["English", "Spanish"] } } }]);
