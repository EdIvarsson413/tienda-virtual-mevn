<template>
    <Cart />
</template>

<script>
import { defineComponent } from 'vue'

//Componente
import Cart from '@/components/Cart.vue';

export default defineComponent({
    name: 'CartView',
    components: {
        Cart
    }
})
</script>