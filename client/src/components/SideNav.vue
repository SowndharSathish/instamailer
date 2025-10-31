<template>
  <aside
    class="w-80 min-h-screen bg-[#064EA4] text-white hidden sm:flex flex-col items-center justify-center p-6 space-y-6 md:fixed md:top-0 md:left-0 md:h-screen md:w-[20%]"
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

    <!-- Email Input -->
    <div class="w-full">
      <input
        type="text"
        name=""
        class="w-full px-3 py-2 rounded-md bg-white text-gray-800 font-medium outline-none"
        id=""
        placeholder="Enter username"
      />
    </div>
    <div class="w-full">
      <select
        v-model="selectedDomain"
        class="w-full px-3 py-2 mb-4 rounded-md border border-gray-300 bg-white text-gray-800 font-medium focus:ring-2 focus:ring-emerald-400 outline-none"
      >
        <option value="" selected disabled>Select a domain</option>
        <option v-for="domain in emailList" :key="domain" :value="domain">
          {{ domain }}
        </option>
      </select>

      <div class="w-full">
        <button class="bg-emerald-500 rounded-md w-full px-3 py-2">
          Create
        </button>
      </div>
    </div>

    <!-- Buttons Grid -->
    <div class="grid grid-cols-2 gap-4 w-full">
      <button
        class="flex flex-col items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 rounded-lg p-4 transition duration-150 ease-in-out"
        @click="handleClick(button.label)"
      >
        <img
          src="@/assets/icons/copy.svg"
          class="h-10 w-10 object-contain"
          alt=""
        />
        <span class="text-sm font-medium">Copy</span>
      </button>

      <button
        class="flex flex-col items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 rounded-lg p-4 transition duration-150 ease-in-out"
        @click="handleClick(button.label)"
      >
        <img
          src="@/assets/icons/refresh.svg"
          class="h-10 w-10 object-contain"
          alt=""
        />
        <span class="text-sm font-medium">Refresh</span>
      </button>

      <button
        class="flex flex-col items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 rounded-lg p-4 transition duration-150 ease-in-out"
        @click="handleClick(button.label)"
      >
        <img
          src="@/assets/icons/new.svg"
          class="h-10 w-10 object-contain"
          alt=""
        />
        <span class="text-sm font-medium">New</span>
      </button>

      <button
        class="flex flex-col items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 rounded-lg p-4 transition duration-150 ease-in-out"
        @click="handleClick(button.label)"
      >
        <img
          src="@/assets/icons/delete.svg"
          class="h-10 w-10 object-contain"
          alt=""
        />
        <span class="text-sm font-medium">Delete</span>
      </button>
    </div>

    <!-- Footer -->
    <div class="mt-auto text-center text-sm opacity-80">☕ Buy me a coffee</div>
  </aside>
</template>

<script>
export default {
  name: "SideNav",
  data() {
    return {
      selectedEmail: "user@instamail.it",
      emailList: ["@instamail.it", "@instamail.co", "@instamail.co.in"],
      selectedDomain: "",
    };
  },
  methods: {
    handleClick(action) {
      console.log(action + " clicked");
    },
  },
};
</script>
