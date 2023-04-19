import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ArtService from './artService.js';

function getPaintings() {
  ArtService.getArtworkId()
    .then(response => {
      console.log("1: " + response);
      return response;
    })
    .then(response2 => {
      const ids = getId(response2);
      console.log("2: " + response2);
      return ArtService.getImageId(ids);
    })
    .then(response3 => {
      console.log(response3)
      const imageIdArray = [];
      response3.data.forEach(image => {
        let promise = ArtService.getImage(image.image_id);
        console.log(promise);
        let jasonifiedImage = promise.json();
        imageIdArray.push(jasonifiedImage);
      })
      // let imageId = response3.data.image_id;
      // return ArtService.getImage(imageId);
      console.log("3: ");
      console.log(imageIdArray);
      return imageIdArray;
    })
    .then(response4 => {
      console.log(response4);
      response4.forEach(promise => {
        console.log(promise)
      })
      let image = document.createElement("img");
      image.src = response4.url;
      document.querySelector('#output').append(image);
  
    });
}

getPaintings();

function getId(response) {
  const dataArray = [];
  response.data.forEach(datum => {
    dataArray.push(datum.id);
  });
  return (dataArray.join(','));

}