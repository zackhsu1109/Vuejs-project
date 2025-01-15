<template>
    <div>
        <div class="row mt-4"></div> <!--往下一點-->

        <div class="row mt-4">
            <div class="col-3" v-for="product in paginatedProducts" :key="product.productno">
                <div class="card" style="width: 18rem; border: none;">
                    <div class="product-image-wrapper" style="border: 1px solid lightgray; padding: 5px;">
                        <img :src="'http://localhost:8081' + product.productimage" class="card-img-top" alt="product image">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ product.productname }}</h5> 
                        <div style="display: flex; align-items: center; font-size: 18px;">
                            <img src="http://localhost:8081/BonusMallPic/point.jpg" alt="point image" class="point-img">
                            <span class="point-text">{{ product.cost }} 點</span>
                        </div>

                        <!-- margin-bottom 點數跟按鈕的間隔 -->
                        <a href="#" class="btn mt-2" style="background-color: #ff5733; color: white;">兌換商品</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 分頁按鈕 -->
        <nav aria-label="Page navigation example" class="mb-4">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="prevPage"><</a>
                </li>

                <li 
                    class="page-item" 
                    v-for="page in totalPages" 
                    :key="page" 
                    :class="{ active: currentPage === page }"
                >
                    <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                </li>

                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="nextPage">></a>
                </li>
            </ul>
        </nav>

    </div>
</template>

<script>
export default {
    props: {
        searchKeyword: String // 接收來自父組件的搜尋關鍵字
    },
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
    watch: {
        // 當 searchKeyword 改變時觸發
        searchKeyword: {
            immediate: true, // 在組件創建時立即執行
            handler(newKeyword) {
                this.searchProducts(newKeyword); // 調用搜尋函數
            }
        }
    },
    methods: {
        searchProducts(keyword) {
            if (keyword.trim() !== '') { // 檢查關鍵字是否為空
                fetch(`http://localhost:8081/api/bonusproduct/search?keyword=${encodeURIComponent(keyword)}`) // 使用 API 獲取符合條件的商品
                    .then(response => response.json())
                    .then(data => {
                        console.log("API response:", data);
                        this.products = data; // 更新 products
                        this.currentPage = 1; // 獲取產品後重置到第一頁
                    })
                    .catch(error => {
                        console.error("Error fetching products:", error);
                    });
            } else {
                this.products = []; // 如果關鍵字為空，清空產品列表
                this.currentPage = 1; // 清空產品列表時也重置到第一頁
            }
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
};
</script>

<style scoped>
.card {
    margin-bottom: 20px;
}
.product-image-wrapper {
    border: 2px solid #007BFF; /* 設定圖片外框顏色 */
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
