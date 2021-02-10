var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var z=0;
var level=0;

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);

  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(element)
{
var audio=new Audio("sounds/"+element+".mp3");
audio.play();
}

$(".box").click(function(event){handler(event.target.id);});

function handler(element){
  var userChosenColour =element;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  var userClickedPatternLength =userClickedPattern.length;
  checkAnswer(userClickedPatternLength-1);
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){$("."+currentColor).removeClass("pressed");},100);
}

$(document).keydown(function(){
  if(z==0)
  {
    nextSequence();
    z++;
  }
})

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
  {
    if(gamePattern.length==userClickedPattern.length)
    setTimeout(function(){nextSequence();},1000);
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    $("h1").text("Game Over, Press any key to restart");
    startOver();
  }
}

function startOver()
{
  level=0;
  gamePattern=[];
  z=0;
}
