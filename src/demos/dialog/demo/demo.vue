<template>
    <Layer :placement="placement" v-model:visible="visible" />
    <div class=" flex justify-between">
        <button @click="placement = 'auto';visible = true">中间</button>
        <button @click="placement = 't';visible = true">上</button>
        <button @click="placement = 'b';visible = true">下</button>
        <button @click="placement = 'l';visible = true">左</button>
        <button @click="placement = 'r';visible = true">右</button>
        <button @click="placement = 'lt';visible = true">左上</button>
        <button @click="placement = 'lb';visible = true">左下</button>
        <button @click="placement = 'rt';visible = true">右上</button>
        <button @click="placement = 'rb';visible = true">右下</button>
    </div>
</template>
<script setup lang="ts">
import { LayerDialogPlaceMent } from '@v3p/layer';
import { ref } from 'vue';
import Layer from "./layer.vue"

const placement = ref<LayerDialogPlaceMent>("auto")

const visible = ref(true)
</script>