<script setup>
import SearchResultComponent from '@/components/SearchResultComponent.vue'; // 新增的搜尋結果組件
import TestComponent from '@/components/TestComponent.vue';
import { ref } from 'vue';

const tabs = ref([
    { name: '精選商品', component: TestComponent },
    { name: '', component: SearchResultComponent }, // 搜尋結果 tab 不顯示文字
]);

const currentIndex = ref(0);
const currentTab = ref(tabs.value[0].component);

// 搜尋關鍵字
const searchKeyword = ref('');

// 切換選項
const click = idx => {
    currentIndex.value = idx;
    currentTab.value = tabs.value[idx].component;
};

// 處理搜尋
const handleSearch = () => {
    if (searchKeyword.value) {
        currentIndex.value = tabs.value.length - 1; // 切換到搜尋結果 tab
        currentTab.value = SearchResultComponent; // 顯示搜尋結果組件
    }
};
</script>

<template>
  <div>
    <!-- Navbar with Search -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-for="(tab, index) in tabs" :key="tab.name">
              <a 
                class="nav-link" 
                :class="{ active: currentIndex === index }" 
                href="#"
                @click.prevent="click(index)"
              >
                {{ tab.name }}
              </a>
            </li>
          </ul>
          <form class="d-flex align-items-center" role="search" @submit.prevent="handleSearch">
            <input 
              class="form-control me-2" 
              type="search" 
              placeholder="搜尋商品" 
              aria-label="Search"
              v-model="searchKeyword"
              style="width: 200px;" 
            />
            <button class="btn btn-outline-success" type="submit" style="width: 80px;">搜尋</button> <!-- 設定按鈕寬度 -->
          </form>
        </div>
      </div>
    </nav>

    <!-- 顯示當前選擇的 tab -->
    <KeepAlive>
      <component :is="currentTab" :searchKeyword="searchKeyword"></component>
    </KeepAlive>
  </div>
</template>

<style lang="css" scoped>
.card {
  margin-bottom: 20px;
  border: none;
}

.product-image-wrapper {
  border: 2px solid #007BFF;
  padding: 5px;
}

.product-image {
  width: 100px;
  height: auto;
}

.point-img {
  width: 20px;
  height: auto;
  margin-right: 5px;
}

.point-text {
  font-size: 18px;
}

.card-title {
  font-size: 14px;
}

.navbar-nav .nav-item .nav-link.active {
  color: #007BFF;
}

.navbar-nav .nav-item .nav-link {
  min-width: 100px; /* Tab 寬度 */
  text-align: center; /* 文字置中 */
}

</style>