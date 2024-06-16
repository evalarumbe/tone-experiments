/**
 * Init
 * 
 * Default bpm:     120
 * Routing concept: synth -> effect -> output
 */

function init() {
  const rig = new Rig();

  // Select DOM nodes
  const playToneButton = document.querySelector('#play-tone');
  const fdToneButton = document.querySelector('#fd-tone');
  const fdAudioButton = document.querySelector('#fd-audio');
  const psToneButton = document.querySelector('#ps-tone');
  const psAudioButton = document.querySelector('#ps-audio');
  const muteButton = document.querySelector('#mute');

  // Add listeners
  // TODO: trigger rig methods: toggleInput => which in turn triggers toggleSynth, toggleAudioPlayer
  // playToneButton.addEventListener('click', playTone);
  // fdToneButton.addEventListener('click', playToneWithFeedbackDelay);
  // fdAudioButton.addEventListener('click', playAudioWithFeedbackDelay);
  // psToneButton.addEventListener('click', pitchShiftTone);
  // psAudioButton.addEventListener('click', pitchShiftAudio);
  muteButton.addEventListener('click', rig.toggleMute);
}

window.addEventListener('load', init);

class Rig {
  constructor() {
    // declare properties
    this.outputVol = new Tone.Volume(-12);
    
    // bind event handlers
    this.toggleMute = this.toggleMute.bind(this);

    // init
    this.outputVol.toDestination();
  }

  toggleMute() {
    this.outputVol.mute = !this.outputVol.mute;
    console.log(`Muted? ${this.outputVol.mute}`)
  }
}
