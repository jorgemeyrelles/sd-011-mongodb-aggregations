db.movies.aggregate([
  {
    $match: {
      languages: { $in: ["English"] },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $addFields: {
      myRating: {
        $cond: {
          if: { $eq: ["$imdb.rating", ""] },
          then: null,
          else: "$imdb.rating",
        },
      },
    },
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$myRating" },
    },
  },
  {
    $project: {
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
