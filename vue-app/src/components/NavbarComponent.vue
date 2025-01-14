<script setup>


</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <!--<a class="navbar-brand" href="#"> <img
          src="https://www.ispan.com.tw/_next/image/?url=%2Fimages%2FiSpan_Logo_slogan.png&w=1080&q=75" alt="Logo"
          width="80" class="d-inline-block align-text-top"></a>-->

      <a class="navbar-brand" href="#"> <img
          src="https://live.staticflickr.com/65535/51358909913_5689806c1f_m.jpg" alt="Logo"
          width="80" class="d-inline-block align-text-top"></a>    

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">

          <li class="nav-item">
            <RouterLink :to="{ name: 'home' }" class="nav-link active">首頁</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink :to="{ name: 'BonusMall' }" class="nav-link">紅利商城</RouterLink>
          </li>


        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="css" scoped></style>