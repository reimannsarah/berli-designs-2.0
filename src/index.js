import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { getPaintings, getDogs, getPoem, getEmoji } from './js/business';


// UI Logic

export function getId(response) {
  const dataArray = [];
  response.data.forEach(datum => {
    dataArray.push(datum.id);
  });
  return (dataArray.join(','));
}

export function showImages(url) {
  const div = document.createElement("div");
  div.classList = "frame";
  let image = document.createElement("img");
  image.src = url;
  div.append(image);
  document.querySelector('#output').append(div);
}

export function imageError(message) {
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

export function printPoem(poem) {
  document.getElementById("poetry").classList.remove("hidden");
  let poetry = '';
  if (poem[0].lines.length > 19) {
    for (let i = 0; i < 20; i++) {
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

export function printEmoji(emoji) {
  document.getElementById("emoji").innerHTML = emoji.htmlCode[0];
}

export function printDogs(dog) {
  const dogDiv = document.getElementById("doggie");
  const image = document.createElement("img");
  image.src = dog[0];
  dogDiv.append(image);
}

function handleFormSubmission(e) {
  e.preventDefault();
  let userInput = document.getElementById("input").value;
  document.getElementById("output").innerHTML = null;
  getPaintings(userInput);
}

function clickAnImage(e) {
  reset();
  document.getElementById("picture").append(e.target);
  getPoem();
  getEmoji();
  getDogs();
}

function reset() {
  document.getElementById("output").innerHTML = null;
  document.getElementById("picture").innerHTML = null;
  document.getElementById("emoji").innerHTML = null;
  document.getElementById("doggie").innerHTML = null;
}

export function printError(message) {
  const errorDiv = document.getElementById("error");
  errorDiv.innerText = message;

  const img = document.createElement('img');
  img.src = "./assets/images/during.jpg";
  errorDiv.append(img);
}

document.querySelector("form").addEventListener("submit", handleFormSubmission);
document.querySelector("#output").addEventListener("click", clickAnImage);