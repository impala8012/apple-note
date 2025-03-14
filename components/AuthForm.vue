<template>
  <form @submit.prevent="onSubmit">
    <div class="mt-8">
      <label for="" class="text-zinc-300 text-sm block mb-0.5">
        {{ $t("email") }}
      </label>
      <input
        v-model="email"
        @input="checkEmail"
        type="email"
        placeholder="you@example.com"
        class="block w-full bg-[#27272A] border border-[#3F3F46] rounded text-white px-4 py-2 placeholder:text-zinc-500 text-sm"
      />
      <div v-if="errors.email" class="text-rose-400 my-2">
        {{ errors.email }}
      </div>
    </div>

    <div class="mt-6">
      <label for="" class="text-zinc-300 text-sm block mb-0.5">
        {{ $t("password") }}
      </label>
      <input
        v-model="password"
        @input="checkPassword"
        autocomplete="on"
        type="password"
        placeholder="****************"
        class="block w-full bg-[#27272A] border border-[#3F3F46] rounded text-white px-4 py-2 placeholder:text-zinc-500 text-sm"
      />
      <div v-if="errors.password" class="text-rose-400 my-2">
        {{ errors.password }}
      </div>
    </div>

    <button
      class="w-full mt-4 bg-[#FFAC00] rounded-full px-4 py-2 text-sm font-bold flex justify-center items-center space-x-2"
    >
      <span>{{ buttonText }}</span>
      <ArrowRight />
    </button>
  </form>
</template>

<script setup lang="ts">
// 元件雙向綁定
const email = defineModel<string>("email", { required: true });
const password = defineModel<string>("password", { required: true });

// 引用語系
const { t } = useI18n();

// 錯誤訊息
const errors = ref<{ password: string; email: string }>({
  password: "",
  email: "",
});

defineProps({
  buttonText: { type: String, required: true }, // 按鈕文字
});

const emit = defineEmits<{
  submit: [{ email: string | undefined; password: string | undefined }];
}>();

// 驗證密碼
function validatePassword() {
  if (!password.value) {
    errors.value.password = t("errors_password");
  } else {
    errors.value.password = "";
  }
}

// 驗證電子郵件
function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmail = emailPattern.test(email.value);
  if (!email.value) {
    errors.value.email = t("errors_email");
  } else if (!validEmail) {
    errors.value.email = t("errors_email_invalid");
  } else {
    errors.value.email = "";
  }
}

// 檢查 email 輸入框
function checkEmail() {
  if (email.value && errors.value.email) {
    errors.value.email = "";
  }
}

// 檢查 password 輸入框
function checkPassword() {
  if (password.value && errors.value.password) {
    errors.value.password = "";
  }
}

function onSubmit() {
  validatePassword();
  validateEmail();
  if (!errors.value.password && !errors.value.email) {
    emit("submit", {
      email: email.value as string,
      password: password.value as string,
    });
  }
}
</script>
