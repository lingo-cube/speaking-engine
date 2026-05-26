# Speaking Engine — Shadowing Learning Flow UI 重构 PRD（V1）

## 1. 背景

当前系统 UI 存在以下问题：

* Question List 与练习流程混合
* 页面更像"阅读器"而不是"口语训练器"
* Chunk 缺少核心训练状态
* 用户容易跳读
* 缺少沉浸式 speaking flow
* Full Answer 与 Shadowing 缺少状态切换

目标：将产品从"内容阅读器"升级为"沉浸式 Speaking Shadowing Engine"。

---

## 2. 核心设计原则

### 2.1 学习状态分离

| 状态 | 目标 |
|------|------|
| Browse Mode | 选择内容 |
| Learning Mode (Full Answer) | 理解内容 |
| Shadowing Mode | 跟读训练 |
| Speaking Mode | 自主输出 |

禁止：Question List 与 Shadowing 同屏

### 2.2 Full Context First

先：听全文、理解整体、感受语调节奏。再：进入 chunk shadowing。

### 2.3 Chunk 是训练单位

Chunk 不是文本分段，而是语音训练单位。系统必须一句一句推进、管理训练节奏、管理当前 focus。

---

## 3. 页面结构

### 3.1 Dashboard（Browse Mode）

用户选择：Topic、Question、Practice Session

组件：TopicCard、RecentPracticeCard、ProgressOverview

### 3.2 Learning Session（核心）

Session 分为三模式：Full Answer Mode → Shadowing Mode → Speaking Mode

---

## 4. Full Answer Mode

目标：建立 Context、Structure、Rhythm

- Session Header（topic、current_question、total_questions）
- Question Card + Framework Card
- Full Answer（sentence chunk 展示，可点击试听，默认不可录音，当前播放 chunk 高亮）
- Audio Controls（Play Full、Pause、Replay）
- CTA："Start Shadowing"

---

## 5. Shadowing Mode（核心）

- Progress Header（Chunk 2 / 5 + 返回 + 进度条）
- Current Chunk Card（大字单句，只展示当前 chunk）
- Audio Controls（Play Native、Replay、Slow Mode）
- Recording Controls（Start/Stop Recording、Playback User Audio）
- Chunk Timeline（● ● ○ ○ ○）

---

## 6. Speaking Mode（V2）

仅展示 question + timer + recording，隐藏 sample answer 和 chunks。

---

## 7. 状态流转

Browse → FullAnswer → Shadowing → Speaking → Completed

---

## 8. 禁止项

- Question List 与 Shadowing 同屏
- 全文模式下直接录音

---

## 9. UI 风格

关键词：Clean、Focused、Breathing、Minimal、Immersive

风格参考：Duolingo Speaking、ELSA Speak、Apple Podcast Player

---

## 10. 技术建议

- 状态管理：zustand
- 动画：framer-motion

---

## 11. 本地 TTS 音频生成

### 11.1 问题

Mock 音频为 5 秒静音 WAV，无法验证跟读体验。

### 11.2 方案

利用浏览器内置 **Web Speech API (SpeechSynthesis)** 生成真实语音：

- `useSpeechSynthesis` hook 封装 TTS 播放
- 每个 chunk 的 `text` 直接送入 TTS 引擎朗读
- 朗读体验接近真实 OSS 音频，远好于静音
- 无需额外依赖，浏览器原生支持
- 优先使用 `audio_url`（OSS 真实音频），不存在时回退 TTS

### 11.3 实现要点

```
audio_url 存在? → 使用 HTML5 Audio（OSS 音频）
audio_url 不存在? → 使用 SpeechSynthesis（本地 TTS）
```

- 支持 play / pause / replay / stop
- 支持语速调节（rate: 0.75 / 1.0）
- 播放完成后触发 onEnd 回调
- 与现有 useAudioPlayer 接口兼容

---

## 11. V1 范围

包含：Topic、Question、Full Answer、Chunk Shadowing、Audio Playback、Recording、Progress

不包含：AI Scoring、Semantic Chunk、Transfer Graph、Free Speaking Analysis
