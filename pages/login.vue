<template>
  <div class="flex bg-zinc-900 h-screen">
    <!-- 側邊攔 -->
    <div class="bg-black w-[516px] p-12 flex flex-col justify-center">
      <Logo />
      <!-- 語系按鈕 -->
      <LangBtn class="mt-4 flex gap-4" />

      <h1 class="text-white font-bold text-lg mt-4">{{ t("log_in_title") }}</h1>
      <i18n-t
        scope="global"
        keypath="register_message"
        tag="p"
        class="text-zinc-300 text-sm mt-0.5"
      >
        <template #SignUp>
          <nuxt-link to="/register" class="font-bold text-[#FFAC00] underline">
            {{ $t("sign_up") }}
          </nuxt-link>
        </template>
      </i18n-t>

      <AuthForm
        :buttonText="$t('login')"
        v-model:email="email"
        v-model:password="password"
        @submit="submit"
      />
    </div>
    <!-- /側邊攔 -->
    <!-- note introduction -->
    <div></div>
    <!-- /note introduction -->
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
const { t } = useI18n();
const email = ref<string>("");
const password = ref<string>("");

async function submit(): Promise<void> {
  if (!email.value || !password.value) return;
  try {
    await $fetch("/api/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    const { isConfirmed } = await Swal.fire({
      title: t("alert_success_msg_title"),
      text: t("alert_success_msg_text_log_in"),
      icon: "success",
      confirmButtonText: t("alert_msg_close"),
    });

    if (isConfirmed) {
      navigateTo("/");
    }
  } catch (error) {
    Swal.fire({
      title: t("alert_error_msg_title"),
      text: t("message_invalid"),
      icon: "error",
      confirmButtonText: t("alert_msg_close"),
    });
  }
}
</script>
