import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ArtService from './artService.js';

function getPaintings() {
  ArtService.getArtworkId()
    .then(response => {
      return response;
    })
    .then(response2 => {
      const ids = getId(response2);
      return ArtService.getImageId(ids);
    })
    .then(response3 => {
      response3.data.forEach(image => {
        ArtService.getImage(image.image_id)
          .then(response => {
            let image = document.createElement("img");
            image.src = response.url;
            document.querySelector('#output').append(image);
          })
      })
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