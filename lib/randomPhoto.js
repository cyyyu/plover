// Return a random image source
function randomPhoto(query = "") {
  return "https://source.unsplash.com/random/2560x1600?" + query;
}

module.exports = randomPhoto;
