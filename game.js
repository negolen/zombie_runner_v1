/**
 * ZOMBIE RUNNER 3D - Multiplier Shoot 'em Up
 * Three.js WebGL Runner Game Engine (High-Performance Optimized)
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

    playCoin() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now);
        osc.frequency.setValueAtTime(1318.51, now + 0.07);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
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
// 10 BOSS TEMASI & ÖZELLİKLERİ
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
const GAME_STATE = { MENU: 0, PLAYING: 1, BOSS_FIGHT: 2, VICTORY: 3, GAMEOVER: 4 };

const Game = {
    state: GAME_STATE.MENU,
    level: 1,
    score: 0,
    trackLength: 420,
    trackWidth: 9,
    bossArenaZ: -340,
    worldGroup: null,

    player: {
        mesh: null,
        targetX: 0,
        x: 0,
        z: 0,
        speed: 16.2,
        runSpeed: 16.2,
        fireTimer: 0,
        fireInterval: 0.22,
        bulletCount: 1,
        damage: 15,
        bulletSpeed: 55,
        hearts: 3.0,
        maxHearts: 6.0,
        invulnerableTimer: 0,
        isShieldActive: false,
        shieldTimer: 0,
        shieldMesh: null,
        skill1Used: false,
        skill2Used: false,
        skill3Cooldown: 0,
        limbs: {}
    },

    bullets: [],
    enemies: [],
    gatePairs: [],
    sawBlades: [],
    barrels: [],
    damageNumbers: [],
    drops: [],
    particles: [],
    bossProjectiles: [],
    shockwaves: [],
    activeAnimations: [],
    boss: null,
    hitStopTimer: 0,

    isDragging: false,
    dragStartX: 0,
    playerStartX: 0,
    keys: { left: false, right: false }
};

// DOM Referans Önbelleği (Layout thrashing & tekrarlı sorgu önleme)
const DOM = {
    container: null,
    levelDisplay: null,
    levelLabel: null,
    scoreText: null,
    progressBarFill: null,
    progressPlayerIcon: null,
    hudHearts: null,
    bossHud: null,
    bossNameText: null,
    bossHpText: null,
    bossBarFill: null,
    bossSkillsBar: null,
    skill1Btn: null,
    skill2Btn: null,
    skill3Btn: null,
    statFirerateVal: null,
    statPowerVal: null,
    statBulletsVal: null,
    floatingBanner: null,
    startScreen: null,
    gameoverScreen: null,
    victoryScreen: null,
    gameoverScore: null,
    victoryScore: null,
    muteIcon: null
};

// ==========================================
// SHARED THREE.JS SINGLETONS (0 Memory Leak & Fast Batching)
// ==========================================
let BULLET_GEO, BULLET_MAT;
let PARTICLE_GEO;
let BOSS_PROJ_GEO, BOSS_PROJ_MAT;
let SHOCKWAVE_GEO, SHOCKWAVE_MAT;
let METEOR_GEO, METEOR_MAT;
let VALK_BODY_GEO, VALK_WING_GEO, VALK_MAT;
let HEALTH_UNIT_GEO, HEALTH_BG_MAT, HEALTH_FILL_MAT;
let SAW_BLADE_GEO, SAW_BLADE_MAT, SAW_TEETH_GEO, SAW_TEETH_MAT, SAW_STAND_GEO, SAW_STAND_MAT;
let BARREL_GEO, BARREL_MAT, STRIPE_GEO, STRIPE_MAT;
let DROP_OCTA_GEO, DROP_DODECA_GEO, DROP_BOX_GEO;

const particleMatCache = new Map();
function getParticleMaterial(color) {
    let mat = particleMatCache.get(color);
    if (!mat) {
        mat = new THREE.MeshBasicMaterial({ color });
        particleMatCache.set(color, mat);
    }
    return mat;
}

const dropMatCache = new Map();
function getDropMaterial(color) {
    let mat = dropMatCache.get(color);
    if (!mat) {
        mat = new THREE.MeshStandardMaterial({
            color,
            emissive: color,
            emissiveIntensity: 0.8,
            roughness: 0.2
        });
        dropMatCache.set(color, mat);
    }
    return mat;
}

const textTextureCache = new Map();
function getFloatingTextTexture(text, color) {
    const key = `${text}_${color}`;
    let cached = textTextureCache.get(key);
    if (cached) return { texture: cached, isCached: true };

    const canvas = document.createElement('canvas');
    canvas.width = 180;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 6;
    ctx.fillText(text, 90, 32);

    const texture = new THREE.CanvasTexture(canvas);
    if (textTextureCache.size < 60) {
        textTextureCache.set(key, texture);
        return { texture, isCached: true };
    }
    return { texture, isCached: false };
}

function initSharedResources() {
    BULLET_GEO = new THREE.SphereGeometry(0.15, 8, 8);
    BULLET_MAT = new THREE.MeshBasicMaterial({ color: 0x00f2fe });

    PARTICLE_GEO = new THREE.BoxGeometry(0.15, 0.15, 0.15);

    BOSS_PROJ_GEO = new THREE.SphereGeometry(0.4, 8, 8);
    BOSS_PROJ_MAT = new THREE.MeshBasicMaterial({ color: 0xef4444 });

    SHOCKWAVE_GEO = new THREE.RingGeometry(0.5, 1.2, 32);
    SHOCKWAVE_MAT = new THREE.MeshBasicMaterial({ color: 0xff0055, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });

    METEOR_GEO = new THREE.DodecahedronGeometry(1.4);
    METEOR_MAT = new THREE.MeshStandardMaterial({ color: 0xea580c, emissive: 0xff4400, emissiveIntensity: 0.8 });

    VALK_BODY_GEO = new THREE.CylinderGeometry(0.2, 0.4, 1.2);
    VALK_WING_GEO = new THREE.PlaneGeometry(1.2, 0.6);
    VALK_MAT = new THREE.MeshBasicMaterial({ color: 0xfde047 });

    HEALTH_UNIT_GEO = new THREE.PlaneGeometry(1, 1);
    HEALTH_BG_MAT = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
    HEALTH_FILL_MAT = new THREE.MeshBasicMaterial({ color: 0x22c55e, side: THREE.DoubleSide });

    SAW_BLADE_GEO = new THREE.CylinderGeometry(0.85, 0.85, 0.08, 16);
    SAW_BLADE_MAT = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
    SAW_TEETH_GEO = new THREE.RingGeometry(0.82, 0.98, 16);
    SAW_TEETH_MAT = new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide });
    SAW_STAND_GEO = new THREE.BoxGeometry(0.3, 0.35, 0.3);
    SAW_STAND_MAT = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });

    BARREL_GEO = new THREE.CylinderGeometry(0.45, 0.45, 0.9, 14);
    BARREL_MAT = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0x991b1b, emissiveIntensity: 0.4, roughness: 0.4, metalness: 0.6 });
    STRIPE_GEO = new THREE.CylinderGeometry(0.46, 0.46, 0.12, 14);
    STRIPE_MAT = new THREE.MeshBasicMaterial({ color: 0xfacc15 });

    DROP_OCTA_GEO = new THREE.OctahedronGeometry(0.32);
    DROP_DODECA_GEO = new THREE.DodecahedronGeometry(0.28);
    DROP_BOX_GEO = new THREE.BoxGeometry(0.35, 0.45, 0.1);
}

// Güvenli Three.js nesne ve bellek temizliği
function disposeHierarchy(obj) {
    if (!obj) return;
    obj.traverse((child) => {
        if (child.userData && child.userData.shared) return;
        if (child.geometry && !child.geometry.userData?.shared) {
            child.geometry.dispose();
        }
        if (child.material) {
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            mats.forEach(m => {
                if (!m.userData?.shared) {
                    if (m.map && !m.map.userData?.shared) m.map.dispose();
                    m.dispose();
                }
            });
        }
    });
}

// ==========================================
// THREE.JS KURULUMU & ATMOSFER
// ==========================================
let scene, camera, renderer, container;
const clock = new THREE.Clock();

function initThree() {
    container = document.getElementById('canvas-wrapper');
    DOM.container = container;
    DOM.levelDisplay = document.getElementById('level-display');
    DOM.levelLabel = document.getElementById('level-label');
    DOM.scoreText = document.getElementById('score-text');
    DOM.progressBarFill = document.getElementById('progress-bar-fill');
    DOM.progressPlayerIcon = document.getElementById('progress-player-icon');
    DOM.hudHearts = document.getElementById('hud-hearts');
    DOM.bossHud = document.getElementById('boss-hud');
    DOM.bossNameText = document.getElementById('boss-name-text');
    DOM.bossHpText = document.getElementById('boss-hp-text');
    DOM.bossBarFill = document.getElementById('boss-bar-fill');
    DOM.bossSkillsBar = document.getElementById('boss-skills-bar');
    DOM.skill1Btn = document.getElementById('skill-1-btn');
    DOM.skill2Btn = document.getElementById('skill-2-btn');
    DOM.skill3Btn = document.getElementById('skill-3-btn');
    DOM.statFirerateVal = document.getElementById('stat-firerate-val');
    DOM.statPowerVal = document.getElementById('stat-power-val');
    DOM.statBulletsVal = document.getElementById('stat-bullets-val');
    DOM.floatingBanner = document.getElementById('floating-banner');
    DOM.startScreen = document.getElementById('start-screen');
    DOM.gameoverScreen = document.getElementById('gameover-screen');
    DOM.victoryScreen = document.getElementById('victory-screen');
    DOM.gameoverScore = document.getElementById('gameover-score');
    DOM.victoryScore = document.getElementById('victory-score');
    DOM.muteIcon = document.getElementById('mute-icon');

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x15122e);
    scene.fog = new THREE.FogExp2(0x15122e, 0.008);

    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 600);
    camera.position.set(0, 5.5, 8.5);
    camera.lookAt(0, 1.5, -5);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xdbeafe, 0.85));
    scene.add(new THREE.HemisphereLight(0x818cf8, 0x1e1b4b, 0.75));

    const dirLight = new THREE.DirectionalLight(0xfff1f2, 1.0);
    dirLight.position.set(15, 35, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 120;
    dirLight.shadow.camera.left = -16;
    dirLight.shadow.camera.right = 16;
    dirLight.shadow.camera.top = 30;
    dirLight.shadow.camera.bottom = -30;
    scene.add(dirLight);

    initSharedResources();
    initHeartsUI();
    setupControls();
    buildPlayer();
    setupLevel(Game.level);

    window.addEventListener('resize', onWindowResize);
    animate();
}

function onWindowResize() {
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width > 0 && height > 0) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
}

// ==========================================
// KONTROLLER
// ==========================================
function setupControls() {
    const el = document.getElementById('game-container');

    const handlePointerDown = (e) => {
        if (Game.state !== GAME_STATE.PLAYING && Game.state !== GAME_STATE.BOSS_FIGHT) return;
        Game.isDragging = true;
        Game.dragStartX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
        Game.playerStartX = Game.player.targetX;
    };

    const handlePointerMove = (e) => {
        if (!Game.isDragging) return;
        const currentX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
        const diffX = currentX - Game.dragStartX;
        const containerWidth = (container && container.clientWidth) ? container.clientWidth : 360;
        const sensitivity = (Game.trackWidth / containerWidth) * 1.15;
        const newX = Game.playerStartX + diffX * sensitivity;
        const limit = (Game.trackWidth / 2) - 0.9;
        Game.player.targetX = THREE.MathUtils.clamp(newX, -limit, limit);
    };

    const handlePointerUp = () => { Game.isDragging = false; };

    el.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    el.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp, { passive: true });
    window.addEventListener('orientationchange', () => setTimeout(onWindowResize, 150));

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
        if (e.key === 'ArrowLeft' || e.code === 'KeyA') Game.keys.left = false;
        else if (e.key === 'ArrowRight' || e.code === 'KeyD') Game.keys.right = false;
    });

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
        DOM.muteIcon.textContent = isMuted ? '🔇' : '🔊';
    });

    DOM.skill1Btn.addEventListener('click', triggerSkill1);
    DOM.skill2Btn.addEventListener('click', triggerSkill2);
    DOM.skill3Btn.addEventListener('click', triggerSkill3);
}

// ==========================================
// DÜNYA & PİST OLUŞTURMA
// ==========================================
function buildWorld() {
    if (Game.worldGroup) {
        disposeHierarchy(Game.worldGroup);
        scene.remove(Game.worldGroup);
    }
    const worldGroup = new THREE.Group();

    // Ana Yol
    const roadGeo = new THREE.PlaneGeometry(Game.trackWidth, Game.trackLength);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x181e36, roughness: 0.6, metalness: 0.3 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0, -Game.trackLength / 2 + 10);
    road.receiveShadow = true;
    worldGroup.add(road);

    // Kesik neon şeritler
    const dashCount = Math.floor(Game.trackLength / 6);
    const dashGeo = new THREE.PlaneGeometry(0.2, 3);
    const dashMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    for (let i = 0; i < dashCount; i++) {
        const dash = new THREE.Mesh(dashGeo, dashMat);
        dash.rotation.x = -Math.PI / 2;
        dash.position.set(0, 0.02, 10 - i * 6);
        worldGroup.add(dash);
    }

    // Bordürler
    const curbGeo = new THREE.BoxGeometry(0.3, 0.45, Game.trackLength);
    const leftCurbMat = new THREE.MeshStandardMaterial({ color: 0x00f2fe, emissive: 0x00b4d8, emissiveIntensity: 0.7 });
    const leftCurb = new THREE.Mesh(curbGeo, leftCurbMat);
    leftCurb.position.set(-Game.trackWidth / 2, 0.22, -Game.trackLength / 2 + 10);
    worldGroup.add(leftCurb);

    const rightCurbMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, emissive: 0xe11d48, emissiveIntensity: 0.7 });
    const rightCurb = new THREE.Mesh(curbGeo, rightCurbMat);
    rightCurb.position.set(Game.trackWidth / 2, 0.22, -Game.trackLength / 2 + 10);
    worldGroup.add(rightCurb);

    // Neon Pylonlar
    const pylonGeo = new THREE.BoxGeometry(0.4, 2.5, 0.4);
    const pylonCount = Math.floor(Game.trackLength / 18);
    for (let i = 0; i < pylonCount; i++) {
        const zPos = 10 - i * 18;
        const pL = new THREE.Mesh(pylonGeo, leftCurbMat);
        pL.position.set(-Game.trackWidth / 2 - 0.8, 1.25, zPos);
        worldGroup.add(pL);

        const pR = new THREE.Mesh(pylonGeo, rightCurbMat);
        pR.position.set(Game.trackWidth / 2 + 0.8, 1.25, zPos);
        worldGroup.add(pR);
    }

    // Boss Arenası
    const arenaGeo = new THREE.CylinderGeometry(18, 18, 0.6, 32);
    const arenaMat = new THREE.MeshStandardMaterial({ color: 0x241738, roughness: 0.5, metalness: 0.4 });
    const arena = new THREE.Mesh(arenaGeo, arenaMat);
    arena.position.set(0, -0.1, Game.bossArenaZ);
    arena.receiveShadow = true;
    worldGroup.add(arena);

    const ringGeo = new THREE.RingGeometry(17.4, 18.2, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xff0055, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(0, 0.22, Game.bossArenaZ);
    worldGroup.add(ring);

    const gridHelper = new THREE.GridHelper(500, 70, 0x4338ca, 0x1e1b4b);
    gridHelper.position.set(0, -0.3, Game.bossArenaZ / 2);
    worldGroup.add(gridHelper);

    scene.add(worldGroup);
    Game.worldGroup = worldGroup;
}

// ==========================================
// KARAKTER & KALKAN
// ==========================================
function buildPlayer() {
    const playerGroup = new THREE.Group();

    const bodyGeo = new THREE.BoxGeometry(0.8, 1.0, 0.5);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3, metalness: 0.7 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.0;
    body.castShadow = true;
    playerGroup.add(body);

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

    const legGeo = new THREE.BoxGeometry(0.25, 0.7, 0.25);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });

    const leftLeg = new THREE.Mesh(legGeo, legMat);
    leftLeg.position.set(-0.25, 0.35, 0);
    leftLeg.castShadow = true;
    playerGroup.add(leftLeg);

    const rightLeg = leftLeg.clone();
    rightLeg.position.x = 0.25;
    playerGroup.add(rightLeg);

    const shieldOrbitGroup = new THREE.Group();
    shieldOrbitGroup.visible = false;
    const miniShieldGeo = new THREE.BoxGeometry(0.5, 0.8, 0.08);
    const miniShieldMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x10b981,
        emissiveIntensity: 0.8,
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
// SEVİYE KURULUMU
// ==========================================
function setupLevel(lvl) {
    clearLevelEntities();

    DOM.levelLabel.textContent = `BÖLÜM ${lvl}`;
    if (DOM.levelDisplay) DOM.levelDisplay.textContent = `LV. ${lvl}`;

    const gateCount = 7 + Math.floor((lvl - 1) / 3);
    const segmentDist = 42;
    const trackSpan = gateCount * segmentDist;
    Game.trackLength = trackSpan + 140;
    Game.bossArenaZ = -(trackSpan + 50);

    buildWorld();

    Game.player.skill1Used = false;
    Game.player.skill2Used = false;
    Game.player.skill3Cooldown = 0;
    Game.player.isShieldActive = false;
    Game.player.shieldTimer = 0;
    if (Game.player.shieldMesh) Game.player.shieldMesh.visible = false;

    const zPositions = [];
    for (let i = 0; i < gateCount; i++) {
        zPositions.push(-38 - (i * segmentDist));
    }

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
            if (negativeSide === 'left') { leftCfg = pickNeg(); rightCfg = pickPos(); }
            else { leftCfg = pickPos(); rightCfg = pickNeg(); }
        } else {
            leftCfg = pickPos();
            rightCfg = pickPos();
            while (rightCfg.label === leftCfg.label) rightCfg = pickPos();
        }

        createNoSkipGatePair(z, leftCfg, rightCfg);
    });

    const hpMult = 1 + (lvl - 1) * 0.35;

    // Kapı öncesi garantili zombiler
    zPositions.forEach(z => {
        const mobsBeforeGate = Math.floor(Math.random() * 2) + 2;
        const spacing = (Game.trackWidth - 2.0) / mobsBeforeGate;
        for (let i = 0; i < mobsBeforeGate; i++) {
            const x = -((Game.trackWidth - 2.0) / 2) + i * spacing + (Math.random() * 0.5 - 0.25);
            const zOffset = z + 12 + Math.random() * 5;
            const rand = Math.random();
            let type = 'normal';
            if (rand > 0.85) type = 'tank';
            else if (rand > 0.70) type = 'shield';
            else if (rand > 0.52) type = 'boomer';
            else if (rand > 0.32) type = 'fast';
            createZombie(x, zOffset, type, hpMult);
        }
    });

    // Pist boyu dalgalar
    for (let z = -18; z > Game.bossArenaZ + 20; z -= 14) {
        if (zPositions.some(gz => Math.abs(gz - z) < 15)) continue;

        const count = Math.floor(Math.random() * 3) + 1;
        const spacing = (Game.trackWidth - 2.5) / count;

        for (let i = 0; i < count; i++) {
            const x = -((Game.trackWidth - 2.5) / 2) + i * spacing + (Math.random() * 0.4 - 0.2);
            const rand = Math.random();
            let type = 'normal';
            if (rand > 0.85) type = 'tank';
            else if (rand > 0.70) type = 'shield';
            else if (rand > 0.52) type = 'boomer';
            else if (rand > 0.32) type = 'fast';
            createZombie(x, z, type, hpMult);
        }
    }

    if (lvl >= 5) {
        const sawCount = Math.min(6, 2 + Math.floor((lvl - 5) / 2));
        const spacing = (Math.abs(Game.bossArenaZ) - 80) / sawCount;
        for (let i = 0; i < sawCount; i++) {
            createSawBlade(-50 - i * spacing - (Math.random() * 8));
        }
    }

    const barrelCount = 3 + Math.floor(gateCount / 2);
    const bSpacing = (Math.abs(Game.bossArenaZ) - 70) / barrelCount;
    for (let i = 0; i < barrelCount; i++) {
        const bz = -35 - i * bSpacing + (Math.random() * 6 - 3);
        const bx = (Math.random() > 0.5 ? 1 : -1) * (1.2 + Math.random() * 1.8);
        createExplosiveBarrel(bx, bz);
    }

    createBoss(lvl);
    updateHUDStats();
    updateHeartsUI();
}

function clearLevelEntities() {
    Game.bullets.forEach(b => scene.remove(b.mesh));
    Game.bullets = [];

    Game.enemies.forEach(e => {
        disposeHierarchy(e.mesh);
        scene.remove(e.mesh);
        if (e.hpBarMesh) scene.remove(e.hpBarMesh);
    });
    Game.enemies = [];

    Game.gatePairs.forEach(pair => {
        disposeHierarchy(pair.left.mesh);
        disposeHierarchy(pair.right.mesh);
        scene.remove(pair.left.mesh);
        scene.remove(pair.right.mesh);
    });
    Game.gatePairs = [];

    Game.sawBlades.forEach(sb => scene.remove(sb.mesh));
    Game.sawBlades = [];

    Game.barrels.forEach(br => scene.remove(br.mesh));
    Game.barrels = [];

    Game.damageNumbers.forEach(dn => {
        scene.remove(dn.sprite);
        if (!dn.isCached && dn.sprite.material) {
            if (dn.sprite.material.map) dn.sprite.material.map.dispose();
            dn.sprite.material.dispose();
        }
    });
    Game.damageNumbers = [];

    Game.drops.forEach(d => scene.remove(d.mesh));
    Game.drops = [];

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
        disposeHierarchy(Game.boss.mesh);
        scene.remove(Game.boss.mesh);
        Game.boss = null;
    }
}

// ==========================================
// TEHLİKELER: BIÇAKLAR & VARİLLER
// ==========================================
function createSawBlade(z) {
    const group = new THREE.Group();
    group.userData.shared = true;

    const blade = new THREE.Mesh(SAW_BLADE_GEO, SAW_BLADE_MAT);
    blade.castShadow = true;
    group.add(blade);

    const teeth = new THREE.Mesh(SAW_TEETH_GEO, SAW_TEETH_MAT);
    teeth.rotation.x = -Math.PI / 2;
    teeth.position.y = 0.05;
    group.add(teeth);

    const stand = new THREE.Mesh(SAW_STAND_GEO, SAW_STAND_MAT);
    stand.position.y = -0.2;
    group.add(stand);

    group.position.set(0, 0.35, z);
    scene.add(group);

    Game.sawBlades.push({
        mesh: group,
        bladeMesh: blade,
        teethMesh: teeth,
        baseZ: z,
        time: Math.random() * 10,
        speed: 2.2 + Math.random() * 0.8,
        radius: 0.95
    });
}

function createExplosiveBarrel(x, z) {
    const group = new THREE.Group();
    group.userData.shared = true;

    const barrel = new THREE.Mesh(BARREL_GEO, BARREL_MAT);
    barrel.position.y = 0.45;
    barrel.castShadow = true;
    group.add(barrel);

    const stripeTop = new THREE.Mesh(STRIPE_GEO, STRIPE_MAT);
    stripeTop.position.y = 0.72;
    group.add(stripeTop);

    const stripeBot = stripeTop.clone();
    stripeBot.position.y = 0.18;
    group.add(stripeBot);

    group.position.set(x, 0, z);
    scene.add(group);

    Game.barrels.push({ mesh: group, x, z, radius: 0.55 });
}

function explodeBarrel(barrel, index) {
    sfx.playExplosion();
    const bx = barrel.mesh.position.x;
    const bz = barrel.mesh.position.z;

    createExplosion(bx, 0.8, bz, 0xff5500, 25);
    createFloatingText('💥 BOOM! +150', bx, 1.5, bz, '#f97316');

    for (let j = Game.enemies.length - 1; j >= 0; j--) {
        const e = Game.enemies[j];
        const distSq = (bx - e.mesh.position.x)**2 + (bz - e.mesh.position.z)**2;
        if (distSq <= 14.44) { // 3.8 * 3.8 = 14.44
            createExplosion(e.mesh.position.x, 1.0, e.mesh.position.z, e.originalColor);
            disposeHierarchy(e.mesh);
            scene.remove(e.mesh);
            if (e.hpBarMesh) scene.remove(e.hpBarMesh);
            Game.enemies.splice(j, 1);
            Game.score += 50;
        }
    }

    const pDistSq = (Game.player.x - bx)**2 + (Game.player.z - bz)**2;
    if (pDistSq < 1.96) { // 1.4 * 1.4 = 1.96
        takePlayerDamage(0.5);
    }

    Game.score += 150;
    DOM.scoreText.textContent = Game.score;
    scene.remove(barrel.mesh);
    Game.barrels.splice(index, 1);
}

// Uçuşan Hasar ve Puan Yazıları
function createFloatingText(text, x, y, z, color = '#ffffff') {
    const { texture, isCached } = getFloatingTextTexture(text, color);
    const mat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(mat);
    sprite.position.set(x, y, z);
    sprite.scale.set(1.8, 0.65, 1);
    scene.add(sprite);

    Game.damageNumbers.push({ sprite, vy: 2.2, life: 0.7, isCached });
}

// ==========================================
// NO-SKIP KAPILAR
// ==========================================
function createNoSkipGatePair(z, leftCfg, rightCfg) {
    const halfWidth = Game.trackWidth / 2;
    const gateWidth = halfWidth;
    const gateHeight = 3.6;

    const leftMesh = buildGateMesh(gateWidth, gateHeight, leftCfg);
    leftMesh.position.set(-gateWidth / 2, gateHeight / 2, z);
    scene.add(leftMesh);

    const rightMesh = buildGateMesh(gateWidth, gateHeight, rightCfg);
    rightMesh.position.set(gateWidth / 2, gateHeight / 2, z);
    scene.add(rightMesh);

    Game.gatePairs.push({
        z,
        triggered: false,
        left: { mesh: leftMesh, config: leftCfg },
        right: { mesh: rightMesh, config: rightCfg }
    });
}

function buildGateMesh(w, h, info) {
    const group = new THREE.Group();
    const color = info.isPos ? 0x00f2fe : 0xef4444;

    const frameGeo = new THREE.BoxGeometry(w, h, 0.3);
    const frameMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.85
    });

    const fieldGeo = new THREE.PlaneGeometry(w - 0.2, h - 0.4);
    const fieldMat = new THREE.MeshBasicMaterial({
        color,
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
// ZOMBİLER (DÜŞMANLAR)
// ==========================================
function createZombie(x, z, type, hpMult) {
    const group = new THREE.Group();

    let hp = 30, speed = 2.2, color = 0x22c55e, scale = 1.0;
    let shieldMesh = null, shieldHp = 0;

    if (type === 'fast') {
        hp = 20; speed = 4.5; color = 0xf59e0b; scale = 0.9;
    } else if (type === 'tank') {
        hp = 110; speed = 1.1; color = 0x7c3aed; scale = 1.6;
    } else if (type === 'boomer') {
        hp = 45; speed = 2.4; color = 0x10b981; scale = 1.15;
    } else if (type === 'shield') {
        hp = 70; speed = 1.6; color = 0x475569; scale = 1.15;
        shieldHp = Math.round(50 * hpMult);
    }

    hp = Math.round(hp * hpMult);

    const bodyMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.7,
        emissive: type === 'boomer' ? 0x059669 : 0x000000,
        emissiveIntensity: type === 'boomer' ? 0.4 : 0
    });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.7 * scale, 0.9 * scale, 0.4 * scale), bodyMat);
    body.position.y = 0.9 * scale;
    body.castShadow = true;
    group.add(body);

    if (type === 'boomer') {
        const belly = new THREE.Mesh(new THREE.SphereGeometry(0.32 * scale, 8, 8), new THREE.MeshBasicMaterial({ color: 0x84cc16 }));
        belly.position.set(0, 0.85 * scale, 0.22 * scale);
        group.add(belly);
    }

    if (type === 'shield') {
        const shieldGroup = new THREE.Group();
        const sMesh = new THREE.Mesh(new THREE.BoxGeometry(0.85 * scale, 1.15 * scale, 0.12 * scale), new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85, roughness: 0.25 }));
        shieldGroup.add(sMesh);

        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.86 * scale, 0.18 * scale, 0.13 * scale), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
        stripe.position.y = 0.2 * scale;
        shieldGroup.add(stripe);

        shieldGroup.position.set(0, 0.9 * scale, 0.38 * scale);
        group.add(shieldGroup);
        shieldMesh = shieldGroup;
    }

    const headMat = new THREE.MeshStandardMaterial({ color: type === 'boomer' ? 0x10b981 : 0x15803d });
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.5 * scale, 0.5 * scale, 0.5 * scale), headMat);
    head.position.y = 1.6 * scale;
    head.castShadow = true;
    group.add(head);

    const eyeMat = new THREE.MeshBasicMaterial({ color: type === 'boomer' ? 0xfacc15 : 0xef4444 });
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
        type,
        maxHp: hp,
        hp,
        speed,
        bodyMat,
        originalColor: color,
        scale,
        radius: 0.6 * scale,
        animTime: Math.random() * 10,
        shieldMesh,
        shieldHp
    });
}

function build3DHealthBar(width) {
    const group = new THREE.Group();
    group.userData.shared = true;

    const bg = new THREE.Mesh(HEALTH_UNIT_GEO, HEALTH_BG_MAT);
    bg.scale.set(width, 0.14, 1);
    group.add(bg);

    const fill = new THREE.Mesh(HEALTH_UNIT_GEO, HEALTH_FILL_MAT);
    fill.scale.set(width, 0.12, 1);
    fill.position.z = 0.01;
    group.add(fill);

    group.fillMesh = fill;
    group.maxWidth = width;
    return group;
}

function spawnDrop(x, z) {
    const rand = Math.random();
    let type = 'score';
    let color = 0xfbbf24;
    let geo = DROP_OCTA_GEO;

    if (rand < 0.25) {
        type = 'heart';
        color = 0xef4444;
        geo = DROP_DODECA_GEO;
    } else if (rand < 0.40) {
        type = 'shield';
        color = 0x10b981;
        geo = DROP_BOX_GEO;
    }

    const mesh = new THREE.Mesh(geo, getDropMaterial(color));
    mesh.userData.shared = true;
    mesh.position.set(x, 0.6, z);
    mesh.castShadow = true;
    scene.add(mesh);

    Game.drops.push({ mesh, type, color, time: Math.random() * 10 });
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

    const bodyMat = new THREE.MeshStandardMaterial({ color: theme.color, roughness: 0.5, metalness: 0.4 });

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

    const shoulderGeo = new THREE.BoxGeometry(0.3 * scale, 0.3 * scale, 0.4 * scale);
    const shoulderL = new THREE.Mesh(shoulderGeo, hornMat);
    shoulderL.position.set(-0.6 * scale, 1.4 * scale, 0);
    const shoulderR = shoulderL.clone();
    shoulderR.position.x = 0.6 * scale;
    group.add(shoulderL);
    group.add(shoulderR);

    const armGeo = new THREE.BoxGeometry(0.28 * scale, 0.85 * scale, 0.28 * scale);
    const armMat = new THREE.MeshStandardMaterial({ color: theme.color, roughness: 0.5 });

    const leftArmPivot = new THREE.Group();
    leftArmPivot.position.set(-0.65 * scale, 1.4 * scale, 0);
    const leftArm = new THREE.Mesh(armGeo, armMat);
    leftArm.position.y = -0.4 * scale;
    leftArm.castShadow = true;
    leftArmPivot.add(leftArm);
    group.add(leftArmPivot);

    const rightArmPivot = new THREE.Group();
    rightArmPivot.position.set(0.65 * scale, 1.4 * scale, 0);
    const rightArm = new THREE.Mesh(armGeo, armMat);
    rightArm.position.y = -0.4 * scale;
    rightArm.castShadow = true;
    rightArmPivot.add(rightArm);
    group.add(rightArmPivot);

    const legGeo = new THREE.BoxGeometry(0.32 * scale, 0.7 * scale, 0.32 * scale);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });

    const leftLegPivot = new THREE.Group();
    leftLegPivot.position.set(-0.28 * scale, 0.45 * scale, 0);
    const leftLeg = new THREE.Mesh(legGeo, legMat);
    leftLeg.position.y = -0.35 * scale;
    leftLeg.castShadow = true;
    leftLegPivot.add(leftLeg);
    group.add(leftLegPivot);

    const rightLegPivot = new THREE.Group();
    rightLegPivot.position.set(0.28 * scale, 0.45 * scale, 0);
    const rightLeg = new THREE.Mesh(legGeo, legMat);
    rightLeg.position.y = -0.35 * scale;
    rightLeg.castShadow = true;
    rightLegPivot.add(rightLeg);
    group.add(rightLegPivot);

    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.28 * scale), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
    core.position.set(0, 1.15 * scale, 0.38 * scale);
    group.add(core);

    group.position.set(0, 0, Game.bossArenaZ - 4);
    scene.add(group);

    DOM.bossNameText.textContent = `🧟‍♂️ ${theme.name}`;

    Game.boss = {
        mesh: group,
        weakspotMesh: core,
        bodyMat,
        theme,
        maxHp,
        hp: maxHp,
        scale,
        radius: 1.8,
        active: false,
        shootTimer: 0,
        pulseTimer: 0,
        walkTime: 0,
        strafeTimer: 0,
        strafeTargetX: 0,
        limbs: {
            leftArm: leftArmPivot,
            rightArm: rightArmPivot,
            leftLeg: leftLegPivot,
            rightLeg: rightLegPivot,
            head
        }
    };
}

// ==========================================
// BOSS SALDIRILARI
// ==========================================
function fireBossProjectile() {
    if (!Game.boss || !Game.boss.active) return;
    const bPos = Game.boss.mesh.position;
    const p = Game.player;

    const projMesh = new THREE.Mesh(BOSS_PROJ_GEO, BOSS_PROJ_MAT);
    projMesh.userData.shared = true;
    projMesh.position.set(bPos.x, 1.5, bPos.z + 2);
    scene.add(projMesh);

    const dx = p.x - bPos.x;
    const dz = p.z - bPos.z;
    const dist = Math.hypot(dx, dz) || 1;
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

    const waveMesh = new THREE.Mesh(SHOCKWAVE_GEO, SHOCKWAVE_MAT);
    waveMesh.userData.shared = true;
    waveMesh.rotation.x = -Math.PI / 2;
    waveMesh.position.set(bPos.x, 0.15, bPos.z);
    scene.add(waveMesh);

    Game.shockwaves.push({
        mesh: waveMesh,
        currentRadius: 1.2,
        maxRadius: 38,
        speed: 26,
        hasHitPlayer: false
    });

    sfx.playExplosion();
}

// ==========================================
// BOSS ÖZEL SKİLLERİ
// ==========================================
function triggerSkill1() {
    if (Game.state !== GAME_STATE.BOSS_FIGHT || !Game.boss || !Game.boss.active) return;
    if (Game.player.skill1Used) return;

    Game.player.skill1Used = true;
    DOM.skill1Btn.classList.add('used');
    showBanner('☄️ METEOR ÇAĞRILDI! ☄️');

    const bPos = Game.boss.mesh.position;
    const meteor = new THREE.Mesh(METEOR_GEO, METEOR_MAT);
    meteor.userData.shared = true;
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
            Game.hitStopTimer = 0.055;
            createExplosion(bPos.x, 2.5, bPos.z, 0xff4400, 35);
            createFloatingText(`💥 -${dmg}`, bPos.x, 3.2, bPos.z, '#ef4444');
            if (Game.boss.hp <= 0) triggerVictory();
        }
    });
}

function triggerSkill2() {
    if (Game.state !== GAME_STATE.BOSS_FIGHT) return;
    if (Game.player.skill2Used) {
        showBanner('👼 Valkyrie bu turda kullanıldı!', false);
        return;
    }
    if (Game.player.hearts >= 4.0) {
        showBanner('Canınız zaten 4 veya daha fazla!', false);
        return;
    }

    sfx.playHeal();
    showBanner('👼 VALKYRIE GELDİ: CAN FULLENDİ! 👼');

    const p = Game.player;
    const valkGroup = new THREE.Group();
    valkGroup.userData.shared = true;

    const angelBody = new THREE.Mesh(VALK_BODY_GEO, VALK_MAT);
    valkGroup.add(angelBody);

    const wingL = new THREE.Mesh(VALK_WING_GEO, VALK_MAT);
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

    Game.player.skill2Used = true;
    if (DOM.skill2Btn) DOM.skill2Btn.classList.add('used');
    Game.player.hearts = 4.0;
    updateHeartsUI();
    updateSkillsUI();
}

function triggerSkill3() {
    if (Game.state !== GAME_STATE.BOSS_FIGHT) return;
    if (Game.player.skill3Cooldown > 0 || Game.player.isShieldActive) return;

    sfx.playShield();
    showBanner('🛡️ DÖNEN KALKANLAR AKTİF! (%50 DEF) 🛡️');

    Game.player.isShieldActive = true;
    Game.player.shieldTimer = 2.0;
    Game.player.skill3Cooldown = 8.0;

    if (Game.player.shieldMesh) Game.player.shieldMesh.visible = true;
    DOM.skill3Btn.classList.add('active-shield');
}

// ==========================================
// KALPLER & HASAR
// ==========================================
let heartSlots = [];
function initHeartsUI() {
    DOM.hudHearts.innerHTML = '';
    heartSlots = [];
    for (let i = 0; i < 6; i++) {
        const slot = document.createElement('span');
        slot.className = 'heart-slot';
        DOM.hudHearts.appendChild(slot);
        heartSlots.push(slot);
    }
}

function takePlayerDamage(amount) {
    const p = Game.player;
    if (p.invulnerableTimer > 0) return;

    const finalDamage = p.isShieldActive ? amount * 0.5 : amount;
    p.hearts = Math.max(0, p.hearts - finalDamage);
    p.invulnerableTimer = 0.8;

    sfx.playHurt();
    updateHeartsUI();
    updateSkillsUI();

    DOM.hudHearts.classList.add('heart-shake');
    setTimeout(() => DOM.hudHearts.classList.remove('heart-shake'), 400);

    if (p.mesh && p.limbs.bodyMat) {
        p.limbs.bodyMat.color.setHex(0xff0000);
        setTimeout(() => {
            if (p.limbs && p.limbs.bodyMat) p.limbs.bodyMat.color.setHex(0x0284c7);
        }, 120);
    }

    if (p.hearts <= 0) triggerGameOver();
}

function updateHeartsUI() {
    const hearts = Game.player.hearts;
    for (let i = 0; i < 6; i++) {
        const slot = heartSlots[i];
        if (!slot) continue;
        const val = i + 1;
        if (hearts >= val) {
            slot.textContent = '❤️';
            slot.className = 'heart-slot full';
        } else if (hearts >= val - 0.5) {
            slot.textContent = '💔';
            slot.className = 'heart-slot half';
        } else {
            slot.textContent = '🖤';
            slot.className = 'heart-slot empty';
        }
    }
}

function updateSkillsUI() {
    const p = Game.player;
    const btn1 = DOM.skill1Btn;
    const btn2 = DOM.skill2Btn;
    const btn3 = DOM.skill3Btn;

    btn1.classList.toggle('used', p.skill1Used);

    if (p.skill2Used) {
        btn2.classList.add('used');
        btn2.classList.remove('disabled');
    } else if (p.hearts < 4.0) {
        btn2.classList.remove('disabled', 'used');
    } else {
        btn2.classList.add('disabled');
        btn2.classList.remove('used');
    }

    if (p.skill3Cooldown > 0 && !p.isShieldActive) {
        btn3.classList.add('disabled');
        btn3.querySelector('.skill-sub').textContent = `${Math.ceil(p.skill3Cooldown)}s`;
    } else {
        btn3.classList.remove('disabled');
        btn3.querySelector('.skill-sub').textContent = '-%50 HASAR';
    }
}

// ==========================================
// MERMİLER & PATLAMALAR
// ==========================================
function shootBullets() {
    const p = Game.player;
    sfx.playLaser();

    const count = p.bulletCount;
    const spreads = [];

    if (count === 1) spreads.push(0);
    else if (count === 2) spreads.push(-0.3, 0.3);
    else if (count === 3) spreads.push(-0.5, 0, 0.5);
    else if (count >= 4) spreads.push(-0.7, -0.25, 0.25, 0.7);

    for (let i = 0; i < spreads.length; i++) {
        const offset = spreads[i];
        const bullet = new THREE.Mesh(BULLET_GEO, BULLET_MAT);
        bullet.userData.shared = true;
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
    }
}

function createExplosion(x, y, z, color = 0x22c55e, count = 12) {
    const pMat = getParticleMaterial(color);

    for (let i = 0; i < count; i++) {
        const p = new THREE.Mesh(PARTICLE_GEO, pMat);
        p.userData.shared = true;
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

let bannerTimer = null;
function showBanner(text, isPos = true) {
    const banner = DOM.floatingBanner;
    banner.textContent = text;
    banner.className = `floating-banner show ${isPos ? 'positive' : 'negative'}`;
    if (bannerTimer) clearTimeout(bannerTimer);
    bannerTimer = setTimeout(() => {
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
        showBanner(config.isPos ? `⚡ +${config.val} EKSTRA MERMİ!` : '⚠️ MERMİ AZALDI!', config.isPos);
    } else if (config.type === 'damage') {
        p.damage = Math.max(5, p.damage + config.val);
        showBanner(config.isPos ? `💥 +${config.val} HASAR GÜCÜ!` : '⚠️ HASAR GÜCÜ DÜŞTÜ!', config.isPos);
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
    DOM.statFirerateVal.textContent = (0.22 / p.fireInterval).toFixed(1) + 'x';
    DOM.statPowerVal.textContent = `${p.damage} DMG`;
    DOM.statBulletsVal.textContent = `${p.bulletCount}x`;
    DOM.scoreText.textContent = Game.score;
}

// ==========================================
// ANA OYUN DÖNGÜSÜ & UPDATE
// ==========================================
function update(delta) {
    if (Game.state !== GAME_STATE.PLAYING && Game.state !== GAME_STATE.BOSS_FIGHT) return;

    if (Game.hitStopTimer > 0) {
        Game.hitStopTimer -= delta;
        return;
    }

    const p = Game.player;

    if (p.invulnerableTimer > 0) {
        p.invulnerableTimer -= delta;
        p.mesh.visible = Math.floor(clock.getElapsedTime() * 16) % 2 === 0;
    } else {
        p.mesh.visible = true;
    }

    if (p.isShieldActive) {
        p.shieldTimer -= delta;
        if (p.shieldMesh) p.shieldMesh.rotation.y += delta * 7;
        if (p.shieldTimer <= 0) {
            p.isShieldActive = false;
            if (p.shieldMesh) p.shieldMesh.visible = false;
            DOM.skill3Btn.classList.remove('active-shield');
        }
    }

    if (p.skill3Cooldown > 0) {
        p.skill3Cooldown -= delta;
        if (p.skill3Cooldown <= 0) {
            p.skill3Cooldown = 0;
            updateSkillsUI();
        }
    }

    if (Game.state === GAME_STATE.PLAYING) {
        p.z -= p.speed * delta;
        if (p.z <= Game.bossArenaZ + 20) {
            enterBossFight();
        }
    }

    const keyboardSpeed = 16;
    const limit = (Game.trackWidth / 2) - 0.9;
    if (Game.keys.left) p.targetX = Math.max(-limit, p.targetX - keyboardSpeed * delta);
    if (Game.keys.right) p.targetX = Math.min(limit, p.targetX + keyboardSpeed * delta);

    p.x += (p.targetX - p.x) * 18 * delta;
    p.mesh.position.set(p.x, 0, p.z);

    const runCycle = Math.sin(clock.getElapsedTime() * 14);
    p.limbs.leftLeg.rotation.x = runCycle * 0.6;
    p.limbs.rightLeg.rotation.x = -runCycle * 0.6;
    p.limbs.leftArm.rotation.x = -runCycle * 0.4;
    p.limbs.rightArm.rotation.x = runCycle * 0.4;

    camera.position.x += (p.x * 0.6 - camera.position.x) * 8 * delta;
    camera.position.y = 5.2;
    camera.position.z = p.z + 8.5;
    camera.lookAt(p.x * 0.3, 1.4, p.z - 7);

    p.fireTimer += delta;
    if (p.fireTimer >= p.fireInterval) {
        p.fireTimer = 0;
        shootBullets();
    }

    // Mermiler ve Çarpışmalar (Karesel mesafe kontrolü ile sıfır Math.sqrt maliyeti)
    for (let i = Game.bullets.length - 1; i >= 0; i--) {
        const b = Game.bullets[i];
        b.z -= b.speed * delta;
        b.x += b.vx * delta;
        b.mesh.position.set(b.x, b.y, b.z);

        let bulletRemoved = false;

        // Patlayan Variller
        for (let k = Game.barrels.length - 1; k >= 0; k--) {
            const br = Game.barrels[k];
            const distSq = (b.x - br.x)**2 + (b.z - br.z)**2;
            const hitR = br.radius + 0.35;
            if (distSq < hitR * hitR) {
                scene.remove(b.mesh);
                Game.bullets.splice(i, 1);
                bulletRemoved = true;
                explodeBarrel(br, k);
                Game.hitStopTimer = 0.04;
                break;
            }
        }

        if (bulletRemoved) continue;

        // Zombiler
        for (let j = Game.enemies.length - 1; j >= 0; j--) {
            const e = Game.enemies[j];
            const dx = b.x - e.mesh.position.x;
            const dz = b.z - e.mesh.position.z;
            const distSq = dx * dx + dz * dz;
            const hitR = e.radius + 0.3;

            if (distSq < hitR * hitR) {
                if (e.type === 'shield' && Math.abs(dx) < 0.36 && e.shieldHp > 0) {
                    e.shieldHp -= b.damage;
                    createExplosion(b.x, 1.0 * e.scale, b.z, 0x38bdf8, 8);
                    createFloatingText('🛡️ BLOK!', e.mesh.position.x, 2.0 * e.scale, e.mesh.position.z, '#38bdf8');
                    sfx.playHit();
                    if (e.shieldHp <= 0) {
                        if (e.shieldMesh) e.mesh.remove(e.shieldMesh);
                        createFloatingText('💥 KALKAN KIRILDI!', e.mesh.position.x, 2.4 * e.scale, e.mesh.position.z, '#facc15');
                    }
                    scene.remove(b.mesh);
                    Game.bullets.splice(i, 1);
                    bulletRemoved = true;
                    break;
                }

                sfx.playHit();
                e.hp -= b.damage;

                e.bodyMat.color.setHex(0xffffff);
                setTimeout(() => {
                    if (e && e.bodyMat) e.bodyMat.color.setHex(e.originalColor);
                }, 40);

                if (e.hpBarMesh) {
                    const pct = Math.max(0, e.hp / e.maxHp);
                    e.hpBarMesh.fillMesh.scale.x = pct * e.hpBarMesh.maxWidth;
                    e.hpBarMesh.fillMesh.position.x = -e.hpBarMesh.maxWidth * (1 - pct) / 2;
                }

                if (e.hp <= 0) {
                    createExplosion(e.mesh.position.x, 1.0, e.mesh.position.z, e.originalColor);

                    if (e.type === 'boomer') {
                        sfx.playExplosion();
                        createExplosion(e.mesh.position.x, 1.2, e.mesh.position.z, 0x10b981, 28);
                        createFloatingText('☣️ TOXIC BLAST! +100', e.mesh.position.x, 2.2, e.mesh.position.z, '#10b981');
                        Game.score += 50;

                        for (let k = Game.enemies.length - 1; k >= 0; k--) {
                            const other = Game.enemies[k];
                            if (other === e) continue;
                            const dBoomerSq = (other.mesh.position.x - e.mesh.position.x)**2 + (other.mesh.position.z - e.mesh.position.z)**2;
                            if (dBoomerSq <= 12.96) { // 3.6 * 3.6 = 12.96
                                other.hp -= 80;
                                createExplosion(other.mesh.position.x, 0.8, other.mesh.position.z, 0x22c55e, 10);
                                if (other.hpBarMesh) {
                                    const oPct = Math.max(0, other.hp / other.maxHp);
                                    other.hpBarMesh.fillMesh.scale.x = oPct * other.hpBarMesh.maxWidth;
                                    other.hpBarMesh.fillMesh.position.x = -other.hpBarMesh.maxWidth * (1 - oPct) / 2;
                                }
                                if (other.hp <= 0) {
                                    disposeHierarchy(other.mesh);
                                    scene.remove(other.mesh);
                                    if (other.hpBarMesh) scene.remove(other.hpBarMesh);
                                    Game.enemies.splice(k, 1);
                                    Game.score += 50;
                                }
                            }
                        }
                    } else {
                        createFloatingText('+50', e.mesh.position.x, 1.8, e.mesh.position.z, '#22c55e');
                    }

                    disposeHierarchy(e.mesh);
                    scene.remove(e.mesh);
                    if (e.hpBarMesh) scene.remove(e.hpBarMesh);

                    if (Math.random() < 0.38) {
                        spawnDrop(e.mesh.position.x, e.mesh.position.z);
                    }

                    Game.enemies.splice(j, 1);
                    Game.score += 50;
                    DOM.scoreText.textContent = Game.score;
                }

                scene.remove(b.mesh);
                Game.bullets.splice(i, 1);
                bulletRemoved = true;
                break;
            }
        }

        if (bulletRemoved) continue;

        // Boss
        if (Game.boss && Game.boss.active) {
            const boss = Game.boss;
            const bdx = b.x - boss.mesh.position.x;
            const bdz = b.z - boss.mesh.position.z;
            const bdistSq = bdx * bdx + bdz * bdz;
            const bHitR = boss.radius + 0.4;

            if (bdistSq < bHitR * bHitR) {
                sfx.playHit();
                const isWeakspot = Math.abs(bdx) < 0.65;
                const finalDamage = isWeakspot ? Math.round(b.damage * 2.5) : b.damage;

                if (isWeakspot) {
                    createExplosion(boss.mesh.position.x, 2.0 * boss.scale, boss.mesh.position.z, 0xfacc15, 12);
                    createFloatingText(`CRIT! -${finalDamage}`, boss.mesh.position.x, 2.8 * boss.scale, boss.mesh.position.z, '#facc15');
                    sfx.playPowerup();
                } else {
                    createFloatingText(`-${finalDamage}`, boss.mesh.position.x + (Math.random()-0.5)*0.8, 2.2 * boss.scale, boss.mesh.position.z, '#ffffff');
                }

                boss.hp -= finalDamage;
                updateBossHUD();

                boss.bodyMat.color.setHex(0xffffff);
                setTimeout(() => {
                    if (boss && boss.bodyMat) boss.bodyMat.color.setHex(boss.theme.color);
                }, 40);

                scene.remove(b.mesh);
                Game.bullets.splice(i, 1);
                bulletRemoved = true;

                if (boss.hp <= 0) triggerVictory();
            }
        }

        if (bulletRemoved) continue;

        if (b.z < p.z - 65) {
            scene.remove(b.mesh);
            Game.bullets.splice(i, 1);
        }
    }

    // Zombileri Güncelle
    for (let i = Game.enemies.length - 1; i >= 0; i--) {
        const e = Game.enemies[i];
        e.mesh.position.z += e.speed * delta;
        e.animTime += delta * 6;
        e.mesh.rotation.y = Math.sin(e.animTime) * 0.2;

        if (e.hpBarMesh) {
            e.hpBarMesh.position.set(e.mesh.position.x, 2.2 * e.scale, e.mesh.position.z);
            e.hpBarMesh.lookAt(camera.position);
        }

        const zdistSq = (p.x - e.mesh.position.x)**2 + (p.z - e.mesh.position.z)**2;
        if (zdistSq < 0.81) { // 0.9 * 0.9 = 0.81
            if (p.invulnerableTimer <= 0) {
                createExplosion(e.mesh.position.x, 1.0, e.mesh.position.z, e.originalColor);
                disposeHierarchy(e.mesh);
                scene.remove(e.mesh);
                if (e.hpBarMesh) scene.remove(e.hpBarMesh);
                Game.enemies.splice(i, 1);
                takePlayerDamage(1.0);
            }
            continue;
        }

        if (e.mesh.position.z > p.z + 10) {
            disposeHierarchy(e.mesh);
            scene.remove(e.mesh);
            if (e.hpBarMesh) scene.remove(e.hpBarMesh);
            Game.enemies.splice(i, 1);
        }
    }

    // Kapılar (No-Skip)
    Game.gatePairs.forEach(pair => {
        if (!pair.triggered && p.z <= pair.z && p.z >= pair.z - 2.5) {
            pair.triggered = true;
            const chosen = (p.x < 0) ? pair.left : pair.right;
            const unchosen = (p.x < 0) ? pair.right : pair.left;

            applyGateUpgrade(chosen.config);
            chosen.mesh.scale.set(1.2, 1.2, 1.2);
            unchosen.mesh.visible = false;
            setTimeout(() => { chosen.mesh.visible = false; }, 180);
        }
    });

    // Düşen Eşyalar
    for (let i = Game.drops.length - 1; i >= 0; i--) {
        const d = Game.drops[i];
        d.time += delta * 4;
        d.mesh.rotation.y += delta * 3;
        d.mesh.rotation.x = Math.sin(d.time * 0.5) * 0.2;
        d.mesh.position.y = 0.55 + Math.sin(d.time) * 0.15;

        const distSq = (p.x - d.mesh.position.x)**2 + (p.z - d.mesh.position.z)**2;
        if (distSq < 1.69) { // 1.3 * 1.3 = 1.69
            if (d.type === 'score') {
                Game.score += 200;
                DOM.scoreText.textContent = Game.score;
                sfx.playCoin();
                showBanner('⭐ +200 BONUS SKOR!');
            } else if (d.type === 'heart') {
                p.hearts = Math.min(6.0, p.hearts + 0.5);
                updateHeartsUI();
                updateSkillsUI();
                sfx.playHeal();
                showBanner('❤️ +0.5 KALP!');
            } else if (d.type === 'shield') {
                p.isShieldActive = true;
                p.shieldTimer = 2.5;
                if (p.shieldMesh) p.shieldMesh.visible = true;
                sfx.playShield();
                showBanner('🛡️ DEFANS KALKANI AKTİF!');
            }

            createExplosion(d.mesh.position.x, 0.8, d.mesh.position.z, d.color, 8);
            scene.remove(d.mesh);
            Game.drops.splice(i, 1);
            continue;
        }

        if (d.mesh.position.z > p.z + 12) {
            scene.remove(d.mesh);
            Game.drops.splice(i, 1);
        }
    }

    // Döner Bıçaklar
    for (let i = 0; i < Game.sawBlades.length; i++) {
        const sb = Game.sawBlades[i];
        sb.time += delta;
        const currentX = Math.sin(sb.time * sb.speed) * (Game.trackWidth / 2 - 1.2);
        sb.mesh.position.x = currentX;
        sb.bladeMesh.rotation.y += delta * 25;
        sb.teethMesh.rotation.z += delta * 25;

        const distSq = (p.x - currentX)**2 + (p.z - sb.baseZ)**2;
        if (distSq < 1.3225) { // 1.15 * 1.15 = 1.3225
            if (p.invulnerableTimer <= 0) {
                createExplosion(currentX, 0.5, sb.baseZ, 0xef4444, 14);
                takePlayerDamage(0.5);
                showBanner('⚠️ DÖNER BIÇAK! (-0.5 KALP)', false);
            }
        }
    }

    // Varillerle Karakter Teması
    for (let i = Game.barrels.length - 1; i >= 0; i--) {
        const br = Game.barrels[i];
        const pDistSq = (p.x - br.x)**2 + (p.z - br.z)**2;
        if (pDistSq < 0.9025) { // 0.95 * 0.95 = 0.9025
            explodeBarrel(br, i);
            break;
        }
    }

    // Uçuşan Hasar Rakamları
    for (let i = Game.damageNumbers.length - 1; i >= 0; i--) {
        const dn = Game.damageNumbers[i];
        dn.life -= delta;
        dn.sprite.position.y += dn.vy * delta;
        dn.sprite.material.opacity = Math.max(0, dn.life / 0.7);
        if (dn.life <= 0) {
            scene.remove(dn.sprite);
            if (!dn.isCached && dn.sprite.material) {
                if (dn.sprite.material.map) dn.sprite.material.map.dispose();
                dn.sprite.material.dispose();
            }
            Game.damageNumbers.splice(i, 1);
        }
    }

    // Boss Hareketi & Animasyonları
    if (Game.boss && Game.boss.active) {
        const boss = Game.boss;
        boss.walkTime = (boss.walkTime || 0) + delta * 4.5;
        boss.strafeTimer = (boss.strafeTimer || 0) + delta;

        if (boss.weakspotMesh) {
            boss.weakspotMesh.rotation.y += delta * 4;
            boss.weakspotMesh.rotation.z += delta * 3;
            const pulse = (0.28 + Math.sin(clock.getElapsedTime() * 8) * 0.06) * boss.scale;
            boss.weakspotMesh.scale.set(pulse, pulse, pulse);
        }

        if (boss.strafeTimer > 2.2) {
            boss.strafeTimer = 0;
            boss.strafeTargetX = (Math.random() - 0.5) * (Game.trackWidth - 3.0);
        }

        const targetX = boss.strafeTargetX * 0.6 + p.x * 0.4;
        boss.mesh.position.x += (targetX - boss.mesh.position.x) * 2.2 * delta;

        const stepBob = Math.abs(Math.sin(boss.walkTime * 2)) * 0.35;
        boss.mesh.position.y = stepBob;
        boss.mesh.rotation.z = Math.sin(boss.walkTime) * 0.08;

        if (boss.limbs) {
            if (boss.shootTimer >= 2.2) {
                boss.limbs.leftArm.rotation.x = -1.4;
                boss.limbs.rightArm.rotation.x = -1.4;
                boss.mesh.rotation.x = -0.15;
            } else if (boss.pulseTimer >= 3.1) {
                boss.mesh.position.y = stepBob + 1.2;
                boss.limbs.leftArm.rotation.x = -1.9;
                boss.limbs.rightArm.rotation.x = -1.9;
                boss.mesh.rotation.x = 0.1;
            } else {
                boss.mesh.rotation.x = 0;
                boss.limbs.leftArm.rotation.x = Math.sin(boss.walkTime) * 0.7;
                boss.limbs.rightArm.rotation.x = -Math.sin(boss.walkTime) * 0.7;
                boss.limbs.leftLeg.rotation.x = -Math.sin(boss.walkTime) * 0.4;
                boss.limbs.rightLeg.rotation.x = Math.sin(boss.walkTime) * 0.4;
            }
        }

        boss.shootTimer += delta;
        if (boss.shootTimer >= 2.8) {
            boss.shootTimer = 0;
            fireBossProjectile();
        }

        boss.pulseTimer += delta;
        if (boss.pulseTimer >= 3.8) {
            boss.pulseTimer = 0;
            fireBossShockwave();
        }
    }

    // Boss Füzeleri
    for (let i = Game.bossProjectiles.length - 1; i >= 0; i--) {
        const bp = Game.bossProjectiles[i];
        bp.mesh.position.x += bp.vx * delta;
        bp.mesh.position.z += bp.vz * delta;
        bp.life -= delta;

        const distSq = (p.x - bp.mesh.position.x)**2 + (p.z - bp.mesh.position.z)**2;
        if (distSq < 1.0) {
            takePlayerDamage(1.0);
            scene.remove(bp.mesh);
            Game.bossProjectiles.splice(i, 1);
            continue;
        }

        if (bp.life <= 0) {
            scene.remove(bp.mesh);
            Game.bossProjectiles.splice(i, 1);
        }
    }

    // Boss Şok Dalgaları
    for (let i = Game.shockwaves.length - 1; i >= 0; i--) {
        const sw = Game.shockwaves[i];
        sw.currentRadius += sw.speed * delta;
        sw.mesh.scale.set(sw.currentRadius, sw.currentRadius, 1);

        const bPos = Game.boss.mesh.position;
        const distToBoss = Math.abs(p.z - bPos.z);
        if (!sw.hasHitPlayer && sw.currentRadius >= distToBoss - 1.0) {
            sw.hasHitPlayer = true;
            takePlayerDamage(1.0);
            showBanner('💥 KAÇILAMAZ ŞOK DALGASI! (-1 KALP)', false);
        }

        if (sw.currentRadius >= sw.maxRadius) {
            scene.remove(sw.mesh);
            Game.shockwaves.splice(i, 1);
        }
    }

    // 3D Skill Animasyonları
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

    DOM.progressBarFill.style.width = pct + '%';
    DOM.progressPlayerIcon.style.left = pct + '%';
}

function enterBossFight() {
    Game.state = GAME_STATE.BOSS_FIGHT;
    Game.boss.active = true;

    DOM.bossHud.classList.remove('hidden');
    DOM.bossSkillsBar.classList.remove('hidden');
    updateBossHUD();
    updateSkillsUI();
    showBanner(`⚠️ DİKKAT: ${Game.boss.theme.name} ÇIKTI! ⚠️`, false);
}

function updateBossHUD() {
    if (!Game.boss) return;
    const pct = Math.max(0, (Game.boss.hp / Game.boss.maxHp) * 100);
    DOM.bossBarFill.style.width = pct + '%';
    DOM.bossHpText.textContent = `${Math.max(0, Game.boss.hp)} / ${Game.boss.maxHp}`;
}

function triggerVictory() {
    Game.state = GAME_STATE.VICTORY;
    sfx.playVictory();

    createExplosion(Game.boss.mesh.position.x, 3.0, Game.boss.mesh.position.z, 0xff0055, 40);
    disposeHierarchy(Game.boss.mesh);
    scene.remove(Game.boss.mesh);

    Game.score += 1000 * Game.level;
    DOM.victoryScore.textContent = Game.score;

    setTimeout(() => {
        DOM.bossHud.classList.add('hidden');
        DOM.bossSkillsBar.classList.add('hidden');
        DOM.victoryScreen.classList.remove('hidden');
    }, 1000);
}

function triggerGameOver() {
    Game.state = GAME_STATE.GAMEOVER;
    sfx.playExplosion();

    createExplosion(Game.player.x, 1.0, Game.player.z, 0x00f2fe, 30);
    Game.player.mesh.visible = false;

    DOM.gameoverScore.textContent = Game.score;

    setTimeout(() => {
        DOM.bossHud.classList.add('hidden');
        DOM.bossSkillsBar.classList.add('hidden');
        DOM.gameoverScreen.classList.remove('hidden');
    }, 800);
}

function startGame() {
    DOM.startScreen.classList.add('hidden');
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
    p.hearts = 3.0;
    p.skill1Used = false;
    p.skill2Used = false;
    p.mesh.visible = true;

    DOM.gameoverScreen.classList.add('hidden');
    DOM.victoryScreen.classList.add('hidden');
    DOM.bossHud.classList.add('hidden');
    DOM.bossSkillsBar.classList.add('hidden');

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
