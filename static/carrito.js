document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const carritoToggle = document.getElementById('carrito-toggle');
    const carritoContenido = document.getElementById('carrito-contenido');
    const listaCarrito = document.getElementById('lista-carrito');
    const contadorCarrito = document.querySelector('.contador-carrito');
    const totalElement = document.querySelector('.total');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Toggle del carrito
    carritoToggle.addEventListener('click', function() {
        const isHidden = carritoContenido.hidden;
        carritoContenido.hidden = !isHidden;
        carritoToggle.setAttribute('aria-expanded', !isHidden);
    });

    // Cerrar carrito al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!carritoToggle.contains(e.target) && !carritoContenido.contains(e.target)) {
            carritoContenido.hidden = true;
            carritoToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Actualizar carrito
    function actualizarCarrito() {
        // Guardar en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Actualizar contador
        contadorCarrito.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);

        // Actualizar lista
        listaCarrito.innerHTML = '';

        if (carrito.length === 0) {
            listaCarrito.innerHTML = '<li class="carrito-vacio">Tu carrito está vacío</li>';
            totalElement.textContent = 'Total: $0';
            return;
        }

        let total = 0;

        carrito.forEach((item, index) => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-imagen">
                <div class="carrito-item-info">
                    <div class="carrito-item-nombre">${item.nombre}</div>
                    <div class="carrito-item-precio">$${item.precio} x ${item.cantidad} = $${subtotal}</div>
                </div>
                <button class="carrito-item-eliminar" data-index="${index}" aria-label="Eliminar ${item.nombre} del carrito">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            listaCarrito.appendChild(li);
        });

        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Eliminar producto del carrito
    listaCarrito.addEventListener('click', function(e) {
        if (e.target.classList.contains('carrito-item-eliminar') || e.target.closest('.carrito-item-eliminar')) {
            const button = e.target.classList.contains('carrito-item-eliminar') ? e.target : e.target.closest('.carrito-item-eliminar');
            const index = button.getAttribute('data-index');
            carrito.splice(index, 1);
            actualizarCarrito();
        }
    });

    // Agregar producto al carrito
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('boton-agregar')) {
            const productoCard = e.target.closest('.producto-card');
            const producto = {
                id: productoCard.getAttribute('data-id'),
                nombre: productoCard.querySelector('h3').textContent,
                precio: parseFloat(productoCard.querySelector('.producto-precio').textContent.replace('$', '')),
                imagen: productoCard.querySelector('.producto-imagen img').src,
                cantidad: 1
            };

            // Verificar si el producto ya está en el carrito
            const productoExistente = carrito.find(item => item.id === producto.id);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push(producto);
            }

            actualizarCarrito();

            // Mostrar feedback
            const feedback = document.createElement('div');
            feedback.textContent = 'Producto agregado al carrito';
            feedback.style.position = 'fixed';
            feedback.style.bottom = '100px';
            feedback.style.right = '20px';
            feedback.style.backgroundColor = 'var(--success-color)';
            feedback.style.color = 'white';
            feedback.style.padding = '10px 20px';
            feedback.style.borderRadius = '4px';
            feedback.style.boxShadow = 'var(--shadow)';
            feedback.style.zIndex = '1000';
            document.body.appendChild(feedback);

            setTimeout(() => {
                feedback.style.transition = 'opacity 0.5s';
                feedback.style.opacity = '0';
                setTimeout(() => feedback.remove(), 500);
            }, 2000);
        }
    });

    // Inicializar carrito
    actualizarCarrito();
});

// chatbot.js
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotBody = document.getElementById('chatbot-body');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    
    // Toggle del chatbot
    chatbotToggle.addEventListener('click', function() {
        const isExpanded = chatbotToggle.getAttribute('aria-expanded') === 'true';
        chatbotWindow.hidden = isExpanded;
        chatbotToggle.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Cerrar chatbot
    chatbotClose.addEventListener('click', function() {
        chatbotWindow.hidden = true;
        chatbotToggle.setAttribute('aria-expanded', 'false');
    });
    
    // Enviar mensaje
    function enviarMensaje() {
        const mensaje = chatbotInput.value.trim();
        if (mensaje === '') return;
        
        // Agregar mensaje del usuario
        agregarMensaje(mensaje, 'sent');
        chatbotInput.value = '';
        
        // Simular respuesta del bot
        setTimeout(() => {
            const respuesta = obtenerRespuesta(mensaje);
            agregarMensaje(respuesta, 'received');
        }, 1000);
    }
    
    // Enviar con botón o Enter
    chatbotSend.addEventListener('click', enviarMensaje);
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            enviarMensaje();
        }
    });
    
    // Agregar mensaje al chat
    function agregarMensaje(texto, tipo) {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.classList.add('message', tipo);
        
        const parrafo = document.createElement('p');
        parrafo.textContent = texto;
        mensajeDiv.appendChild(parrafo);
        
        chatbotBody.appendChild(mensajeDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
    
    // Lógica simple de respuestas
    function obtenerRespuesta(mensaje) {
        const mensajeLower = mensaje.toLowerCase();
        
        if (mensajeLower.includes('hola') || mensajeLower.includes('buenos días') || mensajeLower.includes('buenas tardes')) {
            return '¡Hola! Soy tu asistente de Seguridad Vial. ¿En qué puedo ayudarte hoy?';
        } else if (mensajeLower.includes('producto') || mensajeLower.includes('comprar')) {
            return 'Tenemos una amplia variedad de productos de seguridad vial. Puedes verlos todos en nuestra sección de productos.';
        } else if (mensajeLower.includes('precio') || mensajeLower.includes('cost')) {
            return 'Los precios varían según el producto. ¿Te interesa algún producto en particular para que te dé más detalles?';
        } else if (mensajeLower.includes('envío') || mensajeLower.includes('entrega')) {
            return 'Realizamos envíos a todo el país. El tiempo de entrega depende de tu ubicación, generalmente entre 2 a 5 días hábiles.';
        } else if (mensajeLower.includes('contacto') || mensajeLower.includes('teléfono') || mensajeLower.includes('email')) {
            return 'Puedes contactarnos al teléfono 555-1234 o al email contacto@seguridadvial.com. También tenemos un formulario de contacto en nuestra web.';
        } else {
            return 'Gracias por tu mensaje. Si necesitas ayuda con algún producto o servicio, no dudes en preguntar.';
        }
    }
});