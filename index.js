/**
 * Init
 */

function init() {
  // Select DOM nodes
  const playToneButton = document.querySelector('#play-tone');
  const fdToneButton = document.querySelector('#fd-tone');
  const psToneButton = document.querySelector('#ps-tone');
  const psAudioButton = document.querySelector('#ps-audio');

  // Add listeners
  playToneButton.addEventListener('click', playTone);
  fdToneButton.addEventListener('click', playToneWithFeedbackDelay);
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

function playToneWithFeedbackDelay() {
  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth();
  const feedbackDelay = new Tone.FeedbackDelay();

  // Routing concept
  // synth -> effect -> output

  // Think of .connect like an audio cable
  synth.connect(feedbackDelay);
  feedbackDelay.toDestination();

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
