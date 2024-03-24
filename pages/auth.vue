<template>
  <div>
    <LandingHeader />
    <UContainer class="py-12 sm">
      <SharedSectionTitle text="Advertise and manage your apartments" />
      <UTabs :items="items" class="md:w-2/3 mt-12 mx-auto">
        <template #create="{ item }">
          <UCard @submit.prevent="onSubmitCreate">
            <template #header>
              <div class="flex justify-between items-center">
                <div>
                  <h3
                    class="text-base font-['Lato'] font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    {{ item.content }}
                  </h3>

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
                  :type="showPassword ? 'text' : 'password'"
                  padded
                  required
                  size="xl"
                  color="gray"
                  :ui="{
                    rounded: 'rounded-full',
                  }"
                >
                  <template #trailing>
                    <span
                      class="text-gray-500 cursor-pointer dark:text-gray-400"
                      @click="showPassword = !showPassword"
                      ><Icon v-if="showPassword" name="heroicons:eye" /><Icon
                        v-else
                        name="heroicons:eye-slash"
                    /></span>
                  </template>
                </UInput>
              </UFormGroup>
            </div>
            <div v-if="createAccountStep === 2">
              <UFormGroup label="Token" name="token" class="mb-3">
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
                <span class="text-sm text-primary-500" @click="onResendToken"
                  >Resend token</span
                >
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
              <div class="flex justify-between items-center">
                <div>
                  <h3
                    class="text-base font-['Lato'] font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    {{ item.content }}
                  </h3>

                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {{ resetPasswordStepText }}
                  </p>
                </div>
                <span
                  v-if="resetPasswordStep > 0"
                  class="text-base font-semibold p-3 rounded-full bg-primary-100 dark:text-gray-700"
                  >{{ resetPasswordStep }}/3</span
                >
              </div>
            </template>
            <div v-if="resetPasswordStep === 0">
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
              <UFormGroup
                label="Password"
                name="password"
                class="flex flex-col"
              >
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
                <span class="text-sm text-primary-500" @click="onForgotPassword"
                  >Forgot password?</span
                >
              </UFormGroup>
            </div>
            <div v-if="resetPasswordStep === 1">
              <UFormGroup label="Email" name="email" class="mb-3">
                <UInput
                  v-model="forgotPasswordForm.email"
                  type="email"
                  required
                  padded
                  size="xl"
                  color="gray"
                  :ui="{
                    rounded: 'rounded-full',
                  }"
                  class="mb-4"
                />
                <span class="text-sm text-primary-500" @click="onBackToSignIn"
                  >Back to sign in</span
                >
              </UFormGroup>
            </div>
            <div v-if="resetPasswordStep === 2">
              <UFormGroup label="Token" name="token" class="mb-3">
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
                <span class="text-sm text-primary-500" @click="onResendToken"
                  >Resend token</span
                >
              </UFormGroup>
            </div>
            <div v-if="resetPasswordStep === 3">
              <UFormGroup label="Password" name="password" class="mb-3">
                <UInput
                  v-model="resetPasswordForm.password"
                  type="password"
                  required
                  padded
                  size="xl"
                  color="gray"
                  :ui="{
                    rounded: 'rounded-full',
                  }"
                />
              </UFormGroup>
              <UFormGroup
                label="Confirm password"
                name="confirmPassword"
                class="flex flex-col"
              >
                <UInput
                  v-model="resetPasswordForm.confirmPassword"
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
              </UFormGroup>
            </div>

            <template #footer>
              <UButton
                type="submit"
                color="primary"
                class="rounded-full px-6 py-3"
              >
                {{ resetPasswordButton }}
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

const toast = useToast()

const showPassword = ref(false)

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
    text: 'Enter the token sent to your email.',
  },
  {
    id: 3,
    content: 'Create Profile',
    text: 'Provide your basic details.',
  },
]

const resetPasswordSteps = [
  {
    id: 0,
    content: 'Welcome Back',
    text: 'Signin to your account',
  },
  {
    id: 1,
    content: 'Forgot Password',
    text: 'Enter your email to reset password',
  },
  {
    id: 2,
    content: 'Verify Email',
    text: 'Enter the token sent to your email',
  },
  {
    id: 3,
    content: 'Reset Password',
    text: 'Enter new password',
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
    content: resetPasswordSteps[0].content,
  },
]

const createAccountForm = reactive({ email: '', password: '' })
const verifyEmailForm = reactive({ token: '' })
const profileForm = reactive({ name: '', phone: '', ownership: '' })
const signInForm = reactive({ email: '', password: '' })
const forgotPasswordForm = reactive({ email: '' })
const resetPasswordForm = reactive({ password: '', confirmPassword: '' })

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

const resetPasswordStep = ref(0)
const resetPasswordStepText = ref('Signin to your account')
const resetPasswordButton = ref('Sign In')

function onSubmitSignIn() {
  if (signInForm.email && signInForm.password) {
    // login user
  }
  if (forgotPasswordForm.email) {
    // forgot password
    resetPasswordStep.value = 2
    items[1].content = resetPasswordSteps[2].content
    resetPasswordStepText.value = resetPasswordSteps[2].text
    resetPasswordButton.value = 'Submit'
  }
  if (verifyEmailForm.token) {
    // verify email
    resetPasswordStep.value = 3
    items[1].content = resetPasswordSteps[3].content
    resetPasswordStepText.value = resetPasswordSteps[3].text
    resetPasswordButton.value = 'Submit'
  }
  if (resetPasswordForm.password && resetPasswordForm.confirmPassword) {
    // reset password
    resetPasswordStep.value = 0
    items[1].content = resetPasswordSteps[0].content
    resetPasswordStepText.value = resetPasswordSteps[0].text
    resetPasswordButton.value = 'Sign In'
    toast.add({
      title: 'Password reset done.',
      description: 'You can now login with your new password.',
    })
  }
}

function onForgotPassword() {
  resetPasswordStep.value = 1
  items[1].content = resetPasswordSteps[1].content
  resetPasswordStepText.value = resetPasswordSteps[1].text
  resetPasswordButton.value = 'Submit'
}

function onBackToSignIn() {
  resetPasswordStep.value = 0
  items[1].content = resetPasswordSteps[0].content
  resetPasswordStepText.value = resetPasswordSteps[0].text
  resetPasswordButton.value = 'Sign In'
}

function onResendToken() {
  // resend token
  toast.add({
    title: 'Token sent.',
    description: "We've sent a new token to your email.",
  })
}
</script>
