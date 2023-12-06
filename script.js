var randomColor = ["green", "yellow", "blue", "red"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var started = false;



$(document).on("keydown", function(){
    if (!started) {
        sequence();
    }
})

$(".color").on("click", function(){
   var userChosenColor = $(this).attr("id");
   userClickedPattern.push(userChosenColor);
   playSound(userChosenColor);
   checkAnswer(userClickedPattern.length-1);
   animatePress(userChosenColor);
})


function sequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var random = randomColor[Math.floor(Math.random() * 4)];
    gamePattern.push(random);
    $("#" + random).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(random);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

function checkAnswer(checkLevel) {
    if(gamePattern[checkLevel] === userClickedPattern[checkLevel]) {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                sequence();
            }, 1000)
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)

        $("h1").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}

function animatePress(clicked) {
    $("#" + clicked).addClass("pressed");

    setTimeout(function(){
        $("#" + clicked).removeClass("pressed");
    }, 100);
}