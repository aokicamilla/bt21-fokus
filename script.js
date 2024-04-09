const html = document.querySelector('html')
const focoButton = document.querySelector('.app__card-button--foco')
const curtoButton = document.querySelector('.app__card-button--curto')
const longoButton = document.querySelector('.app__card-button--longo')
const imageFoco = document.querySelector('.app__image')
const tituloApp = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const displayTimer = document.querySelector('#timer')
const startPauseButton = document.querySelector('#start-pause span')
const playPauseIcon = document.querySelector('.app__card-primary-button-icon')

const musica = new Audio(`/sons/luna-rise-part-one.mp3`);
musica.loop=true;
const audioPlay = new Audio(`/sons/play.wav`)
const audioPause = new Audio(`/sons/pause.mp3`)
const audioTimerFinished = new Audio (`/sons/beep.mp3`)

let tempoDecorridoEmSeg = 1500;
let intervaloId = null;

focoButton.addEventListener('click', () => {
        // html.setAttribute('data-contexto', 'foco');
        // imageFoco.setAttribute('src', '/imagens/foco.png')
        tempoDecorridoEmSeg = 10
        alterarContexto('foco')
        focoButton.classList.add('active')
})

curtoButton.addEventListener('click', () => {
    tempoDecorridoEmSeg = 300
    alterarContexto('descanso-curto')
    curtoButton.classList.add('active')
})

longoButton.addEventListener('click', () => {
    tempoDecorridoEmSeg = 900
    alterarContexto('descanso-longo')
    longoButton.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach((contexto) => {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto)
    imageFoco.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            tituloApp.innerHTML = `
            Shoes on, get up in the morn', let's
                <strong class="app__title-strong"> rock and roll!</strong>`

            break;
        case "descanso-curto":
            tituloApp.innerHTML = `
            

            Let's take a break, maybe we'll have an<br>
                <strong class="app__title-strong"> Epiphany?</strong>
            `
            break;
        case "descanso-longo": 
            tituloApp.innerHTML = `
            Let's take a look at this beautiful<br>
            <strong class="app__title-strong">Spring Day!</strong>
            `
            break;
        default:
            break;
    }
}

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

const contagemRegressiva = () => {
    if(tempoDecorridoEmSeg <= 0) {
        audioTimerFinished.play()
        alert('Tempo finalizado!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        playPauseIcon.setAttribute('src', `/imagens/play_arrow.png`)
        startPauseButton.textContent = "Start"
        zerar()
        return;
    }
    tempoDecorridoEmSeg -= 1
    mostrarTempo()
}

startPauseButton.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        audioPause.play()
        playPauseIcon.setAttribute('src', `/imagens/play_arrow.png`)
        zerar()
        return;
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    playPauseIcon.setAttribute('src', `/imagens/pause.png`)
    startPauseButton.textContent = "Pause"
}

function zerar() {
    clearInterval(intervaloId);
    startPauseButton.textContent = "Start"
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSeg * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: "2-digit", second: "2-digit"})
    displayTimer.innerHTML = `${tempoFormatado}`
}

mostrarTempo()