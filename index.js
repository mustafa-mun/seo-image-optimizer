const { program } = require("commander");
const { downloadImagesFromHTML, getPageHTML } = require("./modules/crawl");
const { optimizeImages } = require("./modules/optimize");

program
  .version("1.0.0")
  .description("CLI tool to download and optimize images for SEO")
  .helpOption("-h, --help", "Display help information");

program
  .command("download")
  .description("Download images from a webpage")
  .option("-u, --url <url>", "Webpage URL")
  .option(
    "-o, --output <output-directory>",
    "Output Directory",
    "optimized-images"
  )
  .action(async (options) => {
    const { url, output } = options;
    const HTML = await getPageHTML(options.url);
    const downloadImages = await downloadImagesFromHTML(
      HTML,
      "downloaded-images"
    );
    // Call the appropriate function to download images with the provided options
    await optimizeImages(downloadImages, options.output);
  });

program.parse(process.argv);
