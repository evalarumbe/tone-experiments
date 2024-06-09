function init() {
  const playToneButton = document.querySelector('#play-tone');
  
  function playTone() {
    //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.Synth().toDestination();
    
    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease('C4', '4n');
  }

  playToneButton.addEventListener('click', playTone);
}

window.addEventListener('load', init);

