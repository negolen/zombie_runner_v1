# Zombie Runner 3D - Oyun Tasarım Belgesi (GDD)

## 1. Oyun Konsepti & Tür
* **Tür:** Hypercasual Runner / Shoot 'em Up (Count Masters / Weapon Craft Run tarzı)
* **Platform:** Web (HTML5/Canvas/WebGL), Mobil Uyumlu (Dikey / Portrait Mod: 9:16)
* **Kamera:** 3. Şahıs arkadan takip (Third-person, hafif yukarıdan açılı, runner perspektifi)

---

## 2. Temel Mekanikler

### Görsel Atmosfer & Renk Paleti (Canlı Synthwave/Arcade)
* Siyah/boğucu arka plan yerine derin alacakaranlık mor-lacivert (`#15122e`) gökyüzü ve atmosferik sis.
* Işıklandırma: Gökyüzü lavanta-mavi, zemin derin çivit mavisi çift tonlu HemisphereLight ve parlak dinamik DirectionalLight.
* Pist: Koyu arduvaz asfalt, ortada parlayan neon şeritler, kenarlarda çift renkli parıldayan neon bordürler (sol: camgöbeği mavi, sağ: fuşya pembe) ve hız hissi veren yol kenarı neon kuleler.

### Arayüz & Bilgi Bildirimleri (HUD)
* Bildirim banner'ı (`floating-banner`): Ekran ortası yerine kalplerin hemen altına, kompakt, yarı saydam (`rgba`) ve görüş alanını engellemeyecek şekilde konumlandırıldı.

### Düşman Eşya Düşürme (Mob Drop Sistemi)
Zombiler yok edildiğinde %38 ihtimalle yola parlayan 3D toplanabilir eşyalar düşer:
* ⭐ **Bonus Puan (Altın Yıldız/Gem - %60):** +150 veya +250 anlık skor.
* ❤️ **Can / Kalp (Mini Kalp - %25):** +0.5 Kalp yenileme (maksimum 6 kalbe kadar).
* 🛡️ **Defans Kalkanı (Zümrüt Kalkan - %15):** 2.5 saniyeliğine anında %50 hasar azaltıcı kalkan açar.

### Dinamik Kapı Sayısı & Seviye Ölçeklemesi
* Minimum kapı sayısı **7 Kapı** olarak başlar.
* Her 3 seviyede bir +1 yeni kapı çifti eklenir:
  * Formül: `gateCount = 7 + Math.floor((level - 1) / 3)`
  * Seviye 1-3: 7 Kapı
  * Seviye 4-6: 8 Kapı
  * Seviye 7-9: 9 Kapı
  * Seviye 10+: 10+ Kapı
* Pist uzunluğu ve Boss arenası kapı sayısına göre dinamik uzar, aralara dengeli zombi dalgaları yerleştirilir.

### Canlı ve Hareketli Boss Davranışı
Boss artık put gibi durmaz; gerçek bir titan gibi hareket eder:
* **Adım ve Yürüme Fiziği:** Gövde sağa-sola yalpalar, dev bacaklar adım atar, devasa kollar ritmik olarak sallanır.
* **Arena İçi Manevra:** Oyuncuyu takip etmenin yanında arena içinde sola ve sağa stratejik adımlar atar (strafe).
* **Saldırı Hazırlık Tehditleri (Telegraphing):**
  * Ateş topu öncesi geriye yaslanıp iki kolunu havaya kaldırır ve gözleri parlar.
  * Kaçılamaz şok dalgası öncesi havaya sıçrayıp yere dev bir darbe indirir (kamera sarsıntısı efekti).

### Karakter & Hareket
* Otomatik dikey ileri koşu hızı dengelendi (%10 azaltıldı, 18 -> 16.2). Bu sayede zombileri avlamak ve kapıları seçmek daha stratejik ve kontrollü hale getirildi.
* Yatay kontrol: 
  * Laptop/Klavye: **Sol / Sağ Ok Tuşları (⬅️ ➡️)** veya **A / D** tuşları.
  * Fare: Sol tık basılı tutup sağa-sola sürükleme.
  * Mobil: Dokunmatik parmak kaydırma (Touch drag).
* Ekran sınırları (clamping) içinde yumuşak (lerp) hareket.

### Boss Dövüşünde 3 Özel Yetenek & 3D Görsel Efektleri
Karakterin kendi model görünümü bozulmadan harici 3D animasyonlu efektler devreye girer:
1. **1. Skill - Meteor Çağrısı (%25 HP Hasar):**
   * Gökyüzünden alev saçarak Boss'un üzerine düşen devasa bir meteor ve çarpma anında kaya/patlama partikülleri.
   * Boss'un total canının %25'ini siler. Turda 1 kullanım.
2. **2. Skill - Valkyrie / Melek İyileştirmesi (Heal to 4 Hearts):**
   * Gökyüzünden kanatlı, parıldayan altın/neon bir Valkyrie melek figürü süzülerek iner ve oyuncuyu ışık aurasıyla sararak canını 4 kalbe tamamlar.
   * Can 4'ün altındayken aktifleşir.
3. **3. Skill - Dönen Kalkanlar (Defansif Bariyer):**
   * Karakterin etrafında dairesel yörüngede dönen 3 adet parıldayan koruma kalkanı belirir.
   * 2 saniye boyunca sürer ve Boss hasarını %50 azaltır.

### 10 Farklı Boss Tasarımı & Seviye Ölçeklemesi (Level Scaling)
Bölüm 1'den 10'a kadar her bölüm benzersiz görsel ve temada bir Boss barındırır:
1. **Lv 1: Zombi Titan** (Klasik dev zombi, yeşil-mor zırh)
2. **Lv 2: Magma Golem** (Alevli lav dokusu, alev boynuzları)
3. **Lv 3: Buz Devi (Frost Giant)** (Buz mavisi kristal kabuk)
4. **Lv 4: Zehir Lordu (Venom Abomination)** (Asit yeşili tentaküller)
5. **Lv 5: Siber Mech (Cyber Mecha-Zombie)** (Çelik zırh, neon kırmızı vizör)
6. **Lv 6: Kemik Kralı (Skeleton Warlord)** (Kafatası taçlı kemik devi)
7. **Lv 7: Karanlık Şövalye (Shadow Fiend)** (Obsidyen siyahı ve mor alevler)
8. **Lv 8: Kan İblisi (Blood Demon)** (Kızıl zırh ve dev kanatlı omuzluklar)
9. **Lv 9: Yıldırım Devi (Storm Colossus)** (Elektrik saçan plazma boynuzları)
10. **Lv 10: Kıyamet Hükümdarı (Void Overlord)** (Kozmik siyah-altın nihai Boss)
* Zorluk dengesi: Can ve saldırı hızları oyuncunun kapı yükseltmeleri ve 3 skiliyle aşabileceği tatlı-sert bir challenge sunar.

### Ateş Sistemi
* Otomatik sürekli ateş (Cooldown bazlı mermi çıkışı).
* Mermiler ileri doğru fırlar, menzilli hedeflere çarpar.
* Parametreler: `fireRate` (ateş hızı), `damage` (hasar), `bulletSpeed` (mermi hızı), `bulletCount` (çoklu mermi).

### Can & Kalp Sistemi (HP)
* **Başlangıç:** 4 Kalp (❤️ ❤️ ❤️ ❤️ 🤍 🤍).
* **Maksimum Sınır (Cap):** 6 Kalp (Asla 6'yı aşamaz).
* **Kalp Kazanımı:** Kapılardan `+1 Kalp` veya `+0.5 Kalp` alınabilir. 
  * Örn: 3.5 kalp + 1 kalp = 4.5 kalp. 5.5 kalp + 1 kalp = 6 kalp (cap).
* **Hasar & Dokunulmazlık:**
  * Zombiye temas anında ölüm yerine **1 Kalp** götürür. Çarpışan zombi yok olur.
  * Hasar anında 0.8 saniye yanıp sönme (i-frames / dokunulmazlık) ile seri can erimesi önlenir.
  * Kalp 0'a inerse Game Over.

### Yükseltme Kapıları (Multiplier Gates - No-Skip)
* **Kaçırılamaz Yapı:** İki kapı yolu tam ortadan ikiye böler (Sol: `[-4.5, 0]`, Sağ: `[0, +4.5]`). Arada veya kenarda boşluk yoktur, oyuncu kesinlikle bir kapıdan geçmek zorundadır.
* **Seçim & Kapanma:** Bir kapıdan geçildiği an diğeri otomatik olarak kapanır.
* **Negatif Kapı Oranı (%25):**
  * Her kapı çiftinde negatif kapı gelme şansı %25'tir.
  * Çiftin en fazla 1 tanesi negatif olabilir (ikisi birden asla negatif olamaz).
  * Negatif havuz: `-5 Hasar`, `-0.5 Kalp`, `-1 Mermi` vb.

### Boss Savaşı & İkili Saldırı Sistemi
Boss oyuncuyu sürekli baskı altında tutan 2 farklı saldırı türü kullanır:
1. **Kaçılabilir Füze/Ateş Topu (Dodgable):**
   * Boss belirli aralıklarla oyuncunun bulunduğu X koordinatına doğru ateş topu fırlatır.
   * Sağa veya sola kayarak bu mermiden kaçılabilir.
   * İsabet alırsa **1 Kalp** hasar verir (Kalkan aktifse **0.5 Kalp**).
2. **Kaçılamaz Şok Dalgası / Deprem (Undodgable Pulse):**
   * Boss her 3.5 - 4 saniyede bir arenayı sarsan zemin şok dalgası yayar.
   * Bu saldırıdan sağa-sola kaçarak kurtulunamaz; kaçınılmazdır.
   * Vuruş başına **0.5 Kalp** hasar verir (Kalkan aktifse **0.25 Kalp**).
   * **Stratejik Önemi:** Oyuncuyu **3. Savunma Kalkanını** zamanında basmaya ve canı 4'ün altına indiğinde **2. Valkyrie Şifasını** akıllıca kullanmaya zorlar.

### Boss Dövüşünde Aktif Olan 3 Özel Yetenek (Boss Skills)
Boss alanına ulaşıldığında HUD'da 3 adet özel skill butonu (Klavye 1, 2, 3 veya dokunmatik) aktifleşir:
1. **1. Skill (Yıkım Saldırısı - %25 HP Nuke):**
   * Boss'un toplam maksimum HP'sinin doğrudan **%25'ini** tek vuruşta siler.
   * Her level/boss dövüşünde **yalnızca 1 kez** kullanılabilir. Yeni bölüme geçince sıfırlanır.
2. **2. Skill (Acil Şifa - Heal):**
   * Oyuncunun canı **4 kalbin altındayken** basılabilir; canı anında **4 kalbe tamamlar**.
   * Eğer oyuncunun canı 4 kalp veya üzerindeyse (>= 4) bu skill **kilitlidir (kullanılamaz)**.
3. **3. Skill (Kalkan Savunması - Shield):**
   * **2 saniyeliğine** aktifleşir.
   * Bu süre boyunca Boss'un vereceği hasarı **%50 azaltır** (1 kalp yerine 0.5 kalp hasar alınır).
   * Cooldown sürelidir (tekrar kullanılabilir).

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
