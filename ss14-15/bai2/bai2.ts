class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  class CartProduct extends Product {
    constructor(id, name, price, quantity) {
      super(id, name, price);
      this.quantity = quantity;
    }
  
    calculatePrice() {
      return this.price * this.quantity;
    }
  
    increaseQuantity() {
      this.quantity++;
    }
  
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
  }
  
  class ShopProduct extends Product {
    constructor(id, name, price, stock) {
      super(id, name, price);
      this.stock = stock;
    }
  }
  
  class Cart {
    constructor() {
      this.items = [];
    }
  
    addItem(product, quantity) {
      if (quantity > product.stock) {
        console.log(`Không đủ hàng trong kho cho ${product.name}`);
        return;
      }
      const cartProduct = new CartProduct(
        product.id,
        product.name,
        product.price,
        quantity
      );
      this.items.push(cartProduct);
      product.stock -= quantity;
      console.log(`${quantity} ${product.name} thêm vào giỏ hàng.`);
    }
  
    removeItem(cartProduct) {
      const index = this.items.indexOf(cartProduct);
      if (index !== -1) {
        this.items.splice(index, 1);
        console.log(`${cartProduct.name} xóa khỏi giỏ hàng.`);
      }
    }
  
    getTotal() {
      let total = 0;
      this.items.forEach((item) => {
        total += item.calculatePrice();
      });
      return total;
    }
  }
  
  const shopProducts = [
    new ShopProduct(1, "Áo sơ mi", 30, 80),
    new ShopProduct(2, "Quần âu", 40, 65),
    new ShopProduct(3, "Giày thể thao", 40, 5),
  ];
  
  const cart = new Cart();
  
  cart.addItem(shopProducts[0], 2);
  cart.addItem(shopProducts[1], 1);
  cart.addItem(shopProducts[2], 3);
  
  console.log("Tổng giá trị của giỏ hàng:", cart.getTotal());