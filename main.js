// Función para obtener notas del localStorage
function obtenerNotas() {
  const notas = localStorage.getItem('notas');
  return notas ? JSON.parse(notas) : [];
}

// Función para guardar nota
function guardarNota(titulo, contenido, date) {
  const notas = obtenerNotas();
  notas.push({ titulo, contenido, date });
  localStorage.setItem('notas', JSON.stringify(notas));
}

// Función para mostrar notas en el div
function mostrarNotas() {
  const notas = obtenerNotas();
  const container = document.getElementById('contenedor-listas');
  container.innerHTML = '';

  notas.forEach((nota, index) => {
    const descripcionCorta = nota.contenido.length > 20 
      ? nota.contenido.slice(0, 20) + '...'
      : nota.contenido;

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

// Evento para el formulario
document.getElementById('form-nota').addEventListener('submit', function(e) {
  e.preventDefault();
  const titulo = document.getElementById('title').value;
  const contenido = document.getElementById('description').value;
  const date = document.getElementById('date').value;

  guardarNota(titulo, contenido, date);
  mostrarNotas();
  this.reset();
});

// Mostrar notas al cargar la página
window.addEventListener('DOMContentLoaded', mostrarNotas);

// Función para modal de la nota
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal-nota");
    const modalContent = document.querySelector(".modal-content");

    // Función para cerrar el modal
    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }

    // Evento click sobre el botón cerrar
    modal.addEventListener("click", function (e) {
        if (e.target.classList.contains("close-btn") || e.target === modal) {
            closeModal();
        }
    });

    // Evento click sobre las tarjetas
    document.getElementById('contenedor-listas').addEventListener("click", function (e) {
        const card = e.target.closest(".card");
        if (card) {
            const index = card.getAttribute("data-index");
            const notas = obtenerNotas();
            const nota = notas[index];

            // Mostrar contenido de la nota en el modal
            modalContent.innerHTML = `
                <div class="modal-header">
                    <h2>${nota.titulo}</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <p>${nota.contenido}</p>
                <span>${nota.date}</span>
            `;

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    });
});
