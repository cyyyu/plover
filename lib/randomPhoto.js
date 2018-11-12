// Return a random image source
function randomPhoto(query = "") {
  return (
    "https://source.unsplash.com/random?" + query
  );
}

module.exports = randomPhoto;
