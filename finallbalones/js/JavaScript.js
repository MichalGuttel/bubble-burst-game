// Player
function Player(PName, PPoints, Plevel) {
    this.PlayerName = PName;
    this.PlayerPoints = PPoints;
    this.PlayerLevel = Plevel;
}

// Game
function Game(PlayerName, numElement, level, numPic) {
    this.PlayerName = PlayerName;
    this.numElement = numElement;
    this.level = level;
    this.NumPIc = numPic;
}

//Aluf
function Aluf(AName, APoints) {
    this.alufName = AName;
    this.alufPoints = APoints;
}





var numPic = -1;
var selName;
var Pname;
function DuplcateNames(currentName) {
    var dp = false;
    var theOptions = document.querySelectorAll("#selectName>option")
    for (var i = 0; i < theOptions.length; i++) {
        if (theOptions[i].text == currentName)
            dp = true;
    }
    return dp;
}

function nameList() {
    selName = document.querySelector("#selectName");
    for (var level = 1; level <= 3; level++) {
        var key = "Level" + level;
        var chmp = JSON.parse(localStorage.getItem(key));
        if (chmp != null) {
            for (var i = 0; i < chmp.length; i++) {
                Duplicate = DuplcateNames(chmp[i].alufName);
                if (Duplicate == false) {
                    var theOPtion = document.createElement("option");
                    theOPtion.textContent = chmp[i].alufName;
                    selName.appendChild(theOPtion);
                }
            }
            document.querySelector("#PlayerName").style.display = "none"
        }
    }
}

function showText() {
    document.querySelector("#PlayerName").style.display = "inline";
    selName.selectedIndex = 0;
}
function HidaText() {
    document.querySelector("#PlayerName").style.display = "none";

}


function RandGame() {
    numPic = -1;
    var ArrImg = document.querySelectorAll(".image-option");
    var parentImg = document.querySelector("#ParentImage");
    for (var i = 0; i < ArrImg.length; i++) {
        parentImg.removeChild(ArrImg[i]);

    }
}

function startGame() {

    if (selName.selectedIndex ==0 && document.querySelector("#PlayerName").value == "")
        alert("יש להכניס שם שחקן");
    else {
        if (selName.selectedIndex == 0)
            Pname = document.querySelector("#PlayerName").value;
        else
            Pname = selName.options[selName.selectedIndex].textContent;
        var AmountElements = document.querySelector("#ElementCount").value;
        var lev = document.querySelector("#GameLevel").value;
        var selectedImage = getSelectedImage();
        var obGame = new Game(Pname, AmountElements, lev, selectedImage);
        sessionStorage.Game = JSON.stringify(obGame);
        window.location = "HtmlPage1.html";
  }
}

function getSelectedImage() {
    // Get the selected image by finding the clicked image from the image options
    var imageOptions = document.getElementById('imageOptions');
    var images = imageOptions.getElementsByClassName('image-option');

    for (var i = 0; i < images.length; i++) {
        if (images[i].classList.contains('selected')) {
            return images[i].querySelector('img').src;
        }
    }

    // If no image is selected, return a random image from the options
    var randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex].querySelector('img').src;
}

// Add click event listener to the image options
var imageOptions = document.getElementById('imageOptions');
var imageOptionElements = imageOptions.getElementsByClassName('image-option');

for (var i = 0; i < imageOptionElements.length; i++) {
    imageOptionElements[i].addEventListener('click', function () {
        // Remove 'selected' class from all image options
        for (var j = 0; j < imageOptionElements.length; j++) {
            imageOptionElements[j].classList.remove('selected');
        }

        // Add 'selected' class to the clicked image option
        this.classList.add('selected');
    });
}

var numPic = -1;
var selName;
function DuplicateNames(currentName) {
    var duplicate = false;
    var theOptions = document.querySelectorAll("#selectName>optior")
    for (var i = 0; i < theOptions.length; i++) {
        if (theOptions[i].text == currentName)
            duplicate = true;
    }

    return duplicate;
}
function putNames() {

    selName = document.querySelector("#selectName");

    for (var level = 1; level <= 3; level++) {
        var key = "Level" + level;
        var Champions = JSON.parse(localstorage.getItem(key));
        if (Champions != null) {
            for (var i = 0; i < Champions.length; i++) {

                Duplicate = DuplicateNames(Champions[i].championName);

                if (Duplicate == false) {
                    var theOption = document.createElement("option");
                    theOption.textContent = Champions[i].championName;
                    selName.appendChild(theOption);

                }
            }
        }
    }

    document.querySelector("#PlayerName").style.display = "none"
}






//page 2

var objGame;
var points;
var voice;
function Init() {
    

    var WinWidth, WinHeight;
    var numelement = 0;
    var theimg = [];
    var d1 = [], d2 = [];
    var imgsize = [];
    var theleft = [], thetop = [];
    points = 0;
    var m1, m2;
    if (document.getElementById("GameLevel") == 1) {
        m1 = 200;
        m2 = 80;
    }
    else if (document.getElementById("GameLevel") == 2) {
        m1 = 300;
        m2 = 50;
    }
    else {
        m1 = 450;
        m2 = 30;
    }

    //const back = document.body;
    //var p = "../imges" + document.querySelectorAll("img");
    //back.style.backgroundImage = 'url(${p})';

    objGame=JSON.parse(sessionStorage.Game);
    document.querySelector("#playerNameDisplay").textContent = objGame.PlayerName;
    document.getElementById("level").textContent = objGame.level;
    /*document.getElementById("#pointsDisplay").textContent = 0;*/

    var intervali = setInterval
        (function () {
            if (numelement >= objGame.numElement) {
                clearInterval(intervali);
                clearInterval(intermov);
                voice = new Audio("../imges/crown.mp3");
                voice.play();
                var therest = document.querySelectorAll("img");
                for (var i = 0; i < therest.length; i++) {
                    therest[i].onclick = null;
                    therest[i].style.opacity = '0.3';
                }
            }
            else {
                WinWidth = window.innerWidth;
                WinHeight = window.innerHeight;
                numelement++;
                theimg[numelement] = document.createElement("img");
                theimg[numelement].src = objGame.NumPIc;
                document.body.appendChild(theimg[numelement]);
                imgsize[numelement] = Math.floor(Math.random() * 70) + 30;
                theimg[numelement].style.width = imgsize[numelement] + "px";
                theimg[numelement].style.height = imgsize[numelement] + "px";
                theimg[numelement].style.position = "absolute";
                theleft[numelement] = Math.floor(Math.random() * (WinWidth - imgsize[numelement]));
                theimg[numelement].style.left = theleft[numelement] + "px";
                thetop[numelement] = Math.floor(Math.random() * (WinHeight - imgsize[numelement]));
                theimg[numelement].style.top = thetop[numelement] + "px";
                theimg[numelement].classList.add("animate")
                d1[numelement] = Math.floor(Math.random() * 2);
                if (d1[numelement] == 0)
                    d1[numelement] = -1;
                d2[numelement] = Math.floor(Math.random() * 2);
                if (d2[numelement] == 0)
                    d2[numelement] = -1;
                //הוספת קוד על האלמנט
                //}
                //    if (numelement >= objGame.numElement) {
                //    clearInterval(intervali);
                //    var therest = document.querySelectorAll("img");
                //    for (var i = 0; i < therest.length; i++) {
                //        therest[i].onclick = null;
                //    }
                //}
                //element.addEventListener("click", () => {
                //    removeElement(element, document);
                //    incrementScore(document);
                //}); ‏
                theimg[numelement].onclick = function (e) {
                    document.body.removeChild(e.target);
                    points += 10;
                    voice = new Audio("../imges/Byeball.wav");
                    voice.play();
                    document.getElementById("pointsDisplay").textContent = "Points: " + points;
                    document.getElementById("playerNameDisplay").textContent = "playerName: " +objGame.PlayerName;
                    document.getElementById("level").textContent = "gameLevel: "+objGame.level ;
                       }
                //if (numelement >= objGame.numElement) {
                //    clearInterval(intervali);
                //    var therest = document.querySelectorAll("img");
                //    for (var i = 0; i < therest.length; i++) {
                //        therest[i].onclick = null;
                //    }
                //}
            }
         }, m1)
    
    var intermov = setInterval(function () {
        for (i = 1; i <= numelement; i++) {
            theleft[i] = parseInt(theimg[i].style.left, 10);
            theleft[i] += 3 * d1[i];
            theimg[i].style.left = theleft[i] + "px";
            if ((theleft[i] <= 0) || (theleft[i] + imgsize[i] >= WinWidth))
                d1[i] = -d1[i];
            thetop[i] = parseInt(theimg[i].style.top, 10);
            thetop[i] += 3 * d2[i];
            theimg[i].style.top = thetop[i] + "px";
            if ((thetop[i] <= 0) || (thetop[i] + imgsize[i] >= WinHeight))
                d2[i] = -d2[i];
        }
    }, m2);
}


//function endGame(document) {
//    clearInterval(interMove);
//    clearInterval(gameInterval);
//    var TheImages = document.querySelectorAll("img");

//    for (var i = 0; i < TheImages.length; i++) {
//        const element = TheImages[i];
//        const clone = element.cloneNode(true);
//        element.parentNode.replaceChild(clone, element);
//    }
//}

function gotoAlufim() {
    var NPlayer = objGame.PlayerName;
    var level = objGame.level;
    var dots = points;
    var objPlayer = new Player(NPlayer, dots, level);
    sessionStorage.Player = JSON.stringify(objPlayer);
    window.location = "alufim.html";
}



