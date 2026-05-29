/**
 * PrimitiveShowcase - Visual Test Page
 *
 * Demonstrates all primitives with their variants and states.
 * Use this page to verify token alignment and accessibility.
 */

import React, { useState } from 'react';
import { Card, Text, Button, Chip, AudioControl, ProgressIndicator, Title, Body, Label } from './index';

export function PrimitiveShowcase() {
  const [playState, setPlayState] = useState<'idle' | 'active' | 'loading'>('idle');
  const [recordState, setRecordState] = useState<'idle' | 'active' | 'loading'>('idle');
  const [dots, setDots] = useState([0, 1]);
  const [currentDot, setCurrentDot] = useState(2);
  const [progress, setProgress] = useState(65);

  return (
    <div className="min-h-screen bg-[var(--color-surface-50)] p-[var(--spacing-section)]">
      <div className="max-w-4xl mx-auto space-y-[var(--spacing-section)]">
        {/* Header */}
        <Card variant="elevated" padding="loose">
          <Title>Primitives Library Showcase</Title>
          <Body maxWidth="lg">
            All primitives use design tokens exclusively, support accessibility (WCAG AA),
            and respect prefers-reduced-motion. Test keyboard navigation and screen readers.
          </Body>
        </Card>

        {/* Text Primitive */}
        <Card variant="default" padding="normal">
          <Label>Text Primitive</Label>
          <div className="space-y-4 mt-4">
            <Title>Title - Screen and Section Headers</Title>
            <Text variant="title-lg">Title Large - 32px at desktop</Text>
            <Text variant="title-sm">Title Small - 24px at desktop</Text>
            <Body>Body - Question text, chunk content, optimized for at-a-glance reading</Body>
            <Text variant="body-lg">Body Large - 20px at desktop</Text>
            <Label>Label - Tags, categories, type tags (uppercase, tracked)</Label>
          </div>
        </Card>

        {/* Card Primitive */}
        <Card variant="default" padding="normal">
          <Label>Card Primitive</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <Card variant="default" padding="tight">
              <Label variant="primary">Default - Tight</Label>
            </Card>
            <Card variant="elevated" padding="normal">
              <Label variant="primary">Elevated - Normal</Label>
            </Card>
            <Card variant="flat" padding="loose">
              <Label variant="primary">Flat - Loose</Label>
            </Card>
          </div>
        </Card>

        {/* Button Primitive */}
        <Card variant="default" padding="normal">
          <Label>Button Primitive</Label>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="primary" isDisabled>Disabled</Button>
            <Button variant="primary" isLoading>Loading</Button>
          </div>
        </Card>

        {/* Chip Primitive */}
        <Card variant="default" padding="normal">
          <Label>Chip Primitive</Label>
          <div className="flex flex-wrap gap-3 mt-4">
            <Chip>Default</Chip>
            <Chip variant="primary">Primary</Chip>
            <Chip variant="outline">Outline</Chip>
            <Chip selected>Selected</Chip>
            <Chip size="sm">Small</Chip>
            <Chip size="lg">Large</Chip>
          </div>
        </Card>

        {/* AudioControl Primitive */}
        <Card variant="default" padding="normal">
          <Label>AudioControl Primitive (80px circular)</Label>
          <div className="flex flex-wrap gap-6 mt-4 items-center">
            <div className="flex gap-4">
              <AudioControl
                type="play"
                state={playState}
                onToggle={() => setPlayState(playState === 'idle' ? 'active' : 'idle')}
                label={playState === 'idle' ? 'Play audio' : 'Pause audio'}
              />
              <AudioControl
                type="pause"
                state={playState}
                onToggle={() => setPlayState(playState === 'idle' ? 'active' : 'idle')}
                label="Pause audio"
              />
              <AudioControl
                type="play"
                state="loading"
                onToggle={() => {}}
                label="Loading"
              />
            </div>
            <div className="flex gap-4">
              <AudioControl
                type="record"
                state={recordState}
                showPulse={recordState === 'active'}
                onToggle={() => setRecordState(recordState === 'idle' ? 'active' : 'idle')}
                label={recordState === 'idle' ? 'Start recording' : 'Stop recording'}
                aria-live="polite"
              />
              <AudioControl
                type="stop"
                state="idle"
                onToggle={() => {}}
                label="Stop"
              />
            </div>
          </div>
        </Card>

        {/* ProgressIndicator Primitive */}
        <Card variant="default" padding="normal">
          <Label>ProgressIndicator Primitive</Label>
          <div className="space-y-6 mt-4">
            <div>
              <Label>Dot Navigation</Label>
              <div className="flex items-center gap-4 mt-2">
                <ProgressIndicator
                  type="dots"
                  total={5}
                  current={currentDot}
                  completed={dots}
                />
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDots(dots.includes(i) ? dots.filter((d) => d !== i) : [...dots, i]);
                        setCurrentDot(i);
                      }}
                      className="px-2 py-1 text-xs bg-[var(--color-surface-100)] rounded"
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Label>Progress Bar ({progress}%)</Label>
              <div className="mt-2">
                <ProgressIndicator
                  type="bar"
                  total={100}
                  current={progress}
                  aria-valuenow={progress}
                />
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => setProgress(Math.max(0, progress - 10))} className="px-3 py-1 text-sm bg-[var(--color-surface-100)] rounded">
                  -10%
                </button>
                <button onClick={() => setProgress(Math.min(100, progress + 10))} className="px-3 py-1 text-sm bg-[var(--color-surface-100)] rounded">
                  +10%
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Accessibility Note */}
        <Card variant="elevated" padding="normal">
          <Label>Accessibility Features</Label>
          <Body maxWidth="lg" className="mt-2">
            • All interactive elements have proper ARIA labels
            • Focus indicators use 3px offset with accent-light color
            • Touch targets meet 44×44px minimum (80px for AudioControl)
            • Reduced motion respected in all animations
            • Keyboard navigation follows natural DOM order
          </Body>
        </Card>
      </div>
    </div>
  );
}
