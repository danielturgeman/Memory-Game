// starting prototype JS code, to begin with
// boolean flipped = false(question) when we flip, set true, background img.
//also need to work on cards[] array and set their flipped values to true if they match


//empty card array, need to initialize (class of unflipped cards)
var cards = [];

var cardsFlipped = []; //global array to hold two cards that were flipped

// question background img
var question = "./img/question.png";

//to hold "flipped" background images
var images =  ["blake", "carmelo", "curry", "lebron", "kobe", "westbrook",
               "blake", "carmelo", "curry", "lebron", "kobe", "westbrook"];

var wrongAttempts = 0;

//go over this function after, it shuffles the array
var shuffleImages = function (){
   
   for(var i = images.length-1; i>0; i--){
       var j = Math.floor(Math.random() * (i+1));
       var temp = images[i];
       images[i] = images[j];
       images[j] = temp;
   }
}


//Initialize cards
var setBoard = function(){
    cards = document.getElementsByClassName("card");
    for(var i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', showImage);
        cards[i].setAttribute("data-flipped", false); //cards are unflipped
        cards[i].setAttribute("data-name", images[i])
    }
}

var showImage = function(){
    var card = this;
    console.log(card.getAttribute("data-flipped"));
    console.log(cardsFlipped);
        //can change condition to < 2 and perhaps change it to a counter instead of array, lets push name attribute!
        //cardsFlipped.push(card.getAttribute("name"))
    if(cardsFlipped.length < 2 && card.getAttribute("data-flipped") == "false"){ //if cardsflipped is not two and card hasnt been flipped
        //call on function that compares two objects so we need to retrieve the two objects that were called from
        
        card.style.backgroundImage = 'url(./img/'+ card.getAttribute("data-name") + '.png)'; // this works - template for flipping
        card.setAttribute("data-flipped", true);
        cardsFlipped.push(card); //cardsFlipped length was not two up to this point, but after the push it can turn to two 
                    //so call on method now and check condition inside the method rather than checking
        
        if(cardsFlipped.length == 2){
             setTimeout(function () {
         compareCards(); }, 500);
        }
      }
    }


var compareCards = function (){ //cardsFlipped will always have 2 cards, compare and pop //if cardsFlipped[0] == cardsFlipped[1] --> if the name attributes are equal THEN
                                // retrieve elements using document.getElementsByName
        if(cardsFlipped[0].getAttribute("data-name") == cardsFlipped[1].getAttribute("data-name")){
            checkForWinner();
            
        }
       
        else{ //try method- background images don't match // perhaps comparing by class is better.. 
                //2 seperate arrays... 4 pictures which ones do we flip back? the ones that flip is true??? but 
            
            cardsFlipped[0].style.backgroundImage = "url('" + question + "')";
            cardsFlipped[1].style.backgroundImage = "url('" + question + "')";

            //important reset flip values
            cardsFlipped[0].setAttribute("data-flipped", false); 
            cardsFlipped[1].setAttribute("data-flipped", false);

            wrongAttempts++;
            document.getElementById("wrong").innerHTML = "Wrong attempts: " + wrongAttempts;
        }

       cardsFlipped = [];
}

var checkForWinner = function (){

    var counter = 0;
        for(var i = 0; i < cards.length; i++){
            if(cards[i].getAttribute("data-flipped") == "true"){
                counter++;
            }
        }

        if(counter == cards.length){ //IF you won
             initializeButtons();
             displayOverlay();
    }
}

var initializeButtons = function (){

    var newGameButton = document.getElementById("new-game");
    var endGameButton = document.getElementById("end-game");
    
    newGameButton.addEventListener('click', function(){
         for(var i = 0; i < cards.length; i++){
            cards[i].setAttribute("data-flipped", false);
            cards[i].style.backgroundImage =  "url('" + question + "')";
         }
         
         document.getElementById("overlay").style.display = "none";
         document.getElementById("wrong").innerHTML = "";
         wrongAttempts = 0;

         shuffleImages(); //reshuffles the image array
         setBoard();    //actually sets the new shuffled images to the cards
    } );

    endGameButton.addEventListener('click', function () {
        document.getElementById("overlay").style.display = "none";
    })

}

var displayOverlay = function(){
    var overlay = document.getElementById("overlay");
    overlay.style.display = "block";
    initializeButtons();
}


var setNewGameButton = function (){

    document.getElementById("new-game2").addEventListener('click', function(){

     for(var i = 0; i < cards.length; i++){
            cards[i].setAttribute("data-flipped", false);
            cards[i].style.backgroundImage =  "url('" + question + "')";
         }

         document.getElementById("wrong").innerHTML = "";
         wrongAttempts = 0;    
         shuffleImages();
         setBoard(); 

});
}

setNewGameButton();
shuffleImages();
setBoard();
