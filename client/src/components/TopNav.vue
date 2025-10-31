<template>
  <header
    class="flex justify-between items-center bg-white border-b border-gray-200 px-6 py-3"
  >
    <!-- Left: App Logo -->
    <h1 class="text-emerald-500 font-bold text-xl">instaMailEr</h1>

    <!-- Center: Navigation buttons -->
    <div class="flex items-center space-x-4" v-if="showNav">
      <!-- Inbox Button -->
      <button
        @click="$emit('go-inbox')"
        class="group flex items-center gap-2 px-3 py-2 rounded-md border border-transparent text-sm font-medium text-gray-700 hover:text-white hover:bg-emerald-500 transition"
      >
        <img
          src="@/assets/icons/inbox.svg"
          class="h-5 w-5 object-contain transition group-hover:brightness-0 group-hover:invert"
          alt="Inbox"
        />
        Inbox
      </button>

      <!-- Create Button -->
      <button
        @click="$emit('create-mail')"
        class="group flex items-center gap-2 px-3 py-2 rounded-md border border-transparent text-sm font-medium text-gray-700 hover:text-white hover:bg-emerald-500 transition"
      >
        <img
          src="@/assets/icons/inbox.svg"
          class="h-5 w-5 object-contain transition group-hover:brightness-0 group-hover:invert"
          alt="Create"
        />
        Create
      </button>

      <!-- Sent Button -->
      <button
        @click="$emit('go-sent')"
        class="group flex items-center gap-2 px-3 py-2 rounded-md border border-transparent text-sm font-medium text-gray-700 hover:text-white hover:bg-emerald-500 transition"
      >
        <img
          src="@/assets/icons/inbox.svg"
          class="h-5 w-5 object-contain transition group-hover:brightness-0 group-hover:invert"
          alt="Sent"
        />
        Sent
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "TopNav",
  props: {
    showNav: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
