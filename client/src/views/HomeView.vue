<template>
  <div class="h-screen w-screen flex bg-gray-50 overflow-hidden">
    <!-- Sidebar -->
    <div class="flex flex-col bg-[#064EA4] text-white w-80 flex-shrink-0">
      <SideNav />
    </div>

    <!-- Right Section -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Top Navigation -->
      <div class="flex-shrink-0">
        <TopNav />
      </div>

      <!-- Scrollable Content -->
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
};
</script>
