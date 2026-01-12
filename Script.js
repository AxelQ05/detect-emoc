// 1. Al cargar la página, mostramos el historial completo
window.onload = function() {
    mostrarHistorialLocalStorage();
};

// 2. Función para mostrar el historial con todos los detalles pedidos
function mostrarHistorialLocalStorage() {
    const listaUI = document.getElementById('lista-global-usuarios');
    if (!listaUI) return;

    const datos = JSON.parse(localStorage.getItem('historialProyectos')) || [];
    listaUI.innerHTML = ""; 
    
    // Mostramos los registros (los más recientes primero)
    datos.slice(-5).reverse().forEach(user => {
        const li = document.createElement('li');
        
        // Estilo para que se vea ordenado y profesional
        li.style.padding = "15px";
        li.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
        li.style.listStyle = "none";
        li.style.textAlign = "left";
        li.style.fontSize = "0.85rem";

        // Aquí armamos el contenido con fecha, hora, edad y curso
        li.innerHTML = `
            <div style="color: var(--primary); font-weight: 600; margin-bottom: 5px;">
                ✅ ${user.nombre.toUpperCase()}
            </div>
            <div style="opacity: 0.8;">
                <span>📅 <strong>Fecha:</strong> ${user.fecha.replace('T', ' ')}</span><br>
                <span>🎂 <strong>Edad:</strong> ${user.edad} años</span> | 
                <span>🎓 <strong>Curso:</strong> ${user.curso}</span>
            </div>
        `;
        listaUI.appendChild(li);
    });
}

// 3. Evento Principal: Registro y Activación del Monitor
document.getElementById('form-registro').addEventListener('submit', function(e) {
    e.preventDefault();

    const usuarioActual = {
        nombre: document.getElementById('nombre').value,
        edad: document.getElementById('edad').value,
        curso: document.getElementById('curso').value,
        fecha: document.getElementById('fecha-hora').value
    };

    let listaUsuarios = JSON.parse(localStorage.getItem('historialProyectos')) || [];
    listaUsuarios.push(usuarioActual);
    localStorage.setItem('historialProyectos', JSON.stringify(listaUsuarios));

    // Activamos la señal para que Monitor.html sepa que puede arrancar
    localStorage.setItem('sistemaActivo', 'true');

    alert("¡Registro exitoso!\nSincronizando con Sensor .AI. Por favor, conecte el Arduino.");

    window.location.href = "Monitor.html";
});

// 4. Limpiar historial
function limpiarHistorial() {
    if (confirm("¿De ley quieres borrar todos los registros?")) {
        localStorage.removeItem('historialProyectos');
        mostrarHistorialLocalStorage();
    }
}