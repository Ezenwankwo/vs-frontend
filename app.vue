<template>
  <!-- <div class="centered-div" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); margin-right: 20px;">
    <div id="getWaitlistContainer" data-waitlist_id="8879" data-widget_type="WIDGET_1"></div>
    <link rel="stylesheet" type="text/css"
      href="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.css" />
    <component is="script" src="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js" async>
    </component>
  </div> -->
  <div>
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

<style>
@media (max-width: 767px) {
  /* Styles for mobile devices */
  .centered-div {
    width: 100%;
  }
}
</style>
