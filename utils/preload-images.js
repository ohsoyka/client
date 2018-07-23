function preloadImage(imageURL) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.src = imageURL;

    image.onload = resolve;
    image.onerror = reject;
  });
}

export default function preloadImages(imageURLs) {
  return imageURLs.reduce((chain, imageURL) => chain
    .then(() => preloadImage(imageURL))
    .catch(() => preloadImage(imageURL)), Promise.resolve());
}
