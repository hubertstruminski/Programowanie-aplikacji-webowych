var KeyboardSoundListener = /** @class */ (function () {
    function KeyboardSoundListener() {
        this.channel1 = [];
        this.channel1 = [];
        this.getAudioElements();
        this.addEventListeners();
    }
    KeyboardSoundListener.prototype.getAudioElements = function () {
        this.clapSound = document.querySelector('[data-sound="clap"]');
        this.kickSound = document.querySelector('[data-sound="kick"]');
        this.btnChannel1Play = document.querySelector('#channel1Play');
    };
    KeyboardSoundListener.prototype.addEventListeners = function () {
        var _this = this;
        document.addEventListener('keypress', function (e) { return _this.onKeyDown(e); });
        this.btnChannel1Play.addEventListener('click', function (e) { return _this.onChannel1Play(e); });
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
    KeyboardSoundListener.prototype.playSound = function (key) {
        switch (key) {
            case 'a':
                this.clapSound.currentTime = 0;
                this.clapSound.play();
                break;
            case 's':
                this.kickSound.currentTime = 0;
                this.kickSound.play();
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
        this.audioPlayers = [];
        this.init();
    }
    RecordingListener.prototype.init = function () {
        this.getRecordingElements();
        this.addStartEventListeners();
    };
    RecordingListener.prototype.getRecordingElements = function () {
        this.processButtons(document.querySelectorAll('.btnStart'), this.startRecordingButtons);
        this.processButtons(document.querySelectorAll('.btnStop'), this.stopRecordingButtons);
        this.processAudioPlayers(document.querySelectorAll('.audioElement'), this.audioPlayers);
        this.processSpinners(document.querySelectorAll('.spinners'), this.spinners);
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
    RecordingListener.prototype.addStartEventListeners = function () {
        var _this = this;
        this.startRecordingButtons.forEach(function (element) {
            var button = element.button, index = element.index;
            button.addEventListener('click', function (e) { return _this.getUserMedia(e, index); });
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
            // const audioSave = document.querySelector('#aud2') as HTMLAudioElement;
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
