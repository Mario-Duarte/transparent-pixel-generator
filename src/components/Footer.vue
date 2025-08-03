<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
    <footer class="w-full bg-[#FAF7F3] p-4 text-center">
        <p class="text-sm text-gray-600">© {{ year }} Transparent Pixel Generator. All rights reserved.</p>
        <p class="text-xs text-gray-500 mt-2">Created with ❤️ by <a class="text-sky-600 hover:underline"
                href="https://github.com/Mario-Duarte" target="_blank" rel="noopener noreferrer">Mario Duarte</a></p>
    </footer>
</template>