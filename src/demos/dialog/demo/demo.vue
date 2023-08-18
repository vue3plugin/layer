<template>
    <div ref="target" style="height: 200px;width: 300px;" class="rounded w-fit bg-black text-white p-4"
        :style="{ ...style }" v-if="visible">
        <div class=" flex justify-between">
            <div handle>💥拖动标题</div>
            <button class="btn" @click="close">X</button>
        </div>
        <div>设备离线，请立即检查</div>

    </div>

    <div class=" flex justify-between">
        <button class="btn" @click="handlePlacement('auto')">中间</button>
        <button class="btn" @click="handlePlacement('t')">上</button>
        <button class="btn" @click="handlePlacement('b')">下</button>
        <button class="btn" @click="handlePlacement('l')">左</button>
        <button class="btn" @click="handlePlacement('r')">右</button>
        <button class="btn" @click="handlePlacement('lt')">左上</button>
        <button class="btn" @click="handlePlacement('lb')">左下</button>
        <button class="btn" @click="handlePlacement('rt')">右上</button>
        <button class="btn" @click="handlePlacement('rb')">右下</button>
    </div>
</template>
<script setup lang="ts">
import { LayerDialogPlaceMent, useLayerDialog } from '@v3p/layer';
import { ref } from 'vue';

const target = ref()
const visible = ref(false)

const { style, setPlacement } = useLayerDialog(target, { placement: "auto", })

function handlePlacement(placement: LayerDialogPlaceMent) {
    visible.value = true
    setPlacement(placement)
}

function close(e) {
    debugger
    visible.value = false
}
</script>
<style scoped>
.btn {
    background-color: gray;
    color: aliceblue;
    padding: 4px 12px;
    border-radius: 2px;
}
</style>