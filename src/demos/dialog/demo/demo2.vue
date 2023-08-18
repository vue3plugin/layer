<template>
    <div style="width: 300px;height: 200px;background-color: cadetblue;" ref="to">
        <div ref="target" class="gray-400/30 rounded w-fit bg-black text-white p-4" :style="{ ...style }" v-if="visible">
            <div>💥危险提示</div>
            <button class="btn" @click="visible = false">关闭</button>
        </div>
    </div>
    <div class=" flex justify-between mt-4">
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
const to = ref()
const visible = ref(false)


const { style, setPlacement } = useLayerDialog(target, { placement: "auto", to })

function handlePlacement(placement: LayerDialogPlaceMent) {
    visible.value = true
    setPlacement(placement)
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