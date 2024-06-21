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
  const in0 = document.querySelector('#in-audio-0');
  const in1 = document.querySelector('#in-audio-1');
  const in2 = document.querySelector('#in-audio-2');
  
  const fxFeedbackDelay = document.querySelector('#fx-fd');
  const fxPitchShift = document.querySelector('#fx-ps');
  const fxLowPassFilter = document.querySelector('#fx-lpf');

  const muteButton = document.querySelector('#mute');

  // Add listeners
  in0.addEventListener('click', () => rig.toggleInput(rig.player0));
  in1.addEventListener('click', () => rig.toggleInput(rig.player1));
  in2.addEventListener('click', () => rig.toggleInput(rig.player2));

  fxFeedbackDelay.addEventListener('click', () => rig.toggleEffect(rig.feedbackDelay));
  // fxPitchShift.addEventListener('click', () => rig.toggleEffect(...));
  // fxLowPassFilter.addEventListener('click', () => rig.toggleEffect(...));

  muteButton.addEventListener('click', rig.toggleMute);
}

class Rig {
  constructor() {
    // declare components that will be routed to output
    this.inputs = []; // to contain 0 to 3 players
    this.effects = []; // to contain 0 to 3 effects

    // instantiate audio players
    this.player0 = new Tone.Player({
      url: 'https://cdn.freesound.org/previews/557/557977_12396743-lq.mp3',
      loop: true
    });

    this.player1 = new Tone.Player({
      url: 'https://cdn.freesound.org/previews/557/557978_12396743-lq.mp3',
      loop: true
    });

    this.player2 = new Tone.Player({
      url: 'https://cdn.freesound.org/previews/558/558018_12396743-lq.mp3',
      loop: true
    });

    // instantiate effects
    this.feedbackDelay = new Tone.FeedbackDelay({
      feedback: 0.3,
      delayTime: 0.7,
      wet: 0.7,
    });
    // this.pitchShift = ...;
    // this.lowPassFilter =  ...;
    
    // bind event handlers
    this.toggleInput = this.toggleInput.bind(this);
    this.toggleEffect = this.toggleEffect.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }

  toggleInput(input) {
    console.log('\ntoggleInput\n===========');
    console.log('before:', this.inputs);
    
    if (this.inputs.includes(input)) {
      // remove it
      const index = this.inputs.indexOf(input);
      this.inputs.splice(index, 1); // remove 1 item at index (modifies original array)
    } else {
      // add it
      this.inputs.push(input);
    }

    console.log('after:', this.inputs);
  }

  toggleEffect(effect) {
    console.log('\ntoggleEffect\n============');
    console.log('before:', this.effects);
    
    if (this.effects.includes(effect)) {
      // remove it
      const index = this.effects.indexOf(effect);
      this.effects.splice(index, 1); // remove 1 item at index (modifies original array)
    } else {
      // add it
      this.effects.push(effect);
    }

    console.log('after:', this.effects);
  }

  toggleMute() {
    Tone.Destination.mute = !Tone.Destination.mute;
    console.log(`Muted? ${Tone.Destination.mute}`)
  }
}
