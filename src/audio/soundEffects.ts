/**
 * Procedural Web Audio API Sound Synthesizer
 * Zero external audio latency, reliable on all browsers, fully toggleable.
 */

import { getBecauseVoice, getPreloadedVoiceBuffer } from '../utils/voiceManager';

class SoundController {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  private bgmInterval: number | null = null;
  private currentBgmLevel: number = 0;

  constructor() {
    // Try to load mute preference from localStorage
    try {
      const saved = localStorage.getItem('phuoc_game_muted');
      if (saved !== null) {
        this.isMuted = saved === 'true';
      }
    } catch {
      // ignore
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('phuoc_game_muted', String(this.isMuted));
    } catch {
      // ignore
    }
    if (this.isMuted) {
      this.stopBgm();
    } else if (this.currentBgmLevel > 0) {
      this.startBgm(this.currentBgmLevel);
    }
    return this.isMuted;
  }

  public playJump() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.14);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.17);
  }

  public playStomp() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Squishy cartoon bounce
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.linearRampToValueAtTime(150, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.2);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  public playCoin() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(987.77, now); // B5
    osc1.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    osc2.frequency.setValueAtTime(1975.53, now + 0.08); // B6

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.08);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  }

  public playHeal() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.18, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.16);
    });
  }

  /**
   * Authentic Voice Shout for "BECAUSE!" (Bì câu!)
   * Plays the original voice clip with 100% sound fidelity, plus subtle energetic impact.
   */
  public async playBecauseAttack() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    // 1. Play authentic voice ("Bì câu!") with original sound preservation
    try {
      const buffer = await getPreloadedVoiceBuffer(this.ctx);
      if (buffer && this.ctx) {
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        const gainNode = this.ctx.createGain();
        gainNode.gain.setValueAtTime(0.95, this.ctx.currentTime);
        source.connect(gainNode);
        gainNode.connect(this.ctx.destination);
        source.start(0);
      } else {
        const audio = new Audio(getBecauseVoice());
        audio.volume = 0.95;
        audio.play().catch(() => {});
      }
    } catch {
      const audio = new Audio(getBecauseVoice());
      audio.volume = 0.95;
      audio.play().catch(() => {});
    }

    // 2. Add punchy dramatic backing impact
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  public async playBecauseVoicePreview() {
    this.initCtx();
    if (!this.ctx) return;
    try {
      const buffer = await getPreloadedVoiceBuffer(this.ctx);
      if (buffer && this.ctx) {
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(1.0, this.ctx.currentTime);
        source.connect(gain);
        gain.connect(this.ctx.destination);
        source.start(0);
        return;
      }
    } catch {
      // fallback
    }
    const audio = new Audio(getBecauseVoice());
    audio.volume = 1.0;
    audio.play().catch(() => {});
  }

  public playBossHurt() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.12);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  public playBossWhistle() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    // Whistle trill between 2100 and 2600Hz
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.setValueAtTime(2100, now + 0.05);
    osc.frequency.setValueAtTime(2500, now + 0.1);
    osc.frequency.setValueAtTime(2200, now + 0.15);
    osc.frequency.setValueAtTime(2600, now + 0.2);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  public playPlayerHurt() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.18);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  public playVictory() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [
      { f: 523.25, d: 0.15, offset: 0 },
      { f: 659.25, d: 0.15, offset: 0.15 },
      { f: 783.99, d: 0.15, offset: 0.3 },
      { f: 1046.50, d: 0.45, offset: 0.45 },
    ];

    notes.forEach((n) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.offset);
      gain.gain.setValueAtTime(0.25, now + n.offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.offset + n.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + n.offset);
      osc.stop(now + n.offset + n.d);
    });
  }

  public playGunshot() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.16);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  public playHeartHeal() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6 uplifting harp chime
    notes.forEach((f, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + idx * 0.05);
      gain.gain.setValueAtTime(0.25, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.22);
    });
  }

  private lastDiceSoundTime: number = 0;

  public playDiceThrow() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // Throttle so rapid dice bursts don't create harsh loud noise
    if (now - this.lastDiceSoundTime < 0.16) return;
    this.lastDiceSoundTime = now;

    // Extremely soft, gentle, quiet wooden dice tap (low gain 0.025, rounded sine)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.035);

    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  public playMoneyThrow() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // Pleasant rustling cash flutter / dollar bills whoosh
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(360, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.09);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  public playKiss() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // Sweet popping kiss sound
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(700, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  public playCooldownClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(280, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  public playGameOver() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [440, 392, 349.23, 293.66];
    notes.forEach((f, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, now + idx * 0.2);
      gain.gain.setValueAtTime(0.2, now + idx * 0.2);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.2 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.2);
      osc.stop(now + idx * 0.2 + 0.26);
    });
  }

  private isBossEnragedState: boolean = false;

  public setBossEnraged(enraged: boolean) {
    this.isBossEnragedState = enraged;
    if (this.currentBgmLevel === 2 || this.currentBgmLevel === 4) {
      if (!this.isMuted) {
        this.startBossBgm(enraged);
      }
    }
  }

  /**
   * Dramatic Boss Fight BGM (Procedural Web Audio Retro Synth)
   * Tuned with moderate, comfortable volume (gain ~0.035 - 0.048) so it is dramatic
   * without being loud, harsh, or drowning out game sound effects.
   */
  public startBossBgm(isEnraged: boolean = false) {
    this.isBossEnragedState = isEnraged;
    this.currentBgmLevel = 4;
    if (this.isMuted) return;
    this.stopBgm();
    this.initCtx();
    if (!this.ctx) return;

    // Dramatic minor chord progression: Dm -> Bb -> Gm -> A (tense boss showdown)
    const bassline = isEnraged
      ? [146.83, 174.61, 146.83, 220.00, 116.54, 146.83, 116.54, 174.61, 98.00, 116.54, 146.83, 196.00, 110.00, 146.83, 220.00, 246.94]
      : [146.83, 146.83, 174.61, 146.83, 116.54, 116.54, 146.83, 116.54, 98.00, 98.00, 116.54, 146.83, 110.00, 110.00, 146.83, 220.00];

    const leadMotif = isEnraged
      ? [587.33, 659.25, 698.46, 880.00, 783.99, 698.46, 659.25, 587.33]
      : [293.66, 349.23, 440.00, 523.25, 466.16, 392.00, 440.00, 349.23];

    let step = 0;
    // Enraged tempo: 150ms per step, Regular boss tempo: 195ms per step
    const intervalMs = isEnraged ? 150 : 195;

    this.bgmInterval = window.setInterval(() => {
      if (this.isMuted || !this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Driving Synth Bass (Soft triangle wave with subtle cut)
      const bassFreq = bassline[step % bassline.length];
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(bassFreq, now);

      // Low volume (0.04 max) for gentle dramatic presence
      const bVol = isEnraged ? 0.048 : 0.038;
      bassGain.gain.setValueAtTime(bVol, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + (intervalMs / 1000) * 0.95);

      bassOsc.connect(bassGain);
      bassGain.connect(this.ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + (intervalMs / 1000));

      // 2. Lead Dramatic Tension Melody (every 2 steps)
      if (step % 2 === 0) {
        const leadIdx = Math.floor(step / 2) % leadMotif.length;
        const leadFreq = leadMotif[leadIdx];
        const leadOsc = this.ctx.createOscillator();
        const leadGain = this.ctx.createGain();
        leadOsc.type = isEnraged ? 'sawtooth' : 'sine';
        leadOsc.frequency.setValueAtTime(leadFreq, now);

        // Very soft lead level (0.025 regular, 0.032 enraged)
        const lVol = isEnraged ? 0.032 : 0.024;
        leadGain.gain.setValueAtTime(lVol, now);
        leadGain.gain.exponentialRampToValueAtTime(0.001, now + (intervalMs / 1000) * 1.6);

        leadOsc.connect(leadGain);
        leadGain.connect(this.ctx.destination);
        leadOsc.start(now);
        leadOsc.stop(now + (intervalMs / 1000) * 1.7);
      }

      // 3. Subtle Tension Pulse Kick/Hi-Hat
      if (step % 4 === 0) {
        // Soft low punch
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.type = 'sine';
        kickOsc.frequency.setValueAtTime(110, now);
        kickOsc.frequency.exponentialRampToValueAtTime(40, now + 0.08);
        kickGain.gain.setValueAtTime(0.035, now);
        kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        kickOsc.connect(kickGain);
        kickGain.connect(this.ctx.destination);
        kickOsc.start(now);
        kickOsc.stop(now + 0.09);
      }

      step++;
    }, intervalMs);
  }

  public startBgm(level: number) {
    this.currentBgmLevel = level;
    if (this.isMuted) return;

    if (level === 2 || level === 4) {
      // Level 2 (Boss CSGT) and Level 4 (Boss Bá Hộ Long) use the dramatic Boss Fight BGM!
      this.startBossBgm(this.isBossEnragedState);
      return;
    }

    this.stopBgm();
    this.initCtx();
    if (!this.ctx) return;

    // Level 1 & 3: Gentle pentatonic Vietnamese countryside arpeggio (C D E G A)
    const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    let step = 0;

    this.bgmInterval = window.setInterval(() => {
      if (this.isMuted || !this.ctx) return;
      const now = this.ctx.currentTime;

      // Melodic calm breeze
      const noteIdx = (step % 8 === 0 || step % 8 === 4) ? (step % pentatonic.length) : (step * 2) % pentatonic.length;
      const freq = pentatonic[noteIdx];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
      step++;
    }, 420);
  }

  public stopBgm() {
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const sounds = new SoundController();
