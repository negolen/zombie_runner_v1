# 🧟 Zombie Runner 3D

Three.js ve WebGL ile geliştirilmiş, mobil ve masaüstü uyumlu dikey (9:16) **Hypercasual Runner & Shoot 'em Up** oyunu.

![Three.js](https://img.shields.io/badge/Three.js-r128-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Mobile-green.svg)
![License](https://img.shields.io/badge/License-MIT-orange.svg)

---

## 🎮 Oynanış ve Özellikler

* **3. Şahıs Runner Perspektifi:** Arkadan ve yukarıdan takip eden dinamik Three.js kamerası.
* **Otomatik Ateş Sistemi:** Hızlı lazer yayılımı, çoklu mermi kanalları (1x - 4x) ve hasar yükseltmeleri.
* **Matematiksel Kapılar (Multiplier Gates):** Yolda çıkan `+HIZLI ATEŞ`, `+1 MERMİ`, `+10 HASAR`, `+2 MERMİ` gibi enerji perdeleri.
* **Farklı Zombi Türleri:**
  * 🟢 **Normal Zombi:** Standart hız ve can.
  * 🟡 **Hızlı Zombi:** Çevik ve seri adımlarla oyuncuya koşan zombi.
  * 🟣 **Tank Zombi:** Yüksek can havuzuna sahip dev zombi.
* **Bölüm Sonu & Boss Arenası:** Yolun sonundaki dairesel arenada dev boynuzlu Boss savaşı ve dinamik Boss can barı.
* **Dahili Ses Sistemi:** Web Audio API ile harici dosya yüklemesi gerektirmeyen arcade ses efektleri.

---

## 🕹️ Kontroller

| Platform | Kontrol |
| :--- | :--- |
| **Klavye** | `⬅️` / `➡️` Yön Tuşları veya `A` / `D` Tuşları |
| **Fare** | Sol tık basılı tutup sağa / sola sürükleme |
| **Mobil / Tablet** | Ekrana dokunup parmakla sağa / sola kaydırma |

---

## 🚀 Kurulum ve Çalıştırma

Projede Node.js veya npm kurulum zorunluluğu yoktur; modern bir tarayıcıda doğrudan çalışır.

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/KULLANICI_ADINIZ/zombie-runner-3d.git
   cd zombie-runner-3d
   ```
2. Herhangi bir yerel sunucu başlatın:
   ```bash
   python -m http.server 8080
   ```
3. Tarayıcınızda açın:
   ```
   http://localhost:8080
   ```
   *(Veya doğrudan `index.html` dosyasına çift tıklayarak tarayıcınızda açabilirsiniz.)*
