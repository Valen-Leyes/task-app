let timerInterval;
let timeLeft = 600; // 10 minutos por defecto en segundos
let isRunning = false;

const display = document.getElementById('timer');
const btnStart = document.getElementById('btn-start');
const btn2min = document.getElementById('btn-2min');
const btnReset = document.getElementById('btn-reset');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        btnStart.textContent = 'Reanudar';
        isRunning = false;
    } else {
        isRunning = true;
        btnStart.textContent = 'Pausar';
        timerInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                btnStart.textContent = '¡Completado! 🎉';
                alert('¡Buen trabajo! Lograste romper la inercia inicial.');
                resetTimer(600);
            }
        }, 1000);
    }
}

function resetTimer(seconds = 600) {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = seconds;
    btnStart.textContent = seconds === 120 ? 'Iniciar Micro-Enfoque (2 min) ⚡' : 'Iniciar Enfoque (10 min) ⏱️';
    updateDisplay();
}

btnStart.addEventListener('click', startTimer);
btn2min.addEventListener('click', () => resetTimer(120));
btnReset.addEventListener('click', () => resetTimer(600));

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw-tareas.js').catch(err => console.log(err));
}

updateDisplay();