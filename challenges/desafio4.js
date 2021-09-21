db.movies.aggregate([
// Adiciona campo:
  { $addFields: {
    title_split: { $split: ["$title", " "] },
  } },
  // "Filtra" os títulos com o tamanho especificado:
  { $match: {
    title_split: { $size: 1 },
  } },
  { $sort: { title: 1 } },
  // "Retorna":
  { $project: {
    _id: 0, title_split: 1,
  } },
]);

// scripts/evaluate.sh desafioN
