<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="text-white" style="background:#22293a">
      <q-toolbar>
        <q-toolbar-title id="nav-branding">
          <router-link to="/" class="toolbar-title">
              <img src="~assets/logo.svg" alt="Bounty.Cash" title="Developers.Cash" class="q-pa-sm" />
              Developers.Cash
          </router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <div class="footer-container outer-container q-pt-xl q-pb-xl text-white">
      <div class="footer-inner inner-container">
        <div class="row">
          <div class="col-6">
            <p class="text-bold text-primary">Adding new entries</p>
            <p>For the time being, please modify the file below and create a pull request.</p>
            <p><a href="https://github.com/developers-cash/developers.cash/blob/master/resources.json">https://github.com/developers-cash/developers.cash/blob/master/resources.json</a></p>
            <p>Alternatively, ping me on Telegram:</p>
            <p><a href="https://t.me/jimtendo">https://t.me/jimtendo</a></p>
          </div>
          <div class="col-3"></div>
          <div class="col-3 text-center">
            <p class="text-bold text-primary">Donations (BCH)</p>
            <a href="bitcoincash:qq8yqreq2s3hk5le38rmh4zv786nj0h7uyrw6knecw">
              <img src="/statics/donate.png" alt="bitcoincash:qq8yqreq2s3hk5le38rmh4zv786nj0h7uyrw6knecw" title="bitcoincash:qq8yqreq2s3hk5le38rmh4zv786nj0h7uyrw6knecw" />
            </a>
            <p><small>(Scan, tap or click)</small></p>
          </div>
        </div>
      </div>
    </div>

  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
}
</script>

<style>

#nav-branding img {
    vertical-align: middle;
    height: 60px;
}

#nav-branding a {
    color:#fff;
    text-decoration: none;
}
</style>
