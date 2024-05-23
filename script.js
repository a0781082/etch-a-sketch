var canvassWidth = 50;
var canvassHeight = 50;
var canvassBorder = 2;
var canvassTopPad = 10;
var pixelSide = 20;
var pixelBorder = 0;
var divId;
var newPixel;
var modulo;
var eraseButton;
var changeButton;
var multiColorButton;
var fadingButton;
var maxScreenResolution = 875;
let opacityPercentage = 10;
let initialCanvassColor = null;
let multiColor = false;
let fading = false;

window.onload = function () {
    //initialise the drawing canvass
    createCanvass();
    //make the buttons the same size - just because ;-)
    eraseButton = document.getElementById("erase");
    changeButton = document.getElementById("resize");
    multiColorButton = document.getElementById("multiColor");
    fadingButton = document.getElementById("fading");
    let buttonRect = changeButton.getBoundingClientRect();
    let buttonWidth = buttonRect.width + "px";
    eraseButton.style.width = buttonWidth;
    document.getElementById("erase").style.width = buttonWidth;

    //add eventlisteners to buttons to listen for clicks
    eraseButton.addEventListener("click", function () {
        clearCanvass();
    });

    changeButton.addEventListener("click", function () {
        adjustResolution();
    });

    multiColorButton.addEventListener("click", function () {
        if (multiColor) {
            multiColor = false;
        } else {
            multiColor = true;
        }
    });

    fadingButton.addEventListener("click", function () {
        if (fading) {
            fading = false;
        } else {
            fading = true;
        }
    });
}

function createCanvass() {
    //set and keep the canvass size to 1000x1000 pixels
    //limit the maximum cells to 100x100 and the minimum to 5x5 and adjust the cell size accordingly
    // ==> calculate pixelSide to ensure the fit
    if (canvassWidth >= 5 && canvassWidth <=100) {
        pixelSide = maxScreenResolution / canvassWidth
    }


    //set the page size for the sketch
    $(".canvass").width((canvassWidth * (pixelSide + (pixelBorder * 2))) + (canvassBorder * 2));
    $(".canvass").height((canvassHeight * (pixelSide + (pixelBorder * 2))) + ((canvassBorder * 2) + canvassTopPad));

    for (let i = 0 ; i < ((canvassWidth * canvassHeight)) ; i++) {
        createDiv(i);
    }

    $(".myPixel").width(pixelSide);
    $(".myPixel").height(pixelSide);
    
    let canvass = document.getElementById("canvass");
    let myPixels = canvass.querySelectorAll('.myPixel');
    myPixels.forEach(function(div) {
        div.addEventListener('mouseover', function() {
            mouseOver(div);
        })
    })


    let canvassWidthElement = document.getElementById("canvassWidth");
    canvassWidthElement.value = canvassWidth;

    let canvassHeightElement = document.getElementById("canvassHeight");
    canvassHeightElement.value = canvassHeight;

    let pixelSideElement = document.getElementById("pixelSize");
    pixelSide = maxScreenResolution / canvassWidth
    pixelSideElement.value = pixelSide;
}

function createDiv(id) {
    // add the new 'pixel' to the canvass
    divId = "dv" + id;
    $("#canvass").append(`<div class="myPixel" id="${divId}"> </div>`);
    
    // set up the mouseover event to do the trace
    newPixel = document.getElementById(divId);
    if (initialCanvassColor == null) {
        initialCanvassColor = newPixel.style.backgroundColor;
    }

    //each pixel has a border of 1, so this means contiguous pixels have a border of 2 between them
    //to balance this out make sure all the top, bottom, left and right pixels have a border of 2

    modulo = ((id + 1)) % canvassWidth;
    if (modulo == 0) {
        //right column
        newPixel.style.borderRightWidth = 2 + "px";
    }

    if (modulo == 1) {
        //left column
        newPixel.style.borderLeftWidth = 2 + "px";
    }

    if (id < canvassWidth) {
        //top row
        newPixel.style.borderTopWidth = 2 + "px";
    }

    if ((id / canvassHeight) >= (canvassHeight - 1)) {
        //bottom row
        newPixel.style.borderBottomWidth = 2 + "px";
    }
}

function mouseOver(div) {
    document.getElementById(div.id).classList.add("draw");

    if (multiColor) {
        let red = Math.floor(Math.random() * 255);
        let green = Math.floor(Math.random() * 255);
        let blue = Math.floor(Math.random() * 255);
        let rgbColorStr = "rgb(" + red + ", " + green + ", " + blue + ")";
        document.getElementById(div.id).style.backgroundColor = rgbColorStr;
    }

    if (fading) {
        if (opacityPercentage < 100) {
            opacityPercentage = opacityPercentage + 10
        } else {
            opacityPercentage = 10
        }
        let opacityPercentageStr = opacityPercentage + "%";
        document.getElementById(div.id).style.opacity = opacityPercentageStr;
    }
}

function clearCanvass() {
    let canvass = document.getElementById("canvass");
    let myPixels = canvass.querySelectorAll('.myPixel');
    myPixels.forEach(function(div) {

        div.style.backgroundColor = "white";

        })   
}

function adjustResolution() {
    let cachedCanvassWidth = canvassWidth;
    canvassWidth = prompt("Please enter the new resolution (the minimum is 5 and the maximum is 100): ");
    if (canvassWidth >= 5 && canvassWidth <=100) {
        pixelSide = maxScreenResolution / canvassWidth;
        canvassHeight = canvassWidth;
        //number is in a valid range so remove the existing canvass and create a new one...
        removeCanvass();
        createCanvass();
    } else {
        //reset to valid values in case of cancel
        canvassWidth = cachedCanvassWidth;
        adjustResolution();
    }
}

function removeCanvass() {
    let canvass = document.getElementById("canvass");
    let myPixels = canvass.querySelectorAll('.myPixel');
    myPixels.forEach(function(div) {
        div.remove();
        })   
}