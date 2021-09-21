// use("aggregations");
db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /(win|won)\s\d+\s(oscar)/i },
      // "imdb.rating": { $ne: "" },
      // "imdb.rating": { $ne: "", $gt: 7 },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevPop: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: { $round: ["$maior_rating", 1] },
      menor_rating: { $round: ["$menor_rating", 1] },
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);
