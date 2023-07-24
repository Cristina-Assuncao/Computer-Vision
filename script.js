// const liveView = document.getElementById("liveView");
// const webcamButton = document.getElementById("webcamButton");
// const webcam = document.getElementById('webcam');

// let model;

// cocoSsd.load().then(function (loadedModel) { // this is a promisse (asynchronous JavaScript) --> when all of the data is available then we do something with that data --> we are being promissed a certain data and once that data was loaded, do something
//     model = loadedModel;
// });

// const getUserMedia = () => {
//     return !!(navigator.getUserMedia && navigator.mediaDevices.getUserMedia); // !! double bang - returns true or false
// };

// const enableWebcam = (event) => {
//     if (!model) { // if there is no data return
//         return;
//     };

//     event.target.classList.add('hidden'); // a new class is going to be added to the exhisting class list, it's called hidden


//     const userMediaProperties = { // by definition media is not available and so we need this in order to request access
//         video: true
//         // audio: true
//     };

//     navigator.mediaDevices.getUserMedia(userMediaProperties).then(function (stream) {
//         //information related to video is going to be stored in 'stream' and is going to prompt it in the webcam
//         webcam.srcObject = stream;
//         webcam.addEventListener("loadeddata", webcamOutput);
//     });
// };

// if (getUserMedia()) { // if we don't add this if statement the programme will crash in case tehre is no webcam available
//     webcamButton.addEventListener("click", enableWebcam); //if the above function is true and there is actually a webcam on click webcam is enabled
// } else {
//     console.warn('Webcam not found');
//     alert('Webcam not found');
// }

// let boundingBoxes = []; // global variable

// const webcamOutput = () => {
//     model.detect(webcam).then(function (modelOutput){
//         for (let i = 0; i < boundingBoxes.lenght; i++) {
//          liveView.removeChild(boundingBoxes[i]); // liveView is the parent div   
//         }
//         boundingBoxes.splice(0); // one way of completely clear the array

//         for (let = 0; x < modelOutput.lenght; x++) {
//             if (modelOutput[x].score > 0.7) {
//                 const p = document.createElement("p"); // we have now a p tag created in memory
//                 // p.innerText = "test";
//                 p.innerText = `${modelOutput[x].class} - with ${Math.round(parseFloat(modelOutput[x].score) * 100)}% confidence.`; // we need to push this to the array (boundingBoxes) and to the screen - to be rendered in the webpage
//                 p.style = `margin-left: ${modelOutput[x].bbox[0]}px; top: ${modelOutput[x.bbox[1]]}px; width: `


//                 liveView.appendChild(p); //endered in the webpage
//                 boundingBoxes.push(p); //push this to the array (boundingBoxes


//             }
//         }

//     });
// };

// //

const liveView = document.getElementById("liveView");
const webcamButton = document.getElementById("webcamButton");
const webcam = document.getElementById('webcam');

let model;

cocoSsd.load().then(function (loadedModel) { // this is a promisse (asynchronous JavaScript) --> when all of the data is available then we do something with that data --> we are being promissed a certain data and once that data was loaded, do something
    model = loadedModel;
});

const getUserMedia = () => {
    return !!(navigator.getUserMedia && navigator.mediaDevices.getUserMedia); // !! double bang - returns true or false
};

const enableWebcam = (event) => {  // if there is no data return
    if (!model) {
        return;
    };

    event.target.classList.add('hidden'); // a new class is going to be added to the exhisting class list, it's called hidden

    const userMediaProperties = { // by definition media is not available and so we need this in order to request access
        video: true
    // audio: true

    };

    navigator.mediaDevices.getUserMedia(userMediaProperties).then(function (stream) {
        webcam.srcObject = stream;
        webcam.addEventListener("loadeddata", webcamOutput);
    });
};

if (getUserMedia()) { 
    webcamButton.addEventListener("click", enableWebcam);
} else {
    console.warn('Webcam not found');
    alert('Webcam not found');
};

let boundingBoxes = []; // global variable

const webcamOutput = () => {
    model.detect(webcam).then(function (modelOutput){
        for (let i = 0; i < boundingBoxes.length; i++) {
            liveView.removeChild(boundingBoxes[i]); // liveView is the parent div 
        }
        boundingBoxes.splice(0); // one way of completely clear the array

       for (let x = 0; x < modelOutput.length; x++) {
        if (modelOutput[x].score > 0.7) {
            const p = document.createElement("p");  // we have now a p tag created in memory
         // p.innerText = "test";
            p.innerText = `${modelOutput[x].class} - with ${Math.round(parseFloat(modelOutput[x].score) * 100)}% confidence.`; // we need to push this to the array (boundingBoxes) and to the screen - to be rendered in the webpage
            p.style = `margin-left: ${modelOutput[x].bbox[0]}px; margin-top: ${modelOutput[x].bbox[1] - 10}px; width: ${modelOutput[x].bbox[2] - 10}px; top: 0; left: 0;`;

            const div = document.createElement("div");
            div.setAttribute("class", "highlighter");
            div.style = `left: ${modelOutput[x].bbox[0]}px; top: ${modelOutput[x].bbox[1]}px; width: ${modelOutput[x].bbox[2]}px; height: ${modelOutput[x].bbox[3]}px;`;

            liveView.appendChild(p); //endered in the webpage
            liveView.appendChild(div);
            boundingBoxes.push(p); //push this to the array (boundingBoxes)
            boundingBoxes.push(div);
        }
       } 
       window.requestAnimationFrame(webcamOutput);
    });
};