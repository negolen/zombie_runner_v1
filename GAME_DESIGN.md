# Zombie Runner 3D - Oyun Tasarım Belgesi (GDD)

## 1. Oyun Konsepti & Tür
* **Tür:** Hypercasual Runner / Shoot 'em Up (Count Masters / Weapon Craft Run tarzı)
* **Platform:** Web (HTML5/Canvas/WebGL), Mobil Uyumlu (Dikey / Portrait Mod: 9:16)
* **Kamera:** 3. Şahıs arkadan takip (Third-person, hafif yukarıdan açılı, runner perspektifi)

---

## 2. Temel Mekanikler

### Karakter & Hareket
* Otomatik dikey ileri koşu (sabit/artan hız).
* Yatay kontrol: 
  * Laptop/Klavye: **Sol / Sağ Ok Tuşları (⬅️ ➡️)** veya **A / D** tuşları.
  * Fare: Sol tık basılı tutup sağa-sola sürükleme.
  * Mobil: Dokunmatik parmak kaydırma (Touch drag).
* Ekran sınırları (clamping) içinde yumuşak (lerp) hareket.

### Ateş Sistemi
* Otomatik sürekli ateş (Cooldown bazlı mermi çıkışı).
* Mermiler ileri doğru fırlar, menzilli hedeflere çarpar.
* Parametreler: `fireRate` (ateş hızı), `damage` (hasar), `bulletSpeed` (mermi hızı), `bulletCount` (çoklu mermi).

### Yükseltme Kapıları (Multiplier Gates)
* Yol boyunca belirli aralıklarla çıkan çiftli/tekli kapılar.
* Matematiksel özellikler: `+5 Ateş Gücü`, `x2 Mermi Hızı`, `+2 Mermi Sayısı`, `-3 Ateş Gücü` vb.
* Renk kodlaması: Yeşil/Mavi (Pozitif), Kırmızı (Negatif).
* Karakter içinden geçtiğinde anında istatistik güncellenir ve görsel feedback verir.

### Düşmanlar & Dalgalar (Zombiler)
* Yolda duran veya oyuncuya doğru yavaşça yürüyen zombi grupları.
* Türler:
  * Normal Zombi (Düşük can, standart hız).
  * Hızlı Zombi (Düşük can, hızlı).
  * Tank Zombi (Yüksek can, yavaş, büyük).
* Can barı (HP): Başlarının üstünde sayı veya bar. Vuruldukça azalır, 0 olunca yok olur ve puan verir.

### Boss & Bölüm Sonu
* Yolun sonunda geniş boss arenası.
* Boss büyük cüsseli, yüksek can havuzlu.
* Ekran tepesinde Boss HP Barı. Boss kesildiğinde bölüm tamamlanır (Victory).

---

## 3. Arayüz (HUD) & Mobil Uyumluluk
* **Üst Panel:**
  * Güncel Skor / Altın
  * Bölüm İlerleme Çubuğu (Start -> Boss)
  * Boss geldiğinde açılan Boss Can Barı
* **Oyun Alanı:**
  * Karakter üstü mevcut ateş gücü / seviye göstergesi
  * Kapıların üstünde net okunabilir matematik formülü (+5, x2)
* **Girdi:**
  * Pointer Events (Touch + Mouse ortak destek)
  * Responsive Canvas (Ekran boyutuna göre otomatik ölçeklenme)

---

## 4. Önerilen Teknoloji & Mimari
* **Motor Seçeneği A (Önerilen):** **Three.js (WebGL / HTML5)**
  * Tek bir `index.html` içinde CDN ile kurulumsuz çalışır.
  * Gerçek 3. şahıs runner kamerası, 3D blok/karakterler, ışıklandırma ve parçacık efektleri.
  * 60 FPS akıcı ve mobil tarayıcılarda tam uyumlu.
* **Motor Seçeneği B:** **Pure HTML5 2D Canvas (Sahte 3D / 2.5D Perspektif)**
  * Harici kütüphanesiz, ancak derinlik ve kamera hesaplamaları manuel yapılır.

---

## 5. Geliştirme Fazları
1. **Faz 1:** Temel Sahne, Dikey Canvas, Kamera & Sağa-Sola Kontrol
2. **Faz 2:** Otomatik Ateş & Mermi Fiziği
3. **Faz 3:** Yol / Zemin Sonsuz Akışı & Kapı Sistemi (Matematik mantığı)
4. **Faz 4:** Zombi Dalgaları, Çarpışma Testleri & Can Sistemi
5. **Faz 5:** Boss Savaşı, HUD (Skor, İlerleme Barı, Boss Barı), Oyun Sonu Ekranları
