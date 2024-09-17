// pages/home/home.ts

interface Product {
  id: number;
  name: string;
  title: string;
  evaluate: string;
  rating: number;
  image: string;
  count: number;
}

interface ApiResponse {
  products: Product[];
  images: string[];
}


Component({
  data: {
    images: [] as string[],
    products: [] as Array<{ id: number, name: string, title: string, evaluate: string, rating: number, count: number,image: string }>
  },

  lifetimes: {
    attached() {
      // 模拟加载轮播图和商品数据
      this.setData({
        images: [
          '/images/slide1.png',
          '/images/slide1.png',
          '/images/slide1.png'
        ],
        products: [
          { id: 1, name: 'XXX', title: '店长', evaluate: '手艺好, 服务棒, 经验丰富',rating: 100, count: 1600,image: '/images/product1.png' },
          { id: 2, name: 'XXX', title: '首席', evaluate: '手艺好, 服务棒, 经验丰富',rating: 100, count: 9, image: '/images/product2.png' },
        ]
      });
      // 调用方法获取数据
      this.fetchData();
    }
  },

  methods: {
    fetchData() {
      // 发送网络请求
      wx.request({
        url: 'http://127.0.0.1:8080/products/list', // 替换为你的后端接口地址
        method: 'GET',
        success: (res) => {
          console.log(`${res.statusCode}`)
          if (res.statusCode === 200) {
            const data = res.data;
            console.log(JSON.stringify(data, null, 2)); // 格式化输出
            // 请求成功，处理返回的数据
            this.setData({
              products: res.data,
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
    navigateToVote() {
      wx.switchTab({
        url: '/pages/vote/vote'
      });
    },
    navigateToOrders() {
      wx.switchTab({
        url: '/pages/orders/orders'
      });
    },
    addToCart(event: WechatMiniprogram.BaseEvent) {
      console.log(`${event.currentTarget.dataset}`)
      const productId = event.currentTarget.dataset.id;
      console.log(`添加商品 ${productId} 到购物车`);
      // 处理添加到购物车的逻辑
    }
  }
});
