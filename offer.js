const button = document.getElementById("calculateBtn");
const resultBox = document.getElementById("offerResult");

async function getUsdRate() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();
    return data.rates.TRY;
  } catch (error) {
    console.error("Kur alınamadı:", error);
    return null;
  }
}

button.addEventListener("click", async function (e) {
  e.preventDefault();

  const siteType = document.getElementById("site-type").value;
  const pageCount = parseInt(document.getElementById("page-counter").value) || 1;
  const seo = document.getElementById("seo").checked;
  const support = document.getElementById("support").checked;

  let basePrice = 0;

  switch (siteType) {
    case "onepage": basePrice = 5000; break;
    case "portfoy": basePrice = 7500; break;
    case "kurumsal": basePrice = 20000; break;
    case "eticaret": basePrice = 35000; break;
    case "haber": basePrice = 45000; break;
    case "ilan": basePrice = 50000; break;
  }

  let extraPageCost = 0;
  if (pageCount > 3) {
    extraPageCost = (pageCount - 3) * 1500;
  }

  let extraServices = 0;
  if (seo) extraServices += 7500;
  if (support) extraServices += 5000;

  const totalTL = basePrice + extraPageCost + extraServices;

  // 🔥 API’den canlı USD kuru al
  const usdRate = await getUsdRate();

  if (!usdRate) {
    resultBox.innerHTML = "Kur bilgisi alınamadı.";
    return;
  }

  const totalUSD = totalTL / usdRate;

  let packageType = "";
  if (totalTL < 25000) {
    packageType = "Temel Paket Seviyesi";
  } else if (totalTL < 50000) {
    packageType = "Standart Kurumsal Paket Seviyesi";
  } else {
    packageType = "Premium Gelişmiş Paket Seviyesi";
  }

  resultBox.innerHTML = `
    <h3>Tahmini Teklif</h3>
    <p><strong>₺${totalTL.toLocaleString()}</strong></p>
    <p><strong>$${totalUSD.toFixed(2)}</strong></p>
    <small>${packageType}</small>
    <br><small>Güncel Kur: 1 USD = ${usdRate.toFixed(2)} TL</small>
  `;

  resultBox.classList.remove("active");
  void resultBox.offsetWidth;
  resultBox.classList.add("active");
});
