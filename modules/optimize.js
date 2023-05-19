const fs = require("fs");
const sharp = require("sharp");
const path = require("path");

async function optimizeImages(imgArray, outputDirectory, websiteURL) {
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }
  for (const img of imgArray) {
    const imgBuffer = fs.readFileSync(img);
    const optimizedBuffer = await sharp(imgBuffer)
      .jpeg({ quality: 85 }) // Adjust the JPEG quality
      .webp({ quality: 85 }) // Convert to WebP format with desired quality
      .toBuffer();

    const altText = path.basename(img, path.extname(img)); // Extract filename without extension
    const fileName = altText.replace(/\s+/g, "-").toLowerCase(); // Convert spaces to hyphens and lowercase

    const outputPath = path.join(outputDirectory, `${fileName}.webp`);

    fs.writeFileSync(outputPath, optimizedBuffer);
    console.log(`Image optimized and saved: ${outputPath}`);

    // Generate a separate XML sitemap entry for each image
    const sitemapEntry = `<url>
      <loc>${websiteURL}/${fileName}.jpg</loc>
      <image:image>
        <image:loc>${websiteURL}/${fileName}.jpg</image:loc>
        <image:caption>Image caption or description</image:caption>
        <image:title>Image title</image:title>
      </image:image>
    </url>`;

    // Append the sitemap entry to the existing sitemap file
    fs.appendFileSync("sitemap.xml", sitemapEntry);

    // Generate an HTML <img> tag with alt attribute for embedding the image in web pages
    const imgTag = `<img src="${websiteURL}/${fileName}.jpg" alt="${altText}" />`;
    console.log(`HTML image tag: ${imgTag}`);
  }
}

module.exports = { optimizeImages };
