let timer;
let time = 25 * 60; // 25 minutos
let running = false;
let coins = 0;

// Timer display
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const coinsDisplay = document.getElementById('coins');
const pet = document.getElementById('pet');

startBtn.addEventListener('click', () => {
    if(!running){
        running = true;
        timer = setInterval(updateTimer, 1000);
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    running = false;
    time = 25 * 60;
    timerDisplay.textContent = formatTime(time);
});

function updateTimer(){
    if(time <= 0){
        clearInterval(timer);
        running = false;
        coins += 5; // Ganha 5 moedas por sessão
        coinsDisplay.textContent = coins;
        updatePet();
        updateChart();
        alert("Parabéns! Sessão terminada.");
        time = 25 * 60;
        timerDisplay.textContent = formatTime(time);
    } else {
        time--;
        timerDisplay.textContent = formatTime(time);
    }
}

function formatTime(seconds){
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

// Mascote evolui conforme moedas
function updatePet(){
    if(coins >= 0 && coins < 10) pet.src = 'assets/pet1.png';
    else if(coins >= 10 && coins < 20) pet.src = 'assets/pet2.png';
    else pet.src = 'assets/pet3.png';
}

// Gráfico das horas estudadas
let ctx = document.getElementById('studyChart').getContext('2d');
let studyChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
        datasets: [{
            label: 'Horas estudadas',
            data: [0,0,0,0,0,0,0],
            backgroundColor: 'rgba(255, 206, 86, 0.7)',
        }]
    },
    options: { scales: { y: { beginAtZero: true } } }
});

// Cada sessão = 25 min = 0.42h aprox.
function updateChart(){
    let today = new Date().getDay(); // 0=Domingo, 1=Segunda...
    let index = today === 0 ? 6 : today-1; // ajusta Domingo para índice 6
    studyChart.data.datasets[0].data[index] += 0.42;
    studyChart.update();
}
