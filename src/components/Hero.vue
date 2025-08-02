<script setup lang="ts">
import { ref, watch } from 'vue';
import { transparentPixelGenerator } from 'transparent-pixel-generator';
import hexToRGB from '../helpers/hexToRGB';
import rgbToHex from '../helpers/rgbToHex';

const r = ref<number>(0)
const g = ref<number>(0)
const b = ref<number>(0)

const hexColor = ref<`#${string}`>('#000000')
const opacity = ref<number>(0)
const pWidth = ref<number>(1)
const pHeight = ref<number>(1)

const pixel = ref<string>(transparentPixelGenerator({
    width: pWidth.value,
    height: pHeight.value,
    alpha: opacity.value,
    color: hexColor.value,
}))

watch([pWidth, pHeight, opacity, hexColor], () => {
    pixel.value = transparentPixelGenerator({
        width: pWidth.value,
        height: pHeight.value,
        alpha: opacity.value,
        color: hexColor.value,
    });
    console.log({width: pWidth.value,
        height: pHeight.value,
        alpha: opacity.value,
        color: hexColor.value});
    
}, { immediate: true });

const updateHex = () => {
    const red = Number(r.value) || 0;
    const green = Number(g.value) || 0;
    const blue = Number(b.value) || 0;
    const clampedRed = Math.max(0, Math.min(255, red));
    const clampedGreen = Math.max(0, Math.min(255, green));
    const clampedBlue = Math.max(0, Math.min(255, blue));
    hexColor.value = rgbToHex(clampedRed, clampedGreen, clampedBlue);
    console.log(`Updated hex color: ${hexColor.value}`);
}

const updateRgb = () => {
    const { red, green, blue } = hexToRGB(hexColor.value);
    r.value = red;
    g.value = green;
    b.value = blue;
}

</script>

<template>
    <main class="h-auto md:h-[80dvh] w-full bg-[#FAF7F3] flex flex-col items-center justify-center p-8">

        <form class="w-full max-w-5xl">
            <a href="https://www.npmjs.com/package/transparent-pixel-generator" target="_blank"
                rel="noopener noreferrer" class="flex items-center gap-4 mb-8">
                <img src="/ico.svg" width="86" class="logo" alt="App logo" />
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

            <div class="grid grid-cols-1 md:grid-cols-3 gap-16 mb-8">

                <div class="flex flex-col gap-2">
                    <label class="block -mb-2 text-gray-900" for="red" aria-label="Red">Red:</label>
                    <input v-model.number="r" type="number" min="0" max="255" id="red" placeholder="0-255"
                        v-on:input="updateHex()" class="w-full p-2 bg-neutral-50 border border-gray-200 rounded-lg" />
                    <label class="block -mb-2 text-gray-900" for="green" aria-label="Green">Green:</label>
                    <input v-model.number="g" type="number" min="0" max="255" id="green" placeholder="0-255"
                        v-on:input="updateHex()" class="w-full p-2 bg-neutral-50 border border-gray-200 rounded-lg" />
                    <label class="block -mb-2 text-gray-900" for="blue" aria-label="Blue">Blue:</label>
                    <input v-model.number="b" type="number" min="0" max="255" id="blue" placeholder="0-255"
                        v-on:input="updateHex()" class="w-full p-2 bg-neutral-50 border border-gray-200 rounded-lg" />
                </div>

                <div class="flex flex-col gap-2">
                    <label class="block -mb-2 text-gray-900" for="hex" aria-label="Hex color">Hex color:</label>
                    <input v-model="hexColor" type="text" id="hex" placeholder="#000000" v-on:input="updateRgb()"
                        class="w-full p-2 bg-neutral-50 border border-gray-200 rounded-lg" />
                    <label class="block -mb-2 text-gray-900" for="opacity" aria-label="Opacity">Opacity:</label>
                    <input v-model.number="opacity" type="number" min="0" max="1" step="0.01" id="opacity" placeholder="0-1"
                        class="w-full p-2 bg-neutral-50 border border-gray-200 rounded-lg" />

                    <div class="grid grid-cols-2 gap-6">
                        <div class="flex flex-col gap-2">
                            <label class="block -mb-2 text-gray-900" for="width" aria-label="Width">Width:</label>
                            <input v-model.number="pWidth" type="number" min="1" id="width" placeholder="1px"
                                class="w-full p-2 bg-neutral-50 border border-gray-200 rounded-lg" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="block -mb-2 text-gray-900" for="height" aria-label="Height">Height:</label>
                            <input v-model.number="pHeight" type="number" min="1" id="height" placeholder="1px"
                                class="w-full p-2 bg-neutral-50 border border-gray-200 rounded-lg" />
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <label class="block text-gray-900" aria-label="Preview">Preview:</label>
                    <img :src="pixel" alt="Generated pixel preview" id="preview"
                        class="w-full h-auto flex-1 border border-gray-200 rounded-lg overflow-hidden object-cover max-h-48"
                        style="background: repeating-conic-gradient(#fff 0% 25%, #f9f9f9 0% 50%) 50% / 24px 24px;" />
                </div>

            </div>

            <div>
                <label class="block text-gray-900" for="base64" aria-label="Base64 Encoded Pixel">Base64 Encoded
                    Pixel:</label>
                <textarea v-model="pixel" id="base64"
                    class="w-full h-32 p-4 bg-neutral-100 border border-gray-200 rounded-lg resize-none"
                    readonly></textarea>
            </div>

        </form>

    </main>
</template>