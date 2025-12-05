(function(){
    const html = document.documentElement;
    const overlay = document.getElementById("overlay");
    html.setAttribute("data-theme", "dark");
    overlay.classList.add("active");

    const mandatory = document.getElementById("mandatory-overlay");
    setTimeout(() => {
        mandatory.style.opacity = "0";
        setTimeout(() => mandatory.remove(), 500);
    }, 5000);

    let mouseX = window.innerWidth/2;
    let mouseY = window.innerHeight/2;
    let rafId = null;
    function setSpot(x,y){
        const px = Math.max(0, Math.min(window.innerWidth, x));
        const py = Math.max(0, Math.min(window.innerHeight, y));
        html.style.setProperty("--spot-x", px+"px");
        html.style.setProperty("--spot-y", py+"px");
    }
    function scheduleSpot(x,y){
        mouseX = x; mouseY = y;
        if(!rafId){
            rafId = requestAnimationFrame(() => {
                setSpot(mouseX, mouseY);
                rafId = null;
            });
        }
    }
    function onMove(e){
        let x = e.clientX, y = e.clientY;
        if(e.touches && e.touches[0]){
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        }
        scheduleSpot(x,y);
    }
    window.addEventListener("mousemove", onMove, {passive:true});
    window.addEventListener("touchmove", onMove, {passive:true});
    window.addEventListener("touchstart", onMove, {passive:true});
})();

const buttonsDiv = document.getElementById('buttons');
const phoneInput = document.getElementById('phone');
const errorDiv = document.getElementById('error');
const digits = [...Array(10).keys()];
const buttonSize = 60;
const margin = 10;
let validateBtn = null;

digits.forEach(d => {
    const btn = document.createElement('button');
    btn.innerText = d;
    btn.classList.add('digit');
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if(phoneInput.value.length < 10){
            phoneInput.value += d;
            validateNumber();
            randomizeButtons();
            checkCompletion();
        }
    });
    buttonsDiv.appendChild(btn);
});

document.getElementById('erase').addEventListener('click', () => {
    window.history.back();
});

function validateNumber() {
    const val = phoneInput.value;
    if(val.length > 10) phoneInput.value = val.slice(0,10);
    if(val.length >= 1 && val[0] !== "0") {
        errorDiv.innerText = "Un numéro français commence par 0. Veuillez effacer.";
        return false;
    }
    if(val.length === 10) errorDiv.innerText = "Numéro complet ✔️ Clickez le bouton valider";
    else errorDiv.innerText = "";
}

function isOverlapping(x, y, positions) {
    for(let pos of positions){
        if(Math.abs(pos.x - x) < buttonSize + margin && Math.abs(pos.y - y) < buttonSize + margin) return true;
    }
    return false;
}

function randomizeButtons() {
    const positions = [];
    const width = window.innerWidth - buttonSize - margin;
    const height = window.innerHeight - buttonSize - margin;

    document.querySelectorAll('.digit').forEach(btn => {
        let tries = 0;
        let x, y;
        do {
            x = Math.random() * width;
            y = Math.random() * (height - 150) + 150;
            tries++;
        } while(isOverlapping(x, y, positions) && tries < 100);
        positions.push({x, y});
        btn.style.left = x + 'px';
        btn.style.top = y + 'px';
    });
}

function checkCompletion() {
    if(phoneInput.value.length === 10 && !validateBtn){
        createValidateButton();
    }
}

function createValidateButton() {
    validateBtn = document.createElement('button');
    validateBtn.id = 'validate';
    validateBtn.innerText.buttonSize = 80;
    validateBtn.innerText = "Valider";
    validateBtn.style.position = "absolute";
    validateBtn.style.fontSize = "22px";
    validateBtn.style.padding = "16px 26px";
    validateBtn.style.borderRadius = "14px";
    validateBtn.style.minWidth = "150px";
    validateBtn.style.minHeight = "60px";
    validateBtn.style.zIndex = "9999";

    document.body.appendChild(validateBtn);

    validateBtn.addEventListener('click', () => {
        window.location.href = 'End/ht.html';
    });

    validateBtn.style.left = (window.innerWidth/2 - 30) + "px";
    validateBtn.style.top = (window.innerHeight/2 - 30) + "px";

    document.addEventListener('mousemove', (e) => {
        const rect = validateBtn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + buttonSize/2);
        const dy = e.clientY - (rect.top + buttonSize/2);
        const distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < 100){
            setTimeout(() => {teleportButton(validateBtn, 100);}, 500);

        }
    });
}

function teleportButton(btn, distance){
    const widthMax = window.innerWidth - buttonSize;
    const heightMax = window.innerHeight - buttonSize;
    const rect = btn.getBoundingClientRect();

    let newX = rect.left + (Math.random()*2*distance - distance);
    let newY = rect.top + (Math.random()*2*distance - distance);

    newX = Math.max(0, Math.min(widthMax, newX));
    newY = Math.max(150, Math.min(heightMax, newY));

    btn.style.left = newX + 'px';
    btn.style.top = newY + 'px';
}

randomizeButtons();
window.addEventListener('resize', randomizeButtons);
document.body.addEventListener('click', (e)=>{
    if(!e.target.classList.contains('digit') && e.target.id !== 'erase' && e.target.id !== 'validate'){
        randomizeButtons();
    }
});
