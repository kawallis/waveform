'use strict';
// grabs the audio HTML element
var song = document.getElementById('audioElement');
var button = document.getElementsByTagName('button');
button[0].addEventListener('click', function (event) {
  init();
});

// Create audio context
var AUDIO = new (window.AudioContext || window.webkitAudioContext)();
if(!AUDIO) console.error('Web Audio API not supported :(');

// Create and configure analyzer node and storage buffer
var analyzer = AUDIO.createAnalyser();
analyzer.fftSize = 128;
var bufferLength = analyzer.frequencyBinCount;

//tried to wrap array to fix error
var ab = new ArrayBuffer(bufferLength);
var dataArray = new Uint8Array(ab);

function init() {
  // Connect song to analyzer and analyzer to audio-out
  var source = AUDIO.createMediaElementSource(song);
  source.connect(analyzer);
  analyzer.connect(AUDIO.destination);
  loop();
}

function loop() {
  requestAnimationFrame(loop);
  analyzer.getByteFrequencyData(dataArray);
  song.play();
  myChart.data.datasets[0].data = dataArray;
  myChart.update();
}

//creates the initial chartjs
var initNumArr = [];
var labelsArr = [];
for(var i = 0; i < 64; i++){
  initNumArr.push(0);
  labelsArr.push('');
}
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labelsArr,
    datasets: [{
      label: '',
      data: initNumArr,
      backgroundColor: 'rgb(255, 255, 0)',
      borderColor: 'rgb(255, 255, 0)',
      borderWidth: 0
    }]
  },  
  options: {
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        }
      }],
      yAxes: [{
        display: false,
        gridLines: {
          lineWidth: 0,
          color: 'rgba(255,255,255,0)'
        },
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});