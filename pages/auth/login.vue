<template>
  <div>
    <LandingHeader />
    <UContainer class="py-12 sm">
      <h4
        class="text-2xl font-['Lato'] text-center font-bold tracking-tight text-gray-700 dark:text-white sm:text-3xl"
      >
        Advertise and manage your apartments
      </h4>
      <UTabs :items="items" class="md:w-2/3 mt-12 mx-auto">
        <template #account="{ item }">
          <UCard @submit.prevent="onSubmitAccount">
            <template #header>
              <p
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                {{ item.content }}
              </p>
              <p class="mt-1 text-gray-500 dark:text-gray-400">
                Let’s get you on board, super easy.
              </p>
            </template>

            <UFormGroup label="Email" name="email" class="mb-3">
              <UInput
                v-model="createAccountForm.email"
                type="email"
                required
                padded
                size="xl"
                color="gray"
                :ui="{
                  rounded: 'rounded-full',
                }"
              />
            </UFormGroup>
            <UFormGroup label="Password" name="password">
              <UInput
                v-model="createAccountForm.password"
                type="password"
                padded
                required
                size="xl"
                color="gray"
                :ui="{
                  rounded: 'rounded-full',
                }"
              />
            </UFormGroup>

            <template #footer>
              <UButton
                type="submit"
                color="primary"
                class="rounded-full px-6 py-3"
              >
                Create account
              </UButton>
            </template>
          </UCard>
        </template>

        <template #password="{ item }">
          <UCard @submit.prevent="onSubmitPassword">
            <template #header>
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                {{ item.content }}
              </h3>
              <p class="mt-1 text-gray-500 dark:text-gray-400">
                Sign in to your account
              </p>
            </template>

            <UFormGroup label="Email" name="email" class="mb-3">
              <UInput
                v-model="signInForm.email"
                type="email"
                required
                padded
                size="xl"
                color="gray"
                :ui="{
                  rounded: 'rounded-full',
                }"
              />
            </UFormGroup>
            <UFormGroup label="Password" name="password" class="flex flex-col">
              <UInput
                v-model="signInForm.password"
                type="password"
                required
                padded
                size="xl"
                color="gray"
                :ui="{
                  rounded: 'rounded-full',
                }"
              />
              <span class="text-sm text-primary-500">Forgot password?</span>
            </UFormGroup>

            <template #footer>
              <UButton
                type="submit"
                color="primary"
                class="rounded-full px-6 py-3"
              >
                Sign in
              </UButton>
            </template>
          </UCard>
        </template>
      </UTabs>
    </UContainer>
    <LandingFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
const items = [
  {
    slot: 'account',
    label: 'Create Account',
    content: 'Get Started',
  },
  {
    slot: 'password',
    label: 'Sign In',
    content: 'Welcome Back',
  },
]

const createAccountForm = reactive({ email: '', password: '' })
const signInForm = reactive({ email: '', password: '' })

function onSubmitAccount() {
  //   console.log('Submitted form:', accountForm)
}

function onSubmitPassword() {
  //   console.log('Submitted form:', passwordForm)
}
</script>
