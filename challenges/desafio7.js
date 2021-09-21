use("aggregations");
db.movies.aggregate([
  {
    $match: {
      awards: { $exists: true, $regex: /won/ },
    },
  },
]);
