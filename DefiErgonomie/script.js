let step = 0;
    const maxSteps = 11;
    const msg = document.getElementById("msg");
    const triesText = document.getElementById("tries");
    const btn = document.getElementById("captchaBtn");
    const valide = document.getElementById("valide");
    const trap = document.getElementById("trap");
    
    
    btn.addEventListener("click", () => {
        step++;

        if (step < 10) {
            btn.hidden = false;
            valide.hidden = true;
            trap.hidden = true;
        } else {
            btn.hidden = true;
            valide.hidden = false;
            trap.hidden = false;
        }

        if (step === 1 ||step === 2) {
            msg.innerText = "Êtes-vous patient ?";
        } else if (step <= 7) {
            msg.innerText = "Encore un peu...";
        } else if (step < maxSteps) {
            msg.innerText = "Vous y êtes presque...";
        } 

        triesText.innerText = 'Essais restants: '+(maxSteps - step)+'/10';

        if (step < maxSteps) {
            btn.disabled = true;
            setTimeout(() => btn.disabled = false, 1000);
        }
    });

    valide.addEventListener("click", () => {
        window.location.href="numero/formu.html";
    })

    trap.addEventListener("click", () => {
        triesText.innerText = 'OK, recommençons tout 😄';
        valide.disabled = true;
        trap.disabled = true;
        setTimeout(() =>  window.location.href="index.html", 4000);
    })