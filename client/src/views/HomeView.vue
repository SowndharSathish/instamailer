<template>
  <div class="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
    <div class="flex-shrink-0 z-20 shadow-sm bg-white">
      <TopNav
        :showNav="true"
        @toggle-sidebar="mobileSidebarOpen = !mobileSidebarOpen"
      />
    </div>

    <div class="flex flex-1 overflow-hidden relative">
      <transition name="slide">
        <div
          v-if="mobileSidebarOpen"
          class="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          @click="mobileSidebarOpen = false"
        ></div>
      </transition>

      <transition name="slide-left">
        <aside
          class="fixed top-0 left-0 h-full w-72 z-40 bg-[#064EA4] text-white flex flex-col shadow-lg transform transition-transform duration-300 md:static md:translate-x-0 md:w-80 md:flex-shrink-0"
          :class="
            mobileSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full md:translate-x-0'
          "
        >
          <SideNav @email-generated="onEmailGenerated" />
        </aside>
      </transition>

      <main
        class="flex-1 overflow-y-auto p-10 bg-white text-gray-800 leading-relaxed"
      >
        <!-- Welcome Section -->
        <section class="max-w-4xl mx-auto space-y-6">
          <h1 class="text-3xl font-bold text-gray-900">Welcome to InstaMail</h1>
          <p>
            InstaMail is a service that allows you to receive emails at a
            temporary address that automatically self-destructs after a specific
            time. It’s also known by names like tempmail, 10minutemail, or
            throwaway email. Many websites, forums, and apps ask users to
            register before accessing content — InstaMail helps you stay safe
            and avoid spam by giving you a quick disposable email instead of
            your real one.
          </p>
          <p>
            With InstaMail, you can receive verification codes, links, and
            notifications instantly without sharing your personal email address.
            It’s simple, free, and secure — designed for anyone who values
            privacy and convenience.
          </p>
        </section>

        <!-- Why Section -->
        <section class="max-w-4xl mx-auto mt-12 space-y-6">
          <h2 class="text-2xl font-semibold text-gray-900">
            Why use InstaMail?
          </h2>
          <p>
            Regular email services store your messages permanently and often
            require personal information like your name or phone number. Using a
            temporary email address means you can stay anonymous, avoid spam,
            and skip unnecessary registrations.
          </p>
          <p>
            Disposable emails are ideal when you need to sign up for a trial,
            download a resource, or test an online form without sharing your
            real address. Once your temporary inbox expires, all messages are
            deleted automatically — ensuring your privacy remains intact.
          </p>
        </section>

        <!-- Info Section -->
        <section class="max-w-4xl mx-auto mt-12">
          <h3 class="text-xl font-semibold text-gray-900 mb-3">
            How does it work?
          </h3>
          <p>
            Just create a temporary email, use it anywhere online, and receive
            emails instantly. No registration or setup required. Once you’re
            done, simply delete the address — your inbox and messages vanish
            forever.
          </p>
        </section>

        <!-- Footer -->
        <footer
          class="max-w-4xl mx-auto mt-16 pt-6 border-t border-gray-200 text-sm text-gray-500"
        >
          <p>© 2025 InstaMail — Protect your inbox, stay spam-free.</p>
        </footer>
      </main>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
import SideNav from "@/components/SideNav.vue";

export default {
  name: "HomeView",
  components: { TopNav, SideNav },
  data() {
    return {
      mobileSidebarOpen: false,
    };
  },
  methods: {
    onEmailGenerated(email) {
      console.log("Email generated:", email);
    },
  },
};
</script>

<style>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
