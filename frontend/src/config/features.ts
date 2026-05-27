/**
 * Feature Flags
 * Control which features are enabled in the application
 */

export const features = {
  // Use V2 components with TTS support
  useV2Components: true,

  // Enable debug mode (shows additional info)
  debug: false,

  // Enable smooth animations
  animations: true,

  // Enable keyboard shortcuts
  keyboardShortcuts: true,
} as const;

export type FeatureFlags = typeof features;
