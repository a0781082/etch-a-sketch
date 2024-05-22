var canvassWidth = 16;
var canvassHeight = 16;
var canvassBorder = 2;
var canvassTopPad = 10;
var pixelSide = 25;
var pixelBorder = 1;
var divId;
var newPixel;
var modulo;

window.onload = function () {
    createCanvass();
}

function createCanvass() {
    //set the page size for the sketch
    $(".canvass").width((canvassWidth * (pixelSide + (pixelBorder * 2))) + (canvassBorder * 2));
    $(".canvass").height((canvassHeight * (pixelSide + (pixelBorder *2))) + ((canvassBorder * 2) + canvassTopPad));
    
    //set the 'pixel' size for the sketch
    $(".myPixel").width(pixelSide);
    $(".myPixel").height(pixelSide);

    for (let i = 0 ; i < ((canvassWidth * canvassHeight)) ; i++) {
        createDiv(i);
    }

    $(".myPixel").width(pixelSide);
    $(".myPixel").height(pixelSide);
}

function createDiv(id) {
    divId = "dv" + id;
    $("#canvass").append(`<div class="myPixel" id="${divId}"> </div>`);
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