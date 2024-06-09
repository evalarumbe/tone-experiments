/**
 * Init
 */

function init() {
  // Select DOM nodes
  const playToneButton = document.querySelector('#play-tone');
  const psToneButton = document.querySelector('#ps-tone');
  const psAudioButton = document.querySelector('#ps-audio');

  // Add listeners
  playToneButton.addEventListener('click', playTone);
  psToneButton.addEventListener('click', pitchShiftTone);
  psAudioButton.addEventListener('click', pitchShiftAudio);
}

window.addEventListener('load', init);


/**
 * Lib
 */
  
function playTone() {
  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();
  
  //play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease('C4', '8n');
}

function pitchShiftTone() {
  console.log("PitchShift the tone");
  // TODO
}

function pitchShiftAudio() {
  console.log("PitchShift the audio");
  // TODO
}
