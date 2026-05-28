import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationConfettiProps {
  trigger: boolean;
  onTriggered?: () => void;
}

export function CelebrationConfetti({ trigger, onTriggered }: CelebrationConfettiProps) {
  useEffect(() => {
    if (trigger) {
      const fireConfetti = async () => {
        const particleCount = 100;
        const spread = 70;

        const defaults = {
          colors: [
            getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#58CC02',
            getComputedStyle(document.documentElement).getPropertyValue('--color-tertiary').trim() || '#FF9500',
            getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#4A90E2',
          ],
          origin: { y: 0.7 },
          zIndex: 100,
          disableForReducedMotion: true,
        };

        await confetti({
          ...defaults,
          particleCount: Math.floor(particleCount * 0.6),
          spread,
        });

        await new Promise(resolve => setTimeout(resolve, 100));

        await confetti({
          ...defaults,
          particleCount: Math.floor(particleCount * 0.3),
          spread,
          origin: { x: 0.3, y: 0.7 },
        });

        await confetti({
          ...defaults,
          particleCount: Math.floor(particleCount * 0.1),
          spread,
          origin: { x: 0.7, y: 0.7 },
        });

        onTriggered?.();
      };

      fireConfetti();
    }
  }, [trigger, onTriggered]);

  return null;
}