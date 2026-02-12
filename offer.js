const button = document.getElementById("calculateBtn");
const resultBox = document.getElementById("offerResult");

button.addEventListener("click", function (e) {
  e.preventDefault();

  const siteType = document.getElementById("site-type").value;
  const pageCount = parseInt(document.getElementById("page-counter").value) || 1;
  const seo = document.getElementById("seo").checked;
  const support = document.getElementById("support").checked;

  let basePrice = 0;

  // Taban fiyatlar
  switch (siteType) {
    case "onepage":
      basePrice = 5000;
      break;
    case "portfoy":
      basePrice = 7500;
      break;
    case "kurumsal":
      basePrice = 20000;
      break;
    case "eticaret":
      basePrice = 35000;
      break;
    case "haber":
      basePrice = 45000;
      break;
    case "ilan":
      basePrice = 50000;
      break;
  }

  // Sayfa hesaplama
  let extraPageCost = 0;
  if (pageCount > 3) {
    extraPageCost = (pageCount - 3) * 1500;
  }

  // Ek hizmetler
  let extraServices = 0;
  if (seo) extraServices += 7500;
  if (support) extraServices += 5000;

  const total = basePrice + extraPageCost + extraServices;

  // Paket seviyesi
  let packageType = "";
  if (total < 25000) {
    packageType = "Temel Paket Seviyesi";
  } else if (total < 50000) {
    packageType = "Standart Kurumsal Paket Seviyesi";
  } else {
    packageType = "Premium Gelişmiş Paket Seviyesi";
  }

  resultBox.innerHTML = `
    Tahmini Teklif: <strong>₺${total.toLocaleString()}</strong><br>
    <small>${packageType}</small>
  `;

  // Animasyon tetikleme
  resultBox.classList.remove("active");
  void resultBox.offsetWidth;
  resultBox.classList.add("active");
});

