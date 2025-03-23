document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled"); // 50px aşağı kaydırınca navbar mavi olur
    } else {
      navbar.classList.remove("scrolled"); // En üste çıkınca tekrar şeffaf olur
    }
  });

  // Tab butonları ve içerikleri yönetme
  const buttons = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".class-content");

  const defaultButton = document.querySelector(
    ".tab-button[data-target='yoga']"
  );
  const defaultContent = document.getElementById("yoga");

  if (defaultButton && defaultContent) {
    defaultButton.classList.add("active");
    defaultContent.classList.add("active");
  }

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Tüm içerikleri gizle
      contents.forEach((content) => content.classList.remove("active"));

      // Tüm butonların "active" class'ını kaldır
      buttons.forEach((btn) => btn.classList.remove("active"));

      // Seçilen içeriği göster
      const targetId = button.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");

      // Aktif butona stil ekle
      button.classList.add("active");
    });
  });

  // BMI hesaplama ve üçgen hareketi
  document.getElementById("weight").addEventListener("input", calculateBMI);
  document.getElementById("height").addEventListener("input", calculateBMI);

  function calculateBMI() {
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);

    // Geçersiz girişleri kontrol et
    if (!weight || !height || height <= 0 || weight <= 0) {
      document.getElementById("result").innerText = ""; // Sonucu temizle
      return;
    }

    // BMI hesaplama
    const heightInMeters = height / 100; // cm -> metre çevirme
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1); // BMI hesaplama
    const resultElement = document.getElementById("result");
    if (resultElement) {
      resultElement.innerText = `BMI Scale: ${bmi}`;
    } else {
      console.error("Result element not found!");
    }

    // Üçgeni hareket ettir
    moveTriangle(bmi);
  }

  function moveTriangle(bmi) {
    const triangle = document.getElementById("triangle");
    const scaleWidth = document.querySelector(".bmi-scale img").clientWidth;

    let position = 0;

    // BMI değerine göre üçgenin pozisyonunu belirle
    if (bmi < 18.5) {
      position = scaleWidth * 0.1; // Zayıf bölge
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      position = scaleWidth * 0.3; // Normal bölge
    } else if (bmi >= 25 && bmi <= 29.9) {
      position = scaleWidth * 0.5; // Kilolu bölge
    } else if (bmi >= 30 && bmi <= 34.9) {
      position = scaleWidth * 0.7; // Obez bölge
    } else {
      position = scaleWidth * 0.9; // Aşırı obez bölge
    }

    // Üçgenin pozisyonunu güncelle
    triangle.style.left = `${position}px`;
  }
});
