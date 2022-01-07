// This variable keeps track of whose turn it is//
let activePlayer = "x";
//This array stores an array of moves. We use this to determine win conditions//
let selectedSqaures = [];

//This function is for palcing an x or o in a square//
function placeXOrO(squareNumber) {
    //This condition ensures a sqaure hasn't been selected already//
    //The .some() method is used to check each element of selectedSquare array//
    //to see if it contains the square number clicked on//
    if (!selectedSqaures.some(element => element.includes(squareNumber))) {
        //This variable retrieves the html element id that was clicked//
        let select = document.getElementById(squareNumber);
        //This element checks whose turn it is//
        if (activePlayer === "x") {
            //If activePlayer is equal to x, the x.png is placed in the html//
            select.style.backgroundImage = 'url("./images/yoshi.png")';
            //Active player must be x or o. so, if not x it must be o//   
        } else {
            //If activePlayer is equal to O, the o.png is placed in html//
            select.style.backgroundImage = 'url("./images/mario.png")';
        }
        //squareNumber and activePlayer are concatenated together and added to array//
        selectedSqaures.push(squareNumber + activePlayer);
        //This calls a function to check for any win conditions//
        checkWinConditions();
        //This condition is changing for the activePlayer//
        if (activePlayer === "x") {
            //If activePlayer is x change it to o//
            activePlayer = "o";
        // If activePlayer is anything other than x//
        } else {
            //Change activePlayer to x//
            activePlayer = "x";
        }

        //this function plays a placement sound//
        audio('./media/place2.mp3');
        //This condition checks to see if it is computers turn//
        if(activePlayer === "o") {
            //This function disables clicking for computers choice//
            disableClick();
            //This function waits for 1 second before computer places an image and enables click//
            setTimeout(function() { computersTurn(); }, 1000);
        }
        //Returning true is needed for our computersTurn() function to work//
        return true;
    }
    //This function results in a random square beign selected//
    function computersTurn() {
        //This boolean is needed for our while loop//
        let success = false;
        //This variable stores a random number 0-8//
        let pickASquare;
        //This condition allows our while loop to keep trying if a square is selected already//
        while(!success) {
            //A random number between 0-8 is selected//
            pickASquare = String(Math.floor(Math.random() * 9));
            //If the random number evealuated returns true, the square hasn't been selected yet//
            if(placeXOrO(pickASquare)){
                //This line calls the function//
                placeXOrO(pickASquare);
                //This changes our boolean and ends the loop//
                success = true;
            };
        }
    }
}


//This function parse the selectedSqaures array to search for win conditions//
//drawWinLine function is calle to draw line if condition is met//
function checkWinConditions(){
    //x 0, 1, 2 condition//
    if      (arrayIncludes("0x", "1x", "2x")) { drawWinLine(50,100,558,100)}
    //x 3, 4, 5 condition//
    else if (arrayIncludes("3x", "4x", "5x")) { drawWinLine(50,304,558,304)}
    //x 6, 7, 8 condition//
    else if (arrayIncludes("6x", "7x", "8x")) { drawWinLine(50,508,558,508)}
    //x 0, 3, 6 condtion//
    else if (arrayIncludes("0x", "3x", "6x")) { drawWinLine(100,50,100,558)}
    //x 1, 4, 7 condition//
    else if (arrayIncludes("1x", "4x", "7x")) { drawWinLine(304,50,304,558)}
    //x 2, 5, 8 condition//
    else if (arrayIncludes("2x", "5x", "8x")) { drawWinLine(508,50,508,558)}
    //x 6, 4, 2 condition//
    else if (arrayIncludes("6x", "4x", "2x")) { drawWinLine(100,508,510,90)}
    //x 0, 4, 8 condition//
    else if (arrayIncludes("0x", "4x", "8x")) { drawWinLine(100,100,520,520)}
    //o 0, 1, 2 condition//
    else if (arrayIncludes("0o", "1o", "2o")) { drawWinLine(50,100,558,100)}
    //o 3, 4, 5 condition//
    else if (arrayIncludes("3o", "4o", "5o")) { drawWinLine(50,304,558,304)} 
    //o 6, 7, 8 condition//
    else if (arrayIncludes("6o", "7o", "8o")) { drawWinLine(50,508,558,508)}
    //o 0, 3, 6 condition//
    else if (arrayIncludes("0o", "3o", "6o")) { drawWinLine(100,50,100,558)}
    //o 1, 4 ,7 condition//
    else if (arrayIncludes("1o", "4o", "7o")) { drawWinLine(304,50,304,558)}
    //o 2, 5, 8 condition//
    else if (arrayIncludes("2o", "5o", "8o")) { drawWinLine(508,50,508,558)}
    //o 6, 4, 2 condition//
    else if (arrayIncludes("6o", "4o", "2o")) { drawWinLine(100,508,510,90)}
    //o 0, 4,8 conndition//
    else if (arrayIncludes("0o", "4o", "8o")) { drawWinLine(100,100,520,520)}            
    //This condition checks for a tie. If none of the above conditions register and 9//
    //squares are selected the code executes//
    else if(selectedSqaures.length >= 9) {
        //This function plays a tie game sound//
        audio("./media/tie2.mp3");
        //This function sets a .3 second timer before the resetGame is called//
        setTimeout(function () { resetGame(); }, 1000);
    }
    //This fucntion checks if an array includes 3 strings. It is used to check//
    //each win condition//
    function arrayIncludes(squareA, squareB, squareC) {
        //These 3 variabels will be used to check for 3 in a row//
        const a = selectedSqaures.includes(squareA);
        const b = selectedSqaures.includes(squareB);
        const c = selectedSqaures.includes(squareC);
        //If the 3 variables we pass are all included in our array, true is//
        //returned and our else if condition executes//
        if(a === true && b === true && c === true) { return true}
    }
}

//This function makes our body element temporarily unclickable//
function disableClick() {
    //This makes our body unclickable//
    body.style.pointerEvents = "none";
    //This makes our body clickable again  after 1 second//
    setTimeout(function() {body.style.pointerEvents = "auto";}, 1000);
}

//This function takes a string parameter of the path you set earlier for//
//placement sound (./media/place.mp3)//
function audio(audioURL) {
    //We create a new audio object and we pass the path as a parameter//
    let audio = new Audio(audioURL);
    //play method plays our audio sound//
    audio.play();
}


//This function utilizes html canvas to draw win lines//
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
//This line accesses our HTML canvas element//
    const canvas = document.getElementById("win-lines")
    //This line gives is access to methods and properties to use on canvas//
    const c = canvas.getContext('2d');
    //This line indicates where the start of a line's x axis is//
    let x1 = coordX1,
        //This line indicates where the start of a line's y axis is//
        y1 = coordY1,
        //This line indicates where the end of a line's x axis is//
        x2 = coordX2,
        //This line indicates where the end of a line's y axis is//
        y2 = coordY2,
        //This variable stores temporary x axis data while we update in our animation loop//
        x = x1,
        //This variable stores temporary y axis data while we update in our animation loop//
        y = y1;


    //This function interacts with the canvas//
    function animateLineDrawing() {
        //This variable creates a loop//
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        //This method clears content drom last loop iteration//
        c.clearRect(0,0,608,608)
        //This method starts a new path//
        c.beginPath();
        //This method moves us to a starting point for our line//
        c.moveTo(x1,y1);
        //This methos indicates the end point of our line//
        c.lineTo(x, y)
        //This method sets the width of our line//
        c.lineWidth = 10;
        //This method sets the color of our line//
        c.strokeStyle = "rgba(70,255,33,0.8)";
        //This method draws everything laid out above//
        c.stroke();
        //This condition checks if we've reached the endpoint//
        if (x1 <= x2 && y1 <= y2) {
            //This condition adds 10 to the previous end x point//
            if (x <x2) { x+= 10; }
            //This condition adds 10 to the previous y end point//
            if (y < y2) { y += 10; }
            //This condition cancels our animation loop//
            //if we've reached the end points//
            if (x >= x2 && y >= y2) {cancelAnimationFrame(animationLoop);}
        }
        //This condition is similar to the one above//
        //This is necessary for the 6, 4, 2 win condition//
        if (x1 <= x2 && y1 >= y2){
            if (x < x2) { x+= 10; }
            if (y > y2) { y-= 10; }
            if (x >=x2 && y <= y2) { cancelAnimationFrame(animationLoop);}
        }

    }
    //This function clears ourr canvas after our win line is drawn//
    function clear() {
        //This line starts our animation loop//
        const animationLoop = requestAnimationFrame(clear);
        //This line clears our canvas//
        c.clearRect(0,0,608,608);
        //This line stops our animation loop//
        cancelAnimationFrame(animationLoop);
    }
    //This line disables clickling while the win sound is playing//
    disableClick();
    //This line plays the win sound//
    audio("./media/winGame2.mp3");
    //This line calls our main animation loop//
    animateLineDrawing();
    //This line waits 1 second, then clears canvas, resets game, and allows clicking again//
    setTimeout(function() {clear(); resetGame(); }, 1000);
}

//This function resets the game in the event of a tie or a win//
function resetGame() {
    //This loop iterates through each HTML square element//
    for (let i = 0; i < 9; i++) {
        //This variable gets the html element of i//
        let square = document.getElementById(String(i))
        //This removes background image//
        square.style.backgroundImage = ""
    }
    //This resets our array so it is empty and we can start over//
    selectedSqaures = [];
}