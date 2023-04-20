import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ArtService from './artService.js';

function getPaintings(userInput) {
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
      response3.data.forEach(image => {
        ArtService.getImage(image.image_id)
          .then(response => {
            let image = document.createElement("img");
            image.src = response.url;
            document.querySelector('#output').append(image);
          });
      });
    })
    .catch(error => {
      printError(error);
    });
}

function printError(message) {
  document.getElementById("error").innerText = message;
}

function getId(response) {
  const dataArray = [];
  response.data.forEach(datum => {
    dataArray.push(datum.id);
  });
  return (dataArray.join(','));
}

function handleFormSubmission(e) {
  e.preventDefault();
  let userInput = document.getElementById("input").value;
  document.getElementById("output").innerHTML = null;
  getPaintings(userInput);
}

function clickAnImage(e) {
  let outputDiv = document.getElementById("output");
  document.getElementById("output").innerHTML = null;
  outputDiv.append(e.target);

}

document.querySelector("form").addEventListener("submit", handleFormSubmission);
document.querySelector("#output").addEventListener("click", clickAnImage);