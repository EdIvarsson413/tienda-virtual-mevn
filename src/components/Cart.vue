<script setup>
import { ref, toRaw } from 'vue'
import { pedidos } from '@/Javascript/carrito'
import { generarPDF } from '../Javascript/ticket/nuevaPlantilla'
import Total from './Total.vue'
import Pedidos from './Pedidos.vue'

// Se traen los pedidos hechos y se vuelven reactivos para agregar más y reflejarlos aqui
const fetchPedidos = ref(pedidos);

// Se calcula el precio por todos los pedidos
const calcularTotal = ref( fetchPedidos.value.reduce( ( total, pedido ) => total + ( pedido.precio * pedido.unidades ), 0 ) )

// Elimina todos los pedidos y vuelve a contar el total
const eliminarPedidos = () => {
    fetchPedidos.value.splice( 0, fetchPedidos.value.length );
    calcularTotal.value = 0
};

// Elimina un pedido por su id
const eliminarPedido = ( id ) => {
    // Se busca el indice del pedido por el id
    const index = fetchPedidos.value.findIndex( pedido => pedido.id === id );

    // Si el indice si se encuentra en el arreglo
    if ( index !== -1 ) {
        // Se elimina el elemento especificando el indice en el array y 1 para señalar que solo un elemento se quita
        fetchPedidos.value.splice( index, 1 );

        // Se recalcula el total del resto de los pedidos
        calcularTotal.value = fetchPedidos.value.reduce( ( total, pedido ) => total + ( pedido.precio * pedido.unidades ), 0 );
    }
}

// Edita un pedido por su id y reescribe el numero de unidades a comprar
const editarPedido = ( id, unidades ) => {
    // Se busca el pedido hasta que su id coincida en el array
    const pedido = fetchPedidos.value.find( pedidoRef => pedidoRef.id === id )

    // Se edita el numero de unidades del pedido
    pedido.unidades = unidades;

    // El pedido editado entra a reemplazar al actual
    fetchPedidos.value = fetchPedidos.value.map( pedidoRef => pedidoRef.id === id ? pedido : pedidoRef );

    // Se recalcula el nuevo total por todos los pedidos
    calcularTotal.value = fetchPedidos.value.reduce( ( total, pedido ) => total + ( pedido.precio * pedido.unidades ), 0 );
}

// Cuando el usuario haya terminado de hacer pedidos
const confirmarPedidos = async () => {
    // Arreglo sacado de la variable reactiva (ya no sera reactivo)
    const arregloRaw = toRaw( fetchPedidos.value )

    // Se inicia el metodo para generar la factura a base del array rescatado
    await generarPDF( arregloRaw, localStorage.getItem( 'nombre' ) );

    eliminarPedidos();
}
</script>

<template>
    <!-- Si hay pedidos se muestran los peiddos y total -->
    <v-container v-if="fetchPedidos.length !== 0">
        <v-row class="mt-7">
            <!-- Espacio para ver los pedidos -->
            <v-col cols="8" class="card-overflow">
                <Pedidos 
                    :fetchPedidos="fetchPedidos" 
                    :eliminarPedido="eliminarPedido" 
                    :editarPedido="editarPedido"
                />
            </v-col>

            <!-- Espacio para ver el total por todos los pedidos -->
            <v-col cols="4">
                <Total 
                    :changeTotal="calcularTotal" 
                    :eliminarPedidos="eliminarPedidos"
                    :confirmarPedidos="confirmarPedidos" 
                />
            </v-col>
        </v-row>
    </v-container>
    <!-- Si no hay pedidos muestra un mensaje al usuario -->
    <div v-else class="text-h2 text-center mt-16">No hay pedidos</div>
</template>

<style>
.card-overflow {
    height: 500px;
    overflow-y: hidden;
}

.card-overflow:hover {
    overflow-y: auto;
}
</style>