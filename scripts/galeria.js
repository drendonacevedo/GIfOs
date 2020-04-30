
//Mostrar mi Galeria de GIfs
function showMyGifs() {
    let myGifosLocalStorage = localStorage.getItem("migif");
    myGifosLocalStorage = myGifosLocalStorage.split(",");

    for (let i = 0; i < myGifosLocalStorage.length; i++) {
        let url = myGifosLocalStorage[i];
        const contenedor_gifos = document.getElementById("GaleriaGifos");
        const my_gifos_box = document.createElement("img");
        my_gifos_box.src = `https://media.giphy.com/media/${url}/giphy.gif`;
        my_gifos_box.className = "myGifOs_box";
        contenedor_gifos.appendChild(my_gifos_box);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    showMyGifs();
});