import Generator from "./generator.mjs";
import { storeDirectory } from "./upload.mjs";

const initial = async () => {
  var _thisIndex = 0;
  const _maxSupply = 10;
  while (_thisIndex < _maxSupply) {
    try {
      console.log("Generating NFT " + _thisIndex);
      await Generator.build(_thisIndex, () => {
        _thisIndex++;
      });
    } catch (e) {
      console.error("Error while generating NFT " + _thisIndex);
      console.log(e);
      _thisIndex = _maxSupply + 1;
    }
  }
  console.log("upload metadata");
  const result = await storeDirectory("./Output/metadata");
  console.log("metadata is ", result);
};

// Don't forget to actually call the main function!
// We can't `await` things at the top level, so this adds
// a .catch() to grab any errors and print them to the console.
initial().catch((err) => {
  console.error(err);
  process.exit(1);
});
