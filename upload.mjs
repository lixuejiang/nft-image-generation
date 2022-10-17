// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from "nft.storage";
import mime from "mime";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;

console.log("NFT_STORAGE_KEY", NFT_STORAGE_KEY);

/**
 * Reads an image file from `imagePath` and stores an NFT with the given name and description.
 * @param {string} imagePath the path to an image file
 * @param {string} name a name for the NFT
 * @param {string} description a text description for the NFT
 */
export async function storeNFT(imagePath, name, description) {
  // load the file from disk
  const image = await fileFromPath(imagePath);

  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  // call client.store, passing in the image & metadata
  return nftstorage.stor({
    image,
    name,
    description,
  });
}

/**
 * Reads an image file from `imagePath` and stores an NFT with the given name and description.
 * @param {string} imagePath the path to an image file
 */
export async function storeImage(imagePath) {
  // load the file from disk
  const image = await fileFromPath(imagePath);

  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  // call client.store, passing in the image & metadata
  return nftstorage.storeBlob(image);
}

function walkSync(currentDirPath, callback) {
  // http://nodejs.cn/api/fs.html#fsreaddirsyncpath-options
  // http://nodejs.cn/api/fs.html#class-fsdirent 新增于: v10.10.0
}

/**
 * Reads an image file from `imagePath` and stores an NFT with the given name and description.
 * @param {string} imagePath the path to an image file
 */
export async function storeDirectory(currentDirPath) {
  // load the file from disk
  const fileList = [];

  const data = fs.readdirSync(currentDirPath, { withFileTypes: true });
  for (let index = 0; index < data.length; index++) {
    const dirent = data[index];
    var filePath = path.join(currentDirPath, dirent.name);
    if (dirent.isFile()) {
      fileList.push(await fileFromPath(filePath));
    }
  }

  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  // call client.store, passing in the image & metadata
  console.log(fileList);
  return nftstorage.storeDirectory(fileList);
}
/**
 * A helper to read a file from a location on disk and return a File object.
 * Note that this reads the entire file into memory and should not be used for
 * very large files.
 * @param {string} filePath the path to a file to store
 * @returns {File} a File object containing the file content
 */
async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  return new File([content], path.basename(filePath), { type });
}

async function main() {
  const result = await storeDirectory("./Output/metadata");
  console.log(result);
}

// // Don't forget to actually call the main function!
// // We can't `await` things at the top level, so this adds
// // a .catch() to grab any errors and print them to the console.
// main().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });
