var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var i=0;
var started = false;

$(document).keypress(function() {
    if (!started) {
      $("h1").text("Level " + i); 
      nextSequence();
      started = true;
    }
});

$(".btn").click(function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animateColour(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})


function nextSequence()
{
    userClickedPattern=[];
    var randomNumber  =  Math.floor( Math.random() * 4 );
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#"+randomChosenColour).  fadeOut(100).fadeIn(100);
    var title = "level " + ++i;
    $("h1").text(title);
}

function playSound(key) {
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
}

function animateColour(col){
    $("#"+col).addClass("pressed");
    setTimeout(function(){
        $("#"+col).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function() {
            nextSequence();
          }, 1000);
        }
      } 
    else {
        var aud=new Audio("sounds/wrong.mp3");
        aud.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game over, Press Any Key to Restart");
        startOver();
    }
}


function startOver(){
    userClickedPattern =[];
    gamePattern =[];
    i=0;
    started = false;
}