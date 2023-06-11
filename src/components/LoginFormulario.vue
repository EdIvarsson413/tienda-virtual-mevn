<script setup>
import { ref } from 'vue'
import { error as errorMsg, ok } from './Notificacion'
import axios from 'axios'

// Campos del formulario
const correo = ref('');
const contrasena = ref('');

// Reglas del formulario
const reglas = {
    correo: [
        ( v ) => !!v || 'El correo es requerido',
        ( v ) => /.+@.+\..+/.test( v ) || 'El correo debe ser válido',
    ],
    contrasena: [
        (v) => !!v || 'La contraseña es requerida',
        (v) => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
    ]
}

// Peticion al servidor para inciar sesion
const iniciarSesion = async () => { 
    // Si los campos estan vacios
    if( [ correo.value, contrasena.value ].includes('') ){
        errorMsg( 'Error :(', 'Debes llenar todos los campos' );
        return;
    }

    try {
        // se obtienen los datos del response de la peticion
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`, 
            {
                email: correo.value, 
                password: contrasena.value 
            }
        );

        // Se avisa al usuario que su inicio fue exisoto
        ok( 'Ok ;)', data.msg );

        // Se guarda el jwt en local storage
        localStorage.setItem( 'token', data.jwt );
        localStorage.setItem( 'nombre', data.nombre )

        // En 3.5 milisegundos se recarga la pagina 
        setTimeout(() => {
            // router.push('/');
            document.location.pathname = '/'
        }, 350)
    } catch( error ) { errorMsg( 'Error :(', error.response.data.msg ) }
}
</script>

<template>
    <v-container>
        <v-card class="mx-auto mt-10" color="grey-darken-4" elevation="5" max-width="600" height="450">
            <!-- Titulo del card -->
            <v-card-title class="text-h5 text-center my-4">Iniciar Sesión</v-card-title>
            
            <!-- Formulario con autocompletado deactivado -->
            <v-form autocomplete="off">
                <v-card-text>

                    <!-- Campo del email -->
                    <v-text-field 
                        v-model="correo" 
                        :rules="reglas.correo"
                        class="mb-3"
                        label="Correo electrónico" 
                        variant="outlined"
                        color="orange-darken-1"
                    />

                    <!-- Campo del password -->
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

            <!-- Boton de iniciar sesion -->
            <v-card-actions class="d-flex justify-center mb-2">
                <v-btn color="orange-darken-1" @click="iniciarSesion">Iniciar sesión</v-btn>
            </v-card-actions>
            </v-form>
            <v-divider class="border-opacity-50"></v-divider>

            <!-- Botones para iniciar sesion con redes sociales -->
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
                    color="orange-darken-1"
                >Google
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