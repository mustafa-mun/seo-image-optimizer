const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function getPageHTML(url) {
  try {
    // Try creating url
    const newUrl = new URL(url);
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error(`Error code: ${response.status}`);
    }
    const HTML = await response.text();
    return HTML;
  } catch (error) {
    // input is not a valid url
    throw new Error(error);
  }
}

async function downloadImagesFromHTML(html, outputDirectory) {
  // Create output directory if it doesn't exist
  fs.mkdirSync(outputDirectory, { recursive: true });

  const $ = cheerio.load(html);
  const imgElements = $("img");
  const downloadedImages = [];

  for (let i = 0; i < imgElements.length; i++) {
    const imgElement = $(imgElements[i]);
    const src = imgElement.attr("src");
    const filename = path.basename(src);
    const outputPath = path.join(outputDirectory, filename);

    try {
      const response = await axios.get(src, { responseType: "arraybuffer" });
      fs.writeFileSync(outputPath, response.data);
      downloadedImages.push(outputPath);
      console.log(`Image downloaded: ${outputPath}`);
    } catch (error) {
      console.error(`Error downloading image ${src}: ${error.message}`);
    }
  }

  return downloadedImages;
}

const HTML = `<!DOCTYPE html>
<html>
<head>
  <title>Image Gallery</title>
</head>
<body>
  <h1>Image Gallery</h1>
  <img src="image1.jpg" alt="Image 1">
  <img src="image2.jpg" alt="Image 2">
  <img src="image3.jpg" alt="Image 3">
  <img src="image4.jpg" alt="Image 4">
  <img src="image5.jpg" alt="Image 5">
</body>
</html>`;

downloadImagesFromHTML(HTML, "test-images/").then((out) => console.log(out));

module.exports = {
  downloadImagesFromHTML,
  getPageHTML,
};
