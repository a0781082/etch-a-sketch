var canvassWidth = 100;
var canvassHeight = 100;
var canvassBorder = 2;
var canvassTopPad = 10;
var pixelSide = 5;
var pixelBorder = 0;
var divId;
var newPixel;
var modulo;
var eraseButton
var changeButton

window.onload = function () {
    //initialise the drawing canvass
    createCanvass();

    //make the buttons the same size - just because ;-)
    eraseButton = document.getElementById("erase");
    changeButton = document.getElementById("resize");
    let buttonRect = changeButton.getBoundingClientRect();
    let buttonWidth = buttonRect.width + "px";
    eraseButton.style.width = buttonWidth;
    document.getElementById("erase").style.width = buttonWidth;

    //add eventlisteners to buttons to listen for clicks
    eraseButton.addEventListener("click", function (erase) {
        clearCanvass();
    })
}

function createCanvass() {
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
}

function createDiv(id) {
    // add the new 'pixel' to the canvass
    divId = "dv" + id;
    $("#canvass").append(`<div class="myPixel" id="${divId}"> </div>`);
    
    // set up the mouseover event to do the trace
    newPixel = document.getElementById(divId);

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
}

function clearCanvass() {
    let canvass = document.getElementById("canvass");
    let myPixels = canvass.querySelectorAll('.myPixel');
    myPixels.forEach(function(div) {
        div.classList.remove("draw")
        })   
}