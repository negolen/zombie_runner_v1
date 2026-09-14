/**
 * ZOMBIE RUNNER 3D - Multiplier Shoot 'em Up
 * Three.js WebGL Runner Game Engine
 */

// ==========================================
// SES YÖNETİCİSİ (Web Audio API Synthesizer)
// ==========================================
class SoundFX {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }

    playLaser() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
    }

    playHit() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.06);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
    }

    playPowerup() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        [440, 554, 659, 880].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.05);
            gain.gain.setValueAtTime(0.2, now + idx * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.05 + 0.15);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.05);
            osc.stop(now + idx * 0.05 + 0.15);
        });
    }

    playExplosion() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
    }

    playVictory() {
        if (this.isMuted || !this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.5];
        const now = this.ctx.currentTime;
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.1);
            gain.gain.setValueAtTime(0.25, now + idx * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.35);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.1);
            osc.stop(now + idx * 0.1 + 0.35);
        });
    }
}

const sfx = new SoundFX();

// ==========================================
// OYUN DURUMU & DEĞİŞKENLERİ
// ==========================================
const GAME_STATE = {
    MENU: 0,
    PLAYING: 1,
    BOSS_FIGHT: 2,
    VICTORY: 3,
    GAMEOVER: 4
};

const Game = {
    state: GAME_STATE.MENU,
    level: 1,
    score: 0,

    // Yol ve İlerleme
    trackLength: 320,
    trackWidth: 9,
    bossArenaZ: -280,

    // Oyuncu İstatistikleri
    player: {
        mesh: null,
        targetX: 0,
        x: 0,
        z: 0,
        speed: 18,
        runSpeed: 18,
        fireTimer: 0,
        fireInterval: 0.22, // Atış hızı periyodu (saniye)
        bulletCount: 1,     // Aynı anda çıkan mermi sayısı (1, 2, 3, 4)
        damage: 15,         // Mermi hasarı
        bulletSpeed: 55,    // Mermi hızı
        hp: 100,
        maxHp: 100,
        limbs: {}
    },

    // Nesne Listeleri
    bullets: [],
    enemies: [],
    gates: [],
    particles: [],
    boss: null,

    // Dokunmatik & Fare & Klavye Kontrolü
    isDragging: false,
    dragStartX: 0,
    playerStartX: 0,
    keys: { left: false, right: false }
};

// ==========================================
// THREE.JS KURULUMU
// ==========================================
let scene, camera, renderer, container;
const clock = new THREE.Clock();

function initThree() {
    container = document.getElementById('canvas-wrapper');

    // Sahne
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);
    scene.fog = new THREE.FogExp2(0x0a0f1d, 0.015);

    // Dikey Runner Kamerası (Third-person arkadan ve hafif yukarıdan açılı)
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 500);
    camera.position.set(0, 5.5, 8.5);
    camera.lookAt(0, 1.5, -5);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Işıklandırma
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(15, 30, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 100;
    dirLight.shadow.camera.left = -15;
    dirLight.shadow.camera.right = 15;
    dirLight.shadow.camera.top = 25;
    dirLight.shadow.camera.bottom = -25;
    scene.add(dirLight);

    // Pencere Boyutu Değişimi
    window.addEventListener('resize', onWindowResize);

    // Giriş Dinleyicileri (Mouse & Touch)
    setupControls();

    // Sahneyi Oluştur
    buildWorld();
    buildPlayer();
    setupLevel(Game.level);

    // Animasyon Döngüsü
    animate();
}

function onWindowResize() {
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// ==========================================
// KONTROLLER (Touch & Mouse Drag)
// ==========================================
function setupControls() {
    const el = document.getElementById('game-container');

    const handlePointerDown = (e) => {
        if (Game.state !== GAME_STATE.PLAYING && Game.state !== GAME_STATE.BOSS_FIGHT) return;
        Game.isDragging = true;
        Game.dragStartX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        Game.playerStartX = Game.player.targetX;
    };

    const handlePointerMove = (e) => {
        if (!Game.isDragging) return;
        const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const diffX = currentX - Game.dragStartX;
        
        // Ekran genişliğine oranla hassasiyet
        const sensitivity = 0.022;
        let newX = Game.playerStartX + diffX * sensitivity;
        
        // Yol sınırları (Track bounds)
        const limit = (Game.trackWidth / 2) - 0.9;
        Game.player.targetX = THREE.MathUtils.clamp(newX, -limit, limit);
    };

    const handlePointerUp = () => {
        Game.isDragging = false;
    };

    el.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    el.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp, { passive: true });

    // Klavye Yön Tuşları (Sol / Sağ Ok Tuşları veya A / D)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.code === 'KeyA') {
            Game.keys.left = true;
            e.preventDefault();
        } else if (e.key === 'ArrowRight' || e.code === 'KeyD') {
            Game.keys.right = true;
            e.preventDefault();
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft' || e.code === 'KeyA') {
            Game.keys.left = false;
        } else if (e.key === 'ArrowRight' || e.code === 'KeyD') {
            Game.keys.right = false;
        }
    });

    // UI Butonları
    document.getElementById('start-btn').addEventListener('click', () => {
        sfx.init();
        startGame();
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
        resetGame(Game.level);
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        Game.level++;
        resetGame(Game.level);
    });

    document.getElementById('mute-btn').addEventListener('click', () => {
        sfx.init();
        const isMuted = sfx.toggleMute();
        document.getElementById('mute-icon').textContent = isMuted ? '🔇' : '🔊';
    });
}

// ==========================================
// ÇEVRE & YOL OLUŞTURMA (World)
// ==========================================
function buildWorld() {
    // Ana Yol Zemini
    const roadGeo = new THREE.PlaneGeometry(Game.trackWidth, Game.trackLength);
    const roadMat = new THREE.MeshStandardMaterial({
        color: 0x182033,
        roughness: 0.8,
        metalness: 0.2
    });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0, -Game.trackLength / 2 + 10);
    road.receiveShadow = true;
    scene.add(road);

    // Yol Çizgileri & Kenar Bariyerleri
    const curbGeo = new THREE.BoxGeometry(0.3, 0.4, Game.trackLength);
    const curbMat = new THREE.MeshStandardMaterial({
        color: 0x00f2fe,
        emissive: 0x0084ff,
        emissiveIntensity: 0.4
    });

    const leftCurb = new THREE.Mesh(curbGeo, curbMat);
    leftCurb.position.set(-Game.trackWidth / 2, 0.2, -Game.trackLength / 2 + 10);
    scene.add(leftCurb);

    const rightCurb = leftCurb.clone();
    rightCurb.position.x = Game.trackWidth / 2;
    scene.add(rightCurb);

    // Boss Arenası (Yolun sonundaki geniş dairesel platform)
    const arenaGeo = new THREE.CylinderGeometry(16, 16, 0.6, 32);
    const arenaMat = new THREE.MeshStandardMaterial({
        color: 0x24162e,
        roughness: 0.6,
        metalness: 0.3
    });
    const arena = new THREE.Mesh(arenaGeo, arenaMat);
    arena.position.set(0, -0.1, Game.bossArenaZ);
    arena.receiveShadow = true;
    scene.add(arena);

    // Arena Dış Halka Efekti
    const ringGeo = new THREE.RingGeometry(15.5, 16.2, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(0, 0.22, Game.bossArenaZ);
    scene.add(ring);

    // Arka Plan / Derinlik Grid Izgarası
    const gridHelper = new THREE.GridHelper(400, 80, 0x1e293b, 0x0f172a);
    gridHelper.position.set(0, -0.3, -150);
    scene.add(gridHelper);
}

// ==========================================
// KARAKTER (Player 3D Model)
// ==========================================
function buildPlayer() {
    const playerGroup = new THREE.Group();

    // Gövde (Armored Cyber Hero)
    const bodyGeo = new THREE.BoxGeometry(0.8, 1.0, 0.5);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3, metalness: 0.7 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.0;
    body.castShadow = true;
    playerGroup.add(body);

    // Kafa & Vizör
    const headGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const headMat = new THREE.MeshStandardMaterial({ color: 0x0369a1 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.8;
    head.castShadow = true;
    playerGroup.add(head);

    const visorGeo = new THREE.BoxGeometry(0.4, 0.15, 0.1);
    const visorMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 1.85, -0.26);
    playerGroup.add(visor);

    // Kollar & Çift Tabanca (Dual Blasters)
    const armGeo = new THREE.BoxGeometry(0.2, 0.6, 0.2);
    const gunGeo = new THREE.BoxGeometry(0.15, 0.2, 0.6);
    const gunMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });

    // Sol Kol & Silah
    const leftArm = new THREE.Mesh(armGeo, bodyMat);
    leftArm.position.set(-0.55, 1.1, 0);
    const leftGun = new THREE.Mesh(gunGeo, gunMat);
    leftGun.position.set(-0.55, 0.9, -0.3);
    playerGroup.add(leftArm);
    playerGroup.add(leftGun);

    // Sağ Kol & Silah
    const rightArm = leftArm.clone();
    rightArm.position.x = 0.55;
    const rightGun = leftGun.clone();
    rightGun.position.x = 0.55;
    playerGroup.add(rightArm);
    playerGroup.add(rightGun);

    // Bacaklar
    const legGeo = new THREE.BoxGeometry(0.25, 0.7, 0.25);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });

    const leftLeg = new THREE.Mesh(legGeo, legMat);
    leftLeg.position.set(-0.25, 0.35, 0);
    leftLeg.castShadow = true;
    playerGroup.add(leftLeg);

    const rightLeg = leftLeg.clone();
    rightLeg.position.x = 0.25;
    playerGroup.add(rightLeg);

    Game.player.limbs = { leftLeg, rightLeg, leftArm, rightArm };
    Game.player.mesh = playerGroup;
    scene.add(playerGroup);
}

// ==========================================
// SEVİYE & NESNE OLUŞTURMA (Kapılar & Zombiler)
// ==========================================
function setupLevel(lvl) {
    clearLevelEntities();

    // Seviye Zorluk Çarpanı
    const hpMult = 1 + (lvl - 1) * 0.4;

    // KAPILAR (Z lokasyonları: -35, -85, -145, -205)
    const gateConfigs = [
        {
            z: -40,
            left: { type: 'fireRate', val: 0.04, label: '+HIZLI ATEŞ', isPos: true },
            right: { type: 'bullets', val: 1, label: '+1 MERMİ', isPos: true }
        },
        {
            z: -95,
            left: { type: 'bullets', val: 1, label: '+1 MERMİ', isPos: true },
            right: { type: 'damage', val: 10, label: '+10 HASAR', isPos: true }
        },
        {
            z: -155,
            left: { type: 'damage', val: 15, label: '+15 HASAR', isPos: true },
            right: { type: 'fireRate', val: 0.04, label: '+HIZLI ATEŞ', isPos: true }
        },
        {
            z: -215,
            left: { type: 'bullets', val: 2, label: '+2 MERMİ', isPos: true },
            right: { type: 'damage', val: 25, label: '+25 HASAR', isPos: true }
        }
    ];

    gateConfigs.forEach(cfg => createGatePair(cfg));

    // ZOMBİ DALGALARI
    // Belirli aralıklara zombi grupları diz
    for (let z = -20; z > -260; z -= 14) {
        // Kapıların tam üstüne denk gelmesin
        const nearGate = gateConfigs.some(g => Math.abs(g.z - z) < 6);
        if (nearGate) continue;

        const count = Math.floor(Math.random() * 3) + 2; // 2-4 zombi
        const spacing = (Game.trackWidth - 2.5) / count;

        for (let i = 0; i < count; i++) {
            const x = -((Game.trackWidth - 2.5) / 2) + i * spacing + (Math.random() * 0.4 - 0.2);
            
            // Zombi Türü
            const rand = Math.random();
            let type = 'normal';
            if (rand > 0.8) type = 'tank';
            else if (rand > 0.55) type = 'fast';

            createZombie(x, z, type, hpMult);
        }
    }

    // BOSS
    createBoss(lvl);
    updateHUDStats();
}

function clearLevelEntities() {
    // Mermileri temizle
    Game.bullets.forEach(b => scene.remove(b.mesh));
    Game.bullets = [];

    // Zombileri temizle
    Game.enemies.forEach(e => {
        scene.remove(e.mesh);
        if (e.hpBarMesh) scene.remove(e.hpBarMesh);
    });
    Game.enemies = [];

    // Kapıları temizle
    Game.gates.forEach(g => scene.remove(g.mesh));
    Game.gates = [];

    // Partikülleri temizle
    Game.particles.forEach(p => scene.remove(p.mesh));
    Game.particles = [];

    // Boss'u temizle
    if (Game.boss && Game.boss.mesh) {
        scene.remove(Game.boss.mesh);
        Game.boss = null;
    }
}

// ==========================================
// 3D ÇARPAN KAPILARI (Multiplier Gates)
// ==========================================
function createGatePair(cfg) {
    const halfRoad = Game.trackWidth / 2;
    const gateWidth = (Game.trackWidth / 2) - 0.6;
    const gateHeight = 3.5;

    // Sol Kapı
    const leftMesh = buildGateMesh(gateWidth, gateHeight, cfg.left);
    leftMesh.position.set(-halfRoad / 2, gateHeight / 2, cfg.z);
    scene.add(leftMesh);
    Game.gates.push({ mesh: leftMesh, config: cfg.left, z: cfg.z, x: -halfRoad / 2, width: gateWidth, triggered: false });

    // Sağ Kapı
    const rightMesh = buildGateMesh(gateWidth, gateHeight, cfg.right);
    rightMesh.position.set(halfRoad / 2, gateHeight / 2, cfg.z);
    scene.add(rightMesh);
    Game.gates.push({ mesh: rightMesh, config: cfg.right, z: cfg.z, x: halfRoad / 2, width: gateWidth, triggered: false });
}

function buildGateMesh(w, h, info) {
    const group = new THREE.Group();

    // Renk (Pozitif = Mavi/Yeşil Neon)
    const color = info.isPos ? 0x00f2fe : 0xef4444;

    // Çerçeve (Arch)
    const frameGeo = new THREE.BoxGeometry(w, h, 0.3);
    const frameMat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.85
    });

    // Saydam Enerji Alanı (İç kısım)
    const fieldGeo = new THREE.PlaneGeometry(w - 0.4, h - 0.4);
    const fieldMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide
    });
    const field = new THREE.Mesh(fieldGeo, fieldMat);
    field.position.z = 0.05;
    group.add(field);

    // Çerçeve Kenarları
    const borderMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const topBar = new THREE.Mesh(new THREE.BoxGeometry(w, 0.2, 0.4), borderMat);
    topBar.position.y = h / 2;
    group.add(topBar);

    // 3D Canvas Üzerinden Yazı Dokusu
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = info.isPos ? '#00e5ff' : '#ff4444';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 8;
    ctx.fillText(info.label, 128, 64);

    const textTexture = new THREE.CanvasTexture(canvas);
    const textMat = new THREE.MeshBasicMaterial({ map: textTexture, transparent: true });
    const textMesh = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.85, 1.4), textMat);
    textMesh.position.set(0, 0.2, 0.18);
    group.add(textMesh);

    return group;
}

// ==========================================
// ZOMBİLER (Düşman Modelleri & Can Barları)
// ==========================================
function createZombie(x, z, type, hpMult) {
    const group = new THREE.Group();

    let hp = 30;
    let speed = 2.5;
    let color = 0x22c55e; // Yeşil
    let scale = 1.0;

    if (type === 'fast') {
        hp = 20;
        speed = 5.0;
        color = 0xf59e0b; // Sarı/Turuncu
        scale = 0.9;
    } else if (type === 'tank') {
        hp = 110;
        speed = 1.2;
        color = 0x7c3aed; // Mor Tank
        scale = 1.6;
    }

    hp = Math.round(hp * hpMult);

    // Zombi Gövdesi (Voxel Stylized)
    const bodyMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.7 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.7 * scale, 0.9 * scale, 0.4 * scale), bodyMat);
    body.position.y = 0.9 * scale;
    body.castShadow = true;
    group.add(body);

    // Kafa
    const headMat = new THREE.MeshStandardMaterial({ color: 0x15803d });
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.5 * scale, 0.5 * scale, 0.5 * scale), headMat);
    head.position.y = 1.6 * scale;
    head.castShadow = true;
    group.add(head);

    // Kırmızı Parlayan Gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const eye1 = new THREE.Mesh(new THREE.BoxGeometry(0.1 * scale, 0.08 * scale, 0.08 * scale), eyeMat);
    eye1.position.set(-0.13 * scale, 1.65 * scale, 0.25 * scale);
    const eye2 = eye1.clone();
    eye2.position.x = 0.13 * scale;
    group.add(eye1);
    group.add(eye2);

    // İleri Uzanmış Kollar (Zombi Yürüyüşü)
    const armGeo = new THREE.BoxGeometry(0.18 * scale, 0.18 * scale, 0.7 * scale);
    const leftArm = new THREE.Mesh(armGeo, bodyMat);
    leftArm.position.set(-0.45 * scale, 1.1 * scale, 0.35 * scale);
    const rightArm = leftArm.clone();
    rightArm.position.x = 0.45 * scale;
    group.add(leftArm);
    group.add(rightArm);

    group.position.set(x, 0, z);
    scene.add(group);

    // 3D Can Barı (Karakterin Üstünde)
    const hpBarGroup = build3DHealthBar(1.2 * scale);
    hpBarGroup.position.set(x, 2.2 * scale, z);
    scene.add(hpBarGroup);

    Game.enemies.push({
        mesh: group,
        hpBarMesh: hpBarGroup,
        type: type,
        maxHp: hp,
        hp: hp,
        speed: speed,
        bodyMat: bodyMat,
        originalColor: color,
        scale: scale,
        radius: 0.6 * scale,
        animTime: Math.random() * 10
    });
}

function build3DHealthBar(width) {
    const group = new THREE.Group();
    
    // Arka plan (Siyah)
    const bg = new THREE.Mesh(
        new THREE.PlaneGeometry(width, 0.14),
        new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide })
    );
    group.add(bg);

    // Dolu Kısım (Yeşil/Kırmızı)
    const fill = new THREE.Mesh(
        new THREE.PlaneGeometry(width, 0.12),
        new THREE.MeshBasicMaterial({ color: 0x22c55e, side: THREE.DoubleSide })
    );
    fill.position.z = 0.01;
    group.add(fill);

    group.fillMesh = fill;
    group.maxWidth = width;
    return group;
}

// ==========================================
// BOSS SAVAŞI
// ==========================================
function createBoss(lvl) {
    const group = new THREE.Group();
    const scale = 3.5;
    const maxHp = 800 + (lvl - 1) * 400;

    // Boss Gövdesi
    const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x3b0764, // Koyu mor kabuk
        roughness: 0.5,
        metalness: 0.4
    });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.9 * scale, 1.1 * scale, 0.6 * scale), bodyMat);
    body.position.y = 1.0 * scale;
    body.castShadow = true;
    group.add(body);

    // Boss Kafa & Boynuzlar
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.6 * scale, 0.6 * scale, 0.6 * scale), bodyMat);
    head.position.y = 1.8 * scale;
    head.castShadow = true;
    group.add(head);

    // Kırmızı Işıldayan Gözler
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
    const eye1 = new THREE.Mesh(new THREE.BoxGeometry(0.15 * scale, 0.1 * scale, 0.1 * scale), eyeMat);
    eye1.position.set(-0.16 * scale, 1.85 * scale, 0.3 * scale);
    const eye2 = eye1.clone();
    eye2.position.x = 0.16 * scale;
    group.add(eye1);
    group.add(eye2);

    // Boynuzlar
    const hornGeo = new THREE.ConeGeometry(0.15 * scale, 0.5 * scale, 4);
    const hornMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
    const hornL = new THREE.Mesh(hornGeo, hornMat);
    hornL.position.set(-0.25 * scale, 2.3 * scale, 0);
    hornL.rotation.z = 0.3;
    const hornR = hornL.clone();
    hornR.position.x = 0.25 * scale;
    hornR.rotation.z = -0.3;
    group.add(hornL);
    group.add(hornR);

    group.position.set(0, 0, Game.bossArenaZ - 4);
    scene.add(group);

    Game.boss = {
        mesh: group,
        bodyMat: bodyMat,
        maxHp: maxHp,
        hp: maxHp,
        scale: scale,
        radius: 1.8,
        active: false,
        attackTimer: 0
    };
}

// ==========================================
// MERMİ FIRLATMA & ATEŞ SİSTEMİ
// ==========================================
function shootBullets() {
    const p = Game.player;
    sfx.playLaser();

    // Mermi Geometrisi & Parlayan Materyali
    const bulletGeo = new THREE.SphereGeometry(0.15, 8, 8);
    const bulletMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });

    const count = p.bulletCount;
    const spreads = [];

    // Mermi Dağılım Formatı (Tekli, Çiftli, Üçlü, Dörtlü)
    if (count === 1) spreads.push(0);
    else if (count === 2) spreads.push(-0.3, 0.3);
    else if (count === 3) spreads.push(-0.5, 0, 0.5);
    else if (count >= 4) spreads.push(-0.7, -0.25, 0.25, 0.7);

    spreads.forEach(offset => {
        const bullet = new THREE.Mesh(bulletGeo, bulletMat);
        bullet.position.set(p.x + offset, 1.0, p.z - 0.8);
        scene.add(bullet);

        Game.bullets.push({
            mesh: bullet,
            x: bullet.position.x,
            y: bullet.position.y,
            z: bullet.position.z,
            damage: p.damage,
            speed: p.bulletSpeed,
            vx: offset * 1.5 // Hafif yayılma açısı
        });
    });
}

// ==========================================
// ÇARPIŞMA, ETKİLEŞİM & PARÇACIKLAR
// ==========================================
function createExplosion(x, y, z, color = 0x22c55e, count = 12) {
    sfx.playExplosion();
    const pGeo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
    const pMat = new THREE.MeshBasicMaterial({ color: color });

    for (let i = 0; i < count; i++) {
        const p = new THREE.Mesh(pGeo, pMat);
        p.position.set(x, y, z);
        scene.add(p);

        Game.particles.push({
            mesh: p,
            vx: (Math.random() - 0.5) * 8,
            vy: Math.random() * 6 + 2,
            vz: (Math.random() - 0.5) * 8,
            life: 0.6
        });
    }
}

function showBanner(text, isPos = true) {
    const banner = document.getElementById('floating-banner');
    banner.textContent = text;
    banner.className = `floating-banner show ${isPos ? 'positive' : 'negative'}`;
    setTimeout(() => {
        banner.className = 'floating-banner';
    }, 1200);
}

function applyGateUpgrade(config) {
    sfx.playPowerup();
    const p = Game.player;

    if (config.type === 'fireRate') {
        p.fireInterval = Math.max(0.06, p.fireInterval - config.val);
        showBanner(`🔥 ATIŞ HIZI ARTTI!`);
    } else if (config.type === 'bullets') {
        p.bulletCount = Math.min(4, p.bulletCount + config.val);
        showBanner(`⚡ +${config.val} EKSTRA MERMİ!`);
    } else if (config.type === 'damage') {
        p.damage += config.val;
        showBanner(`💥 +${config.val} HASAR GÜCÜ!`);
    }

    updateHUDStats();
}

function updateHUDStats() {
    const p = Game.player;
    // Atış Hızı (Saniyedeki mermi sıklığı)
    const rateVal = (0.22 / p.fireInterval).toFixed(1) + 'x';
    document.getElementById('stat-firerate-val').textContent = rateVal;
    document.getElementById('stat-power-val').textContent = `${p.damage} DMG`;
    document.getElementById('stat-bullets-val').textContent = `${p.bulletCount}x`;
    document.getElementById('score-text').textContent = Game.score;
}

// ==========================================
// ANA OYUN DÖNGÜSÜ & UPDATE
// ==========================================
function update(delta) {
    if (Game.state !== GAME_STATE.PLAYING && Game.state !== GAME_STATE.BOSS_FIGHT) return;

    const p = Game.player;

    // Karakter İleri Koşusu
    if (Game.state === GAME_STATE.PLAYING) {
        p.z -= p.speed * delta;
        // Boss Arenasına Ulaşma Kontrolü
        if (p.z <= Game.bossArenaZ + 20) {
            enterBossFight();
        }
    }

    // Klavye Yön Tuşları ile Yatay Hareket
    const keyboardSpeed = 16;
    const limit = (Game.trackWidth / 2) - 0.9;
    if (Game.keys.left) {
        p.targetX = Math.max(-limit, p.targetX - keyboardSpeed * delta);
    }
    if (Game.keys.right) {
        p.targetX = Math.min(limit, p.targetX + keyboardSpeed * delta);
    }

    // Karakter Yatay Yumuşak Hareket (Lerp)
    p.x += (p.targetX - p.x) * 18 * delta;
    p.mesh.position.set(p.x, 0, p.z);

    // Karakter Koşu Animasyonu (Bacak Sallanması)
    const runCycle = Math.sin(clock.getElapsedTime() * 14);
    p.limbs.leftLeg.rotation.x = runCycle * 0.6;
    p.limbs.rightLeg.rotation.x = -runCycle * 0.6;
    p.limbs.leftArm.rotation.x = -runCycle * 0.4;
    p.limbs.rightArm.rotation.x = runCycle * 0.4;

    // Kamera Takibi (Akıcı Arkadan Takip)
    camera.position.x += (p.x * 0.6 - camera.position.x) * 8 * delta;
    camera.position.y = 5.2;
    camera.position.z = p.z + 8.5;
    camera.lookAt(p.x * 0.3, 1.4, p.z - 7);

    // Otomatik Ateş Mekaniği
    p.fireTimer += delta;
    if (p.fireTimer >= p.fireInterval) {
        p.fireTimer = 0;
        shootBullets();
    }

    // Mermileri Güncelle
    for (let i = Game.bullets.length - 1; i >= 0; i--) {
        const b = Game.bullets[i];
        b.z -= b.speed * delta;
        b.x += b.vx * delta;
        b.mesh.position.set(b.x, b.y, b.z);

        let bulletRemoved = false;

        // Zombilerle Çarpışma Testi
        for (let j = Game.enemies.length - 1; j >= 0; j--) {
            const e = Game.enemies[j];
            const dx = b.x - e.mesh.position.x;
            const dz = b.z - e.mesh.position.z;
            const dist = Math.sqrt(dx * dx + dz * dz);

            if (dist < e.radius + 0.3) {
                // İsabet!
                sfx.playHit();
                e.hp -= b.damage;

                // Hit Flash (Beyaz flaş efekti)
                e.bodyMat.color.setHex(0xffffff);
                setTimeout(() => {
                    if (e && e.bodyMat) e.bodyMat.color.setHex(e.originalColor);
                }, 40);

                // Can Barı Güncellemesi
                if (e.hpBarMesh) {
                    const pct = Math.max(0, e.hp / e.maxHp);
                    e.hpBarMesh.fillMesh.scale.x = pct;
                    e.hpBarMesh.fillMesh.position.x = -e.hpBarMesh.maxWidth * (1 - pct) / 2;
                }

                // Zombi Öldü mü?
                if (e.hp <= 0) {
                    createExplosion(e.mesh.position.x, 1.0, e.mesh.position.z, e.originalColor);
                    scene.remove(e.mesh);
                    if (e.hpBarMesh) scene.remove(e.hpBarMesh);
                    Game.enemies.splice(j, 1);
                    Game.score += 50;
                    document.getElementById('score-text').textContent = Game.score;
                }

                // Mermiyi yok et
                scene.remove(b.mesh);
                Game.bullets.splice(i, 1);
                bulletRemoved = true;
                break;
            }
        }

        if (bulletRemoved) continue;

        // Boss ile Çarpışma Testi
        if (Game.boss && Game.boss.active) {
            const boss = Game.boss;
            const bdx = b.x - boss.mesh.position.x;
            const bdz = b.z - boss.mesh.position.z;
            const bdist = Math.sqrt(bdx * bdx + bdz * bdz);

            if (bdist < boss.radius + 0.4) {
                sfx.playHit();
                boss.hp -= b.damage;
                updateBossHUD();

                boss.bodyMat.color.setHex(0xffffff);
                setTimeout(() => {
                    if (boss && boss.bodyMat) boss.bodyMat.color.setHex(0x3b0764);
                }, 40);

                scene.remove(b.mesh);
                Game.bullets.splice(i, 1);
                bulletRemoved = true;

                if (boss.hp <= 0) {
                    triggerVictory();
                }
            }
        }

        if (bulletRemoved) continue;

        // Menzil dışına çıkan mermileri temizle
        if (b.z < p.z - 65) {
            scene.remove(b.mesh);
            Game.bullets.splice(i, 1);
        }
    }

    // Zombileri Güncelle
    for (let i = Game.enemies.length - 1; i >= 0; i--) {
        const e = Game.enemies[i];
        
        // Zombi oyuncuya doğru yürür
        e.mesh.position.z += e.speed * delta;
        e.animTime += delta * 6;

        // Sağa sola yalpalama animasyonu
        e.mesh.rotation.y = Math.sin(e.animTime) * 0.2;
        e.mesh.rotation.z = Math.sin(e.animTime * 0.8) * 0.08;

        // Can barı pozisyonu zombiyle birlikte hareket etsin
        if (e.hpBarMesh) {
            e.hpBarMesh.position.set(e.mesh.position.x, 2.2 * e.scale, e.mesh.position.z);
            e.hpBarMesh.lookAt(camera.position); // Kameraya dönük dursun
        }

        // Karakterle Doğrudan Çarpışma (Game Over)
        const zdx = p.x - e.mesh.position.x;
        const zdz = p.z - e.mesh.position.z;
        const zdist = Math.sqrt(zdx * zdx + zdz * zdz);

        if (zdist < 0.9) {
            triggerGameOver();
            return;
        }

        // Karakterin çok arkasında kalan zombileri temizle
        if (e.mesh.position.z > p.z + 10) {
            scene.remove(e.mesh);
            if (e.hpBarMesh) scene.remove(e.hpBarMesh);
            Game.enemies.splice(i, 1);
        }
    }

    // Kapı Tetikleme Testi
    Game.gates.forEach(g => {
        if (!g.triggered && Math.abs(p.z - g.z) < 1.0) {
            // Karakter bu kapının yatay koordinatında mı?
            const halfW = g.width / 2;
            if (p.x >= g.x - halfW && p.x <= g.x + halfW) {
                g.triggered = true;
                applyGateUpgrade(g.config);
                // Kapının parlaması ve küçülmesi
                g.mesh.scale.set(1.2, 1.2, 1.2);
                setTimeout(() => {
                    if (g.mesh) g.mesh.visible = false;
                }, 150);
            }
        }
    });

    // Boss Hareketi & Saldırısı
    if (Game.boss && Game.boss.active) {
        const boss = Game.boss;
        boss.attackTimer += delta;

        // Boss oyuncunun X eksenine doğru yavaşça süzülür
        boss.mesh.position.x += (p.x - boss.mesh.position.x) * 1.5 * delta;
        
        // Nefes alma / büyüme animasyonu
        const breath = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.05;
        boss.mesh.scale.set(breath, breath, breath);

        // Boss oyuncuya çok yaklaştıysa
        if (p.z <= boss.mesh.position.z + 2.5) {
            triggerGameOver();
        }
    }

    // Partikül Fiziği
    for (let i = Game.particles.length - 1; i >= 0; i--) {
        const pt = Game.particles[i];
        pt.life -= delta;
        pt.vy -= 9.8 * delta; // Yerçekimi
        pt.mesh.position.x += pt.vx * delta;
        pt.mesh.position.y += pt.vy * delta;
        pt.mesh.position.z += pt.vz * delta;

        if (pt.life <= 0) {
            scene.remove(pt.mesh);
            Game.particles.splice(i, 1);
        }
    }

    // Bölüm İlerleme Çubuğunu Güncelle
    updateProgressBar();
}

function updateProgressBar() {
    const totalDist = Math.abs(Game.bossArenaZ);
    const currentDist = Math.abs(Game.player.z);
    const pct = Math.min(100, Math.max(0, (currentDist / totalDist) * 100));

    document.getElementById('progress-bar-fill').style.width = pct + '%';
    document.getElementById('progress-player-icon').style.left = pct + '%';
}

function enterBossFight() {
    Game.state = GAME_STATE.BOSS_FIGHT;
    Game.boss.active = true;

    // Boss Can Barını Aç
    document.getElementById('boss-hud').classList.remove('hidden');
    updateBossHUD();
    showBanner('⚠️ DİKKAT: BOSS GELDİ! ⚠️', false);
}

function updateBossHUD() {
    if (!Game.boss) return;
    const pct = Math.max(0, (Game.boss.hp / Game.boss.maxHp) * 100);
    document.getElementById('boss-bar-fill').style.width = pct + '%';
    document.getElementById('boss-hp-text').textContent = `${Math.max(0, Game.boss.hp)} / ${Game.boss.maxHp}`;
}

function triggerVictory() {
    Game.state = GAME_STATE.VICTORY;
    sfx.playVictory();

    // Dev patlama efekti
    createExplosion(Game.boss.mesh.position.x, 3.0, Game.boss.mesh.position.z, 0xff0055, 40);
    scene.remove(Game.boss.mesh);

    Game.score += 1000 * Game.level;
    document.getElementById('victory-score').textContent = Game.score;

    setTimeout(() => {
        document.getElementById('boss-hud').classList.add('hidden');
        document.getElementById('victory-screen').classList.remove('hidden');
    }, 1000);
}

function triggerGameOver() {
    Game.state = GAME_STATE.GAMEOVER;
    sfx.playExplosion();

    createExplosion(Game.player.x, 1.0, Game.player.z, 0x00f2fe, 30);
    Game.player.mesh.visible = false;

    document.getElementById('gameover-score').textContent = Game.score;

    setTimeout(() => {
        document.getElementById('boss-hud').classList.add('hidden');
        document.getElementById('gameover-screen').classList.remove('hidden');
    }, 800);
}

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    Game.state = GAME_STATE.PLAYING;
}

function resetGame(lvl) {
    Game.state = GAME_STATE.PLAYING;
    Game.score = 0;

    // Oyuncu Parametrelerini Sıfırla
    const p = Game.player;
    p.x = 0;
    p.targetX = 0;
    p.z = 0;
    p.fireInterval = 0.22;
    p.bulletCount = 1;
    p.damage = 15;
    p.mesh.visible = true;

    // UI Gizle
    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('victory-screen').classList.add('hidden');
    document.getElementById('boss-hud').classList.add('hidden');

    setupLevel(lvl);
}

// ==========================================
// RENDER DÖNGÜSÜ
// ==========================================
function animate() {
    requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.1);
    update(delta);
    renderer.render(scene, camera);
}

// Başlat
window.addEventListener('DOMContentLoaded', initThree);
