const {AxiosResponse} = require('axios')

const axios = require('axios');
const sharp = require('sharp');


module.exports.downloadFile = async function downloadFile(url){

    let response = await axios({
      method: 'GET',
      url: url,
      responseType: 'arraybuffer',
    }).then((response)=>{
        console.log(response)
    })

    return response
  
}

module.exports.addTextOnImage = async function addTextOnImage(image,caption) {
  try {
    const sharpImage = await sharp(image);
    const sharpImageMetadata = sharpImage.metadata();

    // Define the SVG image to overlay our on image
    const svgImage = `
      <svg width="${sharpImageMetadata.width}" height="${sharpImageMetadata.height}">
        <style>
        .title { fill: #001; font-size: 70px; font-weight: bold;}
        </style>
        <text x="50%" y="50%" text-anchor="middle" class="title">${caption}</text>
      </svg>
      `;
    const svgBuffer = Buffer.from(svgImage);
    // caption image with text
    sharpImage.composite([
      {
        input: svgBuffer,
        top: 0,
        left: 0,
      },
    ]);
    return sharpImage.toBuffer();
  } catch (err) {
    throw Error(`addTextOnImage(): ${err}`);
  }
}