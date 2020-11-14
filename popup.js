
var coffeeShopButton = document.getElementById('coffeeShopButton');
var wavesButton = document.getElementById('wavesButton');
var leavesButton = document.getElementById('leavesButton');
var rainButton = document.getElementById('rainButton');
var fireButton = document.getElementById('fireButton');
var riverButton = document.getElementById('riverButton');
var nightButton = document.getElementById('nightButton');
var fanButton = document.getElementById('fanButton');

var muteButton = document.getElementById('muteButton');

var masterVolumeSlider = document.getElementById('masterVolumeSlider');

var coffeeShopVolumeSlider = document.getElementById('coffeeShopVolumeSlider');
var wavesVolumeSlider = document.getElementById('wavesVolumeSlider');
var leavesVolumeSlider = document.getElementById('leavesVolumeSlider');
var rainVolumeSlider = document.getElementById('rainVolumeSlider');
var fireVolumeSlider = document.getElementById('fireVolumeSlider');
var riverVolumeSlider = document.getElementById('riverVolumeSlider');
var nightVolumeSlider = document.getElementById('nightVolumeSlider');
var fanVolumeSlider = document.getElementById('fanVolumeSlider');


// this is called on page load, and then on any successful response from .sendMessage on events
function buildPage(){
  chrome.storage.sync.get(['player_volume',
    'coffeeShop_volume', 
    'waves_volume',
    'leaves_volume',
    'rain_volume',
    'fire_volume',
    'river_volume',
    'night_volume',
    'fan_volume',
    'muted'], function(key) {
    masterVolumeSlider.value = key.player_volume;
    coffeeShopVolumeSlider.value = key.coffeeShop_volume;
    wavesVolumeSlider.value = key.waves_volume;
    leavesVolumeSlider.value = key.leaves_volume;
    rainVolumeSlider.value = key.rain_volume;
    fireVolumeSlider.value = key.fire_volume;
    riverVolumeSlider.value = key.river_volume;
    nightVolumeSlider.value = key.night_volume;
    fanVolumeSlider.value = key.fan_volume;
  });
  
  // set sound buttons to active if their corresponding audio is playing
  chrome.storage.sync.get(['coffeeShopState',
    'wavesState',
    'leavesState',
    'rainState',
    'fireState',
    'riverState',
    'nightState',
    'fanState',
    'muted'], function(key) {
    if (key.coffeeShopState === 'active'){
      coffeeShopButton.classList.add("active-button");
    }
    else{
      coffeeShopButton.classList.remove("active-button");
    }
    if (key.wavesState === 'active'){
      wavesButton.classList.add("active-button");
    }
    else{
      wavesButton.classList.remove("active-button");
    }
    if (key.leavesState === 'active'){
      console.log("leaves state = active");
      leavesButton.classList.add("active-button");
    }
    else{
      console.log("leaves state = inactive");
      leavesButton.classList.remove("active-button");
    }
    if (key.rainState === 'active'){
      rainButton.classList.add("active-button");
    }
    else{
      rainButton.classList.remove("active-button");
    }
    if (key.fireState === 'active'){
      fireButton.classList.add("active-button");
    }
    else{
      fireButton.classList.remove("active-button");
    }
    if (key.riverState === 'active'){
      riverButton.classList.add("active-button");
    }
    else{
      riverButton.classList.remove("active-button");
    }
    if (key.nightState === 'active'){
      nightButton.classList.add("active-button");
    }
    else{
      nightButton.classList.remove("active-button");
    }
    if (key.fanState === 'active'){
      fanButton.classList.add("active-button");
    }
    else{
      fanButton.classList.remove("active-button");
    }

    if(key.muted === 'active'){
      muteButton.classList.add("active-mute-button");
      muteButton.style.backgroundImage = "url('images/volume-mute.png')";
      muteButton.style.backgroundRepeat = "no-repeat";
      console.log("muted === 'active'");
    }
    else if (key.muted === 'inactive'){
      muteButton.classList.remove("active-mute-button");
      muteButton.style.backgroundImage = "url('images/Speaker_Icon.png')";
      muteButton.style.backgroundRepeat = "no-repeat";
      console.log("muted === 'inactive'");
    }
  });
  
  console.log("buildPage() was called");
}

buildPage();

muteButton.addEventListener("click", function(){
  chrome.runtime.sendMessage({action: 'toggle_mute'},function(response) {
    if(response.update === "update"){buildPage();}
  });
});

masterVolumeSlider.onchange = function() {
    volumeLevel = this.value.toString();
    // localStorage.setItem('player_volume', volumeLevel);
    chrome.storage.sync.set({'player_volume': volumeLevel});
    // , function() {
    //     console.log('volume is set to ' + volumeLevel);
    //   });
    chrome.runtime.sendMessage({action: 'volume', value: volumeLevel},function(response) {
      if(response.update === "update"){buildPage();}
    });
};

// need to learn how to abstract this to a group of pre-set elements instead of having to repeat the code for every one.
coffeeShopButton.addEventListener("click", function(){
  chrome.runtime.sendMessage({action: 'pushButton', value: 'coffeeShopSound'}, function(response) {
    if(response.update === "update"){buildPage();}
  });
});

wavesButton.addEventListener("click", function(){
  chrome.runtime.sendMessage({action: 'pushButton', value: 'wavesSound'},function(response) {
    if(response.update === "update"){buildPage();}
  });
});

leavesButton.addEventListener("click", function(){
  chrome.runtime.sendMessage({action: 'pushButton', value: 'leavesSound'},function(response) {
    if(response.update === "update"){buildPage();}
  });
});

rainButton.addEventListener("click", function(){
  chrome.runtime.sendMessage({action: 'pushButton', value: 'rainSound'},function(response) {
    if(response.update === "update"){buildPage();}
  });
});

fireButton.addEventListener("click", function(){
  chrome.runtime.sendMessage({action: 'pushButton', value: 'fireSound'},function(response) {
    if(response.update === "update"){buildPage();}
  });
});

riverButton.addEventListener("click", function(){
  chrome.runtime.sendMessage({action: 'pushButton', value: 'riverSound'},function(response) {
    if(response.update === "update"){buildPage();}
  });
});

nightButton.addEventListener("click", function(){
  chrome.runtime.sendMessage({action: 'pushButton', value: 'nightSound'},function(response) {
    if(response.update === "update"){buildPage();}
  });
});

fanButton.addEventListener("click", function(){
  chrome.runtime.sendMessage({action: 'pushButton', value: 'fanSound'},function(response) {
    if(response.update === "update"){buildPage();}
  });
});


// need to learn how to abstract this to a group of pre-set elements instead of having to repeat the code for every one.
coffeeShopVolumeSlider.onchange = function() {
    volumeLevel = this.value.toString();
    // localStorage.setItem('player_volume', volumeLevel);
    chrome.storage.sync.set({'coffeeShop_volume': volumeLevel}, function() {
      });
    chrome.runtime.sendMessage({action: 'coffeeShop_volume', value: volumeLevel});
};

wavesVolumeSlider.onchange = function() {
    volumeLevel = this.value.toString();
    // localStorage.setItem('player_volume', volumeLevel);
    chrome.storage.sync.set({'waves_volume': volumeLevel}, function() {
      });
    chrome.runtime.sendMessage({action: 'waves_volume', value: volumeLevel});
};

leavesVolumeSlider.onchange = function() {
  volumeLevel = this.value.toString();
  // localStorage.setItem('player_volume', volumeLevel);
  chrome.storage.sync.set({'leaves_volume': volumeLevel}, function() {
    });
  chrome.runtime.sendMessage({action: 'leaves_volume', value: volumeLevel});
};

rainVolumeSlider.onchange = function() {
  volumeLevel = this.value.toString();
  // localStorage.setItem('player_volume', volumeLevel);
  chrome.storage.sync.set({'rain_volume': volumeLevel}, function() {
    });
  chrome.runtime.sendMessage({action: 'rain_volume', value: volumeLevel});
};

fireVolumeSlider.onchange = function() {
  volumeLevel = this.value.toString();
  // localStorage.setItem('player_volume', volumeLevel);
  chrome.storage.sync.set({'fire_volume': volumeLevel}, function() {
    });
  chrome.runtime.sendMessage({action: 'fire_volume', value: volumeLevel});
};

riverVolumeSlider.onchange = function() {
  volumeLevel = this.value.toString();
  // localStorage.setItem('player_volume', volumeLevel);
  chrome.storage.sync.set({'river_volume': volumeLevel}, function() {
    });
  chrome.runtime.sendMessage({action: 'river_volume', value: volumeLevel});
};

nightVolumeSlider.onchange = function() {
  volumeLevel = this.value.toString();
  // localStorage.setItem('player_volume', volumeLevel);
  chrome.storage.sync.set({'night_volume': volumeLevel}, function() {
    });
  chrome.runtime.sendMessage({action: 'night_volume', value: volumeLevel});
};

fanVolumeSlider.onchange = function() {
  volumeLevel = this.value.toString();
  // localStorage.setItem('player_volume', volumeLevel);
  chrome.storage.sync.set({'fan_volume': volumeLevel}, function() {
    });
  chrome.runtime.sendMessage({action: 'fan_volume', value: volumeLevel});
};