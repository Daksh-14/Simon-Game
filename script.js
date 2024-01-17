let buttonColours=['red','blue','green','yellow'],gamePattern=[],userClickedPattern=[]
let level=0,start=false,count=0
let button_start=document.getElementById("Start")
const playSound=(color)=>{
    let aud=new Audio(`./sounds/${color}.mp3`)
    aud.play()
}
const animatePress=(x)=>{
    let temp=document.getElementById(x)
    temp.classList.add("pressed")
    setTimeout(()=>{
        temp.classList.remove("pressed")
    },150
    )
}
const refresh=()=>{
    level=0;
    userClickedPattern=[]
    gamePattern=[]
    start=true
}
const game=()=>{
    button_start.setAttribute("hidden",true);
    
    refresh()
    nextSequence()
}
const game1=()=>{
    button_start.setAttribute("hidden",true);
    
    refresh()
    nextSequence()
}
const nextSequence=()=>{
    let randomNumber=Math.floor(Math.random()*4)
    let randomChosenColour=buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    let x=document.getElementById(randomChosenColour)
    x.style.transition = "none";
    playSound(randomChosenColour)
    x.style.opacity = 0.4;
    setTimeout(() => {
        x.style.opacity = 1;
        x.style.transition = "opacity 0.2s";
    }, 200);
    level++;
    document.getElementById("level-title").textContent=`Level ${level}`
}

const game_over=()=>{
    refresh()
    start=false;
    document.body.classList.add("game-over")
    setTimeout(()=>{
        document.body.classList.remove("game-over")
    },100)
    document.addEventListener("keydown",game)
    document.getElementById("level-title").textContent=`Game Over! Press any key to restart`
    let aud=new Audio(`./sounds/wrong.mp3`)
    aud.play();
    button_start.hidden=false
    button_start.innerHTML=`<p>Restart</p>`
    
}

const check=()=>{
    for(let i=0;i<userClickedPattern.length;i++){
        if(userClickedPattern[i]!=gamePattern[i]){
            game_over();
            return
        }
    }
    if(userClickedPattern.length===gamePattern.length){
        userClickedPattern=[]
        setTimeout(()=>{
        nextSequence()

        },1000)        
    }
}



button_start.addEventListener("click",game1);

document.addEventListener("keydown",game)
for(let i=0;i<4;i++){
    document.querySelectorAll(".btn")[i].addEventListener("click",function(){
        let userChosenColour=this.id
        animatePress(userChosenColour)
        userClickedPattern.push(userChosenColour)
        playSound(userChosenColour)
        if(start) check()
        else game_over()
    })
    
}