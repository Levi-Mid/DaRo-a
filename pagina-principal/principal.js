const carrosselImages = document.querySelector('.carrosselImagens');
const images = document.querySelectorAll('.carrosselImagens img');
let index = 0;

// Função para trocar de imagem
function slideImages() {
  index++;
  if (index >= images.length) {
    index = 0;
  }

  // Move o carrossel horizontalmente
  carrosselImages.style.transform = `translateX(${-index * 100}%)`;
}

setInterval(slideImages, 15000);