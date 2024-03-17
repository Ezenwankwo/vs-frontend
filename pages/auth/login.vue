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
        <template #create="{ item }">
          <UCard @submit.prevent="onSubmitCreate">
            <template #header>
              <div class="flex justify-between items-center">
                <div>
                  <p
                    class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    {{ item.content }}
                  </p>

                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {{ createAccountStepText }}
                  </p>
                </div>
                <span
                  class="text-base font-semibold p-3 rounded-full bg-primary-100 dark:text-gray-700"
                  >{{ createAccountStep }}/3</span
                >
              </div>
            </template>
            <div v-if="createAccountStep === 1">
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
            </div>
            <div v-if="createAccountStep === 2">
              <UFormGroup label="token" name="token" class="mb-3">
                <UInput
                  v-model="verifyEmailForm.token"
                  type="text"
                  maxlength="6"
                  required
                  padded
                  size="xl"
                  color="gray"
                  :ui="{
                    rounded: 'rounded-full',
                  }"
                  class="mb-4"
                />
                <span class="text-sm text-primary-500">Resend token</span>
              </UFormGroup>
            </div>
            <div v-if="createAccountStep === 3">
              <UFormGroup label="Full name" name="name" class="mb-3">
                <UInput
                  v-model="profileForm.name"
                  type="text"
                  required
                  padded
                  size="xl"
                  color="gray"
                  :ui="{
                    rounded: 'rounded-full',
                  }"
                  class="mb-4"
                />
              </UFormGroup>
              <UFormGroup label="Phone number" name="phone" class="mb-3">
                <UInput
                  v-model="profileForm.phone"
                  type="text"
                  required
                  padded
                  size="xl"
                  color="gray"
                  :ui="{
                    rounded: 'rounded-full',
                  }"
                  class="mb-4"
                />
              </UFormGroup>
              <UFormGroup
                label="Are you a property owner or manager?"
                name="ownership"
                class="mb-3"
              >
                <USelect
                  v-model="profileForm.ownership"
                  type="text"
                  required
                  padded
                  size="xl"
                  color="gray"
                  :options="['Property Owner', 'Property Manager']"
                  :ui="{
                    rounded: 'rounded-full',
                  }"
                  class="mb-4"
                />
              </UFormGroup>
            </div>

            <template #footer>
              <UButton
                type="submit"
                color="primary"
                class="rounded-full px-6 py-3"
              >
                {{ createAccountButton }}
              </UButton>
            </template>
          </UCard>
        </template>

        <template #signin="{ item }">
          <UCard @submit.prevent="onSubmitSignIn">
            <template #header>
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                {{ item.content }}
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
                class="mb-4"
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

const createAccountStep = ref(1)
const createAccountStepText = ref('Let’s get you on board, super easy.')
const createAccountButton = ref('Create Account')
const createAccountSteps = [
  {
    id: 1,
    content: 'Get Started',
    text: 'Let’s get you on board, super easy.',
  },
  {
    id: 2,
    content: 'Verify Email',
    text: 'Enter the 6 digit token sent to your email.',
  },
  {
    id: 3,
    content: 'Create Profile',
    text: 'Provide your basic details to get started.',
  },
]

const items = [
  {
    slot: 'create',
    label: 'Create Account',
    content: createAccountSteps[0].content,
  },
  {
    slot: 'signin',
    label: 'Sign In',
    content: 'Welcome Back',
  },
]

const createAccountForm = reactive({ email: '', password: '' })
const verifyEmailForm = reactive({ token: '' })
const profileForm = reactive({ name: '', phone: '', ownership: '' })
const signInForm = reactive({ email: '', password: '' })

function onSubmitCreate() {
  if (createAccountForm.email && createAccountForm.password) {
    createAccountStep.value = 2
    items[0].content = createAccountSteps[1].content
    createAccountStepText.value = createAccountSteps[1].text
    createAccountButton.value = createAccountSteps[1].content
  }
  if (verifyEmailForm.token) {
    createAccountStep.value = 3
    items[0].content = createAccountSteps[2].content
    createAccountStepText.value = createAccountSteps[2].text
    createAccountButton.value = createAccountSteps[2].content
  }
}

function onSubmitSignIn() {
  //   console.log('Submitted form:', passwordForm)
}
</script>
