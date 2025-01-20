<template>

  <div class="row mt-4"></div> <!--往下一點-->
    
    <div>
  
      <swiper
      :loop="true"
      :navigation="false"
      :modules="modules"
      :pagination="{ clickable: true }"
      :slides-per-view="1"
      :space-between="10"
      :autoplay="{ delay: 2500, disableOnInteraction: false }"
      @slideChange="onSlideChange"
      class="mySwiper"
    >
      <swiper-slide>
        <img :src="'https://media.istockphoto.com/id/1483875169/zh/%E5%90%91%E9%87%8F/coffee-to-go-or-take-away-poster-or-flyer-set-or-coffee-shop-menu-cover-bright-colored-design.jpg?s=612x612&w=0&k=20&c=CvK98HY_QNOfU9p7m9ZgSfXku5-YQKoSXNLVPvzK0bc='" class="slide-image" alt="product advertisement">
      </swiper-slide>
  
      <swiper-slide>
        <img :src="'https://media.istockphoto.com/id/1183349783/zh/%E5%90%91%E9%87%8F/%E5%92%96%E5%95%A1%E5%BA%97-%E5%B0%8F%E5%9E%8B%E4%BC%81%E6%A5%AD%E5%9C%96%E5%BD%A2-%E5%92%96%E5%95%A1.jpg?s=612x612&w=0&k=20&c=5kL-juMUze6ZEDZBgLN_ZQSQ_gO0WHC8t2RmeLss5kY='" class="slide-image" alt="product advertisement">
      </swiper-slide>
  
      <swiper-slide>
        <img :src="'https://media.istockphoto.com/id/1877908749/zh/%E5%90%91%E9%87%8F/realistic-coffee-cup-vector-banner.jpg?s=612x612&w=0&k=20&c=iwwo2w0eN3Ia-HH6Dh7m8Uw8VsFlY2oyImeVUBqq-bU='" class="slide-image" alt="product advertisement">
      </swiper-slide>
  
    </swiper>
  
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
  
    </div>
  </template>
  
  <script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from "swiper/vue";
  
  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  
  // import required modules 
  import { Autoplay, Navigation, Pagination } from "swiper/modules";
  
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const onSlideChange = () => {
        console.log("slide change");
      };
      return {
        onSlideChange,
        modules: [Autoplay, Navigation, Pagination],
      };
    },
  
  //上面是廣告輪播插件
  
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