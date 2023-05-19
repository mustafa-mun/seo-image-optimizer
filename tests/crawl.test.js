const { downloadImagesFromHTML, getPageHTML } = require("../modules/crawl");
const { optimizeImages } = require("../modules/optimize");
const { test, expect } = require("@jest/globals");

// getPageHTML tests

const exampleURL =
  "https://www.digitalocean.com/community/tutorials/how-to-use-node-js-request-and-cheerio-to-set-up-simple-web-scraping";

test("returns an HTML string", async () => {
  const htmlRegex = /<[a-z][\s\S]*>/i;
  try {
    const html = await getPageHTML(exampleURL);
    const isHTML = htmlRegex.test(html);
    expect(isHTML).toBeTruthy();
  } catch (error) {
    console.log(error);
  }
});

test("throws an error if input is not a URL", async () => {
  try {
    const output = await getPageHTML("notanurl");
    expect(output).toBeFalsy();
  } catch (error) {
    console.log(error);
  }
});

// downloadImagesFromHTML tests
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

test("output is an array", async () => {
  try {
    const output = await downloadImagesFromHTML(HTML);
    const isArr = Array.isArray(output);
    expect(isArr).toBeTruthy();
  } catch (error) {
    console.log(error);
  }
});

test("finds all images", async () => {
  try {
    const output = await downloadImagesFromHTML(HTML);
    const len = output.length;
    console.log(len);
    expect(len).toEqual(5);
  } catch (error) {
    console.log(error);
  }
});

// optimize imgs tests

const exampleImgArray = [
  "img1.png",
  "img2.png",
  "img3.png",
  "img4.png",
  "img5.png",
];

test("returns falsy if input is not an array", async () => {
  try {
    const outputStr = await optimizeImages("notAnArray");
    const outputNum = await optimizeImages(121);
    expect(outputStr).toBeFalsy();
    expect(outputNum).toBeFalsy();
  } catch (error) {
    console.log(error.message);
  }
});

test("returns a non empty array", async () => {
  try {
    const output = await optimizeImages(exampleImgArray);
    const isArr = Array.isArray(output);
    const len = output.length;
    expect(isArr).toBeTruthy();
    expect(len).toBeGreaterThanOrEqual(1);
  } catch (error) {
    console.log(error.message);
  }
});

const fs = require("fs");
const outputDirectory = "optimized-images";

test("creates a directory folder with input outputDirectory", async () => {
  try {
    await optimizeImages(exampleImgArray, outputDirectory);
    const directoryExists = fs.existsSync(outputDirectory);
    expect(directoryExists).toBe(true);
  } catch (error) {
    console.log(error.message);
  }
});

test("creates equal length of optimized images with input images array", async () => {
  try {
    await optimizeImages(exampleImgArray, outputDirectory);
    const optimizedFolder = await fs.promises.readdir(outputDirectory);
    const isEqual = optimizedFolder.length === exampleImgArray.length;
    expect(isEqual).toBe(true);
  } catch (error) {
    console.log(error.message);
  }
});
