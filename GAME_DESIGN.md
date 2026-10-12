# Zombie Runner 3D — Oyun Tasarım Belgesi (GDD)

## 1. Genel Bilgiler
* **Tür:** Hypercasual 3D Runner / Shooter
* **Platform:** WebGL / Three.js (Mobil & Masaüstü, Dikey 9:16)
* **Tema:** Synthwave / Siberpunk Arcade (Mor-lacivert gökyüzü `#15122e`, neon bordürler)

## 2. Temel Sistemler
* **Can / Kalp:** Başlangıç 3 Kalp, Tavan (Cap) 6 Kalp. Temas: -1 Kalp (0.8s i-frame), Döner bıçak: -0.5 Kalp, Boss şok: -1 Kalp.
* **Kapılar (No-Skip):** Atlanamaz çift kapılar. Min. 7 kapı, her 3 seviyede +1 (`7 + Math.floor((lvl-1)/3)`). En fazla 1 negatif (%25 şans).
* **Düşman Tipleri:**
  1. *Normal:* Standart zombi.
  2. *Fast:* Çevik zombi.
  3. *Tank:* Yüksek HP dev zombi.
  4. *Toxic Boomer:* Öldüğünde 3.6m alanda patlar, yakındaki zombileri zincirleme yok eder (+100 puan).
  5. *Riot Shield:* Ön mermileri kalkanıyla bloke eder (`🛡️ BLOK!`); oyuncu yandan vurmalı veya kalkanı kırmalıdır.
* **Mob Dropları (%38 şans):** Altın yıldız (+200 skor), mini kalp (+0.5 kalp), kalkan (2.5s %50 defans).

## 3. Tehlikeler & Çevre Etkileşimi
* **Döner Bıçaklar (Seviye 5+):** Pistte salınan testereler. Değdiğinde **0.5 Kalp** götürür.
* **Patlayan Neon Variller:** Vurulduğunda çevredeki zombileri yok eder (+150 puan). Yakın temas 0.5 kalp hasar verir.

## 4. Boss Sistemi & 3 Özel Skill
* **10 Temalı Boss:** Eklemli titan modeller, yürüyüş & strafe fiziği, şok dalgası ve füze saldırısı.
* **Kritik Zayıf Nokta (Neon Core):** Boss göğsündeki dönen çekirdeğe isabet **x2.5 Kritik Hasar** vurur.
* **3 Özel Skill:**
  1. *Meteor (1):* Boss HP'sinin %25'i hasar (Fight başına 1x).
  2. *Valkyrie (2):* Can < 4 ise 4 kalbe tamamlar (Fight başına 1x).
  3. *Kalkan (3):* 2s %50 hasar azaltma (8s cooldown).

## 5. Vuruş Hissiyatı (Juice) & Kontroller
* **Hit-Stop & Uçuşan Rakamlar:** Meteor/varil patlamalarında 0.05s duraksama, kritiklerde (`CRIT!`) 3D metinler.
* **Kontroller:** Mobil: Dokunmatik sürükleme. Masaüstü: Fare sürükleme, Ok tuşları / AD, Yetenekler: 1, 2, 3.
