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
  // Set up dummy data
  const placeholderSounds = [
    {
      'id': 557976,
      'url': 'https://cdn.freesound.org/previews/557/557976_12396743-lq.mp3',
    },
    {
      'id': 557977,
      'url': 'https://cdn.freesound.org/previews/557/557977_12396743-lq.mp3',
    },
    {
      'id': 557978,
      'url': 'https://cdn.freesound.org/previews/557/557978_12396743-lq.mp3',
    },
    {
      'id': 557979,
      'url': 'https://cdn.freesound.org/previews/557/557979_12396743-lq.mp3',
    },
    {
      'id': 557980,
      'url': 'https://cdn.freesound.org/previews/557/557980_12396743-lq.mp3',
    },
  ];

  // Start the Rig
  const rig = new Rig(placeholderSounds);

  // Select DOM nodes
  const sound0Toggle = document.querySelector('#sound-0');
  const sound1Toggle = document.querySelector('#sound-1');
  const sound2Toggle = document.querySelector('#sound-2');
  
  const fxFeedbackDelay = document.querySelector('#fx-fd');
  const fxPitchShift = document.querySelector('#fx-ps');
  const fxLowPassFilter = document.querySelector('#fx-lpf');

  const muteToggle = document.querySelector('#mute');

  // Add listeners
  sound0Toggle.addEventListener('click', rig.togglePlayer0);
  sound1Toggle.addEventListener('click', rig.togglePlayer1);
  sound2Toggle.addEventListener('click', rig.togglePlayer2);

  fxFeedbackDelay.addEventListener('click', () => rig.toggleEffect(rig.feedbackDelay));
  fxPitchShift.addEventListener('click', () => rig.toggleEffect(rig.pitchShift));
  fxLowPassFilter.addEventListener('click', () => rig.toggleEffect(rig.lowPassFilter));

  muteToggle.addEventListener('click', rig.toggleMute);
}

// endpoint is an array with at least 3 sounds, e.g. placeholderSounds
function getRandomSounds(endpoint) {  
  const threeRandomSounds = [];
  
  const getRandomSound = endpoint => endpoint[
      Math.floor(Math.random() * endpoint.length)
    ];
  
  while (threeRandomSounds.length < 3) {
    const randomSound = getRandomSound(endpoint);

    // if we haven't selected this sound yet, push it
    if (!threeRandomSounds.includes(randomSound)) {
      threeRandomSounds.push(randomSound);
    } else {
      // keep trying for a unique sound
      continue;
    }
  }

  return threeRandomSounds;
}

class Rig {
  constructor(endpoint) {    
    // callbacks to be populated by this.instantiateAudioPlayers (must be declared before calling instantiateAudioPlayers())
    this.togglePlayer0 = function() {};
    this.togglePlayer1 = function() {};
    this.togglePlayer2 = function() {};

    this.players = this.instantiateAudioPlayers(getRandomSounds(endpoint)); // to contain 3 x Tone.Player

    // declare components that will be routed to output
    this.activePlayers = []; // to contain 0 to 3 strings (player names)
    this.activeEffects = []; // to contain 0 to 3 effects

    // instantiate effects
    this.feedbackDelay = new Tone.FeedbackDelay({
      feedback: 0.3,
      delayTime: 0.7,
      wet: 0.7,
    });
    this.pitchShift = new Tone.PitchShift(7); // up a fifth
    this.lowPassFilter =  new Tone.Filter({
      frequency: 'C4',
      type: 'lowpass',
    });
    
    // bind event handlers
    this.togglePlayer = this.togglePlayer.bind(this);
    this.toggleEffect = this.toggleEffect.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }

  instantiateAudioPlayers(randomSounds) {
    const players = new Tone.Players({});
    
    randomSounds.forEach((sound, index) => {
      const playerName = sound.id.toString();

      players.add(playerName, sound.url);
      players.player(playerName).loop = true;

      // If a placeholder property exists for this index
      // E.g. this.togglePlayer0, this.togglePlayer1, this.togglePlayer2
      if (this[`togglePlayer${index}`]) {
        // Populate it with a callback to toggle this sound
        this[`togglePlayer${index}`] = () => this.togglePlayer(playerName);
      }
    });

    return players;
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
    if (this.activeEffects.includes(effect)) {
      // remove it
      const index = this.activeEffects.indexOf(effect);
      this.activeEffects.splice(index, 1); // remove 1 item at index (modifies original array)
    } else {
      // add it
      this.activeEffects.push(effect);
    }

    this.refreshRoutes();
  }

  toggleMute() {
    Tone.Destination.mute = !Tone.Destination.mute;
  }

  // Reroute audio whenever an player source or effect is added/removed
  refreshRoutes() {
    // reset effects
    this.players.disconnect();
    
    // reset players
    this.players.stopAll();

    // enable active players
    this.activePlayers.forEach(playerName => {
      this.players.player(playerName).start();
    });

    // enable active effects
    this.players.chain(...this.activeEffects, Tone.Destination);
  }
}
