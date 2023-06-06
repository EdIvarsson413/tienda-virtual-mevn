<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter();

// Variable que maneja el campo de texto
const campoBuscar = ref('');

// Links
const redirectHome = () => { router.push('/') }
const redirectCart = () => { router.push('/cart') }
const redirectRegister = () => { router.push('/registro') }
const redirectLogin = () => { router.push('/login') }
const redirectAdmin = () => { router.push('/admin') }

// Metodo que se ejecuta al dar enter al campo de texto
const submit = () => { router.push(`/buscar/${campoBuscar.value}`) }
</script>

<template>
    <v-app-bar app color="orange-darken-1" elevation="0" height="110">
        <!-- Logo -->
        <div>
            <v-btn variant="plain" class="h-100 mx-10" @click="redirectHome">
                <v-img src="/logo.png" alt="imagen logotipo" width="200" />
            </v-btn>
        </div>

        <v-spacer />

        <!-- Campo de texto -->
        <v-form class="w-75 mx-6" autocomplete="off" @submit.prevent="submit">
            <v-text-field color="white" label="Buscar" prepend-inner-icon="mdi-magnify" variant="outlined" v-model="campoBuscar"
                @keyup.enter="submit" />
        </v-form>

        <!-- Grupo de botones -->
        <div class="d-flex pb-5">
            <!-- Tootltip y boton para el login-->
            <v-tooltip text='Login' location="bottom">
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
            <v-tooltip text='Registrarse' location="bottom">
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
            <v-tooltip text='Carrito' location="bottom">
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
            <v-tooltip text="Administrador" location="start">
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
        </div>
    </v-app-bar>
</template>