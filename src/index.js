import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ArtService from './artService.js';
import PoetryService from './poetry-service';

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

function getPoem() {
  PoetryService.getPoem()
    .then(response => {
      if (response instanceof Error) {
        const errorMessage = `Oops! No poem for you!: ${response.message}`;
        throw new Error(errorMessage);
      }
      printPoem(response);
    })
    .catch(error => {
      return error;
    });
}

// UI Logic

function showImages(url) {
  const div = document.createElement("div");
  div.classList = "frame";
  let image = document.createElement("img");
  image.src = url;
  div.append(image);
  document.querySelector('#output').append(div);
}

function imageError(message) {
  const outputDiv = document.querySelector('#output');
  const div = document.createElement("div");
  const image = document.createElement("img");
  const p = document.createElement("p");

  div.classList = "err";
  p.innerText = message;
  image.src = "./assets/images/before.jpg";
  image.classList = "frame";
  div.append(p, image);
  outputDiv.append(div);
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
  const pictureDiv = document.getElementById("picture");
  pictureDiv.innerHTML = null;
  outputDiv.innerHTML = null;
  pictureDiv.append(e.target);
  getPoem();
}

function printPoem(poem) {
  let poetry = '';
  if (poem[0].lines.length > 19) {
    for(let i = 0; i < 20; i++) {
      poetry += ` 
      ${poem[0].lines[i]}`;
    }
  } else {
    poetry[0].lines.forEach(line => {
      poetry += `
      ${line}`;
    });
  }
  document.getElementById("poetry").innerText = poetry;
}

document.querySelector("form").addEventListener("submit", handleFormSubmission);
document.querySelector("#output").addEventListener("click", clickAnImage);