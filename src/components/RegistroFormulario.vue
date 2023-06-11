<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { error as errorMsg, ok } from '../components/Notificacion.js'
import axios from 'axios';

// Router para redirigir al inicio
const router = useRouter();

// Variables del registro
const userName = ref('');
const correo = ref('');
const contrasena = ref('');
const repetirContrasena = ref('');

// Validaciones en el cliente
const reglas = {
    correo: [
        ( v ) => !!v || 'El correo es requerido',
        ( v ) => /.+@.+\..+/.test( v ) || 'El correo debe ser válido',
    ],
    contrasena: [
        ( v ) => !!v || 'La contraseña es requerida',
        ( v ) => v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres',
    ],
    repetir: [
        ( v ) => !!v || 'La repetición de contraseña es requerida',
        ( v ) => v === contrasena.value || 'Las contraseñas no coinciden',
    ]
}

// Submit debe hacer un post en la API
const registrar = async () => {
    if( [ userName.value, contrasena.value, correo.value, repetirContrasena.value ].includes('') ) {
        errorMsg( 'Error :(', 'Debes llenar los campos' );
        return;
    }

    // Creando usuario en la API
    try {
        // Cuando se obtiene la respuesta, se saca el data
        const { data } = await axios.post( `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/registro` , 
        {
            nombre: userName.value,
            email: correo.value,
            password: contrasena.value
        })

        // Envia mensaje que ya esta registrado
        ok( 'Ok ;)', data.msg )

        // Despues de un 1s se envia al usuario a laa ventana del catalogo
        setTimeout(() => {
            router.push('/');
        }, 1000);
    } catch (error) {  errorMsg( 'Error :(', error.response.data.msg ); }
}
</script>

<template>
    <v-container>
        <v-card class="mx-auto mt-10" color="grey-darken-4" elevation="5" max-width="600">
            <v-card-title class="text-h5 text-center my-4">Registrate</v-card-title>

            <!-- Formulario -->
            <v-form autocomplete="off">
                <v-card-text>
                    <!-- Nombre de usuario -->
                    <v-text-field 
                        v-model="userName" 
                        class="mb-3" 
                        label="Nombre de usuario" 
                        variant="outlined"
                        color="orange-darken-1"
                    />

                    <!-- Correo -->
                    <v-text-field 
                        v-model="correo" 
                        :rules="reglas.correo" 
                        class="mb-3" 
                        label="Correo electrónico"
                        variant="outlined" 
                        color="orange-darken-1" 
                    />

                    <!-- Contraseña -->
                    <v-text-field 
                        v-model="contrasena"   
                        :rules="reglas.contrasena" 
                        class="mb-3" 
                        label="Contraseña"
                        variant="outlined" 
                        color="orange-darken-1" 
                        type="password"
                    />

                    <!-- Repetir contraeña -->
                    <v-text-field 
                        v-model="repetirContrasena" 
                        :rules="reglas.repetir" 
                        class="mb-3"
                        label="Repetir contraseña"
                        variant="outlined"
                        color="orange-darken-1" 
                        type="password"     
                    />
                </v-card-text>

                <!-- Boton de submit -->
                <v-card-actions class="d-flex justify-center mb-2">
                    <v-btn color="orange-darken-1" size="large" @click="registrar">Registrar</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-container>
</template>