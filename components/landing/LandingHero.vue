<template>
  <div class="md:h-screen pt-28 pb-12 md:pb-0">
    <UContainer>
      <h1
        class="text-5xl font-['Lato'] lg:w-2/3 font-bold text-gray-900 dark:text-white sm:text-7xl"
      >
        Tired of endless searches and agency fees?
      </h1>
      <p class="mt-6 text-lg text-gray-600 lg:w-3/5 dark:text-gray-300">
        On Vacant Soon, renters and property owners list vacant and
        soon-to-be-vacant apartments,
        <!-- <br class="hidden md:block" /> -->
        connecting you directly with your perfect match.
      </p>
      <UButton
        label="Get Started"
        size="xl"
        class="mt-10 px-6 py-3"
        to="/auth"
      />
      <div class="static hidden md:block">
        <img
          src="~/assets/images/houses.svg"
          class="absolute bottom-0 right-0"
          alt=""
        />
      </div>
    </UContainer>
  </div>
</template>
