let insertStartElem = document.querySelector(".insertStart")
let modelPageElem = document.querySelector(".modelPage")

let nameElem = document.querySelector(".username");

let startBtn = document.querySelector(".startBtn");

let greetElem = document.querySelector(".greet");
let greetMe = document.querySelector(".greetMe");

let progressElem = document.querySelector(".progress");
let progressTemplateText = document.querySelector('.progressTemplateText').innerHTML;
let progressTemplate = Handlebars.compile(progressTemplateText);


let greetTemplateText = document.querySelector('.greetTemplateText').innerHTML;
let greetTemplate = Handlebars.compile(greetTemplateText);



let videoClipElem = document.querySelector(".videoClip")
let videoTemplateText = document.querySelector('.videoTemplateText').innerHTML;
let videoTemplate = Handlebars.compile(videoTemplateText);

const motions = ["slither", "swim", "stomp", "waddle"];

let motionCount = 0;

let currentMotion;

function showVideo() {
    videoClipElem.innerHTML = videoTemplate({
        motion : motions[motionCount]
    })
}

function greetUser(name) {
    axios
        .get('/api/user/' + name)
        .then(function(results) {
            let response = results.data;
            let data = response.data;
            greetMe.innerHTML = greetTemplate({
                greetMe: data
            });

        });
}

// startBtn.addEventListener("click", greetUser);



startBtn.addEventListener("click", function() {
    
    const name = nameElem.value

    axios
        .post("/api/user", {name})
        .then(function(){
            greetUser(name);
            insertStartElem.classList.toggle('hidden')
            modelPageElem.classList.toggle('hidden')
        }) 
});
const applause = new Audio("applause.mp3")
const bell = new Audio("https://raw.githubusercontent.com/codex-academy/chocolate-app/main/public/audio/bell.mp3")
const error = new Audio("error.mp3")


const storeUserMotion = _.throttle(function (motion){
    return axios
        .post("/api/motion", {motion})
        .then(function(result){
            
            bell.play();

            console.log(result);

        }).catch(err => console.log(err))
}, 5000);

function showMotion() {
    if (motionCount < motions.length) {
        currentMotion = motions[motionCount]
        const message = "Show me how to " + currentMotion;
        question.innerHTML = message;
        showVideo();
        motionCount++;
        //   if(motionCount === 3){

          progressElem.innerHTML = progressTemplate({
            orangePercentage: motionCount * 25
        })
    //   }
      return message;
    } else {
        currentMotion = "";
        question.innerHTML = "You moved well!";
        applause.play();
        // play trumpet
    }
// if(motionCount = 4){

    progressElem.innerHTML = progressTemplate({
        greenPercentage: motionCount * 25
    })
// }
    
     return "You perfected all the moves";
  
}

// question
const question = document.querySelector(".question");
// console.log(question);

const btn = document.querySelector(".btn");

const restartBtn = document.querySelector(".btnRestart");

restartBtn.addEventListener("click", function(){
  motionCount = 0;
  question.innerHTML = showMotion();
});

// console.log(btn);

btn.addEventListener("click", function(){
  question.innerHTML = showMotion();
//   showVideo();
});