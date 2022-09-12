let yourVoteFor = document.querySelector('.d-1-1 span');
let post = document.querySelector('.d-1-2 span');
let description = document.querySelector('.d-1-4');
let warning = document.querySelector('.d-2');
let side = document.querySelector('.d-1-right');
let numbers = document.querySelector('.d-1-3'); 

let currentStage = 0;
let number = '';
let blankVote = false;
let votes = [];

function startStage() {
    let stage = stages[currentStage];

    let numberHtml = ''; 
    number = '';
    blankVote = false;

    for(let i=0; i<stage.numbers;i++) {

        if (i === 0) {
            numberHtml += '<div class="number blink"></div>';
        } else {
            numberHtml += '<div class="number"></div>';
        }
        
    }

    yourVoteFor.style.display = 'none';
    post.innerHTML = stage.title;
    description.innerHTML = '';
    warning.style.display = 'none';
    side.innerHTML = '';
    numbers.innerHTML = numberHtml; 
}

function updateInterface() {
    let stage = stages[currentStage];
    let candidate = stage.candidates.filter((item)=>{
        if (item.number === number) {
            return true;
        } else {
            return false;
        }
    });
    if (candidate.length > 0) {
        candidate = candidate[0];
        yourVoteFor.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = `Nome: ${candidate.name}<br/>Partido: ${candidate.party}`;

        let photosHtml = '';

        for (let i in candidate.photos) {
            if (candidate.photos[i].small) {
                photosHtml += `<div class="d-1-image small"><img src="images/${candidate.photos[i].url}" alt="">${candidate.photos[i].legend}</div>`;
            } else {
                photosHtml += `<div class="d-1-image"><img src="images/${candidate.photos[i].url}" alt="">${candidate.photos[i].legend}</div>`;
            }
        }

        side.innerHTML = photosHtml;
    } else {
        yourVoteFor.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = '<div class="big--warning blink">VOTO NULO</div>';
    }

    
}

function clicked(n) {
    let elNumber = document.querySelector('.number.blink');
    if (elNumber !== null) {
        elNumber.innerHTML = n;
        number = `${number}${n}`;

        elNumber.classList.remove('blink');
        if (elNumber.nextElementSibling !== null) {
            elNumber.nextElementSibling.classList.add('blink');
        } else {
            updateInterface();
        }
    }
}

function branco() {
    number = '';
    blankVote = true;

    yourVoteFor.style.display = 'block';
    warning.style.display = 'block';
    numbers.innerHTML = '';
    description.innerHTML = '<div class="big--warning blink">VOTO EM BRANCO</div>';      
    side.innerHTML = '';
}

function corrige() {
    startStage();
}

function confirma() {
    let stage = stages[currentStage];

    let confirmedVote = false;

    if (blankVote === true) {
        confirmedVote = true;
        votes.push({
            stage: stages[currentStage].title,
            vote: 'branco'
        });
    } else if (number.length === stage.numbers) {
        confirmedVote = true;
        votes.push({
            stage: stages[currentStage].title,
            vote: number
        });
    }

    if (confirmedVote) {
        currentStage++;
        if (stages[currentStage] !== undefined) {
            startStage();
        } else {
            document.querySelector('.screen').innerHTML = '<div class="giga--warning blink">FIM</div>';
            console.log(votes);
        }
    }
}

startStage();