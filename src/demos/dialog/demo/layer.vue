<template>
    <!-- <div class=" relative top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.5)] overflow-auto z-30 " ref="container"> -->
    <div ref="target" class="gray-400/30 rounded w-fit bg-black text-white p-4" :style="{ ...style }" v-if="visible">
        <div>💥危险提示</div>
        <div>设备离线，请立即检查</div>
        <button @click="visible =  false">关闭</button>
    </div>
    <!-- </div> -->
</template>
<script setup lang="ts">
import { useLayerDialog, type LayerDialogPlaceMent } from '@v3p/layer';
import { ref, watch } from 'vue';

const props = defineProps<{
    placement: LayerDialogPlaceMent
}>()

const target = ref()
const visible = defineModel<boolean>("visible", { default: false })

// const container = ref()
const { style, setPlacement } = useLayerDialog(target, { placement: "auto", })

watch(() => props.placement, (placement) => {
    setPlacement(placement)
})
</script>