<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router'
import { obtenerUsuario } from '../Javascript/auth.js';

// Se importa el router
const router = useRouter();

// Si no hay autenticacion el usuario por default esta en falso
const usuario = ref( false );

// Antes de montar el componente
onBeforeMount(async () => {
    try {
        // Extraen los datos de decifrado del jwt
        usuario.value = await obtenerUsuario();
    } catch ( error ) {
        console.log( error );
    }
});

// Variable que maneja el campo de texto
const campoBuscar = ref('');

// Metodo que se ejecuta al dar enter al campo de texto
const submit = () => { document.location.pathname = `/buscar/${campoBuscar.value}` }

// Links
const redirectHome = () => { router.push( '/' ) }
const redirectCart = () => { router.push( '/cart' ) }
const redirectRegister = () => { router.push( '/registro' ) }
const redirectLogin = () => { router.push( '/login' ) }
const redirectAdmin = () => { router.push( '/admin' ) }



// Boton que vuelve a estado "publico"
const cerrarSesion = () => { 
    // Se elimina el jwt del local storage
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');

    // Se recarga la pagna
    document.location.pathname = '/'; 

    // El usuario vuelve a su estado default
    usuario.value = false
};
</script>

<template>
    <v-app-bar app color="orange-darken-1" elevation="0" height="110">
        <v-row>
            <!-- Logo -->
            <v-col sm="12" md="3">
                <v-btn variant="plain" class="h-100 mx-10" @click="redirectHome">
                    <v-img src="/logo.png" alt="imagen logotipo" width="200" />
                </v-btn>
            </v-col>

            <v-spacer />

            <!-- Campo de texto -->
            <v-col sm="12" md="6" class="d-flex justify-center align-center">
                <v-form class="w-100 mt-4" autocomplete="off" @submit.prevent="submit">
                    <v-text-field 
                        color="white" 
                        label="Buscar" 
                        prepend-inner-icon="mdi-magnify" 
                        variant="outlined" 
                        v-model="campoBuscar"
                        @keyup.enter="submit"
                    />
                </v-form>
            </v-col>

            <!-- Grupo de botones -->
            <v-col sm="12" md="3" class="d-flex pb-3 justify-center align-center">
                <div v-if="usuario" class="mr-2 pl-4 text-body-1">Hola, {{ usuario.nombre }}</div>
                <!-- Tootltip y boton para el login-->
                <v-tooltip v-if="!usuario" text='Login' location="bottom">
                    <template v-slot:activator="{ props }">
                        <div v-bind="props" class="text-center text-h4">
                            <v-btn 
                                @click="redirectLogin"
                                variant="plain" 
                                class="mx-3" 
                                size="x-large" 
                                icon="mdi-login"
                            /> 
                        </div>
                    </template>
                </v-tooltip>
                
                <!-- Tootltip y boton para el registro-->
                <v-tooltip v-if="!usuario" text='Registrarse' location="bottom">
                    <template v-slot:activator="{ props }">
                        <div v-bind="props" class="text-center text-h4">
                            <v-btn 
                                @click="redirectRegister"
                                variant="plain" 
                                class="mx-3" 
                                size="x-large" 
                                icon="mdi-account-edit"
                            /> 
                        </div>
                    </template>
                </v-tooltip>

                <!-- Tootltip y boton para el carrito de compras-->
                <v-tooltip v-if="usuario && usuario.role === 'user'" text='Carrito' location="bottom">
                    <template v-slot:activator="{ props }">
                        <div v-bind="props" class="text-center text-h4">
                            <v-btn 
                                @click="redirectCart" 
                                variant="plain"
                                class="mx-3" 
                                size="x-large" 
                                icon="mdi-cart" 
                            />
                        </div>
                    </template>
                </v-tooltip>

                <!-- Tootltip y boton para la cuenta de administrador-->
                <v-tooltip v-if="usuario && usuario.role === 'admin'" text="Administrador" location="start">
                    <template v-slot:activator="{ props }">
                        <div v-bind="props" class="text-center text-h4">
                            <v-btn 
                                @click="redirectAdmin"
                                variant="plain" 
                                size="x-large" 
                                icon="mdi-account-key" 
                            />
                        </div>
                    </template>
                </v-tooltip>

                <!-- Tootltip y boton para cerrar sesion -->
                <v-tooltip v-if="usuario" text="Cerrar sesion" location="start">
                    <template v-slot:activator="{ props }">
                        <div v-bind="props" class="text-center text-h4">
                            <v-btn 
                                @click="cerrarSesion"
                                variant="plain" 
                                size="x-large" 
                                icon="mdi-logout" 
                            />
                        </div>
                    </template>
                </v-tooltip>
            </v-col>
        </v-row>
    </v-app-bar>
</template>