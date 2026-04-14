<template>
  <div class="min-h-screen bg-gray-100">
    <!-- <Header /> -->
    <router-view />
  </div>
</template>


<script setup lang="ts">
import { RouterView } from "vue-router";

import Header from "./components/Header.vue";
</script>