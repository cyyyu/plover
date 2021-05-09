// Return a random image source
function randomPhoto(query = "") {
  return "https://source.unsplash.com/2560x1600?" + encodeURIComponent(query);
}

module.exports = randomPhoto;
