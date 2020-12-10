// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/5ZC1z7tHz/";
let model, webcam, ctx, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 500;
    const size2 = 450
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size2; canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        // labelContainer.appendChild(document.createElement("div"));
    }
}


//   async function loop() {
//         webcam.update(); // update the webcam frame
//         await predict();
//         window.requestAnimationFrame(loop);
//     }

//     // run the webcam image through the image model
//     async function predict() {
//         // predict can take in an image, video or canvas html element
//             const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
// 		const prediction = await model.predict(webcam.canvas);

// 		let highestProb = 0;
// 		let motion = "";

// 		prediction.forEach(function(pred){
//             if (pred.probability > highestProb) {
//                 highestProb = pred.probability;
// 				chocName = pred.className;
// 			}
// 		});

//         const delayedStoreUserMotion = _.debounce(function(){
//             storeUserMotion(chocName);
//         }, 5000);

// 		if (chocName !== "Nothing"){

//             storeUserMotion(chocName);

// 		}

//             drawPose(pose);
//     }

// ensure that not too many chocolates are added...
// const  throttledStoreUserMotion= _.throttle(storeUserMotion, 5000);




async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);

    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    if (currentMotion !== "") {
        let highestProb = 0;
        let motion = "";

        prediction.forEach(function (pred) {
            if (pred.probability > highestProb) {
                highestProb = pred.probability;
                motion = pred.className;
            }
        });

        if (highestProb == 1 && currentMotion === motion) {
            // bell.play();
            console.log({
                highestProb,
                motion,
                currentMotion
            });

            storeUserMotion(motion)
                .then(function () {
                    showMotion();
                })
        } else {
            // error code here
        }
    } 




    // for (let i = 0; i < maxPredictions; i++) {
    //     const classPrediction =
    //         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //     // labelContainer.childNodes[i].innerHTML = classPrediction;

    //     const pred = prediction[i].probability.toFixed(2);

    //     const pc = prediction[i].className;
    //     console.log({ pc, pred });

    //     if (pc !== 'nothing' && Number(pred) == 1) {

    //         storeUserMotion(pc)

    //     }

    // }

    // finally draw the poses
    drawPose(pose)
    // console.log({pose})
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}

