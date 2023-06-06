<script setup>
import { ref } from 'vue';

const correo = ref('');
const contrasena = ref('');

const reglas = {
    correo: [
        (v) => !!v || 'El correo es requerido',
        (v) => /.+@.+\..+/.test(v) || 'El correo debe ser válido',
    ],
    contrasena: [
        (v) => !!v || 'La contraseña es requerida',
        (v) => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
    ]
}

const iniciarSesion = () => { console.log(correo, ' ', contrasena) }

</script>

<template>
    <v-container>
        <v-card class="mx-auto mt-10" color="grey-darken-4" elevation="5" max-width="600" height="450">
            <v-card-title class="text-h5 text-center my-4">Iniciar Sesión</v-card-title>
            <v-form autocomplete="off">
                <v-card-text>
                <v-text-field 
                    v-model="correo" 
                    :rules="reglas.correo"
                    class="mb-3"
                    label="Correo electrónico" 
                    variant="outlined"
                    color="orange-darken-1"
                />
                <v-text-field 
                    v-model="contrasena" 
                    :rules="reglas.contrasena"
                    class="mb-3"
                    label="Contraseña" 
                    variant="outlined" 
                    color="orange-darken-1"
                    type="password"
                />
            </v-card-text>
            <v-card-actions class="d-flex justify-center mb-2">
                <v-btn color="orange-darken-1" @click="iniciarSesion">Iniciar sesión</v-btn>
            </v-card-actions>
            </v-form>
            <v-divider class="border-opacity-50"></v-divider>
            <div class="d-flex justify-center mt-7">
                <v-btn 
                    class="mx-3" 
                    prepend-icon="mdi-facebook" 
                    variant="outlined" 
                    color="orange-darken-1">Facebook
                </v-btn>
                <v-btn 
                    class="mx-3" 
                    prepend-icon="mdi-google" 
                    variant="outlined" 
                    color="orange-darken-1">Google
                </v-btn>
                <v-btn 
                    class="mx-3" 
                    prepend-icon="mdi-github" 
                    variant="outlined" 
                    color="orange-darken-1">GitHub
                </v-btn>
            </div>
        </v-card>
    </v-container>
</template>