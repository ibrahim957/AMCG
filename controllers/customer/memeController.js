const Customers = require('../../models/customerModel')
const config = require('../../config')

// import * as dotenv from 'dotenv';
// dotenv.config();

// get all imports
const deepai = require('deepai')
const openai = require('openai')

// Config constants
let openaiApi = openai.OpenAIApi
let openAiConfig = openai.Configuration

const {addTextOnImage,downloadFile} = require('../../helpers/functions')
const {AxiosResponse} = require('axios')
const sharp = require('sharp');

/**
 * Image URL for testing image processing flows, as not to run up API usage cost
 */
const TEST_IMAGE_URL =
  'https://api.deepai.org/job-view-file/6a9cfedc-d418-44e7-97e1-e265ead8b913/outputs/output.jpg';

/**
 *
 * @param prompt The test prompt DeepAI will generate image from
 * @returns DeepAI's ModelOutputs type with id and output_url string attributes
 */
async function generateImages(prompt) {
  // DeepAI config
  deepai.setApiKey(config.deepAiApiKey)
  const images = await deepai.callStandardApi('text2img', {
    text: prompt
  })
  return images
}

async function generateMemes(prompt) {
  // OpenAI config
  openAiConfig = new openai.Configuration({
    apiKey: config.openAiApiKey
  })
  openaiApi = new openai.OpenAIApi(openAiConfig)

  // DeepAI config
  deepai.setApiKey(config.deepAiApiKey ?? '')

  // arrays to use
  const imagesList= []
  // const imagesBuffers: Buffer[] = [];
  // const imagesCaptionedBuffers: Buffer[] = [];

  // In dev mode we don't generate a new DeepAI image, we reuse one.
  if (config.nodeEnv === 'development') {
    imagesList.push(await downloadFile(TEST_IMAGE_URL));
  }

  const imagesBuffers= imagesList.map(deepAiResp => {
    return Buffer.from(deepAiResp.data, 'binary');
  });
  const imagesCaptionedBuffers= await Promise.all(
    imagesBuffers.map(async imgbuff => {
      return await addTextOnImage(imgbuff, prompt);
    })
  );

  // In dev mode we store all images to local storage
  if (process.env.NODE_ENV === 'development') {
    const counter = 0;
    Promise.all(
      imagesCaptionedBuffers.map(async imgbuff => {
        await sharp(imgbuff).toFormat('jpeg').toFile(`${counter}.jpeg`);
      })
    );
  }
}

generateMemes('imran khan is happy').finally(() => {
  console.log('Exited.');
});