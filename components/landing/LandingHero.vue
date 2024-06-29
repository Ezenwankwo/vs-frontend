<template>
  <div
    class="md:h-screen py-24 lg:py-32 bg-[url('~/assets/images/hero.jpg')] bg-cover"
  >
    <UContainer>
      <div
        class="flex flex-col items-center bg-gray-700/80 text-white py-8 lg:py-28 text-center rounded-md lg:w-4/5 mx-auto"
      >
        <h1 class="text-5xl lg:text-7xl font-['Lato'] tracking-tight font-bold">
          Find and Rent Apartments
        </h1>
        <p class="mt-6 text-lg w-4/5 lg:w-2/3">
          Vacant Soon offers a wide selection of listings with accurate
          property, pricing, and neighborhood info. Plus, pay 5% as agency fee.
        </p>
        <UButton label="Find Apartment" size="xl" class="mt-10" to="/auth" />
      </div>
    </UContainer>
  </div>
</template>
