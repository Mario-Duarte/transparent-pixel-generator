<script setup lang="ts">
import { defineProps, ref, onMounted, onBeforeMount } from 'vue';
import { motion } from 'motion-v';

const copied = ref(false);
const showTooltip = ref(false);
const tooltipRef = ref<HTMLElement | null>(null);
const elementWidth = ref(0);

const updateWidth = () => {
    if (tooltipRef.value) {
        elementWidth.value = tooltipRef.value.offsetWidth || 0;
    }
};

onBeforeMount(updateWidth);
onMounted(() => {
    updateWidth();
});

const { pixel } = defineProps<{
    pixel: string;
}>();

const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch (err) {
        copied.value = false;
    }
};
</script>

<template>
    <div class="relative w-auto">
        <button class="p-1 bg-sky-300 text-white rounded-lg hover:bg-sky-600 transition-colors"
            @click="copyToClipboard(pixel)" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false"
            type="button">
            <v-icon v-if="copied" name="co-check" aria-hidden="true" scale="1.25"></v-icon>
            <v-icon v-else name="co-copy" aria-hidden="true" scale="1.25"></v-icon>
        </button>

        <motion.div :initial="{ opacity: 0, y: -10 }"
            :animate="{ opacity: showTooltip ? 1 : 0, y: showTooltip ? 0 : -10 }" :transition="{
                duration: 0.3,
                delay: 0.15,
                ease: 'easeInOut'
            }" ref="tooltipRef" aria-label="Copy to clipboard tooltip" aria-hidden="true" role="tooltip"
            :style="{ left: `${elementWidth / 2}px` }"
            class="absolute bottom-[120%] z-10 inline-block p-2 text-sm font-medium text-white bg-sky-600 rounded-lg shadow-xs">
            <span v-if="!copied">Copy to clipboard</span>
            <span v-else>Copied!</span>
        </motion.div>
    </div>
</template>