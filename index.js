/**
 * Init
 * 
 * Default bpm:     120
 * Routing concept: synth -> effect -> output
 */

function init() {
  // Select DOM nodes
  const playToneButton = document.querySelector('#play-tone');
  const fdToneButton = document.querySelector('#fd-tone');
  const fdAudioButton = document.querySelector('#fd-audio');
  const psToneButton = document.querySelector('#ps-tone');
  const psAudioButton = document.querySelector('#ps-audio');

  // Add listeners
  playToneButton.addEventListener('click', playTone);
  fdToneButton.addEventListener('click', playToneWithFeedbackDelay);
  fdAudioButton.addEventListener('click', playAudioWithFeedbackDelay);
  psToneButton.addEventListener('click', pitchShiftTone);
  psAudioButton.addEventListener('click', pitchShiftAudio);
}

window.addEventListener('load', init);


/**
 * Lib
 */

function playTone() {
  // create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();
  
  // play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease('C4', '8n');
}

function playToneWithFeedbackDelay() {
  // create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth();
  // delay the input for intervals of a dotted 8th note
  // each delay plays at 70% of the volume of the previous
  // const feedbackDelay = new Tone.FeedbackDelay("8n.", 0.7);
  const feedbackDelay = new Tone.FeedbackDelay({
    feedback: 0.3,
    delayTime: 0.7,
    // maxDelay: 2, // default is 1 sec. If you want greater delayTime, you must manually adjust maxDelay. 
    // delayTime: 2, // maxDelay must be equal or larger to this number, otherwise you'll see an error saying it's "clamped" to the maxDelay value
    wet: 0.7,
  });

  // think of .connect like an audio cable
  synth.connect(feedbackDelay);
  feedbackDelay.toDestination();

  // play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease('C4', '8n');
}

function playAudioWithFeedbackDelay() {
  const player = new Tone.Player('2023-07-20-Blind-studio-session---Simon-+-Eva-G-80bpm.mp3');
  const feedbackDelay = new Tone.FeedbackDelay('8n', 0.5);
  
  player.connect(feedbackDelay);
  feedbackDelay.toDestination();
  
  player.autostart = true;
}

function pitchShiftTone() {
  console.log("PitchShift the tone");
  // TODO
}

function pitchShiftAudio() {
  console.log("PitchShift the audio");
  // TODO
}
