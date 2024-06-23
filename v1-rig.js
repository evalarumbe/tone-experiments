/**
 * Init
 * 
 * Default bpm:     120
 * Routing concept: synth -> effect -> output
 */

// Sound check
const playToneButton = document.querySelector('#play-tone');
playToneButton.addEventListener('click', playTone);

function playTone() {
  // create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();
  
  // play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease('C4', '8n');
}

// App

window.addEventListener('load', init);

function init() {
  const rig = new Rig();

  // Select DOM nodes
  const wailToggle = document.querySelector('#wail');
  const strumToggle = document.querySelector('#strum');
  const rumbleToggle = document.querySelector('#rumble');
  
  const fxFeedbackDelay = document.querySelector('#fx-fd');
  const fxPitchShift = document.querySelector('#fx-ps');
  const fxLowPassFilter = document.querySelector('#fx-lpf');

  const muteToggle = document.querySelector('#mute');

  // Add listeners
  wailToggle.addEventListener('click', () => rig.togglePlayer('wail'));
  strumToggle.addEventListener('click', () => rig.togglePlayer('strum'));
  rumbleToggle.addEventListener('click', () => rig.togglePlayer('rumble'));

  fxFeedbackDelay.addEventListener('click', () => rig.toggleEffect(rig.feedbackDelay));
  // fxPitchShift.addEventListener('click', () => rig.toggleEffect(...));
  // fxLowPassFilter.addEventListener('click', () => rig.toggleEffect(...));

  muteToggle.addEventListener('click', rig.toggleMute);
}

class Rig {
  constructor() {
    // instantiate audio players
    this.players = new Tone.Players(
      {
        wail: 'https://cdn.freesound.org/previews/557/557948_12396743-lq.mp3',
        strum: 'https://cdn.freesound.org/previews/557/557978_12396743-lq.mp3',
        rumble: 'https://cdn.freesound.org/previews/558/558018_12396743-lq.mp3',
      },
    );
    this.players.player('wail').loop = true;
    this.players.player('strum').loop = true;
    this.players.player('rumble').loop = true;

    // declare components that will be routed to output
    this.activePlayers = []; // to contain 0 to 3 strings (player names)
    this.activeEffects = []; // to contain 0 to 3 effects

    // instantiate effects
    this.feedbackDelay = new Tone.FeedbackDelay({
      feedback: 0.3,
      delayTime: 0.7,
      wet: 0.7,
    });
    // this.pitchShift = ...;
    // this.lowPassFilter =  ...;
    
    // bind event handlers
    this.togglePlayer = this.togglePlayer.bind(this);
    this.toggleEffect = this.toggleEffect.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }

  togglePlayer(playerName) {    
    if (this.activePlayers.includes(playerName)) {
      // remove it
      const index = this.activePlayers.indexOf(playerName);
      this.activePlayers.splice(index, 1); // remove 1 item at index (modifies original array)
    } else {
      // add it
      this.activePlayers.push(playerName);
    }

    this.refreshRoutes();
  }

  toggleEffect(effect) {
    console.log('\ntoggleEffect\n============');
    console.log('before:', this.activeEffects);
    
    if (this.activeEffects.includes(effect)) {
      // remove it
      const index = this.activeEffects.indexOf(effect);
      this.activeEffects.splice(index, 1); // remove 1 item at index (modifies original array)
    } else {
      // add it
      this.activeEffects.push(effect);
    }

    console.log('after:', this.activeEffects);
    this.refreshRoutes();
  }

  toggleMute() {
    Tone.Destination.mute = !Tone.Destination.mute;
  }

  // Reroute audio whenever an player source or effect is added/removed
  refreshRoutes() {
    this.players.stopAll();

    this.activePlayers.forEach(playerName => {
      this.players.player(playerName).start();
    });

    this.players.chain(...this.activeEffects, Tone.Destination);
  }
}
