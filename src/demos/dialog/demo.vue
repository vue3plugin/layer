<template>
    <div class=" relative top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.5)] overflow-auto z-30 " ref="container">
        <div ref="target" class="gray-400/30 bg-$vp-c-bg rounded bg-white w-fit fixed" :style="{ ...style }">
            <div>💥危险提示</div>
            <div>设备离线，请立即检查</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useLayerDialog } from '@v3p/layer';
import { ref } from 'vue';

const target = ref()
const container = ref()
const { style } = useLayerDialog(target, { placement: "rb", })
</script>