$(document).ready(function() {
const bpm = document.getElementById('bpm');
const h2 = document.querySelector('h2');
const play = document.getElementById('play');
const audio = document.querySelector('audio');
const menosUm = document.getElementById('menos');
const maisUm = document.getElementById('mais');
const menosCinco = document.getElementById('menosCinco');
const maisCinco = document.getElementById('maisCinco');

let currentBpm = 60;
let isPlaying = false;
let timer = null;

function tick() {
    audio.currentTime = 0;
    audio.play();
}

bpm.addEventListener('change', function () {
    h2.innerHTML = this.value + ' bpm';
    currentBpm = parseInt(this.value);
    let roundedBpm = Math.round((60 * 1000) / currentBpm);
    if (isPlaying) {
        clearInterval(timer)
        timer = setInterval(tick, roundedBpm);
        // timer = setInterval(tick, (60 * 1000) / currentBpm);
    }
})

play.addEventListener('click', function () {
    let roundedBpm = Math.round((60 * 1000) / currentBpm);
    if (isPlaying) {
        play.innerHTML = 'Play';
        clearInterval(timer);
    } else {
        play.innerHTML = 'Stop';
        tick();
        timer = setInterval(tick, roundedBpm);
        // timer = setInterval(tick, (60 * 1000) / currentBpm);
    }
    isPlaying = !isPlaying;
})


// alterar 1 bpm com os botões
menosUm.addEventListener('click', function () {
    let diminuiUm = bpm.value -= 1;
    h2.innerHTML = diminuiUm + ' bpm';
    
    currentBpm = parseInt(diminuiUm);
    let roundedBpm = Math.round((60 * 1000) / currentBpm);
    if (isPlaying) {
        clearInterval(timer)
        timer = setInterval(tick, roundedBpm);
        // timer = setInterval(tick, (60 * 1000) / currentBpm);
    }

    if (diminuiUm <= 30) {
        menosUm.disabled = true;
        menosCinco.disabled = true;
        maisUm.disabled = false;
        maisCinco.disabled = false;
        h2.innerHTML = '30 bpm';
    } else {
        menosUm.disabled = false;
        menosCinco.disabled = false;
        maisUm.disabled = false;
        maisCinco.disabled = false;
        h2.innerHTML = diminuiUm + ' bpm';
    }
})

maisUm.addEventListener('click', function () {
    let bpmNumber = parseInt(bpm.value);
    let aumentaUm = bpmNumber += 1;
    bpm.value = aumentaUm;
    h2.innerHTML = aumentaUm + ' bpm';

    currentBpm = parseInt(aumentaUm);
    let roundedBpm = Math.round((60 * 1000) / currentBpm);
    if (isPlaying) {
        clearInterval(timer)
        timer = setInterval(tick, roundedBpm);
        // timer = setInterval(tick, (60 * 1000) / currentBpm);
    }

    if (aumentaUm >= 300) {
        menosUm.disabled = false;
        menosCinco.disabled = false;
        maisUm.disabled = true;
        maisCinco.disabled = true;
        h2.innerHTML = '300 bpm';
    } else {
        menosUm.disabled = false;
        menosCinco.disabled = false;
        maisUm.disabled = false;
        maisCinco.disabled = false;
        h2.innerHTML = aumentaUm + ' bpm';
    }
})


// alterar 5 bpm's com os botões
menosCinco.addEventListener('click', function () {
    let diminuiCinco = bpm.value -= 5;
    h2.innerHTML = diminuiCinco + ' bpm';

    currentBpm = parseInt(diminuiCinco);
    let roundedBpm = Math.round((60 * 1000) / currentBpm);
    if (isPlaying) {
        clearInterval(timer)
        timer = setInterval(tick, roundedBpm);
        // timer = setInterval(tick, (60 * 1000) / currentBpm);
    }

    if (diminuiCinco <= 30) {
        menosUm.disabled = true;
        menosCinco.disabled = true;
        maisUm.disabled = false;
        maisCinco.disabled = false;
        h2.innerHTML = '30 bpm';
    } else {
        menosUm.disabled = false;
        menosCinco.disabled = false;
        maisUm.disabled = false;
        maisCinco.disabled = false;
        h2.innerHTML = diminuiCinco + ' bpm';
    }
})

maisCinco.addEventListener('click', function () {
    // let aumentaCinco = bpm.innerHTML = bpm.value+= 5;
    let bpmNumber = parseInt(bpm.value);
    let aumentaCinco = bpmNumber += 5;
    bpm.value = aumentaCinco;
    h2.innerHTML = aumentaCinco + ' bpm';

    currentBpm = parseInt(aumentaCinco);
    let roundedBpm = Math.round((60 * 1000) / currentBpm);
    if (isPlaying) {
        clearInterval(timer)
        timer = setInterval(tick, roundedBpm);
        // timer = setInterval(tick, (60 * 1000) / currentBpm);
    }

    if (aumentaCinco >= 300) {
        menosUm.disabled = false;
        menosCinco.disabled = false;
        maisUm.disabled = true;
        maisCinco.disabled = true;
        h2.innerHTML = '300 bpm';
    } else {
        menosUm.disabled = false;
        menosCinco.disabled = false;
        maisUm.disabled = false;
        maisCinco.disabled = false;
        h2.innerHTML = aumentaCinco + ' bpm';
    }
})

// mudar o número de bpm em tempo real quando mover o "change"

var myNumEvts = {
    input: 0,
    change: 0,
    custom: 0
};

function onRangeChange(rangeInputElmt, listener) {

    var inputEvtHasNeverFired = true;

    var rangeValue = {
        current: undefined,
        mostRecent: undefined
    };

    rangeInputElmt.addEventListener("input", function (evt) {
        inputEvtHasNeverFired = false;
        rangeValue.current = evt.target.value;
        if (rangeValue.current !== rangeValue.mostRecent) {
            listener(evt);
        }
        rangeValue.mostRecent = rangeValue.current;
    });
}


var myListener = function (myEvt) {
    myNumEvts["custom"] += 1;
    h2.innerHTML = myEvt.target.value + ' bpm';
};

onRangeChange(bpm, myListener);

$(bpm).change(function() {
    let value = $(this).val();
    if (value <= 30) {
        menosUm.disabled = true;
        menosCinco.disabled = true;
        maisUm.disabled = false;
        maisCinco.disabled = false;
    } else if (value >= 300) {
        menosUm.disabled = false;
        menosCinco.disabled = false;
        maisUm.disabled = true;
        maisCinco.disabled = true;
    } else {
        menosUm.disabled = false;
        menosCinco.disabled = false;
        maisUm.disabled = false;
        maisCinco.disabled = false;
    }
})
})