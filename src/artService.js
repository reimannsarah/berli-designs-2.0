export default class ArtService {
  static async getArtworkId(userInput) {
    return fetch(`https://api.artic.edu/api/v1/artworks/searchq=${userInput}&limit=20&fields=id`)
      .then(response => {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
  static async getImageId(ids) {
    return fetch(`https://api.artic.edu/api/v1/artworks?ids=${ids}&fields=image_id`)
      .then(response => {
        return response.json();
      });
  }
  static async getImage(imageId) {
    return fetch(`https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`)
      .then(response => {
        return response;
      });
  }
}