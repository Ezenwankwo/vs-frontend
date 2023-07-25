<template>
  <div class="mx-auto">
    <div height="800px" width="1200px">
      <iframe
        id="waitlist_iframe"
        allowtransparency="true"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        width="1200px"
        height="800px"
        src="https://getwaitlist.com/waitlist/8879"
        style="border-radius: 8px"
      />
    </div>
    <component :is="'script'" async>
      const url = new URL(window.location.href); const ref_id =
      url.searchParams.get('ref_id'); if (ref_id) {
      document.getElementById("waitlist_iframe").src += `?ref_id=${ref_id}`; }
    </component>
  </div>
</template>
