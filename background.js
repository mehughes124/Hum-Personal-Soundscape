

chrome.runtime.onInstalled.addListener(function() {
  // set all needed values for page build
  chrome.storage.sync.set({player_volume: '0.3', muted: 'inactive'}, function() {
    console.log("player volume has been set");
  });
  
  // set all individual howl volume levels
  chrome.storage.sync.set({coffeeShop_volume: '0.5', waves_volume: '0.5', leaves_volume: '0.5', rain_volume: '0.5', fire_volume: '0.5', river_volume: '0.5', night_volume: '0.5', fan_volume: '0.5'}, function() {
    console.log("player volume has been set");
  });
  
  // set all individual howl states as inactive
  chrome.storage.sync.set({coffeeShopState: 'inactive', wavesState: 'inactive', leavesState: 'inactive', rainState: 'inactive', fireState: 'inactive', riverState: 'inactive', nightState: 'inactive', fanState: 'inactive'}, function() {
    console.log("button states have been set");
  });
  
  // make sure initial player volume value is passed to Howler
  chrome.storage.sync.get(['player_volume'], function(result) {
    Howler.volume(result.player_volume);
  });
});

// declare sounds as empty objects so we can check if they are created as howls yet later without throwing an error
var coffeeShopSound = {}, 
wavesSound = {}, 
leavesSound = {}, 
rainSound = {}, 
fireSound = {}, 
riverSound = {}, 
nightSound = {}, 
fanSound = {};

// use a boolean for backend muted state and make sure it doesn't get out of sync with storage
var mutedBool = false;
chrome.storage.sync.get(['muted'], function(key) {
  if (key.muted === 'inactive'){
    mutedBool = false;
  }
  else if (key.muted === 'active'){
    mutedBool = true;
  }
});

// this is an array we'll push the created, actively playing Howls to.
// Not used for anything right now, but I have the removeItem function for a reason that didn't pan out and I might as well keep it in case it's useful.
var currentlyPlaying = [];

// big gnarly block for listening for the popup.js calls.
// return true at the end is to make it asynchronous so popup.js knows to wait to call buildPage()
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'pushButton') {
      switch (request.value) {
        case 'coffeeShopSound':
            if (toggleHowl(coffeeShopSound) === 'active'){
              chrome.storage.sync.set({coffeeShopState: 'active'});
            }
            else{
              chrome.storage.sync.set({coffeeShopState: 'inactive'});
            }
          break;
        case 'wavesSound':
          if (toggleHowl(wavesSound) === 'active'){
              chrome.storage.sync.set({wavesState: 'active'});
            }
            else{
              chrome.storage.sync.set({wavesState: 'inactive'});
            }
          break;
        case 'leavesSound':
          if (toggleHowl(leavesSound) === 'active'){
              chrome.storage.sync.set({leavesState: 'active'});
            }
            else{
              chrome.storage.sync.set({leavesState: 'inactive'});
            }
          break;
        case 'rainSound':
          if (toggleHowl(rainSound) === 'active'){
              chrome.storage.sync.set({rainState: 'active'});
            }
            else{
              chrome.storage.sync.set({rainState: 'inactive'});
            }
          break;
        case 'fireSound':
          if (toggleHowl(fireSound) === 'active'){
              chrome.storage.sync.set({fireState: 'active'});
            }
            else{
              chrome.storage.sync.set({fireState: 'inactive'});
            }
          break;
        case 'riverSound':
          if (toggleHowl(riverSound) === 'active'){
              chrome.storage.sync.set({riverState: 'active'});
            }
            else{
              chrome.storage.sync.set({riverState: 'inactive'});
            }
          break;
        case 'nightSound':
          if (toggleHowl(nightSound) === 'active'){
              chrome.storage.sync.set({nightState: 'active'});
            }
            else{
              chrome.storage.sync.set({nightState: 'inactive'});
            }
          break;
        case 'fanSound':
          if (toggleHowl(fanSound) === 'active'){
              chrome.storage.sync.set({fanState: 'active'});
            }
            else{
              chrome.storage.sync.set({fanState: 'inactive'});
            }
          break;
      }
    }
    else if(request.action ==='toggle_mute'){
      console.log("background received mute button click");
      // check mutedBool. If it is true, that means we are currently muted, and need to toggle it
      if (mutedBool){
        chrome.storage.sync.get(['player_volume'], function(result) {
            Howler.volume(result.player_volume);
          });
        chrome.storage.sync.set({muted: 'inactive'});
        mutedBool = false;
      }
      //else, muted is currently true as of the message, so we need to toggle it
      else{
        Howler.volume('0');
        chrome.storage.sync.set({muted: 'active'});
        mutedBool = true;
      }
    }
    else if(request.action ==='volume'){
      chrome.storage.sync.get(['player_volume'], function(result) {
        Howler.volume(result.player_volume);
      });
      chrome.storage.sync.set({muted: 'inactive'});
      mutedBool = false;
    }
    else if (request.action === 'coffeeShop_volume'){
      chrome.storage.sync.get(['coffeeShop_volume'], function(result) {
        if (checkIfHowlHasBeenCreated(coffeeShopSound)){
          coffeeShopSound.volume(result.coffeeShop_volume);
        }
      });
    }
    else if (request.action === 'waves_volume'){
      chrome.storage.sync.get(['waves_volume'], function(result) {
        // if "playing" is in howl, set the volume
        if (checkIfHowlHasBeenCreated(wavesSound)){
          wavesSound.volume(result.waves_volume);
        }
      });
    }
    else if (request.action === 'leaves_volume'){
      chrome.storage.sync.get(['leaves_volume'], function(result) {
        if (checkIfHowlHasBeenCreated(leavesSound)){
          leavesSound.volume(result.leaves_volume);
        }
      });
    }
    else if (request.action === 'rain_volume'){
      chrome.storage.sync.get(['rain_volume'], function(result) {
        if (checkIfHowlHasBeenCreated(rainSound)){
          rainSound.volume(result.rain_volume);
        }
      });
    }
    else if (request.action === 'fire_volume'){
      chrome.storage.sync.get(['fire_volume'], function(result) {
        if (checkIfHowlHasBeenCreated(fireSound)){
          fireSound.volume(result.fire_volume);
        }
      });
    }
    else if (request.action === 'river_volume'){
      chrome.storage.sync.get(['river_volume'], function(result) {
        if (checkIfHowlHasBeenCreated(riverSound)){
          riverSound.volume(result.river_volume);
        }
      });
    }
    else if (request.action === 'night_volume'){
      chrome.storage.sync.get(['night_volume'], function(result) {
        if (checkIfHowlHasBeenCreated(nightSound)){
          nightSound.volume(result.night_volume);   
        }
      });
    }
    else if (request.action === 'fan_volume'){
      chrome.storage.sync.get(['fan_volume'], function(result) {
        if (checkIfHowlHasBeenCreated(fanSound)){
          fanSound.volume(result.fan_volume); 
        }
      });
    }
    else if(request.action ==='resume'){
      console.log("Play button was pushed and message received in background");
      currentlyPlaying.forEach(resumeSounds);
    }
  
  sendResponse({update: "update"});
  return true;
});

// a little StackOverflow copy-paste to splice out an array element without creating a new array
function removeItem(array, value) {
  var index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}

// instantiate new Howl for each sound.
// Would be nice to figure out how to not have to repeat all of the properties that are the same for each Howl.
// the "is_playing" property isn't a Howler howl property, and I'm not using it for anything, so I should probably just take it out. TBD.
function createHowl(sound){
  switch(sound){
    case coffeeShopSound:
      console.log("switch case in howl generator worked");
      coffeeShopSound = new Howl({
        src: ['sounds/coffeeShop.mp3'],
        loop: true,
        html5: true,
        volume: 0.5,
        name: 'coffeeShopSound',
        is_playing: true
      });
      chrome.storage.sync.get(['coffeeShop_volume'], function(result) {
        coffeeShopSound.volume(result.coffeeShop_volume);
      });
      coffeeShopSound.play();
      chrome.storage.sync.set({coffeeShopState: 'active'});
      break;
    case wavesSound:
      wavesSound = new Howl({
        src: ['sounds/waves.mp3'],
        loop: true,
        html5: true,
        volume: 0.5,
        name: 'wavesSound',
        is_playing: true
      });
      chrome.storage.sync.get(['waves_volume'], function(result) {
        wavesSound.volume(result.waves_volume);
      });
      wavesSound.play();
      chrome.storage.sync.set({wavesState: 'active'});
      break;
    case leavesSound:
      leavesSound = new Howl({
        src: ['sounds/leaves.mp3'],
        loop: true,
        html5: true,
        volume: 0.5,
        name: 'leavesSound',
        is_playing: true
      });
      chrome.storage.sync.get(['leaves_volume'], function(result) {
        leavesSound.volume(result.leaves_volume);
      });
      leavesSound.play();
      chrome.storage.sync.set({leavesState: 'active'});
      break;
    case rainSound:
      rainSound = new Howl({
        src: ['sounds/rain.mp3'],
        loop: true,
        html5: true,
        volume: 0.5,
        name: 'rainSound',
        is_playing: true
      });
      chrome.storage.sync.get(['rain_volume'], function(result) {
        rainSound.volume(result.rain_volume);
      });
      rainSound.play();
      chrome.storage.sync.set({rainState: 'active'});
      break;
    case fireSound:
      fireSound = new Howl({
        src: ['sounds/fire.mp3'],
        loop: true,
        html5: true,
        volume: 0.5,
        name: 'fireSound',
        is_playing: true
      });
      chrome.storage.sync.get(['fire_volume'], function(result) {
        fireSound.volume(result.fire_volume);
      });
      fireSound.play();
      chrome.storage.sync.set({fireState: 'active'});
      break;
    case riverSound:
      riverSound = new Howl({
        src: ['sounds/river.mp3'],
        loop: true,
        html5: true,
        volume: 0.5,
        name: 'riverSound',
        is_playing: true
      });
      chrome.storage.sync.get(['river_volume'], function(result) {
        riverSound.volume(result.river_volume);
      });
      riverSound.play();
      chrome.storage.sync.set({riverState: 'active'});
      break;
    case nightSound:
      nightSound = new Howl({
        src: ['sounds/night.mp3'],
        loop: true,
        html5: true,
        volume: 0.5,
        name: 'nightSound',
        is_playing: true
      });
      chrome.storage.sync.get(['night_volume'], function(result) {
        nightSound.volume(result.night_volume);
      });
      nightSound.play();
      chrome.storage.sync.set({nightState: 'active'});
      break;
    case fanSound:
      fanSound = new Howl({
        src: ['sounds/fan.mp3'],
        loop: true,
        html5: true,
        volume: 0.5,
        name: 'fanSound',
        is_playing: true
      });
      chrome.storage.sync.get(['fan_volume'], function(result) {
        fanSound.volume(result.fan_volume);
      });
      fanSound.play();
      chrome.storage.sync.set({fanState: 'active'});
      break;
  }
}

function checkIfHowlHasBeenCreated(sound){
  if (!('playing' in sound)){
    return false;
  }
  else{
    return true;
  }
}

function toggleHowl(sound){
  // check to see if the sound object has been turned into a Howl yet
  if (!('playing' in sound)){
    createHowl(sound);
    // part of createHowl is to call .play on the new howl and set its corresponding state in storage, so return active
    return "active";
  }
  else{
    if (sound.playing()){
      sound.pause();
      sound.is_playing = false;
      removeItem(currentlyPlaying, sound);
      return "inactive";
    }
    else if (!(sound.playing())){
      sound.play();
      sound.is_playing = true;
      currentlyPlaying.push(sound);
      return "active";
    }
  }
}
