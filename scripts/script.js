window.onload= getTrendingResults();
//boton de tema
let imgDropdown= document.getElementsByClassName('img-dropdown')[0];
let toggleOptions = document.getElementsByClassName('opciones-tema')[0];
let body = document.getElementsByTagName('body')[0];
imgDropdown.addEventListener('click', function(){
toggleOptions.classList.toggle('visible');
})


// // cambiar tema
let temaClaro = document.getElementsByClassName('tema-opcion-claro')[0];
let temaOscuro= document.getElementsByClassName('tema-opcion-oscuro')[0];
let logoPagina = document.getElementById('logoPagina');
temaClaro.addEventListener('click', function(){
body.classList.remove('dark')
body.classList.add('tema-claro');
logoPagina.setAttribute('src', './assets/gifOF_logo.png')});

temaOscuro.addEventListener('click', function(){
body.classList.add('dark')
body.classList.remove('tema-claro');
logoPagina.setAttribute('src', './assets/gifOF_logo_dark.png')})




// activar barra de busqueda

let botonBusqueda = document.getElementById('botonBusqueda');
let inputBusqueda = document.getElementById('busqueda');
let resultadoBusqueda = document.getElementsByClassName('resultadoBusqueda')[0];
inputBusqueda.addEventListener('input', function(){
    if (inputBusqueda.value.length>0){
    botonBusqueda.disabled = false;
    resultadoBusqueda.style.display = 'flex';
}
else{
    botonBusqueda.disabled = true;
    resultadoBusqueda.style.display = 'none'
}})

// consumir API
const apiKey= '3rh3rXaLaRoA7HPCezrs1i43R9qtR1Bj';

function getTrendingResults() {
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=3rh3rXaLaRoA7HPCezrs1i43R9qtR1Bj&limit=24&rating=G')
    .then(response => {
    return response.json()
    }).then(data => {
    console.log(data);
    drawGifsSugerencias(data.data.slice(0,4), "sugeridos");
    drawGifsTendencias(data.data.slice(4,24), "tendencias");
    
    })
    .catch((error) => {
    console.error(error);
    })
}


//imprimir Tendencias

const drawGifsSugerencias = (listGifs, section) => {
    let idSection = document.getElementById(section);
    idSection.innerHTML = "";
    listGifs.forEach((gif,i) => {
        let urlImage = gif.images.fixed_height.url;
        let title = gif.title.replace(/ /g, "");
        let indexGif = title.indexOf('GIF');
        let titleDef = title.slice(0,indexGif);
        const tagImage = `<div>
        <p id='titleDef${i}'>#${titleDef}<img src='./assets/button3.svg'></p>
        <img src=${urlImage} alt=''><button type='button' id='verMas' onclick=getSearchResults2('${titleDef.slice(0,5)}')>Ver Más...</button></img>
        </div>`
        ;
        idSection.innerHTML += tagImage;
    });
};

const drawGifsTendencias = (listGifs, section) => {
    let idSection = document.getElementById(section);
    idSection.innerHTML = "";
    listGifs.forEach(gif => {
        let urlImage = gif.images.fixed_height.url;
        let title = gif.title.replace(/ /g, "");
        let indexGif = title.indexOf('GIF');
        let titleDef = title.slice(0,indexGif);
        const tagImage = `<div>
        <img src=${urlImage} alt=""></img>
        <p>#${titleDef}</p>
        </div>`
        ;
        idSection.innerHTML += tagImage;
    });
};

//imprimir busqueda
let botonBusquedaResultados = document.querySelectorAll('.botonResultadoSugerido');
botonBusqueda.addEventListener('click',
function getSearchResults() {
    botonBusquedaResultados.forEach(e =>{
        e.style.visibility ='visible';
    })

    var valorBusqueda = document.getElementById('busqueda').value;
    var search = valorBusqueda;
    const found =
    fetch('https://api.giphy.com/v1/gifs/search?q=' + search +
    '&api_key=' + apiKey)
    .then((response) => {
    return response.json()
    }).then(data => {
    console.log(data);
    drawGifsBusqueda(data.data.slice(0,4), "resultadoBusqueda");
    })
    .catch((error) => {
        console.log(error);
    return error
    })
    return found;
})

const drawGifsBusqueda = (listGifs, section) => {
    let idSection = document.getElementById(section);
    idSection.innerHTML = "";
    listGifs.forEach(gif => {
        let urlImage = gif.images.fixed_height.url;
        let title = gif.title;
        const tagImage = `
        <img src=${urlImage} alt=""></img>`
        ;
        idSection.innerHTML += tagImage;
    });
};

//Imprimir busqueda boton VerMas

function getSearchResults2(title){
    console.log(title);
    const found =
    fetch('https://api.giphy.com/v1/gifs/search?q=' + title +
    '&api_key=' + apiKey)
    .then((response) => {
    return response.json()
    }).then(data => {
    console.log(data);
    drawGifsBusqueda(data.data.slice(0,4), "resultadoBusqueda");
    })
    .catch((error) => {
    console.log(error + 'hola');
    return error
    })
    return found;
}





