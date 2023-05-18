const { downloadImagesFromHTML, getPageHTML } = require("../modules/crawl");
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
