document.getElementById('buy-btn').addEventListener('click', function() {
    const price = document.getElementById('price').innerText;
    const color = document.getElementById('color').value;

    alert(`تمت إضافة المنتج إلى سلة الشراء.\nالسعر: ${price} جنيه\nاللون: ${color}`);
    
    // هنا يمكنك إضافة الأكواد لإجراء عملية الدفع أو إضافة المنتج إلى سلة المشتريات عبر واجهة برمجة التطبيقات.
});

// تغيير لون المنتج بناءً على اللون المختار
function changeColor(color, colorId) {
    // إزالة علامة الصح من كل الألوان
    const allColors = document.querySelectorAll('.color-circle');
    allColors.forEach(function(colorElement) {
        colorElement.classList.remove('selected');
    });
    
    // إضافة علامة الصح للون الذي تم اختياره
    const selectedColor = document.getElementById(colorId);
    selectedColor.classList.add('selected');
    
    // تحديث قيمة اللون في المدخل المخفي
    document.getElementById('color').value = color;
}
