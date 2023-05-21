var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red","blue","green","yellow"];

var started = false;

var level = 0;

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("h1").html("Level "+level);
    var randomNumber = Math.floor(Math.random()*3)+1;

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    

    playSound(randomChosenColour);
    
    
}

function playSound(name){
    var audio = new Audio(name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}


$(document).on("keypress",function(){
    if (!started) {
        $("h1").text("Level " + level);
    nextSequence();
    started = true;
    }
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
    
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
        } else {

            console.log("wrong");
            var audio = new Audio('wrong.mp3');
            audio.play();

            $("body").addClass("game-over");
            setTimeout(function () {
            $("body").removeClass("game-over");
            }, 1000);

            $("h1").html("Game over, Press any key to restart");

            startOver();
          }
}

function startOver(){
    level=0;
    gamePattern = [];
    started=false;
}