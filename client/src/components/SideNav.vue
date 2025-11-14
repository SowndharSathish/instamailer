<template>
  <aside
    class="flex flex-col items-center justify-between bg-[#064EA4] text-white h-full w-full"
  >
    <!-- Main Section -->
    <div
      class="flex flex-col items-center w-full space-y-6 p-5 overflow-y-auto"
    >
      <!-- Logo -->
      <div class="flex items-center space-x-2 mb-2">
        <div
          class="bg-white text-[#064EA4] font-extrabold text-lg px-2 py-1 rounded-md"
        >
          IM
        </div>
        <h1 class="text-xl font-semibold tracking-wide">InstaMail</h1>
      </div>

      <!-- Email Creator -->
      <div v-if="!generatedEmail" class="w-full space-y-4">
        <input
          type="text"
          v-model.trim="username"
          placeholder="Enter username"
          class="w-full px-3 py-2 rounded-md text-gray-800 bg-white outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <select
          v-model="selectedDomain"
          class="w-full px-3 py-2 rounded-md bg-white text-gray-800 border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
        >
          <option value="" disabled>Select a domain</option>
          <option v-for="domain in emailList" :key="domain" :value="domain">
            {{ domain }}
          </option>
        </select>

        <button
          @click="createEmail"
          class="bg-emerald-500 hover:bg-emerald-600 w-full rounded-md px-3 py-2 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!username || !selectedDomain"
        >
          Create
        </button>
      </div>

      <!-- Generated Email -->
      <div v-else class="w-full text-center px-2">
        <p
          class="text-lg font-semibold bg-white text-[#064EA4] py-2 px-3 rounded-md break-all shadow-sm"
        >
          {{ generatedEmail }}
        </p>
      </div>

      <!-- Buttons Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 w-full mt-4">
        <button
          v-for="btn in buttons"
          :key="btn.label"
          @click="handleClick(btn.method)"
          class="flex flex-col items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 rounded-lg p-3 md:p-4 transition duration-150 text-center"
        >
          <img :src="btn.icon" class="h-8 w-8 md:h-10 md:w-10" alt="" />
          <span class="text-xs sm:text-sm font-medium tracking-wide">
            {{ btn.label }}
          </span>
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="text-center text-xs sm:text-sm opacity-80 pb-4">
      ☕ Buy me a coffee
    </div>
  </aside>
</template>

<script>
export default {
  name: "SideNav",
  data() {
    return {
      username: "",
      selectedDomain: "",
      generatedEmail: "",
      emailList: ["@instamail.it", "@instamail.co", "@instamail.co.in"],
      buttons: [
        {
          label: "Copy",
          icon: require("@/assets/icons/copy.svg"),
          method: "copyEmail",
        },
        {
          label: "Refresh",
          icon: require("@/assets/icons/refresh.svg"),
          method: "refreshInbox",
        },
        {
          label: "New",
          icon: require("@/assets/icons/new.svg"),
          method: "generateNewEmail",
        },
        {
          label: "Delete",
          icon: require("@/assets/icons/delete.svg"),
          method: "resetForm",
        },
      ],
    };
  },
  methods: {
    createEmail() {
      if (!this.username || !this.selectedDomain) {
        alert("Please enter a username and select a domain!");
        return;
      }
      this.generatedEmail = `${this.username}${this.selectedDomain}`;
      this.$emit("email-generated", this.generatedEmail);
    },

    resetForm() {
      this.username = "";
      this.selectedDomain = "";
      this.generatedEmail = "";
      this.$emit("email-generated", "");
    },

    copyEmail() {
      if (!this.generatedEmail) return alert("No email to copy!");
      navigator.clipboard
        .writeText(this.generatedEmail)
        .then(() => alert("✅ Email copied to clipboard!"))
        .catch(() => alert("❌ Failed to copy email."));
    },

    refreshInbox() {
      alert("🔄 Inbox refreshed! (API integration coming soon 🚀)");
    },

    generateNewEmail() {
      const randomUser = "user" + Math.floor(Math.random() * 10000);
      const randomDomain =
        this.emailList[Math.floor(Math.random() * this.emailList.length)];

      this.username = randomUser;
      this.selectedDomain = randomDomain;
      this.generatedEmail = `${this.username}${this.selectedDomain}`;
      this.$emit("email-generated", this.generatedEmail);
    },

    handleClick(methodName) {
      if (typeof this[methodName] === "function") {
        this[methodName]();
      } else {
        console.warn(`No method found for: ${methodName}`);
      }
    },
  },
};
</script>
