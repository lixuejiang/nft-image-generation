import Jimp from "jimp";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Traits from "./traits.mjs";
import { storeImage } from "./upload.mjs";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const build = async (index, onComplete) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const _path = __dirname;
  var _traits = [];

  const background = Traits.getBackground();
  const backgroundJimp = await Jimp.read(
    _path + "/Traits/Background/Background_" + background + ".png"
  );
  _traits.push({
    trait_type: "Background",
    value: background,
  });

  var _composedImage = backgroundJimp;

  const bodyAndHead = Traits.getBodyAndHead();
  const bodyJimp = await Jimp.read(
    _path + "/Traits/Body/Body_" + bodyAndHead + ".png"
  );
  _traits.push({
    trait_type: "Body",
    value: bodyAndHead,
  });

  _composedImage.blit(bodyJimp, 0, 0);

  const outfit = Traits.getOutfit();
  const outfitJimp = await Jimp.read(
    _path + "/Traits/Outfit/Outfit_" + outfit + ".png"
  );
  _traits.push({
    trait_type: "Outfit",
    value: outfit,
  });

  _composedImage.blit(outfitJimp, 0, 0);

  const headJimp = await Jimp.read(
    _path + "/Traits/Head/Head_" + bodyAndHead + ".png"
  );
  _traits.push({
    trait_type: "Head",
    value: bodyAndHead,
  });

  _composedImage.blit(headJimp, 0, 0);

  const nose = Traits.getNose();
  const noseJimp = await Jimp.read(
    _path + "/Traits/Nose/Nose_" + nose + ".png"
  );
  _traits.push({
    trait_type: "Nose",
    value: nose,
  });

  _composedImage.blit(noseJimp, 0, 0);

  const mouth = Traits.getMouth();
  const mouthJimp = await Jimp.read(
    _path + "/Traits/Mouth/Mouth_" + mouth + ".png"
  );
  _traits.push({
    trait_type: "Mouth",
    value: mouth,
  });

  _composedImage.blit(mouthJimp, 0, 0);

  const eyes = Traits.getEyes();
  const eyesJimp = await Jimp.read(
    _path + "/Traits/Eyes/Eyes_" + eyes + ".png"
  );
  _traits.push({
    trait_type: "Eyes",
    value: eyes,
  });

  _composedImage.blit(eyesJimp, 0, 0);

  const sunglasses = Traits.getSunglasses();
  const sunglassesJimp = await Jimp.read(
    _path + "/Traits/Sunglasses/Sunglasses_" + sunglasses + ".png"
  );
  _traits.push({
    trait_type: "Sunglasses",
    value: sunglasses,
  });

  _composedImage.blit(sunglassesJimp, 0, 0);

  const headwear = Traits.getHeadwear();
  const headwearJimp = await Jimp.read(
    _path + "/Traits/Headwear/Headwear_" + headwear + ".png"
  );
  _traits.push({
    trait_type: "Headwear",
    value: headwear,
  });

  _composedImage.blit(headwearJimp, 0, 0);

  await _composedImage.write("Output/images/" + index + ".png");
  await sleep(20); //We give some time for the image to be actually saved in our files
  const IpfsHash = await storeImage(_path + "/Output/images/" + index + ".png");

  await fs.writeFileSync(
    "Output/metadata/" + index,
    JSON.stringify({
      name: "My NFT #" + index,
      traits: _traits,
      image: "https://ipfs.io/ipfs/" + IpfsHash,
    })
  );

  onComplete();
};

export default {
  build,
};
