<template>
    <!-- <Mask ref="mask">
        <Containter>1111111</Containter>
    </Mask> -->
    <div class=" relative bg-black" style="width: 200px;height: 200px;" ref="bounding">
        <Containter :top="100" :left="10" :to="bounding">
            1111111
        </Containter>
    </div>
</template>
<script setup lang="ts">
import Mask from "./modal/Mask.vue"
import Containter from "./modal/Containter.vue"
import { ref, watchEffect } from "vue";
defineProps<{
    name: string
}>()

const bounding = ref()

</script>