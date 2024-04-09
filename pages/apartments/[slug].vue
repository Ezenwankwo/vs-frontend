<template>
  <div>
    <UContainer class="mb-24">
      <UBreadcrumb divider="/" :links="breadCrumbLinks" class="my-4 lg:my-6" />
      <div class="flex flex-col lg:flex-row lg:space-x-4">
        <UTabs :items="items" class="lg:w-2/3" @change="onTabChange">
          <template #apartment="{ item }">
            <UCard :ui="{ body: { padding: 'p-0 sm:p-0' } }">
              <UCarousel
                v-if="apartment.media_type === 'image'"
                v-slot="{ item }"
                :items="apartment.image"
                :ui="{ item: 'basis-full' }"
                indicators
              >
                <NuxtImg
                  :src="item"
                  class="object-cover h-72 lg:h-96 w-full rounded-t-md"
                  draggable="false"
                />
              </UCarousel>
              <template #footer>
                <h3 class="font-['Lato'] font-semibold text-xl text-primary">
                  {{ item.content }}
                </h3>
                <p class="mt-2">
                  {{ apartment.description }}
                </p>
              </template>
            </UCard>
          </template>

          <template #location="{ item }">
            <UCard :ui="{ body: { padding: 'p-0 sm:p-0' } }">
              <NuxtImg
                src="/map.png"
                class="object-cover h-72 lg:h-96 rounded-t-md w-full"
              />

              <template #footer>
                <h3 class="font-['Lato'] font-semibold text-xl text-primary">
                  {{ item.content }}
                </h3>
                <p class="mt-2">
                  {{ apartment.description }}
                </p>
              </template>
            </UCard>
          </template>
        </UTabs>
        <div class="lg:w-1/3 mt-4 lg:mt-0">
          <div
            v-if="tabLabel === 'Apartment Details'"
            class="flex flex-col rounded-md border border-prmary p-4 lg:p-6"
          >
            <div>
              <h4 class="font-['Lato'] font-semibold text-gray">Amenities</h4>
              <ul class="flex mt-1 space-x-4 text-sm">
                <li>
                  <Icon
                    name="fluent-emoji-high-contrast:bed"
                    class="mr-1 text-primary"
                  />
                  Bedrooms: {{ apartment.amenities.Bedrooms }}
                </li>
                <li>
                  <Icon name="fa-solid:bath" class="mr-1 text-primary" />
                  Bathrooms: {{ apartment.amenities.Bathrooms }}
                </li>
              </ul>
            </div>
            <div class="mt-8">
              <h4 class="font-['Lato'] font-semibold text-gray">
                Price Breakdown (&#x20A6;)
              </h4>
              <table class="border-collapse table-auto w-full text-sm mt-1">
                <tbody>
                  <tr>
                    <td class="border-b border-gray-100 p-1 pl-0">Rent</td>
                    <td class="border-b border-gray-100 p-1">
                      {{ apartment.price.rent }}
                    </td>
                  </tr>
                  <tr>
                    <td class="border-b border-gray-100 p-1 pl-0">
                      Service Charge
                    </td>
                    <td class="border-b border-gray-100 p-1">
                      {{ apartment.price.service_charge }}
                    </td>
                  </tr>
                  <tr>
                    <td class="border-b border-gray-100 p-1 pl-0">
                      Caution Deposit
                    </td>
                    <td class="border-b border-gray-100 p-1">
                      {{ apartment.price.caution_deposit }}
                    </td>
                  </tr>
                  <tr>
                    <td class="border-b border-gray-100 p-1 pl-0">Legal</td>
                    <td class="border-b border-gray-100 p-1">
                      {{ apartment.price.legal }}
                    </td>
                  </tr>
                  <tr>
                    <td class="border-b border-gray-100 p-1 pl-0">Agency</td>
                    <td class="border-b border-gray-100 p-1">
                      {{ apartment.price.agency }}
                    </td>
                  </tr>
                  <tr class="text-primary">
                    <td class="border-b border-gray-100 p-1 pl-0">Total</td>
                    <td class="border-b border-gray-100 p-1">
                      {{ apartment.price.total }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-8">
              <h4 class="font-['Lato'] font-semibold text-gray">Rules</h4>
              <div class="flex flex-wrap mt-1 text-sm">
                <span v-for="rule in apartment.rules" :key="rule" class="mr-2"
                  ><Icon name="eva:close-fill" class="mr-1 text-primary" />
                  {{ rule }}</span
                >
              </div>
            </div>
          </div>
          <div
            v-if="tabLabel === 'Location Details'"
            class="flex flex-col rounded-md border border-prmary p-4 lg:p-6"
          >
            <div>
              <h4 class="font-['Lato'] font-semibold text-gray">Address</h4>
              <p class="mt-1">
                {{ apartment.location }}
              </p>
            </div>
            <div class="mt-8">
              <h4 class="font-['Lato'] font-semibold text-gray">
                Neigboorhood
              </h4>
              <p class="mt-1">{{ apartment.neighborhood }}</p>
            </div>
          </div>
          <UButton
            label="Contact Owner"
            size="xl"
            color="primary"
            class="hidden lg:block w-full justify-center mt-4"
          />
          <UButton
            label="Contact Owner"
            size="xl"
            color="primary"
            class="lg:hidden fixed bottom-0 left-0 right-0 flex rounded-none justify-center mt-4"
          />
        </div>
      </div>
    </UContainer>
    <LandingApartments />
  </div>
</template>

<script setup lang="ts">
const tabLabel = ref('Apartment Details')
function onTabChange(index: number) {
  const item = items[index]
  item.label === 'Apartment Details'
    ? (tabLabel.value = 'Apartment Details')
    : (tabLabel.value = 'Location Details')
}

const items = [
  {
    slot: 'apartment',
    label: 'Apartment Details',
    content: '2 Bedroom Apartment in Karu',
  },
  {
    slot: 'location',
    label: 'Location Details',
    content: '2 Bedroom Apartment in Karu',
  },
]

const breadCrumbLinks = [
  { label: 'Apartments', to: '/apartments' },
  { label: 'Breadcrumb' },
]

const apartment = {
  name: '2 Bedroom Apartment in Karu',
  image: ['/shortlet.png', '/office.png', '/shortlet.png'],
  video: '',
  media_type: 'image',
  price: {
    rent: '2,000,000',
    service_charge: '300,000',
    caution_deposit: '100,000',
    legal: '200,000',
    agency: '100,000',
    total: '2,700,000',
  },
  slug: 'studio-apartment-in-karu',
  description: `Multiple units of well-furnished 2-bedroom Studio apartments,
        fitted to the highest specifications for those who like it minimalistic and simple.`,
  rules: [
    'No parties or loud music',
    'No pets except cats',
    'No latenights',
    'No illegal activities',
  ],
  location: '17 Nsikak-Edet Crescent, Sunshine Homes, Lokogoma',
  neighborhood: `Multiple units of well-furnished 2-bedroom Studio apartments, fitted to the highest 
        specifications for those who like it minimalistic and simple. Comes with a neighbourhood supermarket,
        power supply and weekly cleaning services amongst other standard amenities. Located in a 
        serene gated community, with quick access to Abuja Central.`,
  amenities: { Bedrooms: 2, Bathrooms: 2 },
}
</script>
