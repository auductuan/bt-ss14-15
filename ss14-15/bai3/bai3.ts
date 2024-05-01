class MenuItem {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  class Table {
    constructor(id, capacity) {
      this.id = id;
      this.capacity = capacity;
      this.available = true;
    }
  }
  
  class Reservation {
    constructor(id, customerName, tableId) {
      this.id = id;
      this.customerName = customerName;
      this.tableId = tableId;
    }
  }
  
  class Order {
    constructor(id, tableId) {
      this.id = id;
      this.tableId = tableId;
      this.items = [];
    }
  
    getTotal() {
      let total = 0;
      this.items.forEach(item => {
        total += item.price;
      });
      return total;
    }
  }
  
  class Restaurant {
    constructor() {
      this.menu = [];
      this.tables = [];
      this.reservations = [];
      this.orders = [];
    }
  
    addMenuItem(item) {
      this.menu.push(item);
    }
  
    addTable(table) {
      this.tables.push(table);
    }
  
    makeReservation(customerName, tableId) {
      const table = this.tables.find(table => table.id === tableId);
      if (!table) {
        console.log("Bàn không tồn tại.");
        return;
      }
      if (!table.available) {
        console.log("Bàn đã được đặt trước.");
        return;
      }
      table.available = false;
      const reservation = new Reservation(
        this.reservations.length + 1,
        customerName,
        tableId
      );
      this.reservations.push(reservation);
      console.log(`Đã đặt bàn ${tableId} cho ${customerName}.`);
    }
  
    placeOrder(tableId, items) {
      const table = this.tables.find(table => table.id === tableId);
      if (!table || table.available) {
        console.log("Bàn không tồn tại hoặc không được đặt trước.");
        return;
      }
      const order = new Order(this.orders.length + 1, tableId);
      order.items = items;
      this.orders.push(order);
      console.log(`Đã đặt món cho bàn ${tableId}.`);
    }
  
    generateBill(tableId) {
      const order = this.orders.find(order => order.tableId === tableId);
      if (!order) {
        console.log("Không tìm thấy đơn hàng cho bàn này.");
        return;
      }
      const total = order.getTotal();
      console.log(`Tổng tiền cần thanh toán cho bàn ${tableId} là ${total} đ.`);
      const table = this.tables.find(table => table.id === tableId);
      if (table) {
        table.available = true;
      }
    }
  }
  
  const restaurant = new Restaurant();
  
  restaurant.addMenuItem(new MenuItem(1, "Bánh cuốn", 50000));
  restaurant.addMenuItem(new MenuItem(2, "Phở gà", 45000));
  restaurant.addMenuItem(new MenuItem(3, "Hủ tiếu", 40000));
  
  restaurant.addTable(new Table(1, 2));
  restaurant.addTable(new Table(2, 4));
  restaurant.addTable(new Table(3, 6));

  restaurant.makeReservation("Tung", 1);
  restaurant.placeOrder(1, [restaurant.menu[0], restaurant.menu[1]]);
  
  restaurant.generateBill(1);  

