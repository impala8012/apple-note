<template>
  <div class="flex bg-black h-screen">
    <!-- 側邊攔 -->
    <div class="bg-zinc-900 w-[516px] p-12 flex flex-col justify-center">
      <Logo />
      <!-- 語系按鈕 -->
      <LangBtn class="mt-4 flex gap-4" />

      <h1 class="text-white font-bold text-lg mt-4">
        {{ $t("register_title") }}
      </h1>

      <i18n-t
        scope="global"
        keypath="log_in_message"
        tag="p"
        class="text-zinc-300 text-sm mt-0.5"
      >
        <template #logIn>
          <nuxt-link to="/login" class="font-bold text-[#FFAC00] underline">
            {{ $t("login") }}
          </nuxt-link>
        </template>
      </i18n-t>

      <AuthForm
        :buttonText="$t('sign_up')"
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

/**
 * 送出按鈕
 */
async function submit() {
  if (!email.value || !password.value) return;

  try {
    await $fetch("/api/user", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    const { isConfirmed } = await Swal.fire({
      title: t("alert_success_msg_title"),
      text: t("alert_success_msg_text_sign_up"),
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
