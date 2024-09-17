interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: number;
}

interface Category {
  id: number;
  name: string;
}

Component({
  data: {
    categories: [] as Category[],
    products: [] as Product[],
    filteredProducts: [] as Product[],
    selectedCategoryId: null as number | null
  },

  lifetimes: {
    attached() {
      
      this.setData({
        categories: [
          {id: 1, name: "商品1"},
          {id: 2, name: "商品2"},
          {id: 3, name: "商品3"},
        ],
        products: [
          { id: 1, name: 'XXX', category: 1,price: 1600,image: '/images/product1.png'},
        ]
      });
      // 初始化数据
      // this.fetchCategories();
      // this.fetchProducts();
    }
  },

  methods: {
    fetchCategories() {
      // 假设从接口获取商品分类数据
      wx.request({
        url: 'https://api.example.com/categories', // 替换为实际接口地址
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            this.setData({
              categories: res.data
            });
          } else {
            console.error('请求失败:', res);
          }
        },
        fail: (err) => {
          console.error('请求失败:', err);
        }
      });
    },

    fetchProducts() {
      // 假设从接口获取商品数据
      wx.request({
        url: 'https://api.example.com/products', // 替换为实际接口地址
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            this.setData({
              products: res.data,
              filteredProducts: res.data
            });
          } else {
            console.error('请求失败:', res);
          }
        },
        fail: (err) => {
          console.error('请求失败:', err);
        }
      });
    },

    selectCategory(event: WechatMiniprogram.BaseEvent) {
      const categoryId = event.currentTarget.dataset.id;
      this.setData({
        selectedCategoryId: categoryId
      });
      this.filterProducts(categoryId);
    },

    filterProducts(categoryId: number | null) {
      const { products } = this.data;
      if (categoryId === null) {
        this.setData({
          filteredProducts: products
        });
      } else {
        const filtered = products.filter(product => product.category === categoryId);
        this.setData({
          filteredProducts: filtered
        });
      }
    }
  }
});
