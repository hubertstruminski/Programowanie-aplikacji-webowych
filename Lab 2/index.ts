class KeyboardSoundListener {
    clapSound: HTMLAudioElement;
    kickSound: HTMLAudioElement;
    rideSound: HTMLAudioElement;
    snareSound: HTMLAudioElement;
    tinkSound: HTMLAudioElement;

    btnClap: HTMLButtonElement;
    btnKick: HTMLButtonElement;
    btnRide: HTMLButtonElement;
    btnSnare: HTMLButtonElement;
    btnTink: HTMLButtonElement;

    btnChannel1Play: HTMLButtonElement;
    channel1: any[] = [];

    constructor() {
        this.channel1 = [];
        this.getAudioElements();
        this.addEventListeners();
    }
    // <audio src="sounds\ride.wav" data-sound="ride"></audio>
    // <audio src="sounds\snare.wav" data-sound="snare"></audio>
    // <audio src="sounds\tink.wav" data-sound="tink"></audio>

    // <button id="btnClap" class="key-buttons btn btn-primary">Clap</button>
    //             <button id="btnKick" class="key-buttons btn btn-primary">Kick</button>
    //             <button id="btnRide" class="key-buttons btn btn-primary">Ride</button>
    //             <button id="btnSnare" class="key-buttons btn btn-primary">Snare</button>
    //             <button id="btnTink" class="key-buttons btn btn-primary">Tink</button>

    getAudioElements(): void {
        this.clapSound = document.querySelector('[data-sound="clap"]');
        this.kickSound = document.querySelector('[data-sound="kick"]');
        this.rideSound = document.querySelector('[data-sound="ride"]');
        this.snareSound = document.querySelector('[data-sound="snare"]');
        this.tinkSound = document.querySelector('[data-sound="tink"]');

        this.btnClap = document.querySelector('#btnClap');
        this.btnKick = document.querySelector('#btnKick');
        this.btnRide = document.querySelector('#btnRide');
        this.btnSnare = document.querySelector('#btnSnare');
        this.btnTink = document.querySelector('#btnTink');

        this.btnChannel1Play = document.querySelector('#channel1Play');
    }

    addEventListeners(): void {
        document.addEventListener('keypress', (e) => this.onKeyDown(e));
        this.btnChannel1Play.addEventListener('click', () => this.onChannel1Play());
        
        this.btnClap.addEventListener('click', () => this.play(this.clapSound));
        this.btnKick.addEventListener('click', () => this.play(this.kickSound));
        this.btnRide.addEventListener('click', () => this.play(this.rideSound));
        this.btnSnare.addEventListener('click', () => this.play(this.snareSound));
        this.btnTink.addEventListener('click', () => this.play(this.tinkSound));
    }

    onChannel1Play(): void {
        this.channel1.forEach(sound => {
            setTimeout(() => this.playSound(sound.key), sound.time);
        });
    }

    onKeyDown(e: KeyboardEvent): void {
        this.channel1.push({ key: e.key, time: e.timeStamp });
        this.playSound(e.key);
    }

    play(element: HTMLAudioElement): void {
        element.currentTime = 0;
        element.play();
    }
    
    playSound(key: string): void {
        switch(key) {
            case 'a':
                this.play(this.clapSound);
                break;
            case 's':
                this.play(this.kickSound);
                break;
            case 'q':
                this.play(this.rideSound);
                break;
            case 'w':
                this.play(this.snareSound);
                break;
            case 'e':
                this.play(this.tinkSound);
                break;
        }
    }
}

interface UIElement {
    button: HTMLButtonElement;
    index: number;
}

interface AudioElement {
    player: HTMLAudioElement;
    mediaRecorder: MediaRecorder;
    index: number;
}

interface SpinnerElement {
    spinner: HTMLDivElement;
    index: number;
}

interface CheckboxElement {
    checkbox: HTMLInputElement;
    index: number;
}

class RecordingListener {
    startRecordingButtons: UIElement[] = [];
    stopRecordingButtons: UIElement[] = [];
    spinners: SpinnerElement[] = [];
    checkboxes: CheckboxElement[] = [];
    audioPlayers: AudioElement[] = [];
    playChannelsButton: HTMLButtonElement;
    
    constructor() {
        this.init();
    }

    init(): void {
        this.getRecordingElements();
        this.addStartEventListeners();
        this.addPlayChannelsListener();
    }
    
    getRecordingElements(): void {
        this.processButtons(document.querySelectorAll('.btnStart'), this.startRecordingButtons);
        this.processButtons(document.querySelectorAll('.btnStop'), this.stopRecordingButtons);
        this.processAudioPlayers(document.querySelectorAll('.audioElement'), this.audioPlayers);
        this.processSpinners(document.querySelectorAll('.spinners'), this.spinners);
        this.processCheckboxes(document.querySelectorAll('.checkboxes'), this.checkboxes);
        this.playChannelsButton = document.querySelector('#channelsButton');
    }

    processButtons(buttons: NodeListOf<HTMLButtonElement>, targetButtons: UIElement[]): void {
        buttons.forEach((button, index) => {
            const newObject: UIElement = { index, button };
            targetButtons.push(newObject);
        });
    }

    processAudioPlayers(players: NodeListOf<HTMLAudioElement>, targetPlayers: AudioElement[]): void {
        players.forEach((player, index) => {
            const newObject: AudioElement = { player, mediaRecorder: null, index };
            targetPlayers.push(newObject);
        });
    }

    processSpinners(spinners: NodeListOf<HTMLDivElement>, targetSpinners: SpinnerElement[]): void {
        spinners.forEach((spinner, index) => {
            const newObject: SpinnerElement = { spinner, index };
            spinner.style.display = "none";
            targetSpinners.push(newObject);
        });
    }

    processCheckboxes(checkboxes: NodeListOf<HTMLInputElement>, targetCheckboxes: CheckboxElement[]) {
        checkboxes.forEach((checkbox, index) => {
            const newObject: CheckboxElement = { checkbox, index };
            targetCheckboxes.push(newObject);
        });
    }

    addStartEventListeners(): void {
        this.startRecordingButtons.forEach(element => {
            const { button, index } = element;
            button.addEventListener('click', (e) => this.getUserMedia(e, index));
        });
    }

    addPlayChannelsListener(): void {
        this.playChannelsButton.addEventListener('click', () => {
            const result: HTMLAudioElement[] = [];
            this.checkboxes.forEach(element => {
                const { checkbox, index } = element;
                if(checkbox.checked) {
                    this.audioPlayers.forEach(audioPlayer => {
                        if(index === audioPlayer.index) {
                            this.audioPlayers[index].player.play();
                        }
                    });
                }
            });
        });
    }
     
    getUserMedia(e: Event, index: number): void {
        const constraints = {
            audio: true,
            video: false
        }
    
        navigator.mediaDevices.getUserMedia(constraints)
        .then((mediaStreamObject) => {
            const mediaRecoder = new MediaRecorder(mediaStreamObject);
            let chunks = [];
    
            mediaRecoder.start();
            this.spinners[index].spinner.style.display = "block";
            console.log(mediaRecoder.state);
    
            this.stopRecordingButtons[index].button.addEventListener('click', (): void => {
                mediaRecoder.stop();
                this.spinners[index].spinner.style.display = "none";
                console.log(mediaRecoder.state);
            });

            this.audioPlayers[index].mediaRecorder = mediaRecoder;
    
            mediaRecoder.ondataavailable = function(event): void {
                chunks.push(event.data);
            }

            mediaRecoder.onstop = (): void => {
                let blob = new Blob(chunks, { 'type': 'audio/mp4;' });
                chunks = [];
                let videoURL = window.URL.createObjectURL(blob);
                this.audioPlayers[index].player.src = videoURL;
            }
        }).catch(function(error) {
            console.log(error.name, error.message);
        })
    }
}

const keyListener = new KeyboardSoundListener();
const recordingListener = new RecordingListener();

