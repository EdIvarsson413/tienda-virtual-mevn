<template>
    <v-container>
        <Libro :libroId="routeId"/>
    </v-container>
</template>

<script>
// Scrip aplicando Comp API 
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

// Componentes
import Libro from '@/components/Libro.vue'

export default defineComponent({
    name: 'LibroView',
    components: {
        Libro
    },
    setup() {
        const router = useRoute();
        const routeId = ref(router.params.id);
        return {
            routeId,
        }
    }
})
</script>