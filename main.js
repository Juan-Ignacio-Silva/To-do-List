function obtenerNotas() {
  const notas = localStorage.getItem('notas');
  return notas ? JSON.parse(notas) : [];
}

function guardarNota(titulo, contenido, date) {
  const notas = obtenerNotas();
  notas.push({ titulo, contenido, date });
  localStorage.setItem('notas', JSON.stringify(notas));
}

function mostrarNotas() {
  const notas = obtenerNotas();
  const container = document.getElementById('contenedor-listas');
  container.innerHTML = '';
  
  notas.forEach((nota, index) => {
    const descripcionCorta = nota.contenido.length > 20 ? nota.contenido.slice(0, 20) + '...' : nota.contenido;

    const div = document.createElement('div');
    div.className = 'card';
    div.setAttribute('data-index', index);  
    div.innerHTML = `
        <h2>${nota.titulo}</h2>
        <p>${descripcionCorta}</p>
        <span>${nota.date}</span>
    `;
    container.appendChild(div);
  });
}

document.getElementById('form-nota').addEventListener('submit', function(e) {
  e.preventDefault();
  const titulo = document.getElementById('title').value;
  const contenido = document.getElementById('description').value;
  const date = document.getElementById('date').value;

  guardarNota(titulo, contenido, date);
  mostrarNotas();
  this.reset();
});

window.addEventListener('DOMContentLoaded', mostrarNotas);

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal-nota");
    const modalContent = document.querySelector(".modal-content");

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }

    modal.addEventListener("click", function (e) {
        if (e.target.classList.contains("close-btn") || e.target === modal) {
            closeModal();
        }
    });

    document.getElementById('contenedor-listas').addEventListener("click", function (e) {
        const card = e.target.closest(".card");
        if (card) {
            const index = card.getAttribute("data-index");
            const notas = obtenerNotas();
            const nota = notas[index];

            modalContent.innerHTML = `
                <div class="modal-header">
                    <h2>${nota.titulo}</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <p>${nota.contenido}</p>
                <div class="footer-modal">
                  <span>${nota.date}</span>
                  <button class="borrar-btn"><img src="icon-delete.svg"></button>
                </div>  
            `;

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    });
});

document.addEventListener("click", function (e) {
  if (e.target.closest('.borrar-btn')) {
    const modal = document.getElementById("modal-nota");
    const titulo = modal.querySelector(".modal-header h2").textContent;
    const notas = obtenerNotas();
    const index = notas.findIndex(nota => nota.titulo === titulo);
    if (index !== -1) {
      notas.splice(index, 1);
      localStorage.setItem('notas', JSON.stringify(notas));
      mostrarNotas();
    }
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
});