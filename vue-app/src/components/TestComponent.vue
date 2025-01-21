<template>

  <div class="row mt-4"></div> <!--往下一點-->
  
      <h3 class="title">推薦商品</h3>
  
      <div class="row mt-4"></div> <!--往下一點-->
  
      <div class="row">
        <div class="col-3" v-for="product in paginatedProducts" :key="product.productno">
          <div class="card" style="width: 18rem; border: none;">
            <div class="product-image-wrapper" style="border: 1px solid lightgray; padding: 5px;">
              <img :src="'http://localhost:8081' + product.productimage" class="card-img-top" alt="product image">
            </div>
            <div class="card-body">
              <h5 class="card-title" style="font-size: 14px;">{{ product.productname }}</h5> 
              <div style="display: flex; align-items: center; font-size: 18px;">
                <img src="http://localhost:8081/BonusMallPic/point.jpg" alt="point image" class="point-img">
                <span class="point-text">{{ product.cost }} 點</span>
              </div>
  
             <!--  margin-bottom 點數跟按鈕的間隔 -->
             <a href="#" class="btn mt-2" style="background-color: #ff5733; color: white;">兌換商品</a>
            </div>
          </div>
        </div>
      </div>
  
  </template>
  
  <script>
  
  export default {
  
    data() {
      return {
        products: [], // 存放從後端獲取的商品資料
        currentPage: 1, // 當前頁碼
        itemsPerPage: 12, // 每頁顯示的商品數量
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.products.length / this.itemsPerPage); // 計算總頁數
      },
      paginatedProducts() {
        const start = (this.currentPage - 1) * this.itemsPerPage; // 計算當前頁開始的索引
        const end = start + this.itemsPerPage; // 計算當前頁結束的索引
        return this.products.slice(start, end); // 返回當前頁的商品
      }
    },
    methods: {
      getAllProducts() {
        fetch("http://localhost:8081/api/bonusproduct/filter?category=全部")
          .then(response => response.json()) // 解析 JSON 資料
          .then(data => {
            console.log("API response:", data); // 檢查返回的數據
            
            // 根據兌換次數 (count) 進行排序，並選擇前4個商品
            const topProducts = data.sort((a, b) => b.count - a.count).slice(0, 4);
  
            this.products = topProducts; // 更新為前4個兌換次數最高的商品
            this.currentPage = 1; // 重置頁碼為1
          })
          .catch(error => {
            console.error("Error fetching products:", error);
          });
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++; // 增加當前頁碼
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--; // 減少當前頁碼
        }
      },
      goToPage(page) {
        this.currentPage = page; // 跳轉到指定的頁碼
      }
    },
    mounted() {
      this.getAllProducts(); // 在組件掛載時獲取所有產品
    }
  };
  </script>
  
  <style scoped>
  
  .slide-image{
    width: 1280px;
    height: 400px;
  }
  
  .title {
  color: #DB5009; 
  font-weight: bold;
  }
  
  .card {
    margin-bottom: 20px;
  }
  
  .product-image-wrapper {
    border: 2px solid #007BFF; /* 設定圖片外框顏色 */
  }
  
  .product-image {
    width: 100px; /* 設定圖片寬度 */
  }
  
  .point-img {
    width: 20px; /* 設定點數圖片寬度 */
  }
  
  .point-text {
    font-size: 18px; /* 放大點數文字，調整點數大小 */
  }
  
  .card-title {
    font-size: 14px; /* 商品名稱縮小字體 */
  }
  
  /* 分頁樣式 */
  .pagination {
    display: flex;
    justify-content: center;
  }
  .pagination .page-item .page-link.active {
    background-color: #007BFF;
  }
  </style>