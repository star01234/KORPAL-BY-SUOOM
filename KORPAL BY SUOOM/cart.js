// สร้างอ็อบเจ็กต์ที่เก็บข้อมูลของสินค้าในตะกร้า
const cart = {};

// เมื่อมีการคลิกที่ปุ่ม "เพิ่มลงในตะกร้า" ทุกปุ่ม
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // ดึงข้อมูลสินค้าที่มีคุณสมบัติ data-product-id และ data-price
    const productId = button.getAttribute("data-product-id");
    const price = parseFloat(button.getAttribute("data-price"));
    
    // เช็คว่าสินค้าอยู่ในตะกร้าหรือไม่ ถ้าไม่มีให้เพิ่มสินค้าใหม่เข้าไป มีอยู่แล้วให้เพิ่มจำนวนสินค้า
    if (!cart[productId]) {
      cart[productId] = { quantity: 1, price: price };
    } else {
      cart[productId].quantity++;
    }
    
    // เรียกใช้ฟังก์ชันเพื่ออัปเดตแสดงข้อมูลตะกร้า
    updateCartDisplay();
  });
});

// เมื่อมีการคลิกที่ปุ่ม "นำออกจากตะกร้า" ทุกปุ่ม
document.querySelectorAll(".remove-from-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // ดึงข้อมูลสินค้าที่มีคุณสมบัติ data-product-id
    const productId = button.getAttribute("data-product-id");
    
    // เช็คว่าสินค้าอยู่ในตะกร้าหรือไม่ ถ้ามีให้ลดจำนวนสินค้าลง ถ้าไม่มีให้ลบสินค้าออกจากตะกร้า
    if (cart[productId]) {
      if (cart[productId].quantity > 1) {
        cart[productId].quantity--;
      } else {
        delete cart[productId];
      }
      // เรียกใช้ฟังก์ชันเพื่ออัปเดตแสดงข้อมูลตะกร้า
      updateCartDisplay();
    }
  });
});

// ฟังก์ชันสำหรับอัปเดตแสดงข้อมูลตะกร้า
function updateCartDisplay() {
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = "";

  let totalPrice = 0;

  // วนลูปเพื่อสร้าง HTML element สำหรับแสดงข้อมูลของแต่ละสินค้าในตะกร้า
  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;
    totalPrice += itemTotalPrice;

    const productContainer = document.createElement("div");
    productContainer.classList.add("cart-item");

    const productName = document.createElement("p");
    productName.textContent = `List ${productId}`;
    productName.classList.add("cart-item-name");
    productContainer.appendChild(productName);

    const productDetails = document.createElement("div");
    productDetails.classList.add("cart-item-details");

    const productQuantity = document.createElement("p");
    productQuantity.textContent = `Quantity: ${item.quantity}`;
    productQuantity.classList.add("cart-item-quantity");
    productDetails.appendChild(productQuantity);

    const productPrice = document.createElement("p");
    productPrice.textContent = `Price: ฿${item.price} each`;
    productPrice.classList.add("cart-item-price");
    productDetails.appendChild(productPrice);

    const productTotalPrice = document.createElement("p");
    productTotalPrice.textContent = `Total Price: ฿${itemTotalPrice}`;
    productTotalPrice.classList.add("cart-item-total-price");
    productDetails.appendChild(productTotalPrice);

    productContainer.appendChild(productDetails);
    cartElement.appendChild(productContainer);
  }

  // ตรวจสอบว่าตะกร้าว่างหรือไม่ และสร้างข้อความที่เหมาะสมสำหรับแสดงในกรณีที่ตะกร้าว่างหรือไม่ว่าง
  if (Object.keys(cart).length === 0) {
    cartElement.innerHTML = "<p>No items in cart.</p>";
  } else {
    // สร้าง HTML element สำหรับแสดงราคารวมของสินค้าทั้งหมดในตะกร้า
    const totalPriceElement = document.createElement("p");
    totalPriceElement.textContent = `Total Price: ฿${totalPrice}`;
    totalPriceElement.classList.add("cart-total-price");
    cartElement.appendChild(totalPriceElement);
  }
}
