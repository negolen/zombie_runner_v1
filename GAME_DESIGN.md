# Zombie Runner 3D — Oyun Tasarım Belgesi (GDD)

## 1. Genel Bilgiler
* **Tür:** Hypercasual 3D Runner / Shooter
* **Platform:** WebGL / Three.js (Mobil & Masaüstü, Dikey 9:16)
* **Tema:** Synthwave / Siberpunk Arcade (Mor-lacivert gökyüzü `#15122e`, neon bordürler)

## 2. Temel Sistemler
* **Can / Kalp:** Başlangıç 3 Kalp, Tavan (Cap) 6 Kalp.
  * Zombi teması: -1 Kalp (0.8s i-frame).
  * Döner bıçak teması: -0.5 Kalp.
  * Boss kaçılamaz şok dalgası: -1 Kalp.
* **Kapılar (No-Skip):** Ortadan ikiye bölünmüş, atlanamaz çift kapılar.
  * Minimum 7 kapı, her 3 seviyede +1 kapı (`7 + Math.floor((lvl-1)/3)`).
  * Çiftlerden en fazla birinde %25 şansla negatif özellik.
* **Mob Dropları (%38 şans):** Altın yıldız (+200 skor), mini kalp (+0.5 kalp), kalkan (2.5s %50 defans).

## 3. Tehlikeler & Çevre Etkileşimi
* **Döner Bıçaklar (Seviye 5+):** Pistte sağa-sola salınan yüksek hızlı metalik testereler. Değdiğinde **0.5 Kalp** götürür.
* **Patlayan Neon Variller:** Yol üzerindeki kırmızı variller mermiyle vurulduğunda çevredeki zombileri yok eder (+150 puan). Yakın temas 0.5 kalp hasar verir.

## 4. Boss Sistemi & 3 Özel Skill
* **10 Farklı Boss:** Her 10 seviyede bir döngüye giren tematik modeller (Titan, Magma, Buz, Zehir, Siber vb.).
* **Kritik Zayıf Nokta (Neon Core):** Boss göğsündeki dönen çekirdeğe isabet eden mermiler **x2.5 Kritik Hasar** vurur.
* **3 Özel Boss Skili:**
  1. **Meteor (Tuş 1):** Boss'a total canının %25'i hasar (Fight başına 1 kullanım).
  2. **Valkyrie (Tuş 2):** Can 4'ün altındaysa 4 kalbe tamamlar (Fight başına 1 kullanım).
  3. **Kalkan (Tuş 3):** 2 saniye %50 hasar azaltma (8s cooldown).

## 5. Vuruş Hissiyatı (Juice)
* **Hit-Stop:** Meteor ve varil patlamalarında 0.05s mikro duraksama.
* **Uçuşan Rakamlar:** Kritik vuruşlarda (`CRIT!`), hasar ve puanlarda 3D uçuşan metinler.

## 6. Kontroller
* **Mobil:** Dokunmatik sürükleme (ekran genişliğine göre normalize).
* **Masaüstü:** Fare sürükleme, Sol/Sağ ok veya A/D tuşları. Yetenekler: 1, 2, 3 tuşları.
