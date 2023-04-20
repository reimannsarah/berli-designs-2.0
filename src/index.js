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
      if (response3 instanceof Error) {
        const errorMessage = `Well gee I dunno what happened:
        ${response3.message}`;
        throw new Error(errorMessage);
      }
      response3.data.forEach(image => {
        console.log(response3);
        ArtService.getImage(image.image_id)
          .then(response => {
            console.log(response);
            if (response instanceof Error) {
              const errorMessage = `Whoops! Couldn't find image: 
              ${response.message}`;
              throw new Error(errorMessage);
            }
            let image = document.createElement("img");
            image.src = response.url;
            document.querySelector('#output').append(image);
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

function imageError(message) {
  const outputDiv = document.querySelector('#output');
  const image = document.createElement("img");
  const p = document.createElement("p");

  p.innerText = message;
  image.src = "./assets/images/before.jpg";
  p.append(image);
  outputDiv.append(p);
}

function printError(message) {
  const errorDiv = document.getElementById("error");
  errorDiv.innerText = message;
  
  const img = document.createElement('img');
  img.src = "./assets/images/during.jpg";
  errorDiv.append(img);
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