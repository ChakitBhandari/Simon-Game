var buttonColours = ["red","blue","green","yellow"]
var start = false;
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var clicked = 0;


function checkAnswer(){
    console.log("Inside check Answer!!");
    for(var i=0;i<gamePattern.length;++i){
        if(gamePattern[i] != userClickedPattern[i])
        return false;
    }
    return true;
}

function nextSequence(){
    level += 1;
    $("#level-title").text("Level " + level);
    return Math.floor(Math.random() * 4);
}

function next_seq_helper(){
    var random_no = nextSequence();
    var cur_color = buttonColours[random_no];
    gamePattern.push(cur_color);
    playSound(cur_color);
    $("#" + cur_color).fadeOut(100).fadeIn(100);
}

function playSound(color){
    var url = "sounds/" + color + ".mp3";
    var audio = new Audio(url);
    console.log(audio);
    audio.play();
}

function animatePress(color){
    $("#" + color).addClass("pressed");
    setInterval(function(){
        $("#" + color).removeClass("pressed");
    },100);
}


$("body").keydown(function(){
    if(start == false){
        $("body").css("background-color","#011F3F");
        console.log("inside keydown!!");
        start = true;
        next_seq_helper();
    }
});


$(".btn").click(function(){
    if(start == true){
        console.log("click function!!");
        var color = $(this).attr("id");
        animatePress(color);
        playSound(color);
        userClickedPattern.push(color);
        if(color != gamePattern[clicked]){
            //Game over
            level = 0;
            clicked = 0;
            start = false;
            gamePattern = [];
            userClickedPattern = [];
            $("h1").text("Game Over, Press Any Key to Restart");
            playSound("wrong");
            $("body").css("background-color","red");
        }else{  
            clicked++;
            if(clicked == gamePattern.length){
                clicked = 0;
                setTimeout(function (){
                    next_seq_helper();
                },1000);
            }
        }
    }
});
