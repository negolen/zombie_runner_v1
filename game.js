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

    playHurt() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.18);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
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

    playHeal() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.07);
            gain.gain.setValueAtTime(0.22, now + idx * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.07 + 0.2);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.07);
            osc.stop(now + idx * 0.07 + 0.2);
        });
    }

    playShield() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.25);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
    }

    playMeteor() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(25, now + 0.6);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.6);
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
// 10 FARKLI BOSS TEMASI & ÖZELLİKLERİ
// ==========================================
const BOSS_THEMES = [
    { name: "ZOMBİ TİTAN", color: 0x3b0764, eyeColor: 0xff0055, hornColor: 0xef4444, scale: 3.2, hp: 4500 },
    { name: "MAGMA GOLEM", color: 0x9a3412, eyeColor: 0xfacc15, hornColor: 0xea580c, scale: 3.4, hp: 5800 },
    { name: "BUZ DEVİ", color: 0x0284c7, eyeColor: 0x38bdf8, hornColor: 0xbae6fd, scale: 3.3, hp: 7200 },
    { name: "ZEHİR LORDU", color: 0x15803d, eyeColor: 0xa3e635, hornColor: 0x4ade80, scale: 3.5, hp: 8800 },
    { name: "SİBER MECH", color: 0x334155, eyeColor: 0xef4444, hornColor: 0x38bdf8, scale: 3.4, hp: 10600 },
    { name: "KEMİK KRALI", color: 0xd6d3d1, eyeColor: 0x6366f1, hornColor: 0xf59e0b, scale: 3.3, hp: 12600 },
    { name: "KARANLIK ŞÖVALYE", color: 0x0f172a, eyeColor: 0xa855f7, hornColor: 0x7c3aed, scale: 3.6, hp: 15000 },
    { name: "KAN İBLİSİ", color: 0x881337, eyeColor: 0xf43f5e, hornColor: 0x991b1b, scale: 3.5, hp: 17800 },
    { name: "FIRTINA DEVİ", color: 0x1e3a8a, eyeColor: 0x67e8f9, hornColor: 0x60a5fa, scale: 3.6, hp: 21000 },
    { name: "KIYAMET HÜKÜMDARI", color: 0x18181b, eyeColor: 0xfbbf24, hornColor: 0xd97706, scale: 4.0, hp: 25000 }
];

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
        speed: 16.2,        // %10 azaltıldı (18 -> 16.2 birim/sn)
        runSpeed: 16.2,
        fireTimer: 0,
        fireInterval: 0.22, // Atış hızı periyodu (saniye)
        bulletCount: 1,     // Mermi sayısı (1, 2, 3, 4)
        damage: 15,         // Mermi hasarı
        bulletSpeed: 55,    // Mermi hızı
        hearts: 4.0,        // Başlangıç canı: 4 kalp
        maxHearts: 6.0,     // Cap: En fazla 6 kalp
        invulnerableTimer: 0,
        isShieldActive: false,
        shieldTimer: 0,
        shieldMesh: null,
        skill1Used: false,  // Meteor tur başına 1 kez
        skill3Cooldown: 0,  // Kalkan bekleme süresi
        limbs: {}
    },

    // Nesne Listeleri
    bullets: [],
    enemies: [],
    gatePairs: [],
    particles: [],
    bossProjectiles: [],
    shockwaves: [],
    activeAnimations: [], // Meteor, Valkyrie vb.
    boss: null,

    // Dokunmatik & Klavye Kontrolü
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

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);
    scene.fog = new THREE.FogExp2(0x0a0f1d, 0.015);

    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 500);
    camera.position.set(0, 5.5, 8.5);
    camera.lookAt(0, 1.5, -5);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

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

    window.addEventListener('resize', onWindowResize);

    setupControls();
    buildWorld();
    buildPlayer();
    setupLevel(Game.level);

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
// KONTROLLER (Touch, Mouse Drag & Keyboard)
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
        
        const sensitivity = 0.022;
        let newX = Game.playerStartX + diffX * sensitivity;
        
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

    // Klavye Yön Tuşları (Sol / Sağ Ok & A / D) ve Skill Tuşları (1, 2, 3)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.code === 'KeyA') {
            Game.keys.left = true;
            e.preventDefault();
        } else if (e.key === 'ArrowRight' || e.code === 'KeyD') {
            Game.keys.right = true;
            e.preventDefault();
        } else if (e.key === '1' || e.code === 'Digit1') {
            triggerSkill1();
        } else if (e.key === '2' || e.code === 'Digit2') {
            triggerSkill2();
        } else if (e.key === '3' || e.code === 'Digit3') {
            triggerSkill3();
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

    // Boss Yetenek Buton Tıklamaları
    document.getElementById('skill-1-btn').addEventListener('click', () => triggerSkill1());
    document.getElementById('skill-2-btn').addEventListener('click', () => triggerSkill2());
    document.getElementById('skill-3-btn').addEventListener('click', () => triggerSkill3());
}

// ==========================================
// ÇEVRE & YOL OLUŞTURMA (World)
// ==========================================
function buildWorld() {
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

    // Boss Arenası
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

    const ringGeo = new THREE.RingGeometry(15.5, 16.2, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(0, 0.22, Game.bossArenaZ);
    scene.add(ring);

    const gridHelper = new THREE.GridHelper(400, 80, 0x1e293b, 0x0f172a);
    gridHelper.position.set(0, -0.3, -150);
    scene.add(gridHelper);
}

// ==========================================
// KARAKTER & DÖNEN KALKAN MODELİ
// ==========================================
function buildPlayer() {
    const playerGroup = new THREE.Group();

    // Gövde
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

    // Kollar & Silahlar
    const armGeo = new THREE.BoxGeometry(0.2, 0.6, 0.2);
    const gunGeo = new THREE.BoxGeometry(0.15, 0.2, 0.6);
    const gunMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });

    const leftArm = new THREE.Mesh(armGeo, bodyMat);
    leftArm.position.set(-0.55, 1.1, 0);
    const leftGun = new THREE.Mesh(gunGeo, gunMat);
    leftGun.position.set(-0.55, 0.9, -0.3);
    playerGroup.add(leftArm);
    playerGroup.add(leftGun);

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

    // 3. SKILL: Dönen Kalkanlar Grubu (3 adet mini neon kalkan)
    const shieldOrbitGroup = new THREE.Group();
    shieldOrbitGroup.visible = false;
    const miniShieldGeo = new THREE.BoxGeometry(0.5, 0.8, 0.08);
    const miniShieldMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x10b981,
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 0.85
    });

    for (let i = 0; i < 3; i++) {
        const shieldMesh = new THREE.Mesh(miniShieldGeo, miniShieldMat);
        const angle = (i * Math.PI * 2) / 3;
        shieldMesh.position.set(Math.cos(angle) * 1.5, 1.2, Math.sin(angle) * 1.5);
        shieldMesh.rotation.y = -angle + Math.PI / 2;
        shieldOrbitGroup.add(shieldMesh);
    }
    playerGroup.add(shieldOrbitGroup);
    Game.player.shieldMesh = shieldOrbitGroup;

    Game.player.limbs = { leftLeg, rightLeg, leftArm, rightArm, bodyMat, headMat };
    Game.player.mesh = playerGroup;
    scene.add(playerGroup);
}

// ==========================================
// SEVİYE KURULUMU (Kapılar, Zombiler, Boss)
// ==========================================
function setupLevel(lvl) {
    clearLevelEntities();

    // Seviye Etiketi
    document.getElementById('level-label').textContent = `BÖLÜM ${lvl}`;

    // Boss Skills Reset
    Game.player.skill1Used = false;
    Game.player.skill3Cooldown = 0;
    Game.player.isShieldActive = false;
    Game.player.shieldTimer = 0;
    if (Game.player.shieldMesh) Game.player.shieldMesh.visible = false;

    // KAPILAR (Z lokasyonları: -40, -95, -155, -215)
    // Her çiftte %25 şansla EN FAZLA 1 adet negatif kapı çıkabilir
    const zPositions = [-40, -95, -155, -215];
    zPositions.forEach(z => {
        const hasNegative = Math.random() < 0.25;
        const negativeSide = Math.random() < 0.5 ? 'left' : 'right';

        const posPool = [
            { type: 'fireRate', val: 0.04, label: '+HIZLI ATEŞ', isPos: true },
            { type: 'bullets', val: 1, label: '+1 MERMİ', isPos: true },
            { type: 'damage', val: 15, label: '+15 HASAR', isPos: true },
            { type: 'heart', val: 1.0, label: '+1 KALP ❤️', isPos: true },
            { type: 'heart', val: 0.5, label: '+0.5 KALP', isPos: true },
            { type: 'bullets', val: 2, label: '+2 MERMİ', isPos: true }
        ];

        const negPool = [
            { type: 'damage', val: -5, label: '-5 HASAR', isPos: false },
            { type: 'bullets', val: -1, label: '-1 MERMİ', isPos: false },
            { type: 'heart', val: -0.5, label: '-0.5 KALP 💔', isPos: false },
            { type: 'fireRate', val: -0.03, label: '-HIZLI ATEŞ', isPos: false }
        ];

        const pickPos = () => posPool[Math.floor(Math.random() * posPool.length)];
        const pickNeg = () => negPool[Math.floor(Math.random() * negPool.length)];

        let leftCfg, rightCfg;
        if (hasNegative) {
            if (negativeSide === 'left') {
                leftCfg = pickNeg();
                rightCfg = pickPos();
            } else {
                leftCfg = pickPos();
                rightCfg = pickNeg();
            }
        } else {
            leftCfg = pickPos();
            rightCfg = pickPos();
            // Aynı gelmemesi için kontrol
            while (rightCfg.label === leftCfg.label) {
                rightCfg = pickPos();
            }
        }

        createNoSkipGatePair(z, leftCfg, rightCfg);
    });

    // ZOMBİLER (Seviye can çarpanı ile)
    const hpMult = 1 + (lvl - 1) * 0.35;
    for (let z = -20; z > -260; z -= 15) {
        const nearGate = zPositions.some(gz => Math.abs(gz - z) < 7);
        if (nearGate) continue;

        const count = Math.floor(Math.random() * 3) + 2;
        const spacing = (Game.trackWidth - 2.5) / count;

        for (let i = 0; i < count; i++) {
            const x = -((Game.trackWidth - 2.5) / 2) + i * spacing + (Math.random() * 0.4 - 0.2);
            const rand = Math.random();
            let type = 'normal';
            if (rand > 0.8) type = 'tank';
            else if (rand > 0.55) type = 'fast';

            createZombie(x, z, type, hpMult);
        }
    }

    // BOSS OLUŞTUR
    createBoss(lvl);
    updateHUDStats();
    updateHeartsUI();
}

function clearLevelEntities() {
    Game.bullets.forEach(b => scene.remove(b.mesh));
    Game.bullets = [];

    Game.enemies.forEach(e => {
        scene.remove(e.mesh);
        if (e.hpBarMesh) scene.remove(e.hpBarMesh);
    });
    Game.enemies = [];

    Game.gatePairs.forEach(pair => {
        scene.remove(pair.left.mesh);
        scene.remove(pair.right.mesh);
    });
    Game.gatePairs = [];

    Game.particles.forEach(p => scene.remove(p.mesh));
    Game.particles = [];

    Game.bossProjectiles.forEach(bp => scene.remove(bp.mesh));
    Game.bossProjectiles = [];

    Game.shockwaves.forEach(sw => scene.remove(sw.mesh));
    Game.shockwaves = [];

    Game.activeAnimations.forEach(anim => {
        if (anim.mesh) scene.remove(anim.mesh);
    });
    Game.activeAnimations = [];

    if (Game.boss && Game.boss.mesh) {
        scene.remove(Game.boss.mesh);
        Game.boss = null;
    }
}

// ==========================================
// KAÇIRILAMAZ KAPILAR (No-Skip Gates)
// ==========================================
function createNoSkipGatePair(z, leftCfg, rightCfg) {
    const halfWidth = Game.trackWidth / 2; // 4.5
    const gateWidth = halfWidth;           // 4.5 tam genişlik (0 boşluk)
    const gateHeight = 3.6;

    // Sol kapı: X = -2.25, aralık: [-4.5, 0]
    const leftMesh = buildGateMesh(gateWidth, gateHeight, leftCfg);
    leftMesh.position.set(-gateWidth / 2, gateHeight / 2, z);
    scene.add(leftMesh);

    // Sağ kapı: X = +2.25, aralık: [0, +4.5]
    const rightMesh = buildGateMesh(gateWidth, gateHeight, rightCfg);
    rightMesh.position.set(gateWidth / 2, gateHeight / 2, z);
    scene.add(rightMesh);

    Game.gatePairs.push({
        z: z,
        triggered: false,
        left: { mesh: leftMesh, config: leftCfg },
        right: { mesh: rightMesh, config: rightCfg }
    });
}

function buildGateMesh(w, h, info) {
    const group = new THREE.Group();
    const color = info.isPos ? 0x00f2fe : 0xef4444;

    // Çerçeve
    const frameGeo = new THREE.BoxGeometry(w, h, 0.3);
    const frameMat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.85
    });

    // Enerji Perdesi
    const fieldGeo = new THREE.PlaneGeometry(w - 0.2, h - 0.4);
    const fieldMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide
    });
    const field = new THREE.Mesh(fieldGeo, fieldMat);
    field.position.z = 0.05;
    group.add(field);

    const borderMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const topBar = new THREE.Mesh(new THREE.BoxGeometry(w, 0.2, 0.4), borderMat);
    topBar.position.y = h / 2;
    group.add(topBar);

    // Canvas Metin Dokusu
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
    const textMesh = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.9, 1.4), textMat);
    textMesh.position.set(0, 0.2, 0.18);
    group.add(textMesh);

    return group;
}

// ==========================================
// ZOMBİLER (Düşmanlar)
// ==========================================
function createZombie(x, z, type, hpMult) {
    const group = new THREE.Group();

    let hp = 30;
    let speed = 2.2;
    let color = 0x22c55e;
    let scale = 1.0;

    if (type === 'fast') {
        hp = 20;
        speed = 4.5;
        color = 0xf59e0b;
        scale = 0.9;
    } else if (type === 'tank') {
        hp = 110;
        speed = 1.1;
        color = 0x7c3aed;
        scale = 1.6;
    }

    hp = Math.round(hp * hpMult);

    const bodyMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.7 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.7 * scale, 0.9 * scale, 0.4 * scale), bodyMat);
    body.position.y = 0.9 * scale;
    body.castShadow = true;
    group.add(body);

    const headMat = new THREE.MeshStandardMaterial({ color: 0x15803d });
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.5 * scale, 0.5 * scale, 0.5 * scale), headMat);
    head.position.y = 1.6 * scale;
    head.castShadow = true;
    group.add(head);

    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const eye1 = new THREE.Mesh(new THREE.BoxGeometry(0.1 * scale, 0.08 * scale, 0.08 * scale), eyeMat);
    eye1.position.set(-0.13 * scale, 1.65 * scale, 0.25 * scale);
    const eye2 = eye1.clone();
    eye2.position.x = 0.13 * scale;
    group.add(eye1);
    group.add(eye2);

    const armGeo = new THREE.BoxGeometry(0.18 * scale, 0.18 * scale, 0.7 * scale);
    const leftArm = new THREE.Mesh(armGeo, bodyMat);
    leftArm.position.set(-0.45 * scale, 1.1 * scale, 0.35 * scale);
    const rightArm = leftArm.clone();
    rightArm.position.x = 0.45 * scale;
    group.add(leftArm);
    group.add(rightArm);

    group.position.set(x, 0, z);
    scene.add(group);

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
    const bg = new THREE.Mesh(
        new THREE.PlaneGeometry(width, 0.14),
        new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide })
    );
    group.add(bg);

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
// 10 TEMALI BOSS OLUŞTURMA
// ==========================================
function createBoss(lvl) {
    const themeIdx = (lvl - 1) % BOSS_THEMES.length;
    const theme = BOSS_THEMES[themeIdx];
    const group = new THREE.Group();
    const scale = theme.scale;
    const maxHp = theme.hp + Math.floor((lvl - 1) / 10) * 25000;

    const bodyMat = new THREE.MeshStandardMaterial({
        color: theme.color,
        roughness: 0.5,
        metalness: 0.4
    });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.9 * scale, 1.1 * scale, 0.6 * scale), bodyMat);
    body.position.y = 1.0 * scale;
    body.castShadow = true;
    group.add(body);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.6 * scale, 0.6 * scale, 0.6 * scale), bodyMat);
    head.position.y = 1.8 * scale;
    head.castShadow = true;
    group.add(head);

    const eyeMat = new THREE.MeshBasicMaterial({ color: theme.eyeColor });
    const eye1 = new THREE.Mesh(new THREE.BoxGeometry(0.15 * scale, 0.1 * scale, 0.1 * scale), eyeMat);
    eye1.position.set(-0.16 * scale, 1.85 * scale, 0.3 * scale);
    const eye2 = eye1.clone();
    eye2.position.x = 0.16 * scale;
    group.add(eye1);
    group.add(eye2);

    const hornGeo = new THREE.ConeGeometry(0.15 * scale, 0.55 * scale, 4);
    const hornMat = new THREE.MeshStandardMaterial({ color: theme.hornColor });
    const hornL = new THREE.Mesh(hornGeo, hornMat);
    hornL.position.set(-0.25 * scale, 2.3 * scale, 0);
    hornL.rotation.z = 0.3;
    const hornR = hornL.clone();
    hornR.position.x = 0.25 * scale;
    hornR.rotation.z = -0.3;
    group.add(hornL);
    group.add(hornR);

    // Omuzluklar
    const shoulderGeo = new THREE.BoxGeometry(0.3 * scale, 0.3 * scale, 0.4 * scale);
    const shoulderL = new THREE.Mesh(shoulderGeo, hornMat);
    shoulderL.position.set(-0.6 * scale, 1.4 * scale, 0);
    const shoulderR = shoulderL.clone();
    shoulderR.position.x = 0.6 * scale;
    group.add(shoulderL);
    group.add(shoulderR);

    group.position.set(0, 0, Game.bossArenaZ - 4);
    scene.add(group);

    document.getElementById('boss-name-text').textContent = `🧟‍♂️ ${theme.name}`;

    Game.boss = {
        mesh: group,
        bodyMat: bodyMat,
        theme: theme,
        maxHp: maxHp,
        hp: maxHp,
        scale: scale,
        radius: 1.8,
        active: false,
        shootTimer: 0,
        pulseTimer: 0
    };
}

// ==========================================
// BOSS SALDIRILARI (Kaçılabilir Füze & Kaçılamaz Şok Dalgası)
// ==========================================
function fireBossProjectile() {
    if (!Game.boss || !Game.boss.active) return;
    const bPos = Game.boss.mesh.position;
    const p = Game.player;

    const projGeo = new THREE.SphereGeometry(0.4, 8, 8);
    const projMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const projMesh = new THREE.Mesh(projGeo, projMat);
    projMesh.position.set(bPos.x, 1.5, bPos.z + 2);
    scene.add(projMesh);

    // Oyuncunun bulunduğu X koordinatına doğru yön
    const targetX = p.x;
    const dx = targetX - bPos.x;
    const dz = p.z - bPos.z;
    const dist = Math.sqrt(dx * dx + dz * dz) || 1;
    const speed = 22;

    Game.bossProjectiles.push({
        mesh: projMesh,
        vx: (dx / dist) * speed,
        vz: (dz / dist) * speed,
        life: 5.0
    });
}

function fireBossShockwave() {
    if (!Game.boss || !Game.boss.active) return;
    const bPos = Game.boss.mesh.position;

    // Zemin üzerinde hızla genişleyen şok dalgası halkası
    const waveGeo = new THREE.RingGeometry(0.5, 1.2, 32);
    const waveMat = new THREE.MeshBasicMaterial({
        color: 0xff0055,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.rotation.x = -Math.PI / 2;
    waveMesh.position.set(bPos.x, 0.15, bPos.z);
    scene.add(waveMesh);

    Game.shockwaves.push({
        mesh: waveMesh,
        currentRadius: 1.2,
        maxRadius: 35,
        speed: 26,
        hasHitPlayer: false
    });

    sfx.playExplosion();
}

// ==========================================
// BOSS 3 ÖZEL SKILL MEKANİĞİ & 3D EFEKTLER
// ==========================================

// 1. SKILL: METEOR ÇAĞRISI (%25 Boss Canı Hasarı)
function triggerSkill1() {
    if (Game.state !== GAME_STATE.BOSS_FIGHT || !Game.boss || !Game.boss.active) return;
    if (Game.player.skill1Used) return;

    Game.player.skill1Used = true;
    const btn = document.getElementById('skill-1-btn');
    btn.classList.add('used');
    showBanner('☄️ METEOR ÇAĞRILDI! ☄️');

    // Gökyüzünden Boss'a Düşen 3D Meteor
    const bPos = Game.boss.mesh.position;
    const meteorGeo = new THREE.DodecahedronGeometry(1.4);
    const meteorMat = new THREE.MeshStandardMaterial({
        color: 0xea580c,
        emissive: 0xff4400,
        emissiveIntensity: 0.8
    });
    const meteor = new THREE.Mesh(meteorGeo, meteorMat);
    meteor.position.set(bPos.x, 26, bPos.z + 10);
    scene.add(meteor);

    Game.activeAnimations.push({
        type: 'meteor',
        mesh: meteor,
        targetY: 1.5,
        targetZ: bPos.z,
        vy: -32,
        vz: -12,
        onHit: () => {
            sfx.playMeteor();
            const dmg = Math.round(Game.boss.maxHp * 0.25);
            Game.boss.hp -= dmg;
            updateBossHUD();
            createExplosion(bPos.x, 2.5, bPos.z, 0xff4400, 35);
            if (Game.boss.hp <= 0) triggerVictory();
        }
    });
}

// 2. SKILL: VALKYRIE MELEĞİ ŞİFASI (Can < 4 ise 4 Kalbe Tamamlar)
function triggerSkill2() {
    if (Game.state !== GAME_STATE.BOSS_FIGHT) return;
    if (Game.player.hearts >= 4.0) {
        showBanner('Canınız zaten 4 veya daha fazla!');
        return;
    }

    sfx.playHeal();
    showBanner('👼 VALKYRIE GELDİ: CAN FULLENDİ! 👼');

    // Gökyüzünden süzülen altın melek figürü
    const p = Game.player;
    const valkGroup = new THREE.Group();
    const angelMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });
    
    // Melek Gövdesi
    const angelBody = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.4, 1.2), angelMat);
    valkGroup.add(angelBody);

    // Kanatlar
    const wingGeo = new THREE.PlaneGeometry(1.2, 0.6);
    const wingL = new THREE.Mesh(wingGeo, angelMat);
    wingL.position.set(-0.7, 0.4, 0);
    wingL.rotation.z = 0.3;
    const wingR = wingL.clone();
    wingR.position.x = 0.7;
    wingR.rotation.z = -0.3;
    valkGroup.add(wingL);
    valkGroup.add(wingR);

    valkGroup.position.set(p.x, 9, p.z - 2);
    scene.add(valkGroup);

    Game.activeAnimations.push({
        type: 'valkyrie',
        mesh: valkGroup,
        time: 0,
        duration: 1.5,
        onFinish: () => {
            p.hearts = 4.0;
            updateHeartsUI();
            updateSkillsUI();
            createExplosion(p.x, 1.5, p.z, 0xfde047, 20);
        }
    });

    Game.player.hearts = 4.0;
    updateHeartsUI();
    updateSkillsUI();
}

// 3. SKILL: DÖNEN KALKANLAR (2sn Boyunca %50 Hasar Azaltma)
function triggerSkill3() {
    if (Game.state !== GAME_STATE.BOSS_FIGHT) return;
    if (Game.player.skill3Cooldown > 0 || Game.player.isShieldActive) return;

    sfx.playShield();
    showBanner('🛡️ DÖNEN KALKANLAR AKTİF! (%50 DEF) 🛡️');

    Game.player.isShieldActive = true;
    Game.player.shieldTimer = 2.0;
    Game.player.skill3Cooldown = 8.0;

    if (Game.player.shieldMesh) {
        Game.player.shieldMesh.visible = true;
    }

    const btn = document.getElementById('skill-3-btn');
    btn.classList.add('active-shield');
}

// ==========================================
// KALPLER & HASAR ALMA SİSTEMİ
// ==========================================
function takePlayerDamage(amount) {
    const p = Game.player;
    if (p.invulnerableTimer > 0) return;

    // Eğer Kalkan Aktifse Hasar %50 Azalır
    let finalDamage = amount;
    if (p.isShieldActive) {
        finalDamage = amount * 0.5;
    }

    p.hearts = Math.max(0, p.hearts - finalDamage);
    p.invulnerableTimer = 0.8; // 0.8 saniye dokunulmazlık

    sfx.playHurt();
    updateHeartsUI();
    updateSkillsUI();

    // Kalp Sarsılma Efekti
    const heartsWrap = document.getElementById('hud-hearts');
    heartsWrap.classList.add('heart-shake');
    setTimeout(() => heartsWrap.classList.remove('heart-shake'), 400);

    // Kırmızı yanıp sönme
    if (p.mesh) {
        p.limbs.bodyMat.color.setHex(0xff0000);
        setTimeout(() => {
            if (p.limbs && p.limbs.bodyMat) p.limbs.bodyMat.color.setHex(0x0284c7);
        }, 120);
    }

    if (p.hearts <= 0) {
        triggerGameOver();
    }
}

function updateHeartsUI() {
    const p = Game.player;
    const container = document.getElementById('hud-hearts');
    container.innerHTML = '';

    // Toplam 6 Slot
    for (let i = 1; i <= 6; i++) {
        const slot = document.createElement('span');
        slot.className = 'heart-slot';

        if (p.hearts >= i) {
            slot.textContent = '❤️';
            slot.classList.add('full');
        } else if (p.hearts >= i - 0.5) {
            slot.textContent = '💔';
            slot.classList.add('half');
        } else {
            slot.textContent = '🖤';
            slot.classList.add('empty');
        }

        container.appendChild(slot);
    }
}

function updateSkillsUI() {
    const p = Game.player;
    const btn1 = document.getElementById('skill-1-btn');
    const btn2 = document.getElementById('skill-2-btn');
    const btn3 = document.getElementById('skill-3-btn');

    // 1. Skill (Tek Kullanımlık)
    if (p.skill1Used) {
        btn1.classList.add('used');
    } else {
        btn1.classList.remove('used');
    }

    // 2. Skill (Can 4'ün altındayken açık, 4 veya üstündeyken kilitli)
    if (p.hearts < 4.0) {
        btn2.classList.remove('disabled');
    } else {
        btn2.classList.add('disabled');
    }

    // 3. Skill (Cooldown kontrolü)
    if (p.skill3Cooldown > 0 && !p.isShieldActive) {
        btn3.classList.add('disabled');
        btn3.querySelector('.skill-sub').textContent = `${Math.ceil(p.skill3Cooldown)}s`;
    } else {
        btn3.classList.remove('disabled');
        btn3.querySelector('.skill-sub').textContent = '-%50 HASAR';
    }
}

// ==========================================
// MERMİLER & ATEŞ SİSTEMİ
// ==========================================
function shootBullets() {
    const p = Game.player;
    sfx.playLaser();

    const bulletGeo = new THREE.SphereGeometry(0.15, 8, 8);
    const bulletMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });

    const count = p.bulletCount;
    const spreads = [];

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
            vx: offset * 1.5
        });
    });
}

function createExplosion(x, y, z, color = 0x22c55e, count = 12) {
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
    const p = Game.player;

    if (config.type === 'fireRate') {
        p.fireInterval = Math.max(0.06, Math.min(0.35, p.fireInterval - config.val));
        showBanner(config.isPos ? '🔥 ATIŞ HIZI ARTTI!' : '⚠️ ATIŞ HIZI DÜŞTÜ!', config.isPos);
    } else if (config.type === 'bullets') {
        p.bulletCount = Math.max(1, Math.min(4, p.bulletCount + config.val));
        showBanner(config.isPos ? `⚡ +${config.val} EKSTRA MERMİ!` : `⚠️ MERMİ AZALDI!`, config.isPos);
    } else if (config.type === 'damage') {
        p.damage = Math.max(5, p.damage + config.val);
        showBanner(config.isPos ? `💥 +${config.val} HASAR GÜCÜ!` : `⚠️ HASAR GÜCÜ DÜŞTÜ!`, config.isPos);
    } else if (config.type === 'heart') {
        p.hearts = Math.min(6.0, Math.max(1.0, p.hearts + config.val));
        updateHeartsUI();
        showBanner(config.isPos ? `❤️ +${config.val} KALP KAZANDIN!` : `💔 ${config.val} KALP KAYBETTİN!`, config.isPos);
    }

    if (config.isPos) sfx.playPowerup();
    else sfx.playHurt();

    updateHUDStats();
}

function updateHUDStats() {
    const p = Game.player;
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

    // Dokunulmazlık Sayaç Güncellemesi
    if (p.invulnerableTimer > 0) {
        p.invulnerableTimer -= delta;
        p.mesh.visible = Math.floor(clock.getElapsedTime() * 16) % 2 === 0;
    } else {
        p.mesh.visible = true;
    }

    // 3. Skill Kalkan Sayacı & Dönen Kalkanlar Animasyonu
    if (p.isShieldActive) {
        p.shieldTimer -= delta;
        if (p.shieldMesh) {
            p.shieldMesh.rotation.y += delta * 7;
        }
        if (p.shieldTimer <= 0) {
            p.isShieldActive = false;
            if (p.shieldMesh) p.shieldMesh.visible = false;
            document.getElementById('skill-3-btn').classList.remove('active-shield');
        }
    }

    if (p.skill3Cooldown > 0) {
        p.skill3Cooldown -= delta;
        if (p.skill3Cooldown <= 0) {
            p.skill3Cooldown = 0;
            updateSkillsUI();
        }
    }

    // Karakter İleri Koşusu
    if (Game.state === GAME_STATE.PLAYING) {
        p.z -= p.speed * delta;
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

    // Bacak Sallanması
    const runCycle = Math.sin(clock.getElapsedTime() * 14);
    p.limbs.leftLeg.rotation.x = runCycle * 0.6;
    p.limbs.rightLeg.rotation.x = -runCycle * 0.6;
    p.limbs.leftArm.rotation.x = -runCycle * 0.4;
    p.limbs.rightArm.rotation.x = runCycle * 0.4;

    // Kamera Takibi
    camera.position.x += (p.x * 0.6 - camera.position.x) * 8 * delta;
    camera.position.y = 5.2;
    camera.position.z = p.z + 8.5;
    camera.lookAt(p.x * 0.3, 1.4, p.z - 7);

    // Otomatik Ateş
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

        // Zombilerle Çarpışma
        for (let j = Game.enemies.length - 1; j >= 0; j--) {
            const e = Game.enemies[j];
            const dx = b.x - e.mesh.position.x;
            const dz = b.z - e.mesh.position.z;
            const dist = Math.sqrt(dx * dx + dz * dz);

            if (dist < e.radius + 0.3) {
                sfx.playHit();
                e.hp -= b.damage;

                e.bodyMat.color.setHex(0xffffff);
                setTimeout(() => {
                    if (e && e.bodyMat) e.bodyMat.color.setHex(e.originalColor);
                }, 40);

                if (e.hpBarMesh) {
                    const pct = Math.max(0, e.hp / e.maxHp);
                    e.hpBarMesh.fillMesh.scale.x = pct;
                    e.hpBarMesh.fillMesh.position.x = -e.hpBarMesh.maxWidth * (1 - pct) / 2;
                }

                if (e.hp <= 0) {
                    createExplosion(e.mesh.position.x, 1.0, e.mesh.position.z, e.originalColor);
                    scene.remove(e.mesh);
                    if (e.hpBarMesh) scene.remove(e.hpBarMesh);
                    Game.enemies.splice(j, 1);
                    Game.score += 50;
                    document.getElementById('score-text').textContent = Game.score;
                }

                scene.remove(b.mesh);
                Game.bullets.splice(i, 1);
                bulletRemoved = true;
                break;
            }
        }

        if (bulletRemoved) continue;

        // Boss ile Çarpışma
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
                    if (boss && boss.bodyMat) boss.bodyMat.color.setHex(boss.theme.color);
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

        if (b.z < p.z - 65) {
            scene.remove(b.mesh);
            Game.bullets.splice(i, 1);
        }
    }

    // Zombileri Güncelle & Zombiye Temas (1 Kalp Hasar)
    for (let i = Game.enemies.length - 1; i >= 0; i--) {
        const e = Game.enemies[i];
        e.mesh.position.z += e.speed * delta;
        e.animTime += delta * 6;
        e.mesh.rotation.y = Math.sin(e.animTime) * 0.2;

        if (e.hpBarMesh) {
            e.hpBarMesh.position.set(e.mesh.position.x, 2.2 * e.scale, e.mesh.position.z);
            e.hpBarMesh.lookAt(camera.position);
        }

        // Karakter ile Çarpışma (1 Kalp Hasar)
        const zdx = p.x - e.mesh.position.x;
        const zdz = p.z - e.mesh.position.z;
        const zdist = Math.sqrt(zdx * zdx + zdz * zdz);

        if (zdist < 0.9) {
            if (p.invulnerableTimer <= 0) {
                createExplosion(e.mesh.position.x, 1.0, e.mesh.position.z, e.originalColor);
                scene.remove(e.mesh);
                if (e.hpBarMesh) scene.remove(e.hpBarMesh);
                Game.enemies.splice(i, 1);

                takePlayerDamage(1.0);
            }
            continue;
        }

        if (e.mesh.position.z > p.z + 10) {
            scene.remove(e.mesh);
            if (e.hpBarMesh) scene.remove(e.hpBarMesh);
            Game.enemies.splice(i, 1);
        }
    }

    // KAÇIRILAMAZ KAPILAR (No-Skip Logic)
    Game.gatePairs.forEach(pair => {
        if (!pair.triggered && p.z <= pair.z && p.z >= pair.z - 2.5) {
            pair.triggered = true;

            // X < 0 ise Sol Kapı, X >= 0 ise Sağ Kapı
            const isLeft = p.x < 0;
            const chosen = isLeft ? pair.left : pair.right;
            const unchosen = isLeft ? pair.right : pair.left;

            applyGateUpgrade(chosen.config);

            // Seçilen kapı büyüme efekti, diğeri anında kaybolur
            chosen.mesh.scale.set(1.2, 1.2, 1.2);
            unchosen.mesh.visible = false;

            setTimeout(() => {
                chosen.mesh.visible = false;
            }, 180);
        }
    });

    // BOSS HAREKETİ & SALDIRILARI (Kaçılabilir Füze & Kaçılamaz Şok Dalgası)
    if (Game.boss && Game.boss.active) {
        const boss = Game.boss;

        // Boss oyuncuyu X ekseninde takip eder
        boss.mesh.position.x += (p.x - boss.mesh.position.x) * 1.5 * delta;
        const breath = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.05;
        boss.mesh.scale.set(breath, breath, breath);

        // 1. Saldırı: Kaçılabilir Füze (Her 2.8 saniyede bir)
        boss.shootTimer += delta;
        if (boss.shootTimer >= 2.8) {
            boss.shootTimer = 0;
            fireBossProjectile();
        }

        // 2. Saldırı: Kaçılamaz Şok Dalgası (Her 3.8 saniyede bir - 0.5 Kalp Hasar)
        boss.pulseTimer += delta;
        if (boss.pulseTimer >= 3.8) {
            boss.pulseTimer = 0;
            fireBossShockwave();
        }
    }

    // Boss Füzelerini Güncelle (Kaçılabilir)
    for (let i = Game.bossProjectiles.length - 1; i >= 0; i--) {
        const bp = Game.bossProjectiles[i];
        bp.mesh.position.x += bp.vx * delta;
        bp.mesh.position.z += bp.vz * delta;
        bp.life -= delta;

        // Oyuncuyla Çarpışma
        const dx = p.x - bp.mesh.position.x;
        const dz = p.z - bp.mesh.position.z;
        const dist = Math.sqrt(dx * dx + dz * dz);

        if (dist < 1.0) {
            takePlayerDamage(1.0); // 1 Kalp Hasar (Kalkan varsa 0.5)
            scene.remove(bp.mesh);
            Game.bossProjectiles.splice(i, 1);
            continue;
        }

        if (bp.life <= 0) {
            scene.remove(bp.mesh);
            Game.bossProjectiles.splice(i, 1);
        }
    }

    // Boss Şok Dalgalarını Güncelle (Kaçılamaz - 0.5 Kalp Hasar)
    for (let i = Game.shockwaves.length - 1; i >= 0; i--) {
        const sw = Game.shockwaves[i];
        sw.currentRadius += sw.speed * delta;
        sw.mesh.scale.set(sw.currentRadius, sw.currentRadius, 1);

        // Oyuncu dalga yarıçapına girdiğinde 0.5 kalp hasar
        const bPos = Game.boss.mesh.position;
        const distToBoss = Math.abs(p.z - bPos.z);
        if (!sw.hasHitPlayer && sw.currentRadius >= distToBoss - 1.0) {
            sw.hasHitPlayer = true;
            takePlayerDamage(0.5); // 0.5 Kalp Hasar (Kalkanla 0.25)
            showBanner('💥 KAÇILAMAZ ŞOK DALGASI! (-0.5 KALP)', false);
        }

        if (sw.currentRadius >= sw.maxRadius) {
            scene.remove(sw.mesh);
            Game.shockwaves.splice(i, 1);
        }
    }

    // Aktif 3D Skill Animasyonları (Meteor & Valkyrie)
    for (let i = Game.activeAnimations.length - 1; i >= 0; i--) {
        const anim = Game.activeAnimations[i];
        if (anim.type === 'meteor') {
            anim.mesh.position.y += anim.vy * delta;
            anim.mesh.position.z += anim.vz * delta;
            anim.mesh.rotation.x += delta * 8;
            anim.mesh.rotation.y += delta * 6;

            if (anim.mesh.position.y <= anim.targetY) {
                anim.onHit();
                scene.remove(anim.mesh);
                Game.activeAnimations.splice(i, 1);
            }
        } else if (anim.type === 'valkyrie') {
            anim.time += delta;
            anim.mesh.position.y -= delta * 5.5;
            anim.mesh.rotation.y += delta * 4;

            if (anim.time >= anim.duration) {
                anim.onFinish();
                scene.remove(anim.mesh);
                Game.activeAnimations.splice(i, 1);
            }
        }
    }

    // Partiküller
    for (let i = Game.particles.length - 1; i >= 0; i--) {
        const pt = Game.particles[i];
        pt.life -= delta;
        pt.vy -= 9.8 * delta;
        pt.mesh.position.x += pt.vx * delta;
        pt.mesh.position.y += pt.vy * delta;
        pt.mesh.position.z += pt.vz * delta;

        if (pt.life <= 0) {
            scene.remove(pt.mesh);
            Game.particles.splice(i, 1);
        }
    }

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

    document.getElementById('boss-hud').classList.remove('hidden');
    document.getElementById('boss-skills-bar').classList.remove('hidden');
    updateBossHUD();
    updateSkillsUI();
    showBanner(`⚠️ DİKKAT: ${Game.boss.theme.name} ÇIKTI! ⚠️`, false);
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

    createExplosion(Game.boss.mesh.position.x, 3.0, Game.boss.mesh.position.z, 0xff0055, 40);
    scene.remove(Game.boss.mesh);

    Game.score += 1000 * Game.level;
    document.getElementById('victory-score').textContent = Game.score;

    setTimeout(() => {
        document.getElementById('boss-hud').classList.add('hidden');
        document.getElementById('boss-skills-bar').classList.add('hidden');
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
        document.getElementById('boss-skills-bar').classList.add('hidden');
        document.getElementById('gameover-screen').classList.remove('hidden');
    }, 800);
}

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    Game.state = GAME_STATE.PLAYING;
    updateHeartsUI();
}

function resetGame(lvl) {
    Game.state = GAME_STATE.PLAYING;
    Game.score = 0;

    const p = Game.player;
    p.x = 0;
    p.targetX = 0;
    p.z = 0;
    p.fireInterval = 0.22;
    p.bulletCount = 1;
    p.damage = 15;
    p.hearts = 4.0;
    p.mesh.visible = true;

    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('victory-screen').classList.add('hidden');
    document.getElementById('boss-hud').classList.add('hidden');
    document.getElementById('boss-skills-bar').classList.add('hidden');

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

window.addEventListener('DOMContentLoaded', initThree);
