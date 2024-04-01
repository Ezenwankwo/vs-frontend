<template>
  <div>
    <ApartmentFilter />
    <ApartmentList />
    <UPagination
      :max="5"
      size="lg"
      :page-count="5"
      :total="100"
      :model-value="1"
      class="justify-center my-10"
    />
  </div>
</template>
