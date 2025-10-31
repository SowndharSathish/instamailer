<template>
  <aside
    class="flex flex-col items-center justify-between bg-[#064EA4] text-white h-full w-full"
  >
    <div
      class="flex flex-col items-center w-full space-y-6 p-6 overflow-y-auto"
    >
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <div
          class="bg-white text-[#064EA4] font-bold text-lg px-2 py-1 rounded-md"
        >
          IM
        </div>
        <h1 class="text-xl font-semibold">InstaMail</h1>
      </div>

      <!-- Inputs -->
      <div class="w-full">
        <input
          type="text"
          placeholder="Enter username"
          class="w-full px-3 py-2 rounded-md bg-white text-gray-800 outline-none"
        />
      </div>

      <select
        v-model="selectedDomain"
        class="w-full px-3 py-2 mb-4 rounded-md border border-gray-300 bg-white text-gray-800 font-medium focus:ring-2 focus:ring-emerald-400 outline-none"
      >
        <option value="" disabled>Select a domain</option>
        <option v-for="domain in emailList" :key="domain" :value="domain">
          {{ domain }}
        </option>
      </select>

      <button class="bg-emerald-500 rounded-md w-full px-3 py-2">Create</button>

      <!-- Buttons Grid -->
      <div class="grid grid-cols-2 gap-4 w-full">
        <button
          v-for="btn in buttons"
          :key="btn.label"
          @click="handleClick(btn.label)"
          class="flex flex-col items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 rounded-lg p-4 transition duration-150 ease-in-out"
        >
          <img :src="btn.icon" class="h-10 w-10 object-contain" alt="" />
          <span class="text-sm font-medium">{{ btn.label }}</span>
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="text-center text-sm opacity-80 mb-4">☕ Buy me a coffee</div>
  </aside>
</template>

<script>
export default {
  name: "SideNav",
  data() {
    return {
      emailList: ["@instamail.it", "@instamail.co", "@instamail.co.in"],
      selectedDomain: "",
      buttons: [
        { label: "Copy", icon: require("@/assets/icons/copy.svg") },
        { label: "Refresh", icon: require("@/assets/icons/refresh.svg") },
        { label: "New", icon: require("@/assets/icons/new.svg") },
        { label: "Delete", icon: require("@/assets/icons/delete.svg") },
      ],
    };
  },
  methods: {
    handleClick(action) {
      console.log(`${action} clicked`);
    },
  },
};
</script>
