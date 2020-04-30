// obtener video y elementos a modificar
let video = document.getElementById('video');
let divCaptura = document.getElementsByClassName('iniciarCaptura')[0];
let botonCapturar = document.getElementById('botonCapturar');
let botonDetener = document.getElementById('botonDetener');
let contador = document.getElementById('contador');
let preview = document.getElementById('preview');
let sucess = document.getElementById('sucess');
let repetirCaptura = document.getElementById('repetirCaptura');
let subirGuifo = document.getElementById('subirGuifo');
let uploading = document.getElementById('uploading');
let botonCancelar2 = document.getElementById('botonCancelar2');
let barraCaptura = document.getElementsByClassName('barraCaptura')[0];

var streamRecorder = null;
var recorder;

var blob = null;
var urlBlob = "";
//Encender Camara
const getStream = () => {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
        height: 434,
        width: 832,
        }
        })
        .then(function(stream) {
        video.srcObject = stream;
        video.play();
        
        streamRecorder = stream;
        }).catch(function (error){
            console.error(error);
        });
};

document.addEventListener('DOMContentLoaded', () => {
    getStream();
});

//Iniciar Grabacion
botonCapturar.addEventListener('click', function () {
    botonCapturar.style.display = 'none';
    botonDetener.style.display ='flex';
    contador.style.visibility = 'visible';
    barraCaptura.innerHTML = '<img src="/assets/button3.svg" alt="button3">Capturando Tu Guifo';
    startRecord();
});
    
const startRecord = () => {
    recorder = RecordRTC(streamRecorder, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        });
        recorder.startRecording();
};

//detener grabacion
const stopRecord = async () => {
    await recorder.stopRecording();
    blob = await recorder.getBlob();
    urlBlob = URL.createObjectURL(blob);
    preview.setAttribute('src', urlBlob);
    streamRecorder.getTracks().forEach(track => {
        track.stop();
    })
 ;    
}

botonDetener.addEventListener('click', function (){
    stopRecord();
    video.style.display='none';
    botonDetener.style.display='none';
    repetirCaptura.style.display='flex';
    subirGuifo.style.display='flex';
    preview.style.display ='flex';
    barraCaptura.innerHTML = 'Vista Previa';
});

//Subir gif creado
const apiKey= '3rh3rXaLaRoA7HPCezrs1i43R9qtR1Bj';

function uploadCreatedGif() {
    const form = new FormData();
    form.append('file', blob, 'myGif.gif');
    console.log(form.get('file'))
    const posting = {
        method: 'POST',
        body: form,
        json: true,
        mode: 'cors'
    };
    fetch(`https://upload.giphy.com/v1/gifs?api_key=${apiKey}`, posting)
    .then(response => {
    return response.json()
    }).then(data => {
    console.log(data);  
    uploadSucess();
    let migif = localStorage.getItem("migif");
    if(migif){
        migif = data.data.id + "," + migif;
    } else {
        migif = data.data.id;
    }
    localStorage.setItem('migif', migif);
    showMyGifs();
    })
    .catch((error) => {
    console.error(error);
    })
}

   subirGuifo.addEventListener('click', function (){
        uploadCreatedGif();
        repetirCaptura.style.display='none';
        subirGuifo.style.display='none';
        preview.style.display ='none';
        contador.style.visibility = 'hidden';
        uploading.style.display = 'flex';
        botonCancelar2.style.display='flex';
        barraCaptura.innerHTML = 'Subiendo Guifo';
        
    }
        )

function uploadSucess(){
    document.getElementById("uploading").style.display = "none";
    botonCancelar2.style.display = "none";
    divCaptura.style.height = "391px";
    divCaptura.style.width = "721px";
    divCaptura.style.display = "flex";
    barraCaptura.innerHTML = '<img src="/assets/button3.svg" alt="button3">Guifo Subido Con Éxito';
    barraCaptura.style.width = "715px";
    preview.style.display ='flex';
    preview.style.width ='365px';
    preview.style.height ='191px';
    preview.style.margin ='29px 0 0 27px';
    sucess.style.display = 'flex';

}

// Mostrar Gifs guardados en LocalStorage
        function showMyGifs() {
            let myGifosLocalStorage = localStorage.getItem("migif");
            myGifosLocalStorage = myGifosLocalStorage.split(",");

            for (let i = 0; i < myGifosLocalStorage.length; i++) {
                let url = myGifosLocalStorage[i];
                const contenedor_gifos = document.getElementById("misGifos");
                const my_gifos_box = document.createElement("img");
                my_gifos_box.src = `https://media.giphy.com/media/${url}/giphy.gif`;
                my_gifos_box.className = "myGifOs_box";
                contenedor_gifos.appendChild(my_gifos_box);
            }
          }
          
          
         





