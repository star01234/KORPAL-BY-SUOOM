async function printPDF() {
  const { PDFDocument, rgb } = PDFLib;

  // กำหนดขนาดกระดาษใหม่ที่เล็กลง
  const doc = await PDFDocument.create();
  const page = doc.addPage();

  const newPageSize = { width: 500, height: 500 }; // กำหนดขนาดกระดาษเล็กลงเป็น mini bill

  page.setSize(newPageSize.width, newPageSize.height); // ตั้งค่าขนาดกระดาษใหม่

  const font = await doc.embedFont(PDFLib.StandardFonts.Helvetica);

  const textWidth = 200; // กำหนดความกว้างของข้อความ
  const textHeight = 50; // กำหนดความสูงของข้อความ
  const centerX = (page.getWidth() - textWidth) / 2; // คำนวณหาพิกัด x ที่ต้องการให้ข้อความอยู่ตรงกลาง
  const centerY = (page.getHeight() - textHeight) / 2; // คำนวณหาพิกัด y ที่ต้องการให้ข้อความอยู่ตรงกลาง

  page.drawText("Shopping Receipt", {
    x: centerX,
    y: page.getHeight() - 50, // ให้อยู่ข้างบนสุด
    size: 20, // ปรับขนาดข้อความตามที่ต้องการ
    color: rgb(0, 0, 0),
    font: font,
  });

  let yOffset = page.getHeight() - 100;
  let totalPrice = 0;

  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;
    totalPrice += itemTotalPrice;

    page.drawText(
      `List ${productId}: ${item.quantity} x  ${item.price} Bath =  ${itemTotalPrice} Bath`,
      {
        x: 50,
        y: yOffset,
        size: 12, // ปรับขนาดข้อความให้เล็กลง
        color: rgb(0, 0, 0),
      }
    );

    yOffset -= 20; // ปรับระยะห่างของข้อความให้เล็กลง
  }

  const name = "A";
  const phoneNumber = "0123456789";
  page.drawText(`Name: ${name}`, {
    x: 50,
    y: yOffset - 40,
    size: 12, // ปรับขนาดข้อความให้เล็กลง
    color: rgb(0, 0, 0),
  });

  page.drawText(`Phone Number: ${phoneNumber}`, {
    x: 50,
    y: yOffset - 60, // ปรับตำแหน่งข้อความให้เล็กลง
    size: 12, // ปรับขนาดข้อความให้เล็กลง
    color: rgb(0, 0, 0),
  });

  page.drawText(`Total Price:${totalPrice} Bath `, {
    x: 50,
    y: yOffset - 80, // ปรับตำแหน่งข้อความให้เล็กลง
    size: 12, // ปรับขนาดข้อความให้เล็กลง
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await doc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "shopping_receipt.pdf";
  link.click();
}

