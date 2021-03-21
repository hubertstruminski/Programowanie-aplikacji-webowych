var clapSound;
var kickSound;
var startRecording;
var stopRecording;
appStart();
var channel1 = [];
var mainMediaRecorder = null;
function appStart() {
    document.addEventListener('keypress', onKeyDown);
    var btnChannel1Play = document.querySelector('#channel1Play');
    btnChannel1Play.addEventListener('click', onChannel1Play);
    getAudioElements();
    getRecordingElements();
    getUserMedia();
}
function onChannel1Play() {
    channel1.forEach(function (sound) {
        setTimeout(function () { return playSound(sound.key); }, sound.time);
    });
}
function getAudioElements() {
    clapSound = document.querySelector('[data-sound="clap"]');
    kickSound = document.querySelector('[data-sound="kick"]');
}
function getRecordingElements() {
    startRecording = document.querySelector('#btnStart');
    stopRecording = document.querySelector('#btnStop');
}
function getUserMedia() {
    var constraints = {
        audio: true,
        video: false
    };
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (mediaStreamObject) {
        var audio = document.querySelector('#recordAudio');
        audio.srcObject = mediaStreamObject;
        var audioSave = document.querySelector('#aud2');
        var mediaRecoder = new MediaRecorder(mediaStreamObject);
        var chunks = [];
        startRecording.addEventListener('click', function (event) {
            mediaRecoder.start();
            console.log(mediaRecoder.state);
        });
        stopRecording.addEventListener('click', function (event) {
            mediaRecoder.stop();
            console.log(mediaRecoder.state);
        });
        mediaRecoder.ondataavailable = function (event) {
            chunks.push(event.data);
        };
        mediaRecoder.onstop = function (event) {
            var blob = new Blob(chunks, { 'type': 'audio/mp4;' });
            chunks = [];
            var videoURL = window.URL.createObjectURL(blob);
            audioSave.src = videoURL;
        };
    })["catch"](function (error) {
        console.log(error.name, error.message);
    });
}
function onKeyDown(e) {
    var key = e.key;
    var time = e.timeStamp;
    channel1.push({ key: key, time: time });
    playSound(key);
    console.log(channel1);
}
function playSound(key) {
    switch (key) {
        case 'a':
            clapSound.currentTime = 0;
            clapSound.play();
            break;
        case 's':
            kickSound.currentTime = 0;
            kickSound.play();
            break;
    }
}
