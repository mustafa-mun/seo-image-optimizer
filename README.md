# seo-image-optimizer
This Command Line Interface (CLI) tool allows you to download and optimize images from a webpage for SEO purposes. It helps automate the process of fetching images, optimizing them for quality and storing them in a specified output directory. It also generates XML sitemap entries and HTML image tags(HTML file) for easy integration into your website.

## Installation

Clone the repository
```
git clone https://github.com/mustafa-mun/seo-image-optimizer
```
Navigate to the project directory
```
cd seo-image-optimizer
```
Install the dependencies
```
npm install
```

## Usage

To use the CLI tool, follow the steps below:

1. Open a terminal and navigate to the project directory.
2. Run the CLI command with the appropriate options:
```
node index.js download -u <url> [-o <output-directory>]
```
### options
- -u, --url <url>: Specify the URL of the webpage from which you want to download images.
- --o, --output <output-directory> (optional): Specify the output directory where the optimized images will be stored. If not provided, the default directory is set to "optimized-images".
  
3. The tool will fetch the HTML content of the webpage, download the images, optimize them, and store the optimized versions in the specified output directory. It will also generate XML sitemap entries and HTML image tags for SEO integration.
  
**Note:** The tool uses the Sharp library for image optimization. Make sure you have the necessary dependencies installed.
  
  
## Image Optimization Details
  The CLI tool optimizes the downloaded images using the optimizeImages function, which performs the following steps:
  
  1. If the specified output directory does not exist, it will be created recursively. 
  2. For each image in the downloaded image array:
  - Read the image file into a buffer.
  - Use Sharp to optimize the image by adjusting the JPEG quality to 85 and converting it to the WebP format with the same quality.
  - Extract the filename without the extension to use as the alt text for SEO purposes.
  - Convert spaces in the filename to hyphens and convert it to lowercase.
  - Construct the output path by joining the output directory and the filename with the `.webp` extension.
  - Write the optimized image buffer to the output path.
  - Print a message indicating that the image has been optimized and saved.
  - Generate an XML sitemap entry for the image, including the image location, caption, and title.
  - Append the XML sitemap entry to the existing sitemap file.
  - Generate an HTML `<img>` tag with the image source and alt attribute for embedding the image in web pages.
  
### XML output
  The CLI tool generates a XML sitemap entries `sitemap.xml` which can be used to enhance the SEO of your website by providing search engines with information about the images and improving their discoverability.
### HTML output
  The CLI tool also generates an `index.html` file that contains the optimized images in the form of HTML `<img>` tags. This file can be used to showcase the optimized images on your website.
