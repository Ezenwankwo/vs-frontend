<template>
  <div class="bg-gray-950/100 text-sm">
    <UContainer class="pt-12">
      <div class="flex flex-col md:flex-row mb-8">
        <div class="md:w-2/4">
          <NuxtLink to="/">
            <NuxtImg src="/logo.svg" class="sm:w-2/3 md:w-1/5" alt="logo" />
          </NuxtLink>
          <p class="text-white/70 my-4 md:w-3/5">
            Vacant Soon is an innovative apartment rental platform that aimed at
            providing renters with seamless and efficient rental experience.
          </p>
          <div class="text-white space-x-4 mb-8">
            <span><Icon name="line-md:twitter-x" /></span>
            <span><Icon name="line-md:linkedin" /></span>
            <!-- <span><Icon name="line-md:facebook" /></span>
            <span><Icon name="line-md:instagram" /></span> -->
            <span><Icon name="jam:whatsapp" /></span>
          </div>
        </div>
        <div class="md:w-1/4 flex flex-col justify-center mb-8 md:mb-0">
          <h4 class="text-white/80 text-lg font-['Lato'] font-semibold">
            Explore
          </h4>
          <ul class="text-white/70 space-y-4 mt-8">
            <li>Find a space</li>
            <li>List a space</li>
            <li>Privacy policy</li>
            <li>Terms of use</li>
          </ul>
        </div>
        <div class="md:w-1/4 flex flex-col justify-center">
          <h4 class="text-white/80 text-lg font-['Lato'] font-semibold">
            Get in Touch
          </h4>
          <ul class="text-white/70 space-y-4 mt-8">
            <li>
              <Icon name="material-symbols:mail-outline" class="mr-2" />
              vacantsoon@gmail.com
            </li>
            <li>
              <Icon name="material-symbols:call" class="mr-2" /> 08183096264
            </li>
            <li><Icon name="jam:whatsapp" class="mr-2" />08055789594</li>
            <li>
              <Icon name="line-md:map-marker-alt" class="mr-2" /> Abuja, Nigeria
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="flex justify-center items-center text-white h-24">
        <p class="text-white/70">© 2024 Vacant Soon.</p>
      </div>
    </UContainer>
  </div>
</template>
