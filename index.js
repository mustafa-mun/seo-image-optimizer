const { program } = require("commander");

program
  .version("1.0.0")
  .description("CLI tool to download and optimize images for SEO")
  .helpOption("-h, --help", "Display help information");

program
  .command("download")
  .description("Download images from a webpage")
  .option("-u, --url <url>", "Webpage URL")
  .action((options) => {
    // Logic to handle the 'download' command
    const { url, output } = options;
    // Call the appropriate function to download images with the provided options
    console.log(options);
  });

program.parse(process.argv);
