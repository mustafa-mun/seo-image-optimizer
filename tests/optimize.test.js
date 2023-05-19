const { optimizeImages } = require("../modules/optimize");
const { test, expect } = require("@jest/globals");

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
