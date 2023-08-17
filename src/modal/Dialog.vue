<template>
    <Mask>
        <Transition name="custom-classes" enter-active-class="animate__animated animate__faster animate__zoomIn"
            leave-active-class="animate__animated animate__faster animate__zoomOut">
            <Card></Card>
        </Transition>
    </Mask>
</template>
<script setup lang="ts">
import Mask from "./Mask.vue"
import Card from "./Card.vue"
import "./style/animate.css"
const visible = defineModel<boolean>("visible", { default: false })
</script>
