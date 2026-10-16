import { create } from 'zustand';

export interface StreamAlert {
  id: string;
  type: 'bits' | 'sub' | 'raid';
  user: string;
  amount?: number;
  message?: string;
  timestamp: number;
}

interface SimulationState {
  // UI Drawer & Panels
  isDrawerOpen: boolean;
  activePanel: 'sim' | 'lab' | null;
  toggleDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
  openPanel: (panel: 'sim' | 'lab') => void;
  closePanel: () => void;

  // Simulation Parameters
  isSimRunning: boolean;
  chatSpeed: number; // Mensajes por segundo (0 a 40)
  isSlowMode: boolean;
  slowModeSeconds: number;
  enableSoundAlerts: boolean;
  activeAlert: StreamAlert | null;

  // Setters
  setChatSpeed: (speed: number) => void;
  setSlowMode: (enabled: boolean, seconds?: number) => void;
  toggleSimRunning: () => void;
  setEnableSoundAlerts: (enabled: boolean) => void;

  // Event Triggers
  triggerAlert: (alert: Omit<StreamAlert, 'id' | 'timestamp'>) => void;
  dismissAlert: () => void;
}

// Web Audio API lightweight synthetic sound effects (zero external files required)
function playSyntheticSound(type: 'bits' | 'sub' | 'raid') {
  if (typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'bits') {
      // Pleasant high-pitched coin chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
      osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08); // E6
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'sub') {
      // Triumphant fanfare arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
      });
    } else if (type === 'raid') {
      // Powerful siren bass sweep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    }
  } catch {
    // AudioContext blocked by browser autoplay policy before user gesture
  }
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  isDrawerOpen: false,
  activePanel: null,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  setDrawerOpen: (open) => set({ isDrawerOpen: open }),
  openPanel: (panel) => set({ activePanel: panel, isDrawerOpen: false }),
  closePanel: () => set({ activePanel: null }),

  isSimRunning: true,
  chatSpeed: 3, // 3 mensajes por segundo por defecto
  isSlowMode: false,
  slowModeSeconds: 5,
  enableSoundAlerts: true,
  activeAlert: null,

  setChatSpeed: (speed) => set({ chatSpeed: Math.max(0, Math.min(speed, 50)) }),
  setSlowMode: (enabled, seconds) =>
    set({
      isSlowMode: enabled,
      ...(seconds !== undefined && { slowModeSeconds: seconds }),
    }),
  toggleSimRunning: () => set((state) => ({ isSimRunning: !state.isSimRunning })),
  setEnableSoundAlerts: (enabled) => set({ enableSoundAlerts: enabled }),

  triggerAlert: (alertData) => {
    const alert: StreamAlert = {
      ...alertData,
      id: `alert-${Date.now()}`,
      timestamp: Date.now(),
    };

    if (get().enableSoundAlerts) {
      playSyntheticSound(alert.type);
    }

    set({ activeAlert: alert });

    // Auto-dismiss alert after 4.5 seconds
    setTimeout(() => {
      if (get().activeAlert?.id === alert.id) {
        set({ activeAlert: null });
      }
    }, 4500);
  },

  dismissAlert: () => set({ activeAlert: null }),
}));
