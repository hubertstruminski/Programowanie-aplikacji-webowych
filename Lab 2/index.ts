let clapSound: HTMLAudioElement;
let kickSound: HTMLAudioElement;

let startRecording: HTMLAudioElement;
let stopRecording: HTMLAudioElement;

appStart();

const channel1: any[] = [];
let mainMediaRecorder = null;

function appStart(): void {
    document.addEventListener('keypress', onKeyDown);
    const btnChannel1Play = document.querySelector('#channel1Play');
    btnChannel1Play.addEventListener('click', onChannel1Play);
    getAudioElements();
    getRecordingElements();
    getUserMedia();
}

function onChannel1Play(): void {
    channel1.forEach(sound => {
        setTimeout(() => playSound(sound.key), sound.time);
    });
}

function getAudioElements(): void {
    clapSound = document.querySelector('[data-sound="clap"]');
    kickSound = document.querySelector('[data-sound="kick"]');
}

function getRecordingElements(): void {
    startRecording = document.querySelector('#btnStart');
    stopRecording = document.querySelector('#btnStop');
}

function getUserMedia(): void {
    const constraints = {
        audio: true,
        video: false
    }

    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStreamObject) {
        // let audio = document.querySelector('#recordAudio') as HTMLAudioElement;
        // audio.srcObject = mediaStreamObject;
        
        const audioSave = document.querySelector('#aud2') as HTMLAudioElement;
        const mediaRecoder = new MediaRecorder(mediaStreamObject);
        let chunks = [];

        startRecording.addEventListener('click', (event): void => {
            mediaRecoder.start();
            console.log(mediaRecoder.state);
        });

        stopRecording.addEventListener('click', (event): void => {
            mediaRecoder.stop();
            console.log(mediaRecoder.state);
        });

        mediaRecoder.ondataavailable = function(event): void {
            chunks.push(event.data);
        }
        mediaRecoder.onstop = (event): void => {
            let blob = new Blob(chunks, { 'type': 'audio/mp4;' });
            chunks = [];
            let videoURL = window.URL.createObjectURL(blob);
            audioSave.src = videoURL;
        }
    }).catch(function(error) {
        console.log(error.name, error.message);
    })
}

function onKeyDown(e: KeyboardEvent): void {
    const key = e.key;
    const time = e.timeStamp;

    channel1.push({ key, time });
    playSound(key);
    console.log(channel1);
}

function playSound(key: string): void {
    switch(key) {
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