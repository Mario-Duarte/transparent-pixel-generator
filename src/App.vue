<script setup lang="ts">
import { ref, watch } from 'vue';
import Hero from './components/Hero.vue'
import CopyToClipBoard from './components/CopyToClipBoard.vue';

const code = ref<string>('');
const cssCode = ref<string>('background-image: url(transparent-pixel-generator);');
const htmlCode = ref<string>('<img src="transparent-pixel-generator" alt="Transparent Pixel Generator">');

const onCodeChangeHandler = (newCode: string) => {
  code.value = newCode;
};

watch(code, (newCode) => {
  cssCode.value = `background-image: url(${newCode});`;
  htmlCode.value = `<img src="${newCode}" alt="Transparent Pixel Generator">`;
}, { immediate: true });

const usageCode = `
  import { transparentPixelGenerator } from 'transparent-pixel-generator';
          
  const pixel = transparentPixelGenerator({
    width: 100,
    height: 100,
    color: '#ff0000',
    alpha: 0.5
  });

  document.body.style.backgroundImage = url(pixel);
`;

</script>

<template>
  <main class="flex flex-col items-center justify-center">
    <Hero :onCodeChangeHandler="onCodeChangeHandler" />
    <div class="flex flex-col items-center justify-center h-auto w-full p-8">
      <div class="max-w-5xl flex flex-col items-start justify-start">

        <h3 class="text-lg font-semibold text-gray-900 mb-2 mt-6">Embed the .png into your code</h3>

        <p class="text-lg text-gray-900 mb-4">Copy the code snippets below to embed the generated pixel in your project
        </p>

        <p class="text-md text-gray-900 m-0">CSS example</p>
        <div class="w-full grid grid-cols-[1fr_auto] grid-rows-1 relative border border-gray-200 rounded-lg pt-2 pl-2 pr-12">
          <VCodeBlock class="z-0 relative overflow-x-scroll" :code="cssCode" prismjs :theme="'default'" :lang="'css'"
            :copyButton="false" />
          <CopyToClipBoard :class="'absolute bottom-3 right-2'" :code="cssCode" />
        </div>

        <p class="text-md text-gray-900 mt-4">HTML example</p>
        <div class="w-full grid grid-cols-[1fr_auto] grid-rows-1 relative border border-gray-200 rounded-lg pt-2 pl-2 pr-12">
          <VCodeBlock class="z-0 relative overflow-x-scroll" :code="htmlCode" prismjs :lang="'html'"
            :copyButton="false" />
          <CopyToClipBoard :class="'absolute bottom-3 right-2'" :code="htmlCode" />
        </div>

        <h3 class="text-lg font-semibold text-gray-900 mb-2 mt-12">Adding transparent pixel generator to your project
        </h3>

        <p class="text-md text-gray-900 mt-4">Installation</p>

        <div class="w-full grid grid-cols-[1fr_auto] grid-rows-1 relative border border-gray-200 rounded-lg pt-2 pl-2 pr-12">
          <VCodeBlock class="z-0 relative" :code="'npm install transparent-pixel-generator'" prismjs
          :copyButton="false" />
          <CopyToClipBoard :class="'absolute bottom-3 right-2'" :code="'npm install transparent-pixel-generator'" />
        </div>

        <p class="text-md text-gray-900 mt-4">Usage</p>

        <div class="w-full grid grid-cols-[1fr_auto] grid-rows-1 relative border border-gray-200 rounded-lg pt-2 pl-2 pr-12">
          <VCodeBlock class="z-0 relative" :code="usageCode" :lang="'javascript'" prismjs :copyButton="false" />
        </div>

        <h3 class="text-lg font-semibold text-gray-900 mb-2 mt-12">API</h3>

        <VCodeBlock class="z-0 relative" :code="'transparentPixelGenerator(options)'" :lang="'javascript'" prismjs :copyButton="false" />
        <p class="text-md text-gray-900 mt-4">Generates a transparent pixel image.</p>

        <p class="text-xl text-gray-900 mt-4">Options</p>

        <ul class="ml-4 mt-2">
          <li class="list-disc">width (number, optional): The width of the image in pixels. Defaults to 1.</li>
          <li class="list-disc">height (number, optional): The height of the image in pixels. Defaults to 1.</li>
          <li class="list-disc">color (string, optional): The color of the pixel in hex or rgb format. Defaults to #ffffff.</li>
          <li class="list-disc">alpha (number, optional): The alpha transparency of the pixel. Defaults to 0.</li>
        </ul>

        <p class="text-md text-gray-900 mt-4">Returns</p>

        <p class="text-md text-gray-900 mt-4">A base64 encoded PNG image.</p>

      </div>
    </div>
  </main>
</template>

