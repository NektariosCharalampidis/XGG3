function checkAnswers() {
    let correctAnswers = {
        "q1": "β",
        "q2": "γ",
        "q3": "γ",
        "q4": "γ",
        "q5": "α",
        "q6": "α",
        "q7": "β",
        "q8": "α",
        "q9": "γ",
        "q10": "γ"
    };

    let form = document.getElementById("quizForm");
    let resultText = document.getElementById("result");
    let correctCount = 0;
    let totalQuestions = Object.keys(correctAnswers).length;

    for (let key in correctAnswers) {
        let selected = form.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === correctAnswers[key]) {
            correctCount++;
        }
    }

    if (correctCount === totalQuestions) {
        resultText.innerHTML = "Συγχαρητήρια! Τα απάντησες όλα σωστά!";
        launchFireworks();
    } else {
        resultText.innerHTML = `Βρήκες ${correctCount} από τις ${totalQuestions} σωστές. Δοκίμασε ξανά!`;
    }
}

function launchFireworks() {
    let canvas = document.getElementById("fireworks");
    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: Math.random() * 4 - 2,
            vy: Math.random() * 4 - 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            life: Math.random() * 50 + 50
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
        });

        particles = particles.filter(p => p.life > 0);
        if (particles.length > 0) {
            requestAnimationFrame(draw);
        }
    }

    draw();
}
