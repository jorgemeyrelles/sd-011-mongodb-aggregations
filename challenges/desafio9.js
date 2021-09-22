/* Desafio 9
A partir da coleção trips, determine o menor e o maior ano de nascimento.
Guarde essa informação, você precisará dela mais tarde.

Não considere documentos com valores vazios ("") e em que o campo não existe!

Para este desafio utilize o operador $toInt para converter de string para valor inteiro. */
db.trips.aggregate([
  //https://stackoverflow.com/questions/4057196/how-do-you-query-for-is-not-null-in-mongo
  { $match: { birthYear: { $nin: [""] } } },
  { $addFields: { intBirth: { $toInt: "$birthYear" } } },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$intBirth" },
      menorAnoNascimento: { $min: "$intBirth" },
    },
  },
  { $project: { _id: 0, maiorAnoNascimento: 1, menorAnoNascimento: 1 } },
]);
