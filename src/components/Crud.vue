//ANCHOR - Template
<template>
  <div v-if="rol === 'publico'">
      <v-card class="w-75 mt-16 mx-auto" color="grey-darken-4" height="250">
        <div class="text-h2 text-center text-red mt-16">Accesso no autorizado</div>
        <div class="text-h5 text-center mt-4">
            <router-link style="text-decoration: none; color: white;" to="/login">Inicia sesion como administrador</router-link>
        </div>
      </v-card>
  </div>
  <v-container v-else="rol === 'admin'">
    <!-- Grupo de botones -->
    <div>
      <v-btn-group 
        class="d-flex justify-center my-4" 
        color="orange-darken-1" 
        density="comfortable" 
        divided
      >
        <v-btn variant="plain" size="large" >Hay {{  libros.length }} libro(s)</v-btn>
        <v-btn 
          color='orange-darken-3' 
          @click="() => { dialog = true; editar = false }"
        >
          Agregar un libro
        </v-btn>
      </v-btn-group>
    </div>

    <!-- Tabla de libros -->
    <v-table height="550" class="mt-8" hover density="default" theme="dark">
      <!-- Cabeceras -->
      <thead>
        <tr>
          <th class="text-center">Portada</th>
          <th class="text-center">Nombre</th>
          <th class="text-center">Saga</th>
          <th class="text-center">Acciones</th>
        </tr>
      </thead>

      <!-- Contenido de la tabla -->
      <tbody class="tabla--overflow">
        <tr v-for="libro in libros" :key="libro._id">
          <!--Imagen-->
          <td class="pa-3"> 
            <v-img 
              :src="`https://firebasestorage.googleapis.com/v0/b/libreriascastor-ecffa.appspot.com/o/folder%2F${libro.imagen}?alt=media`" 
              max-width="150" 
              max-height="150" 
            />
          </td>

          <!--Nombre y saga-->
          <td class="text-center">{{ libro.nombre }}</td>
          <td class="text-center">{{ libro.saga }}</td>

          <!--Acciones-->
          <td class="text-center">
            <div class="d-flex justify-center">
              <!--Editar-->
              <v-tooltip text="Editar">
                <template v-slot:activator="{ props }">
                  <div v-bind="props" class="text-center">
                    <v-btn 
                      size="x-large" 
                      variant="plain" 
                      color="orange-darken-1" 
                      icon="mdi-pencil"
                      @click="() => { 
                        dialog = true; 
                        editar = true; 
                        obtenerLibro(libro._id); 
                        id = libro._id 
                      }"
                    />
                  </div>
                </template>
              </v-tooltip>

              <!--Eliminar-->
              <v-tooltip text="Eliminar">
                <template v-slot:activator="{ props }">
                  <div v-bind="props" class="text-center">
                    <v-btn 
                      size="x-large" 
                      variant="plain" 
                      color="orange-darken-1" 
                      icon="mdi-delete"
                      @click="() => { eliminarLibro(libro._id, libro.nombre) }" 
                    />
                  </div>
                </template>
              </v-tooltip>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>

  <!-- Dialog -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent width="1024" class="fondo" >
        <v-card color="grey-darken-3">
          <!-- Titulo del dialog -->
          <v-card-title class="text-h5 ma-3">
            <span >{{ editar ? `${libroEditar.nombre} - Editar` : 'Agregar libro' }}</span>
          </v-card-title>

          <!-- Contenido del dialog -->
          <v-card-text>
            <v-container>
              <v-row>
                <!-- Espacio para el input del nombre -->
                <v-col cols="12" sm="6" md="4">
                  <v-text-field 
                    label="Nombre" 
                    variant="outlined"
                    color="orange-darken-1"
                    v-model="nombre"
                    :placeholder="editar ? `${libroEditar.nombre}` : ''"
                  />
                </v-col>

                <!-- Espacio para el input de la saga -->
                <v-col cols="12" sm="6" md="4">
                  <v-text-field 
                    label="Saga" 
                    variant="outlined"
                    color="orange-darken-1" 
                    required 
                    v-model="saga" 
                    :placeholder="editar ? `${libroEditar.saga}` : ''"
                  />
                </v-col>

                <!-- Espacio para el input del autor -->
                <v-col cols="12" sm="6" md="4">
                  <v-text-field 
                    label="Autor" 
                    variant="outlined"
                    color="orange-darken-1" 
                    required 
                    v-model="autor"
                    :placeholder="editar ? `${libroEditar.autor}` : ''" 
                  />
                </v-col>

                <!-- Esapcio para el input del precio -->
                <v-col cols="6">
                  <v-text-field 
                    label="Precio" 
                    variant="outlined"
                    color="orange-darken-1" 
                    required 
                    v-model="precio"
                    :placeholder="editar ? `${libroEditar.precio}` : ''"
                  />
                </v-col>

                <!-- Espacio para el select de tipo -->
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :items="['libro', 'boxset']"
                    label="Tipo"
                    variant="outlined"
                    color="orange-darken-1"
                    required
                    v-model="tipo"
                    :placeholder="editar? `${libroEditar.tipo}` : ''"
                  />
                </v-col>

                <!-- Espacio para el textarea de la sinopsis -->
                <v-col cols="12">
                  <v-textarea 
                    label="Sinopsis" 
                    variant="outlined" 
                    color="orange-darken-1"
                    v-model="sinopsis"
                    :placeholder="editar? `${libroEditar.sinopsis}` : ''"
                  />
                </v-col>
                
                <!-- Espacio para el file input de la portada -->
                <v-col cols="12" class="d-flex">
                    <input 
                      accept="image/*" 
                      type="file" 
                      ref="myfile" 
                      @change="handleChange"
                    >
                    <div v-if="imagen !== ''">{{ imagen }} pre-cargado</div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <!-- Acciones del dialog -->
          <v-card-actions>
            <!-- Cerrar dialog -->
            <v-btn 
              color="orange-darken-1" 
              variant="text" 
              @click="dialog = false"
            >
              Cerrar
            </v-btn>
            <!-- Accion deñ dialog -->
            <v-btn 
              color="orange-darken-1" 
              variant="text"
              @click="() => {
                editar ? 
                    editarLibro( { id, nombre, saga, autor, tipo, sinopsis, precio: parseInt( precio ) } ) 
                  :
                    agregarLibro()
              }"
            >
              {{ editar ? 'Editar' : 'Agregar' }}
            </v-btn>
            
            <!-- Subir portada -->
            <v-btn 
              color="orange-darken-1" 
              variant="text"
              @click="upload()"
            >
                Subir portada
            </v-btn>

            <!-- Mensaje si se subio la portada -->
            <div class="mx-4" v-if="cargado">{{ mensajeimg }}</div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>

//ANCHOR - Scrpit
<script setup>
import { ref , onMounted, watch } from 'vue';
import axios from 'axios'
import { ok, advertencia, confirmar, error as errorMsg } from './Notificacion.js'
import { obtenerUsuario } from '../Javascript/auth.js'

// Variables para usuario
const usuario = ref( false );
const rol = ref( 'publico' );

// Traer usuario para validar
onMounted( async () => {
    try {
      // Se trae la informacion del jwt decifrado
      usuario.value = await obtenerUsuario();

      // De la informacion se obtiene el rol del usuario
      rol.value = usuario.value.role
    } catch (error) {
      // Traar error
    }
  }
)

// Recibe el arreglo de los libros
const libros = ref( [] );

// Recibir los libros de la API
onMounted(() => {
    const obtenerLibros = async () => {
        try {
            const { data } = await axios( `${import.meta.env.VITE_BACKEND_URL}/api/libros` );
            libros.value = data;
        }catch(error) { 
          // Tratar error 
        }
    }
    obtenerLibros();
})

// Booleanos para manipular el dialog
const dialog = ref( false );
const editar = ref( false );

const libroEditar = ref({});

// Obtiene el libro para mostrar los datos en los placeholder y poder editarlo
const obtenerLibro = async (id) => {
    try {
        const { data } = await axios( `${import.meta.env.VITE_BACKEND_URL}/api/libros/id/${id}` );
        libroEditar.value = data;
    } catch (error) {
        // Tratar error
    }
};

// Campos del formulario en dialog para un libro
const id = ref('')
const nombre = ref('')
const saga = ref('')
const autor = ref('')
const sinopsis = ref('')
const imagen = ref('')
const tipo = ref('')
const precio = ref('');

// Funcion que agrega un nuevo libro a la BD
const agregarLibro = async () => {
  // Validación para verificar si cualquiera de los campos está vacio
  if( [ nombre.value, saga.value, autor.value, precio.value, sinopsis.value, imagen.value, tipo.value ].includes('') ) {
    // Desactiva el dialog para dejar ver la alerta de errpr
    dialog.value = false;
    errorMsg('Error :(', 'Debes llenar los campos');
    return
  }

  try {
    // Peticion a la api con el token de autorización
    const { data } = await axios.post( `${import.meta.env.VITE_BACKEND_URL}/api/libros` , {
      // Campos a rellenar
      nombre: nombre.value,
      saga: saga.value,
      autor: autor.value,
      precio: precio.value,
      sinopsis: sinopsis.value,
      imagen: imagen.value,
      tipo: tipo.value
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    // Si la peticion esta hecha manda un mensaje y desaparece el dialog
    ok( 'Ok ;)', data.msg )
    dialog.value = false;

    // Despues de un 1s se recarga la vista
    setTimeout(() => { document.location.pathname = '/admin' }, 1000 );
  } 
  catch (error) { 
    // Envia una laerta de error
    errorMsg( 'Error :(', error.response.data.msg ); 
    dialog.value = false
  }
}

// Boton que llama a la api y edita el libro
const editarLibro = async ( datos ) => {
  // Extrae los campos por separado
  const { id, nombre, saga, autor, precio, sinopsis, tipo } = datos;

  // Se validan si no estan vacios
  if( [ nombre, saga, autor, precio, sinopsis, imagen, tipo ].includes('') ) {
    // Si estan vacios se envia una laerta de error y desaparece el dialog
    dialog.value = false;
    errorMsg( 'Error :(', 'Debes llenar los campos' );
    return
  }

  try {
    // Se hace la peticion a la api con el token de autorizacion
    const { data } = await axios.put( `${import.meta.env.VITE_BACKEND_URL}/api/libros/${id}` ,{
      // Campos a llenar
      nombre,
      saga,
      autor,
      precio,
      sinopsis,
      imagen: imagen.value,
      tipo
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem( 'token' )}`
      }
    })

    // Si la peticion esta hecha manda un mensaje al usuairo
    ok( 'Ok ;)', data.msg );
  } 
  catch( error ) {
    // Tratar error
  }

  // Desaparece el dialog y despues de un 1s se recarga la vista
  dialog.value = false;
  setTimeout( () => { document.location.pathname = '/admin' }, 1000 );
}


// Eliminar un libro de la base de datos
const eliminarLibro = async ( id, nombre ) => {
  // Se pregunta al usuario si quiere eliminar el libro
  const resultado = await confirmar( nombre, `¿Estás seguro de eliminar ${nombre}?`, 'Si, eliminar' );
  
  // Si el usuario acepta se inicia la peticion
  if( resultado ) {
    try {
      // Se hace la peticion a la api con el token de autorización, el libro se elimina por si id
      const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/libros/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem( 'token' )}`
        }
      })

      // Si se realizo la peticion desaparece el dialog y se envia un mensaje
      ok( 'Ok ;)', data.msg );
      dialog.value = false;

      // Despues de un 1s se recarga la vista
      setTimeout(() => { document.location.pathname = '/admin' }, 1000 );
    } catch (error) {
      // Trtar el error
    }
  } else{
    // Si el usuario no acepto eliminar el libro
    advertencia('Upps...', 'El libro no se eliminó');
  }
}

// Metodo para obtener el nombre del archivo y su extension
const handleChange = ( event ) => {
  // Se obtiene el archivo
  const file = event.target.files[0];

  // Se extrae el file NAme para usarlo en las peticiones al servidor
  imagen.value = file.name
};
</script>

<script>
import { storage } from "../firebase"
import { ref as Fref, uploadBytes } from "firebase/storage"

export default {
  // Variables de este script
  data() {
    return {
      cargado: false,
      mensajeimg: '',
    }
  },
  methods: {
    upload: function () {
      // Si no hay archivo precargado
      if( !this.$refs.myfile.files[ 0 ] ) {
        // Se activa el div de alerta
        this.cargado = true
        this.mensajeimg = 'No haz seleccionado ningún archivo';

        // Despues de un 1s desaparece el div
        setTimeout(() => { this.mensajeimg = ''; this.cargado = false }, 1000 );
        return;
      }
      
      if( this.$refs.myfile.files[ 0 ].type !== 'image/jpeg') {
        // El archivo seleccionado no es de tipo image/jpeg
        this.cargado = true;
        this.mensajeimg = 'El archivo debe ser de tipo image/jpeg';

        // el mensaje de aviso desaparece despues de 2s
        setTimeout(() => { this.mensajeimg = ''; this.cargado = false; }, 2000);
        return;
      }

      // se crea la referencia al storage de Firebase
      const storageRef = Fref(storage, `folder/${this.$refs.myfile.files[0].name}`);

      // Se emplea el metodo de Firebase para subir el archivo
      uploadBytes( storageRef, this.$refs.myfile.files[ 0 ] )
        .then( ( snapshot ) => {
          // Aviso de la subida de archivo
          this.cargado = true;
          this.mensajeimg = 'Portada cargada en storage';
        })
        .catch(( error ) => {
          // Manejo de errores específico, si es necesario
        });
    },
  }
};
</script>

//ANCHOR - Style
<style>
.tabla-overflow {
  overflow-y: hidden;
}

.tabla-overflow:hover {
  overflow-y: auto;
}

.fondo {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>