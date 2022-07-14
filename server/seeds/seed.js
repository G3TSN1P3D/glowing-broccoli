const db = require('../config/connection');
const { User } = require('../models');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});



// "first_name":
// "last_name":
// "email":
// "password":
// "players": [
//     {
//         "first_name":
//         "last_name":
//         "number":
//         "position": [],
//         "handedness":
//         "stats": [
//             {
//                 "inning":
//                 "order":
//                 "balls":
//                 "strikes":
//                 "result":
//                 "rbi":
//                 "run_scored":
//                 "stolen_base":
//             }
//         ]
//     }
// ]
// }