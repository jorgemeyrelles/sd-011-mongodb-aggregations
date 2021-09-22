db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $divide: [
            {
              $subtract: ["$stopTime", "$startTime"],
            },
            3600000,
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: ["$duracaoMedia", 2],
      },
    },
  },
]);

// db.trips.aggregate([
//   {
//     $group: {
//       _id: "$usertype",
//       duracaoMedia: {
//         $avg: {
//           $subtract: [
//             {
//               $sum: [
//                 { "$multiply": [{ "$hour": "$stopTime" }, 3600] },
//                 { "$multiply": [{ "$minute": "$stopTime" }, 60] },
//                 { "$multiply": [{ "$second": "$stopTime" }, 1] },
//               ]
//             },
//             {
//               $sum: [
//                 { "$multiply": [{ "$hour": "$startTime" }, 3600] },
//                 { "$multiply": [{ "$minute": "$startTime" }, 60] },
//                 { "$multiply": [{ "$second": "$startTime" }, 1] },
//               ]
//             }
//           ]
//         }
//       }
//     },
//     },
//   {
//     $project: {
//       _id: 0,
//       tipo: "$_id",
//       duracaoMedia: 1,
//     }
//   },
// ]);
