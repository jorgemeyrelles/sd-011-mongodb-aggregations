// busca por filme em inglês
db.movies.aggregate([
  {
    $match: {
      languages: { $all: ["English"] },
    },
  },
  {
    $project:
    {
      _id: 0,
      languages: 1,
    },
  },
]);

// busca pelo nome das pessoas atrizes
db.movies.aggregate([
  {
    $match: {
      languages: { $all: ["English"] },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $project:
    {
      _id: 0,
      cast: 1,
    },
  },
]);

// busca pela quantidade de filmes com participação
db.movies.aggregate([
  {
    $match: {
      languages: { $all: ["English"] },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group:
    {
      _id: "$cast",
      jobs: { $sum: 1 },
    },
  },
  {
    $project:
    {
      jobs: 1,
    },
  },
]);

// busca pela média do imdb desses filmes arredondada para uma casa decimal
db.movies.aggregate([
  {
    $match: {
      languages: { $all: ["English"] },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group:
    {
      _id: "$cast",
      jobs: { $sum: 1 },
      
    },
  },
  {
    $project:
    {
      jobs: 1,
    },
  },
]);