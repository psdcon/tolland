var images = [{
    src: 'images/barley_closeupx1536.jpg',
    img: null
}, {
    src: 'images/barleyx1536.jpg',
    img: null
}, {
    src: 'images/boatx1536.jpg',
    img: null
}, {
    src: 'images/grainx1536.jpg',
    img: null
}, {
    src: 'images/hillsx1536.jpg',
    img: null
}, ];

var index = 0;
var curIndex = 0;

// Preload images
var loadedImages = images.map(function () {
    return null;
});
images.forEach(function (currentValue, index) {

    var img = new Image();
    img.addEventListener('load', function () {
        currentValue.img = img;
        loadedImages[index] = currentValue;
        replaceLowRes();
    });
    img.src = currentValue.src;

});

function replaceLowRes() {
    if (!loadedImages[0]) {
        return;
    }
    var mainSplashImage = document.getElementsByClassName('splash-image__main')[0];
    var currentSplashImage = document.getElementsByClassName('splash-image__secondary')[0];
    if (currentSplashImage && !index)
        currentSplashImage.style.backgroundImage = 'url(\'' + images[0].src + '\')';
    if (mainSplashImage && !index)
        mainSplashImage.style.backgroundImage = 'url(\'' + images[0].src + '\')';
}


function changeHeader() {

    var mainSplashImage = document.getElementsByClassName('splash-image__main')[0];
    var currentSplashImage = document.getElementsByClassName('splash-image__secondary')[0];

    currentSplashImage.addEventListener('transitionend', function () {
        currentSplashImage.style.backgroundImage = 'url(\'' + loadedImages[index].src + '\')';
        currentSplashImage.classList.remove('old');
    });

    while (loadedImages[++index] === null);
    index = index % loadedImages.length;

    if (index === curIndex) {
        return;
    }

    curIndex = index;

    mainSplashImage.style.backgroundImage = 'url(\'' + loadedImages[index].src + '\')';

    setTimeout(function () {
        currentSplashImage.classList.add('old');
    }, 900);

}

function main() {
    // Set up image changing
    replaceLowRes();
    setInterval(changeHeader, 5750);
}

document.addEventListener('DOMContentLoaded', main);