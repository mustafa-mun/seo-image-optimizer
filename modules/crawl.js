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

module.exports = {
  downloadImagesFromHTML,
  getPageHTML,
};
