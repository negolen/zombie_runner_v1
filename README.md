# 🧟 Zombie Runner 3D — Multiplier Shooter

WebGL ve Three.js tabanlı, yüksek performanslı, mobil uyumlu dikey (9:16) **Hypercasual Runner & Shooter** oyunu.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![WebGL](https://img.shields.io/badge/WebGL-2.0%20%2F%20Three.js-purple.svg)](https://threejs.org/)
[![Platform](https://img.shields.io/badge/Platform-Web%20%2F%20CrazyGames%20%2F%20Poki%20%2F%20Yandex-brightgreen.svg)]()

---

## 🌟 1. Aşama Özeti (Phase 1: Core Game Loop, Publishing & Monetization Ready)

Bu sürümle birlikte oyunun temel döngüsü, monetizasyon altyapısı, çok dilli sistemi ve performans optimizasyonları eksiksiz olarak tamamlanmıştır:

### 1. 🎮 Oynanış & Mekanikler
* **Swept-Z Continuous Collision Detection (CCD):** Yüksek atış hızında ve FPS dalgalanmalarında mermilerin zombilerin içinden geçmesini engelleyen sürekli çarpışma fiziği.
* **No-Skip Kapılar & Dinamik Dokular:** Pist boyunca geçilmesi zorunlu çarpan kapıları (`+HIZLI ATEŞ`, `+1 MERMİ`, `+15 HASAR`, `+1 KALP`, `👥 KLON SALDIRISI`). Dil değiştiğinde aktif kapıların 3D tuval dokuları anında Türkçeden İngilizceye veya İngilizceden Türkçeye dinamik olarak yenilenir.
* **Can Sistemi:** 3 kalp başlangıç, maksimum 6 kalp tavanı. Kalp sarsıntı ve hasar efektleri.
* **5 Çeşit Zombi:**
  1. *Normal:* Standart sürü zombisi.
  2. *Fast:* Hızlı koşan çevik zombiler.
  3. *Tank:* Yüksek can ve zırh.
  4. *Toxic Boomer:* Yok edildiğinde etrafındaki zombileri zincirleme patlatan asit zombisi.
  5. *Riot Shield:* Ön hasarı %100 bloke eden kalkanlı zombi.

### 2. 👹 10 Temalı Boss & Ölüm Sinematiği
* Seviye sonu titan bossları: **Zombı Titan, Magma Golem, Buz Devi, Zehir Lordu, Siber Mech, Kemik Kralı, Karanlık Şövalye, Kan İblisi, Fırtına Devi, Kıyamet Hükümdarı**.
* **Kritik Zayıf Nokta (Core):** Göğüsteki sarı çekirdeğe isabet eden mermiler x2.5 kritik hasar verir.
* **Kaçınılamaz Şok Dalgası:** Boss'un düzenli aralıklarla yeri döverek yaydığı zıplanamayan şok dalgası.
* **3D Boss Yetenekleri:**
  * ☄️ *Meteor:* Boss'un canını anında %25 eritir.
  * 👼 *Valkyrie:* Canı anında 4 kalbe fuller.
  * 🛡️ *Dönen Kalkanlar:* 2 saniye boyunca gelen tüm hasarı %50 azaltır.
* **Sinematik Ölüm Animasyonu:** 2.6 saniyelik sarsıntı, zincirleme gövde patlamaları ve mega süpernova finali.

### 3. 🎨 10 Dinamik Çevre Teması
Her seviyede otomatik olarak değişen atmosfer ve bina silüetleri:
1. *Neon Downtown Ruins* (Klasik Synthwave)
2. *Barbie Pink Dreamland* (Canlı Neon Pembe & Şeker Tonları)
3. *Cyberpunk Megacity* (Siber Gece)
4. *Volcanic Inferno* (Lav ve Kül)
5. *Frozen Glacier* (Buzul Şehri)
6. *Toxic Wasteland* (Yeşil Asit)
7. *Sunset Boulevard* (Altın Günbatımı)
8. *Dark Abyss* (Koyu Mor & Kırmızı)
9. *Emerald Jungle City* (Zümrüt Orman Harabeleri)
10. *Golden Metropolis* (Görkemli Altın Şehir)

### 4. 🌐 Uçtan Uca Çok Dilli Sistem (i18n) & Sistem Dili Algılama
* **Akıllı Dil Algılama:** Oyuncu tarayıcısı/cihazı Türkçe ise oyun otomatik Türkçe; Türkçe değilse direkt **İngilizce** başlar.
* **Eksiksiz Çeviri:** Menüler, HUD, istatistikler, 10 boss ismi, kapı 3D metinleri, floating banner bildirimleri, mobil yatay mod uyarısı ve reklam arayüzü tek tuşla anında iki dil arasında geçiş yapar.

### 5. 💰 Evrensel Reklam Yöneticisi (`AdManager`)
* **Desteklenen Platformlar:**
  * **CrazyGames SDK v3:** Interstitial ve Rewarded Video.
  * **Poki SDK:** `gameplayStart`, `gameplayStop`, `rewardedBreak`.
  * **Yandex Games SDK:** Rewarded ve Tam Ekran reklamlar.
  * **Mock / Offline Fallback:** SDK'lar bulunmadığında yerel simülasyonla oyun deneyimini aksatmayan 3 saniyelik geri sayım ekranı.
* **Ödüllü Reklam Entegrasyonları:**
  * 📺 *Revive (Canlanma):* Yenilindiğinde +3 kalp ile oyuna devam etme.
  * 🎁 *Score 3X Multiplier:* Bölüm zaferinde kazanılan puanı 3 katına katlama.

---

## 🕹️ Kontroller
* **Mobil / Dokunmatik:** Ekrana dokunup parmağı sağa-sola kaydırma.
* **Klavye:**
  * `⬅️` / `➡️` veya `A` / `D` : Sağa / Sola Hareket
  * `1` : Meteor Çağrısı
  * `2` : Valkyrie Şifası
  * `3` : Dönen Kalkanlar
  * `P` veya `ESC` : Duraklat / Menü

---

## 🚀 Yerel Çalıştırma
Herhangi bir statik sunucu ile doğrudan çalıştırabilirsiniz:
```bash
python -m http.server 8080
```
Tarayıcınızda açın:
`http://localhost:8080`

---

## 📦 Web Portallarına Yayınlama Rehberi

### CrazyGames'e Yükleme
1. `index.html` içerisindeki `<head>` etiketine CrazyGames SDK v3 scriptini ekleyin:
   ```html
   <script src="https://sdk.crazygames.com/crazygames-sdk-v3.js"></script>
   ```
2. Tüm dosyaları (`index.html`, `game.js`, `style.css`) zipleyip CrazyGames Developer Portal'a yükleyin. `AdManager` SDK'yı otomatik algılayacaktır.

### Poki'ye Yükleme
1. `<head>` etiketine Poki SDK scriptini ekleyin:
   ```html
   <script src="https://game-cdn.poki.com/scripts/v2/poki-sdk.js"></script>
   ```
2. Zip dosyasını Poki Developer Dashboard'a yükleyin.

---

## 📄 Lisans
Bu proje MIT lisansı altındadır.
