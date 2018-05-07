// ---------- Div Create/Delete ---------- //
// DOM references
const createDivButton = document.querySelector('.createDivButton');
const createdDivs = document.querySelector('.createdDivs');

// Global variables
let divCount = 0;

createDivButton.addEventListener('click', () => {
  if (divCount < 8) {
    const div = new Div;
    div.element.className = "divStyle";
    div.element.innerHTML = `Div ${div.element.dataset.index}`
    createdDivs.appendChild(div.element);
    divCount++;
  }
})

class Div {
  constructor() {
    this.element = document.createElement('div');
    this.element.dataset.index = divCount;
    this.element.addEventListener('click', this.removeDiv)
  }

  removeDiv() {
    const child = this;
    const childIndex = child.dataset.index;
    const parent = this.parentNode;
    parent.removeChild(this);
    divCount--;
    
    for(let i = childIndex; i < parent.children.length; i++) {
      parent.children[i].dataset.index = i;
      parent.children[i].innerHTML = `Div ${i}`;
    }
  }
}

// ---------- Carousel ---------- //


class Carousel {
  constructor(element) {

  }

  nextSlide() {

  }

  previousSlide() {

  }
}



