var KeyboardSoundListener = /** @class */ (function () {
    function KeyboardSoundListener() {
        this.channel1 = [];
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
    KeyboardSoundListener.prototype.getAudioElements = function () {
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
    };
    KeyboardSoundListener.prototype.addEventListeners = function () {
        var _this = this;
        document.addEventListener('keypress', function (e) { return _this.onKeyDown(e); });
        this.btnChannel1Play.addEventListener('click', function () { return _this.onChannel1Play(); });
        this.btnClap.addEventListener('click', function () { return _this.play(_this.clapSound); });
        this.btnKick.addEventListener('click', function () { return _this.play(_this.kickSound); });
        this.btnRide.addEventListener('click', function () { return _this.play(_this.rideSound); });
        this.btnSnare.addEventListener('click', function () { return _this.play(_this.snareSound); });
        this.btnTink.addEventListener('click', function () { return _this.play(_this.tinkSound); });
    };
    KeyboardSoundListener.prototype.onChannel1Play = function () {
        var _this = this;
        this.channel1.forEach(function (sound) {
            setTimeout(function () { return _this.playSound(sound.key); }, sound.time);
        });
    };
    KeyboardSoundListener.prototype.onKeyDown = function (e) {
        this.channel1.push({ key: e.key, time: e.timeStamp });
        this.playSound(e.key);
    };
    KeyboardSoundListener.prototype.play = function (element) {
        element.currentTime = 0;
        element.play();
    };
    KeyboardSoundListener.prototype.playSound = function (key) {
        switch (key) {
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
    };
    return KeyboardSoundListener;
}());
var RecordingListener = /** @class */ (function () {
    function RecordingListener() {
        this.startRecordingButtons = [];
        this.stopRecordingButtons = [];
        this.spinners = [];
        this.checkboxes = [];
        this.audioPlayers = [];
        this.init();
    }
    RecordingListener.prototype.init = function () {
        this.getRecordingElements();
        this.addStartEventListeners();
        this.addPlayChannelsListener();
    };
    RecordingListener.prototype.getRecordingElements = function () {
        this.processButtons(document.querySelectorAll('.btnStart'), this.startRecordingButtons);
        this.processButtons(document.querySelectorAll('.btnStop'), this.stopRecordingButtons);
        this.processAudioPlayers(document.querySelectorAll('.audioElement'), this.audioPlayers);
        this.processSpinners(document.querySelectorAll('.spinners'), this.spinners);
        this.processCheckboxes(document.querySelectorAll('.checkboxes'), this.checkboxes);
        this.playChannelsButton = document.querySelector('#channelsButton');
    };
    RecordingListener.prototype.processButtons = function (buttons, targetButtons) {
        buttons.forEach(function (button, index) {
            var newObject = { index: index, button: button };
            targetButtons.push(newObject);
        });
    };
    RecordingListener.prototype.processAudioPlayers = function (players, targetPlayers) {
        players.forEach(function (player, index) {
            var newObject = { player: player, mediaRecorder: null, index: index };
            targetPlayers.push(newObject);
        });
    };
    RecordingListener.prototype.processSpinners = function (spinners, targetSpinners) {
        spinners.forEach(function (spinner, index) {
            var newObject = { spinner: spinner, index: index };
            spinner.style.display = "none";
            targetSpinners.push(newObject);
        });
    };
    RecordingListener.prototype.processCheckboxes = function (checkboxes, targetCheckboxes) {
        checkboxes.forEach(function (checkbox, index) {
            var newObject = { checkbox: checkbox, index: index };
            targetCheckboxes.push(newObject);
        });
    };
    RecordingListener.prototype.addStartEventListeners = function () {
        var _this = this;
        this.startRecordingButtons.forEach(function (element) {
            var button = element.button, index = element.index;
            button.addEventListener('click', function (e) { return _this.getUserMedia(e, index); });
        });
    };
    RecordingListener.prototype.addPlayChannelsListener = function () {
        var _this = this;
        this.playChannelsButton.addEventListener('click', function () {
            var result = [];
            _this.checkboxes.forEach(function (element) {
                var checkbox = element.checkbox, index = element.index;
                if (checkbox.checked) {
                    _this.audioPlayers.forEach(function (audioPlayer) {
                        if (index === audioPlayer.index) {
                            _this.audioPlayers[index].player.play();
                        }
                    });
                }
            });
        });
    };
    RecordingListener.prototype.getUserMedia = function (e, index) {
        var _this = this;
        var constraints = {
            audio: true,
            video: false
        };
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (mediaStreamObject) {
            var mediaRecoder = new MediaRecorder(mediaStreamObject);
            var chunks = [];
            mediaRecoder.start();
            _this.spinners[index].spinner.style.display = "block";
            console.log(mediaRecoder.state);
            _this.stopRecordingButtons[index].button.addEventListener('click', function () {
                mediaRecoder.stop();
                _this.spinners[index].spinner.style.display = "none";
                console.log(mediaRecoder.state);
            });
            _this.audioPlayers[index].mediaRecorder = mediaRecoder;
            mediaRecoder.ondataavailable = function (event) {
                chunks.push(event.data);
            };
            mediaRecoder.onstop = function () {
                var blob = new Blob(chunks, { 'type': 'audio/mp4;' });
                chunks = [];
                var videoURL = window.URL.createObjectURL(blob);
                _this.audioPlayers[index].player.src = videoURL;
            };
        })["catch"](function (error) {
            console.log(error.name, error.message);
        });
    };
    return RecordingListener;
}());
var keyListener = new KeyboardSoundListener();
var recordingListener = new RecordingListener();
