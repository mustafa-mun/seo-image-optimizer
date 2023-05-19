const fs = require("fs");
const sharp = require("sharp");
const path = require("path");

async function optimizeImages(imgArray, outputDirectory) {
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  let imgTags = ""; // Variable to store all the <img> tags

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
      <loc>${outputPath}</loc>
      <image:image>
        <image:loc>${outputPath}</image:loc>
        <image:caption>Image caption or description</image:caption>
        <image:title>Image title</image:title>
      </image:image>
    </url>`;

    // Append the sitemap entry to the existing sitemap file
    fs.appendFileSync("sitemap.xml", sitemapEntry);

    // Generate an HTML <img> tag with alt attribute for embedding the image in web pages
    const imgTag = `<img src="${outputPath}" alt="${altText}" />`;
    imgTags += imgTag; // Append the imgTag to the imgTags variable

    console.log(`HTML image tag: ${imgTag}`);
  }

  // Create the index.html file and write the imgTags into it
  const indexHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Web Page</title>
      </head>
      <body>
        ${imgTags}
      </body>
    </html>
  `;

  fs.writeFileSync("index.html", indexHTML);
  console.log(`index.html file created and img tags added.`);
}

module.exports = { optimizeImages };
