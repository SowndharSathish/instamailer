<template>
  <header
    class="flex justify-between items-center bg-white border-b border-gray-200 px-6 py-3"
  >
    <h1 class="text-emerald-500 font-bold text-xl">DummyMail</h1>
    <div class="flex items-center space-x-4">
      <span class="text-sm text-gray-600 font-mono">{{ email }}</span>
      <button
        @click="$emit('logout')"
        class="text-sm text-red-500 hover:text-red-600 font-medium"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "TopNav",
  props: {
    email: String,
  },
};
</script>
