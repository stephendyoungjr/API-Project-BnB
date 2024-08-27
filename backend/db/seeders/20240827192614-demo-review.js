'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoReviews = [
  {
    "userId": 5,
    "spotId": 1,
    "review": "The Enchanted Cottage is a cozy little hideaway deep within Everwood. The ancient trees seem to whisper old secrets, and the ambiance is truly magical. However, the proximity to the forest does make it a bit damp and chilly at times. The cottage is charming but could benefit from a bit more warmth and comfort. Three stars for the enchanting setting, but the coldness takes away from the experience.",
    "stars": 3,
  },
  {
    "userId": 3,
    "spotId": 1,
    "review": "I was drawn to the Enchanted Cottage by its mysterious aura. The moss-covered roof and glowing flora created a mood unlike any other. It’s a perfect retreat for those looking to connect with nature's magic. That said, it’s not for everyone—especially if you prefer modern comforts. A solid four stars for the atmosphere and unique experience.",
    "stars": 4,
  },
  {
    "userId": 2,
    "spotId": 7,
    "review": "The moment I stepped into Frostfire Keep, I was awestruck by the breathtaking views of the Glacier Heights. The keep itself exudes a cold, commanding presence, perfect for those who find solace in the harsh beauty of the frozen tundra. The suite was well-furnished and warm, a stark contrast to the icy world outside. My only gripe is the constant howling of the wind, which can be unsettling at night. Four stars for an unforgettable stay.",
    "stars": 4,
  },
  {
    "userId": 3,
    "spotId": 7,
    "review": "Frostfire Keep is an adventurer's dream. The towering walls and icy battlements seem to whisper of past battles and long-lost secrets. The private quarters are comfortable, with a roaring fire to fend off the chill. The views of the Glacier Heights are nothing short of spectacular. I spent hours on the balcony, taking in the majestic landscape. Five stars for the sheer majesty and rugged charm of the place.",
    "stars": 5,
  },
  {
    "userId": 3,
    "spotId": 8,
    "review": "Shadowspire Bastion is a place shrouded in mystery. The eternal twilight that surrounds it creates an otherworldly ambiance. The suite itself is luxurious, with intricate carvings and rich fabrics that speak of Nyxara's dark elegance. The private balcony offers views of the endless twilight, a sight that is both eerie and captivating. Five stars for an experience like no other. Perfect for those who seek the unknown.",
    "stars": 5,
  },
  {
    "userId": 2,
    "spotId": 3,
    "review": "Drakenspire Fortress is an incredible place to study and reflect. The library is vast, with ancient tomes that I could spend a lifetime reading. The fortress’s location atop Obsidian Peak offers stunning views of the Ashen Wastes. The market is just a short ride away, making it convenient for supplies. Five stars for the awe-inspiring setting and the wealth of knowledge contained within these walls.",
    "stars": 5,
  },
  {
    "userId": 5,
    "spotId": 4,
    "review": "Cinderhold Encampment is as rugged as the land it resides in. The accommodations are simple and functional, which suits the harsh environment of Emberfall. It's not luxurious by any means, but it does the job for those who seek the thrill of adventure in the Scorched Plains. Two stars for the austere setup, but it has its own gritty charm.",
    "stars": 2,
  },
  {
    "userId": 4,
    "spotId": 5,
    "review": "Silverstream Sanctuary is nothing short of magical. The serene surroundings and the sound of cascading waterfalls create an atmosphere of peace and tranquility. The lodge itself is beautifully decorated, blending seamlessly with the natural beauty of Sylvara. It's a perfect escape for those seeking to disconnect from the world and reconnect with nature. Five stars for the most peaceful retreat I've ever visited.",
    "stars": 5,
  },
  {
    "userId": 7,
    "spotId": 8,
    "review": "Shadowspire Bastion offers a hauntingly beautiful experience. The endless twilight and the luxurious accommodations make it a perfect getaway for those who appreciate the darker side of beauty. The private balcony provided an ethereal view of the twilight landscape, making my stay truly unforgettable. The marble bathroom, complete with a soaking tub, added an extra layer of luxury. Five stars for a mesmerizing and opulent retreat.",
    "stars": 5
  },
  {
    userId: 10,
    spotId: 8,
    review: "Staying at Shadowspire Bastion was like stepping into another world. The decor was opulent, the ambiance mysterious, and the views from the private balcony were awe-inspiring. While I appreciated the grandeur, the atmosphere was a bit too intense for my taste. It's a place that leaves a lasting impression, but I wouldn't call it relaxing. Four stars for an unforgettable, if somewhat overwhelming, experience.",
    stars: 4
  },
  {
    userId: 2,
    spotId: 6,
    review: "Wolfsbane Manor in Nightfall is a place steeped in mystery and old magic. The manor itself is dark and brooding, with an aura that suggests hidden secrets and ancient powers. The forest surrounding it is dense and alive with the whispers of spirits long forgotten. It’s a place that inspires contemplation and introspection. Five stars for a haunting and evocative stay.",
    stars: 5
  },
  {
    userId: 9,
    spotId: 6,
    review: "Wolfsbane Manor left me feeling uneasy. The forest is undeniably beautiful, but the atmosphere of the manor is dark and foreboding. The rustic charm failed to impress me, and I found the overall experience to be unsettling. Two stars for the effort, but it wasn’t to my liking.",
    stars: 2
  },
  {
    userId: 6,
    spotId: 6,
    review: "My stay at Wolfsbane Manor was like a journey back in time. The ancient magic that lingers in the air brought back memories of old adventures. The manor is beautifully maintained, and its simplicity is a welcome respite from the complexities of modern life. The surrounding forest is a perfect place for quiet reflection. Four stars for a nostalgic and peaceful retreat.",
    stars: 4
  },
  {
    userId: 7,
    spotId: 5,
    review: "Silverstream Sanctuary is a hidden gem in Sylvara. The lodge is elegantly decorated, and the surroundings are tranquil and serene. The peaceful atmosphere makes it an ideal spot for relaxation, though there's not much to do beyond enjoying the natural beauty. Four stars for a lovely, if somewhat uneventful, stay.",
    stars: 4
  },
  {
    userId: 1,
    spotId: 5,
    review: "Zog tarug draug! Korgoth krag zuga Silverstream Sanctuary! Drom ak hul mog ka druuk gol og taran. Grash'nar dru og mog blar durrok krag. Zogmok or tar ra gol, dromm huk krash kar! Five stars for this impressive sanctuary.",
    stars: 5
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(demoReviews, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
