//ANCHOR - Scrpit
<script setup>
import { computed, ref } from 'vue';
import { catalogo } from '../Javascript/catalogo'

const reader = new FileReader(); 
const dialog = ref(false);
const editar = ref(false);

const id = ref(0)
const nombre = ref('')
const saga = ref('')
const autor = ref('')
const sinopsis = ref('')
const imagen = ref([])
const tipo = ref('')
const precio = ref('');

const libroEditar = computed(() => { return catalogo.find(libro => libro.id === id.value) })


const editarLibro = (datos) => {
  console.log(datos)
  dialog.value = false;
}
</script>

//ANCHOR - Template
<template>
  <v-container>
    <!-- Grupo de botones -->
    <v-btn-group 
      class="d-flex justify-center my-4" 
      color="orange-darken-1" 
      density="comfortable" 
      divided
    >
      <v-btn 
        color='orange-darken-3' 
        @click="() => { dialog = true; editar = false }"
      >Agregar
      </v-btn>
      <v-btn 
        :color="'orange-darken-3'"
      >Eliminar Todos
      </v-btn>
    </v-btn-group>

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
        <tr v-for="libro in catalogo">
          <!--Imagen-->
          <td class="pa-3"> <v-img :src="`/img/${libro.imagen}.jpg`" max-width="150" max-height="150" /></td>

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
                      @click="() => { dialog = true; editar = true; id = libro.id }"
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
                      icon="mdi-delete" />
                  </div>
                </template>
              </v-tooltip>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>

  <!-- Template para el dialog -->
  <template>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent width="1024">
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
                    required 
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
                  <v-select 
                    :items="['libro', 'boxset']" 
                    label="Tipo"
                    variant="outlined" 
                    color="orange-darken-1" 
                    required 
                    v-model="tipo"
                    :placeholder="editar ? `${libroEditar.tipo}` : ''"
                  />
                </v-col>

                <!-- Espacio para el textarea de la sinopsis -->
                <v-col cols="12">
                  <v-textarea 
                    label="Sinopsis" 
                    variant="outlined" 
                    color="orange-darken-1"
                    :placeholder="editar ? `${libroEditar.sinopsis}` : ''"
                  />
                </v-col>
                
                <!-- Espacio para el file input de la portada -->
                <v-col cols="12">
                  <v-file-input
                    accept="image/*"
                    label="Portada del libro" 
                    variant="outlined" 
                    color="orange-darken-1"
                    v-model="imagen"
                    />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <!-- Acciones dek dialog -->
          <v-card-actions>
            <v-btn 
              color="orange-darken-1" 
              variant="text" 
              @click="dialog = false"
            >Cerrar
            </v-btn>
            <v-btn 
              color="orange-darken-1" 
              variant="text"
              @click="() => { editarLibro({ id, nombre, saga, autor, tipo, precio: parseInt(precio), img: imagen[0], sinopsis }); editar = false }">
              {{ editar ? 'Editar' : 'Agregar' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
</template>

//ANCHOR - Style
<style>
.tabla-overflow {
  overflow-y: hidden;
}

.tabla-overflow:hover {
  overflow-y: auto;
}
</style>