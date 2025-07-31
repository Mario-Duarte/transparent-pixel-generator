<script setup lang="ts">
import { ref } from 'vue';
import transparentPixelGenerator from 'transparent-pixel-generator';

const r = ref(0)
const g = ref(0)
const b = ref(0)
const hexColor = ref('#000000')
const opacity = ref(0)
const pWidth = ref(1)
const pHeight = ref(1)

const pixel = transparentPixelGenerator({
    with: pWidth.value,
    height: pHeight.value,
    alpha: opacity.value,
    color: hexColor.value,
})
</script>

<template>
    <main class="h-[80dvh] w-full bg-[#FAF7F3] flex flex-col items-center justify-center p-8">

        <div class="w-full max-w-5xl">
            <a href="https://www.npmjs.com/package/transparent-pixel-generator" target="_blank"
                rel="noopener noreferrer" class="flex items-center gap-4 mb-8">
                <img src="../../ico.svg" width="86" class="logo" alt="App logo" />
                <h1
                    class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-600 to-emerald-500">
                    Transparent Base64<br />image Generator</h1>
            </a>

            <p class="text-lg text-gray-900 mb-4">
                Demo page of a lightweight, dependency-free <a
                    href="https://www.npmjs.com/package/transparent-pixel-generator" target="_blank"
                    rel="noopener noreferrer" class="text-sky-600 hover:underline">library</a> to generate base64
                transparent pixel PNGs on the client-side, ideal for creating dynamic backgrounds and placeholders
                without server requests.
            </p>

            <div>
                <textarea v-model="pixel"
                    class="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg resize-none"
                    readonly></textarea>
            </div>

        </div>

    </main>
</template>