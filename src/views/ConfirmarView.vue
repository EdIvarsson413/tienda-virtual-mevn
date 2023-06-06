<template>
    <v-container class="d-flex justify-center">
        <v-card class="w-75 mt-16" color="grey-darken-4" :height="err? 123 : 250 ">
            <div v-if="err" class="text-h2 text-center text-red mt-8">{{ alerta }}</div>
            <div v-else>
                <div class="text-h2 text-center text-green mt-16">{{ alerta }}</div>
                <div class="text-h5 text-center mt-4">
                    <router-link style="text-decoration: none; color: white;" to="/login">Inicia sesion</router-link>
                </div>
            </div>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute();
const { token } = route.params;
const alerta = ref('');
const err = ref(false);

// Peticion al backend, se realiza al iniciar el componente
onMounted(() => {
    const confirmarCuenta = async () => {
        try {
            // Primero se construye la url
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/confirmar/${token}`;
            const { data } = await axios(url)

            alerta.value = data.msg
            err.value = false;
        } catch (error) { alerta.value = error.response.data.msg; err.value = true; }
    }

    confirmarCuenta();
}); 
</script>
