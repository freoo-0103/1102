/**
 * ========================================================
 * BLOCK BLAST! 音效合成引擎 (Web Audio API Synthesizer)
 * 支援 5 大主題音效：脆皮捏捏、療癒森林、夢幻果凍、賽博霓虹、典雅原木
 * 免除外部音效檔載入延遲，提供零延遲的極致 ASMR 敲擊與爆破手感！
 * ========================================================
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.currentTheme = 'crunchy';
    this.masterGain = null;
    this.initAudioContext();
  }

  initAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass && !this.ctx) {
      try {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      } catch (e) {
        console.warn('AudioContext 初始化失敗:', e);
      }
    }
  }

  ensureContext() {
    if (!this.ctx) {
      this.initAudioContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setTheme(themeName) {
    this.currentTheme = themeName;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // 震動回饋 (如果裝置支援)
  vibrate(pattern) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }

  /**
   * 1. 拿起方塊音效 (Pick up)
   */
  playPickUp() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (this.currentTheme === 'dessert') {
      // 夢幻甜點：暖心八音盒清脆叮咚
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, t);
      osc.frequency.exponentialRampToValueAtTime(880.00, t + 0.08);
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    } else if (this.currentTheme === 'ice') {
      // 清涼冰品：晶透薄冰晶微響
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1174.66, t);
      osc.frequency.exponentialRampToValueAtTime(1760.00, t + 0.06);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    } else if (this.currentTheme === 'crunchy') {
      // 脆皮捏捏：Q 彈氣泡捏起聲
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(540, t + 0.08);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    } else if (this.currentTheme === 'healing') {
      // 療癒森林：輕微竹筒微響
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(550, t + 0.06);
      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    } else if (this.currentTheme === 'jelly') {
      // 夢幻果凍：高滑音啵啵
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.exponentialRampToValueAtTime(680, t + 0.1);
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    } else if (this.currentTheme === 'neon') {
      // 賽博霓虹：電子蜂鳴嗶
      osc.type = 'square';
      osc.frequency.setValueAtTime(700, t);
      osc.frequency.exponentialRampToValueAtTime(1200, t + 0.05);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    } else {
      // 典雅原木：木質輕敲
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(350, t);
      osc.frequency.exponentialRampToValueAtTime(220, t + 0.05);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    }

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.12);
  }

  /**
   * 2. 放置方塊入網格音效 (Drop / Place)
   */
  playPlace() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    this.vibrate(15);
    const t = this.ctx.currentTime;

    if (this.currentTheme === 'dessert') {
      // 夢幻甜點：軟綿奶霜蓋章聲 + 糖珠微響
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(392.00, t);
      osc.frequency.exponentialRampToValueAtTime(220.00, t + 0.12);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.13);
      setTimeout(() => this.playTone(783.99, 'sine', 0.1, 0.15), 30);
    } else if (this.currentTheme === 'ice') {
      // 清涼冰品：冰塊敲杯清脆噹啷
      this.playCrunchSnap(0.05, 0.22);
      this.playTone(1318.51, 'sine', 0.12, 0.25);
    } else if (this.currentTheme === 'crunchy') {
      // 脆皮捏捏：脆皮酥裂聲 + 軟綿噗通聲
      this.playCrunchSnap(0.08, 0.25);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, t);
      osc.frequency.exponentialRampToValueAtTime(90, t + 0.12);
      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.13);
    } else if (this.currentTheme === 'healing') {
      // 療癒森林：清脆木琴清響
      this.playTone(523.25, 'triangle', 0.14, 0.25); // C5
    } else if (this.currentTheme === 'jelly') {
      // 夢幻果凍：水滴啵啷
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.14);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.15);
    } else if (this.currentTheme === 'neon') {
      // 賽博霓虹：能量鎖定重擊
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.1);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.11);
    } else {
      // 典雅原木：實木沉穩敲擊
      this.playWoodClack(240, 0.12);
    }
  }

  /**
   * 3. 消除行/列爆破音效 (Line Clear & Combo)
   * comboLevel: 1, 2, 3, 4, 5... 依連擊數演奏更高階的和弦音階！
   */
  playClear(linesCount, comboLevel = 1) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    // 觸發手機震動 (依消除行數加大強度)
    const vibTime = Math.min(60 + linesCount * 30, 200);
    this.vibrate([vibTime, 30, vibTime / 2]);

    const pentatonic = [
      261.63, // C4
      293.66, // D4
      329.63, // E4
      392.00, // G4
      440.00, // A4
      523.25, // C5
      587.33, // D5
      659.25, // E5
      783.99, // G5
      880.00, // A5
      1046.50 // C6
    ];

    const baseIndex = Math.min((comboLevel - 1) * 2, pentatonic.length - 3);
    const chord = [
      pentatonic[baseIndex % pentatonic.length],
      pentatonic[(baseIndex + 2) % pentatonic.length],
      pentatonic[(baseIndex + 4) % pentatonic.length]
    ];

    if (this.currentTheme === 'dessert') {
      // 夢幻甜點：幸福烘焙鐘琴琶音 + 繽紛糖果跳跳糖
      chord.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq * 1.5, 'sine', 0.3, 0.25, 0.003);
        }, idx * 65);
      });
      setTimeout(() => this.playCrunchSnap(0.1, 0.25), 50);
    } else if (this.currentTheme === 'ice') {
      // 清涼冰品：碎冰爽快崩裂 + 極光水晶風鈴
      this.playCrunchSnap(0.15, 0.45);
      setTimeout(() => this.playCrunchSnap(0.12, 0.35), 40);
      chord.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq * 2, 'sine', 0.28, 0.22, 0.001);
        }, idx * 55);
      });
    } else if (this.currentTheme === 'crunchy') {
      // 脆皮捏捏：極度過癮的「酥皮碎裂 + 糖霜爆破」ASMR 聲音！
      this.playCrunchSnap(0.18, 0.45);
      setTimeout(() => this.playCrunchSnap(0.14, 0.35), 45);
      if (linesCount > 1) {
        setTimeout(() => this.playCrunchSnap(0.16, 0.4), 90);
      }

      // 伴隨歡樂的高音糖果彈跳聲
      chord.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq * 1.5, 'sine', 0.22, 0.2);
        }, idx * 60);
      });
    } else if (this.currentTheme === 'healing') {
      // 療癒森林：空靈卡林巴木琴和弦
      chord.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'sine', 0.35, 0.28, 0.005);
        }, idx * 75);
      });
    } else if (this.currentTheme === 'jelly') {
      // 夢幻果凍：連環氣泡歡快波波波
      for (let i = 0; i < 4 + linesCount * 2; i++) {
        setTimeout(() => {
          const bubbleFreq = 500 + Math.random() * 600;
          this.playWaterDrop(bubbleFreq);
        }, i * 40);
      }
    } else if (this.currentTheme === 'neon') {
      // 賽博霓虹：街機雷射射擊 + 合成器琶音
      chord.forEach((freq, idx) => {
        setTimeout(() => {
          this.playLaserZap(freq * 1.2);
        }, idx * 55);
      });
    } else {
      // 典雅原木：木琴清亮音階敲擊
      chord.forEach((freq, idx) => {
        setTimeout(() => {
          this.playWoodClack(freq, 0.25);
        }, idx * 70);
      });
    }
  }

  /**
   * 4. 輔助合成音生成器
   */
  // 脆皮/薄脆酥皮 ASMR 白噪音爆裂 (Filtered Noise Burst)
  playCrunchSnap(duration = 0.15, volume = 0.3) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // 生成脆片雜訊顆粒
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // 帶通濾波器創造酥脆高頻響亮感
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, t);
    filter.Q.setValueAtTime(2.5, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
  }

  // 純音/和弦音
  playTone(freq, type = 'sine', duration = 0.2, volume = 0.25, attack = 0.01) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(volume, t + attack);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + duration);
  }

  // 水滴/果凍泡泡音
  playWaterDrop(baseFreq = 600) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, t + 0.08);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.1);
  }

  // 賽博雷射射擊音
  playLaserZap(startFreq = 800) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.14);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  // 原木敲擊音 (Wooden Block)
  playWoodClack(freq = 300, duration = 0.15) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.7, t + duration);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + duration);
  }

  // 炸彈道具爆炸音
  playBomb() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    this.vibrate([100, 40, 150]);
    this.playCrunchSnap(0.35, 0.6);
    this.playTone(80, 'triangle', 0.4, 0.5);
  }

  // 遊戲結束音
  playGameOver() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [392, 349.23, 329.63, 261.63];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.35, 0.25);
      }, idx * 160);
    });
  }
}

// 實例化全域音效控制器
const gameSound = new SoundEngine();
