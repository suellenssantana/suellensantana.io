var cuentas = [
    { nombre: "Mali", saldo: 200, password: "1234", transacciones: [], cuenta: "23.786-4", rut: "18.001.011-2" },
    { nombre: "Gera", saldo: 290, password: "5678", transacciones: [], cuenta: "24.787-5", rut: "18.001.011-3" },
    { nombre: "Maui", saldo: 67, password: "4321", transacciones: [], cuenta: "25.788-6", rut: "18.001.011-4" }
];

let cuentaSeleccionada = null;

function seleccionarCuenta() {
    let nombreCuenta = document.getElementById("cuentaSeleccionada").value;
    cuentaSeleccionada = cuentas.find(cuenta => cuenta.nombre === nombreCuenta);
    if (cuentaSeleccionada) {
        document.getElementById("pantalla").innerHTML = `
            <p>Ingrese tu contraseña:</p>
            <input type='password' id='password'>
            <button onclick='validarPassword()'>Validar</button>
        `;
    } else {
        alert("Cuenta no encontrada. Intente nuevamente.");
    }
}

function validarPassword() {
    let passwordIngresado = document.getElementById("password").value;
    if (passwordIngresado === cuentaSeleccionada.password) {
        mostrarOpciones();
    } else {
        alert("Contraseña incorrecta. Intente nuevamente.");
    }
}

function getFechaHora() {
    let fecha = new Date();
    return fecha.toLocaleString();
}

function mostrarOpciones() {
    document.getElementById("pantalla").innerHTML = `
        <p>Bienvenido(a), ${cuentaSeleccionada.nombre}</p>
        <p>RUT: ${cuentaSeleccionada.rut}, Cuenta: ${cuentaSeleccionada.cuenta}</p>
        <button onclick='consultarSaldo()'>Consultar saldo</button>
        <button onclick='ingresarMonto()'>Ingresar monto</button>
        <button onclick='retirarMonto()'>Retirar monto</button>
        <button onclick='transferirMonto()'>Transferir dinero</button>
        <button onclick='verTransacciones()'>Ver Extracto</button>
    `;
}

function consultarSaldo() {
    document.getElementById("pantalla").innerHTML = `
        <p>Saldo actual: $${cuentaSeleccionada.saldo}</p>
        <button onclick='mostrarOpciones()'>Regresar</button>
    `;
}

function ingresarMonto() {
    let monto = parseFloat(prompt("Ingrese el monto a depositar:"));
    if (monto > 0) {
        let nuevoSaldo = cuentaSeleccionada.saldo + monto;
        if (nuevoSaldo <= 990) {
            cuentaSeleccionada.saldo = nuevoSaldo;
            cuentaSeleccionada.transacciones.push(`${getFechaHora()}: + $${monto} (Depósito)`);
            alert(`Depósito exitoso.`);
        } else {
            alert("No se puede exceder el saldo máximo de $990.");
        }
    }
    mostrarSaldoDespuesTransaccion();
}

function retirarMonto() {
    let monto = parseFloat(prompt("Ingrese el monto a retirar:"));
    if (monto > 0) {
        let nuevoSaldo = cuentaSeleccionada.saldo - monto;
        if (nuevoSaldo >= 10) {
            cuentaSeleccionada.saldo = nuevoSaldo;
            cuentaSeleccionada.transacciones.push(`${getFechaHora()}: - $${monto} (Retiro)`);
            alert(`Retiro exitoso.`);
        } else {
            alert("No se puede tener menos de $10 después del retiro.");
        }
    }
    mostrarSaldoDespuesTransaccion();
}

function transferirMonto() {
    let destinatarioNombre = prompt("Ingrese el nombre de la cuenta destino:");
    let destinatario = cuentas.find(cuenta => cuenta.nombre === destinatarioNombre);
    let monto = parseFloat(prompt("Ingrese el monto a transferir:"));

    if (monto > 0 && destinatario && destinatario !== cuentaSeleccionada) {
        let saldoOrigen = cuentaSeleccionada.saldo - monto;
        let saldoDestino = destinatario.saldo + monto;

        if (saldoOrigen >= 10 && saldoDestino <= 990) {
            cuentaSeleccionada.saldo = saldoOrigen;
            destinatario.saldo = saldoDestino;

            cuentaSeleccionada.transacciones.push(`${getFechaHora()}: - $${monto} a ${destinatario.nombre}, Cuenta: ${destinatario.cuenta} (Transferencia)`);
            destinatario.transacciones.push(`${getFechaHora()}: + $${monto} de ${cuentaSeleccionada.nombre}, Cuenta: ${cuentaSeleccionada.cuenta} (Transferencia)`);
            alert("Transferencia realizada con éxito.");
        } else {
            alert("Transferencia inválida: Verifique que no queden menos de $10 en la cuenta origen ni que se excedan $990 en la cuenta destino.");
        }
    }
    mostrarSaldoDespuesTransaccion();
}

function verTransacciones() {
    let transaccionesHTML = cuentaSeleccionada.transacciones.length > 0 
        ? cuentaSeleccionada.transacciones.join("<br>") 
        : "Sin transacciones";
    document.getElementById("pantalla").innerHTML = `
        <p>Extracto:</p>
        ${transaccionesHTML}
        <br><button onclick='mostrarOpciones()'>Regresar</button>
    `;
}

function mostrarSaldoDespuesTransaccion() {
    document.getElementById("pantalla").innerHTML = `
        <p>Saldo actual: $${cuentaSeleccionada.saldo}</p>
        <button onclick='mostrarOpciones()'>Regresar</button>
    `;
}