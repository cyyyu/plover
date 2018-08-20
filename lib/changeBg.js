const { spawn } = require("child_process");
const request = require("request");
const path = require("path");
const fs = require("fs");
const glob = require("glob");
const randomPhoto = require("./randomPhoto");

const tempDir = path.join(__dirname, "..");

function changeBg(query = "") {
  return new Promise(resolve => {
    const imageSource = randomPhoto(query);

    // Remove tempfiles if exist
    const files = glob.sync("temp*.jpg");
    files.map(file => fs.unlinkSync(path.join(__dirname, "..", file)));

    // Start getting a random photo from unsplash
    // Make sure file name is random
    const tempFileName = `temp${Date.now()}.jpg`;
    const tempFilePath = path.join(tempDir, tempFileName);
    const writeFileTo = fs.createWriteStream(path.join(tempDir, tempFileName));
    const getImageFile = request.get(imageSource);

    getImageFile.pipe(writeFileTo);
    getImageFile.on("complete", () => {
      // Image has been saved to tempFilePath
      // Change desktop background using applescript
      const script = spawn("osascript", [
        "-e",
        `tell application "Finder" to set desktop picture to POSIX file "${tempFilePath}"`
      ]);
      script.on("close", resolve);
    });
  });
}

module.exports = changeBg;
