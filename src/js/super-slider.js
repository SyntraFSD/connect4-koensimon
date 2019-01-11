const newSlider = document.querySelector('.super-slider');

/**
 * @param ssSlide {Element}
 * @param bullets {Element}
 * @param width {number}
 * @param index {number}
 */
function slide(ssSlide, bullets, width, index, Arrow) {
  // make the image slide:
  // change index of ssSlide
  // change left of ssSlide
  // set active class on correct .ss-bullet
  // style left aanpassen -(index*width)

  if (parseInt(index) <= 0) {
    Arrow['leftArrow'].style.display = 'none';
    Arrow['rightArrow'].style.display = 'block';
  } else if (parseInt(index) >= bullets.children.length - 1) {
    Arrow['rightArrow'].style.display = 'none';
    Arrow['leftArrow'].style.display = 'block';
  } else {
    Arrow['leftArrow'].style.display = 'block';
    Arrow['rightArrow'].style.display = 'block';
  }

  if (index >= 0 && index < bullets.children.length) {

    for (let i = 0; i < bullets.children.length; i++) {

      if (parseInt(bullets.children[i].dataset.index) === index) {
        bullets.children[i].classList.add('active');
      }
      else {
        bullets.children[i].classList.remove('active');
      }

    }

    ssSlide.dataset.index = index;
    ssSlide.style.left = -(index * width) + "px";

  }
}

/**
 * @param imgElement {Element}
 * @param newWidth {number}
 * @returns {Element}
 */
function resizeImg(imgElement, newWidth) {
  // set imgElement.syle.width and -height
  // set imgElement.width
  // set imgElement.heigth  
  const originalWidth = imgElement.width;
  const originalHeight = imgElement.height;

  imgElement.style.width = newWidth + 'px';
  imgElement.style.height = (newWidth * originalHeight / originalWidth) + 'px';
}

/**
 * @param element {Element}
 * @param containerWidth {number}
 * @returns {NodeListOf<Element>}
 */
function resizeImages(element, containerWidth) {
  // resizeImg for all images
  // return images
  // loop > all images
  const images = element.querySelectorAll('img');
  images.forEach(value => {
    resizeImg(value, containerWidth);
  });
  return images;
}

/**
 * @param element {Element}
 * @param images {NodeListOf<Element>}
 * @returns {Element}
 */
function makeSsSlide(element, images) {
  // create ssSlide (see html document for correct structure)
  // add classes and index
  // append all images
  // return ssSlide

  const imagesdiv = document.createElement('div');
  imagesdiv.classList.add('ss-slide');
  imagesdiv.dataset.index = 0;

  images.forEach(value => {
    imagesdiv.appendChild(value);
  });

  let lengteImages = element.clientWidth * images.length
  imagesdiv.style.width = lengteImages + "px";
  return imagesdiv;

  //document.createElement('div');
  // ad class
}

/**
 * @param leftRight {string}
 * @returns {Element}
 */
function makeArrow(leftRight) {
  // make new arrow (left or right)
  // add classes and font-awesome icon
  // see html
  // return the arrow dociument.createElement('div')

  // <!--<div class="ss-arrow ss-left"><i class="fas fa-angle-left fa-5x"></i></div>-->
  const Arrow = document.createElement("div");
  Arrow.classList.add('ss-arrow', "ss-" + leftRight);
  const liArrow = document.createElement("i");
  liArrow.classList.add('fas', "fa-angle-" + leftRight, 'fa-3x');
  Arrow.appendChild(liArrow);

  return Arrow;

}

/**
 * @param count {number}
 * @returns {Element}
 */
function makeBullets(count) {
  // make .ss-bullets
  // fill with count * .ss-bullet
  // see html
  // return bullets

  //<!--<div class="ss-bullets">-->
  //<!--<div class="ss-bullet active" data-index="0"></div>-->
  const bullets = document.createElement('div');
  bullets.classList.add('ss-bullets');

  for (let i = 0; i < count; i++) {
    const bullet = document.createElement('div');
    if (i === 0) {
      bullet.classList.add('ss-bullet', 'active');
    } else {
      bullet.classList.add('ss-bullet');
    }
    bullet.dataset.index = i;
    bullets.appendChild(bullet);
  }
  return bullets;
}

/**
 * @param element {Element}
 */
function init(element) {
  // remove loading class from element
  // resize images
  // append ssSlide, left and right arrow and bullets
  // add event listeners
  element.classList.remove('loading');
  let containerWidth = element.clientWidth;

  let images = resizeImages(element, containerWidth);

  const leftArrow = element.appendChild(makeArrow('left'));
  const rightArrow = element.appendChild(makeArrow('right'));
  const Arrow = { leftArrow: leftArrow, rightArrow: rightArrow };
  const bullets = element.appendChild(makeBullets(images.length));
  const ssSlide = element.appendChild(makeSsSlide(element, images));

  if (parseInt(ssSlide.dataset.index) === 0) {
    Arrow['leftArrow'].style.display = 'none';
  }

  document.addEventListener("keydown", event => {

    if (event.keyCode == 39) {

      slide(ssSlide, bullets, containerWidth, parseInt(ssSlide.dataset.index) + 1, Arrow);

    } else if (event.keyCode == 37) {

      slide(ssSlide, bullets, containerWidth, parseInt(ssSlide.dataset.index) - 1, Arrow);
    }
  });

  leftArrow.addEventListener('click', event => {

    slide(ssSlide, bullets, containerWidth, parseInt(ssSlide.dataset.index) - 1, Arrow);
  });

  rightArrow.addEventListener('click', event => {

    slide(ssSlide, bullets, containerWidth, parseInt(ssSlide.dataset.index) + 1, Arrow);
  });

  bullets.addEventListener('click', event => {
    if (event.target.matches('.ss-bullet')) {
      slide(ssSlide, bullets, containerWidth, parseInt(event.target.dataset.index), Arrow);
    }
  });

  document.getElementsByTagName("BODY")[0].onresize = event => {
    containerWidth = element.clientWidth;
    images = resizeImages(element, containerWidth);
  }


}

/**
 * @param element {Element}
 */
function preLoad(element) {
  // add loading icon when images are still loading
  // no need to edit
  element.classList.add('ss-container', 'loading');
}

/**
 * @param element {Element}
 */
function superSlider(element) {
  // checks if all images are loaded then initiates superSlider
  // no need to edit
  preLoad(element);
  const images = element.querySelectorAll('img');
  let imagesLoaded = 0;
  images.forEach(function (img) {
    if (img.complete) {
      imagesLoaded++;
      if (imagesLoaded === images.length) {
        init(element);
      }
    } else {
      img.addEventListener('load', function () {
        imagesLoaded++;
        if (imagesLoaded === images.length) {
          init(element);
        }
      });
    }
  });
}


document.addEventListener('DOMContentLoaded', function () {
  superSlider(newSlider);
});
