import ArtService from "./artService";
import DogService from "./dog-service";
import PoetryService from "./poetry-service";
import EmojiService from "./emoji-service";
import { getId, showImages, imageError, printError, printDogs, printPoem, printEmoji } from "./index.js";

export function getPaintings(userInput) {
  ArtService.getArtworkId(userInput)
    .then(response => {
      if (response instanceof Error) {
        const errorMessage = `there was a problem accessing ${userInput} art:
          ${response.message}`;
        throw new Error(errorMessage);
      }
      return response;
    })
    .then(response2 => {
      const ids = getId(response2);
      return ArtService.getImageId(ids);
    })
    .then(response3 => {
      if (response3 instanceof Error) {
        const errorMessage = `Well gee I dunno what happened:
          ${response3.message}`;
        throw new Error(errorMessage);
      }
      response3.data.forEach(image => {
        ArtService.getImage(image.image_id)
          .then(response => {
            if (response instanceof Error) {
              const errorMessage = `Whoops! Couldn't find image: ${response.message}`;
              throw new Error(errorMessage);
            }
            showImages(response.url);
          })
          .catch(error => {
            imageError(error);
          });
      });
    })
    .catch(error => {
      printError(error);
    });
}

export function getDogs() {
  DogService.getDog()
    .then(response => {
      if (response instanceof Error) {
        const errorMessage = `There was a problem finding dogs ${response.message}`;
        throw new Error(errorMessage);
      }
      printDogs(response);
    })
    .catch(error => {
      printError(error);
    });
}

export function getPoem() {
  PoetryService.getPoem()
    .then(response => {
      if (response instanceof Error) {
        const errorMessage = `Oops! No poem for you!: ${response.message}`;
        throw new Error(errorMessage);
      }
      printPoem(response);
    })
    .catch(error => {
      printError(error);
    });
}

export function getEmoji() {
  EmojiService.getEmoji()
    .then(response => {
      if (response instanceof Error) {
        const errorMessage = `Couldn't find any emojis ${response.message}`;
        throw new Error(errorMessage);
      }
      printEmoji(response);
    })
    .catch(error => {
      printError(error);
    });
}