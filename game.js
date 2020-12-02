var buttoncolors = ["red", "blue", "green", "yellow"];

var gamepattern = [];

var userclickedpattern = [];

var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;



$(document).keypress(function(){
      if(!started)
    {  //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextsequence();
      started = true;
    }
});


//click detecting by user.........................

$(".btn").click(function() {

  var userchoosencolor =$(this).attr("id");

  userclickedpattern.push(userchoosencolor);

  playsound(userchoosencolor);

  animatepress(userchoosencolor);

  checkanswer(userclickedpattern.length - 1);
});






function checkanswer(currentlevel) {

  if(gamepattern[currentlevel] === userclickedpattern[currentlevel]){
    console.log("sucess");
    if(userclickedpattern.length === gamepattern.length){
        setTimeout(function(){
          nextsequence();
        },1000);
    }
  }
  else
  {
    console.log("False");

    playsound("wrong");

    $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");

      startover();
  }
}

function startover() {
  level = 0;
  gamepattern = [];
  started = false;
}

function nextsequence() {
  userclickedpattern = [];

  level++;

  // Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  //generating randomcolor ..........................
  var randomNumber = Math.floor(Math.random() * 4);

  var randomchoosencolor = buttoncolors[randomNumber];

  gamepattern.push(randomchoosencolor);

  //automatic button flash created..

  $("#"+randomchoosencolor).fadeIn(500).fadeOut(500).fadeIn(500);

  playsound(randomchoosencolor);

}



//making sound function...............................
function playsound(name) {

  var audio = new Audio(name+".mp3");
  audio.play();
}


function animatepress(currentcolor) {
  $("#"+currentcolor).addClass("pressed");


  setTimeout(function(){
    $("#"+currentcolor).removeClass("pressed");
  },100)
}
