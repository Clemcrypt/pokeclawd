# 🏗️ Open Claw Architecture Plan

This document outlines the roadmap for migrating **PokeClawd** from a standard web app (React + Express) to a fully autonomous **Open Claw** powered experience.

## 🎯 Objective
Transform PokeClawd from a deterministic "stat-decay" game into a dynamic, AI-driven experience where each pet is an autonomous agent running on the **Open Claw** framework.

## 🧠 What is Open Claw?
Open Claw is a local-first AI agent framework that gives agents:
- **Sovereignty:** Runs proactively, not just reacting to user clicks.
- **Tools:** Can use "skills" (GitHub, Solana, Web Search).
- **Personality:** Evolving interactions based on persistent memory.

---

## 🗺️ Migration Roadmap

### Phase 1: The "Hollow" Claw (Current State) 🚧
*Goal: Branding & Preparation*
- **Frontend:** React UI with "Open Claw" branding.
- **Backend:** Traditional Express/MongoDB (simulates agent behavior).
- **Logic:** Deterministic math (health -1 per hour).
- **User Experience:** "Tamagotchi style" - manual feeding/playing.

### Phase 2: The Tethered Agent (Hybrid) 🔌
*Goal: Connect Game to AI Brain*
We replace the static backend logic with an LLM-driven "Agent Node".

1.  **Agent Server:**
    - Deploy an Open Claw instance (or compatible LLM runner) on the backend.
    - **Model:** Llama 3 (via Groq/OpenRouter) or Claude 3 Haiku for speed.
2.  **Dynamic Logic:**
    - Instead of `-5 Hunger`, the Agent decides state based on context:
      > *"User hasn't visited in 3 days. I am lonely. Reduce happiness by 40 and post a sad message."*
3.  **Chat Interface:**
    - Add a "Talk" button.
    - Pet responds using its specific personality (Pikaclaw = energetic, Krabbyclaw = feisty).

### Phase 3: True Open Claw (Autonomous) 🤖
*Goal: The Pet Lives on Your Machine*
We integrate with the user's local Open Claw instance.

1.  **Local Connection:**
    - Game connects to `localhost:3000` (User's Open Claw).
    - **Benefit:** 100% Privacy, no server costs, user owns the model.
2.  **"Forkzoo" Integration:**
    - Pet state lives in a **GitHub Repository** (a "digital den").
    - The Open Claw agent commits updates to the repo daily (e.g., `Update mood: Happy`, `Log: Ate a berry`).
    - The game frontend reads this repo to render the pet.
3.  **Skill Usage:**
    - **Coding:** The pet can "learn" by actually generating code commits to its own repo.
    - **Web:** The pet can search the web to tell you news.

### Phase 4: On-Chain Life (Solana) ⛓️
*Goal: Immutable Ownership & Economy*

1.  **NFT Integration:** Matches "The Claw" NFTs.
2.  **Compressed State:**
    - Agent periodically writes state hash to Solana using State Compression (low cost).
    - "Proof of Life" - verify your pet's age and stats on-chain.
3.  **Agent Wallet:**
    - The pet has its own Solana wallet.
    - It can "find" small rewards (tokens) or spend them on food if you authorize it.

---

## 🛠️ Technical Changes Required

### 1. Backend Migration
**From:** `Express Router` -> `database`
**To:** `Agent Orchestrator` -> `LLM API` -> `Vector DB` (Memory)

```javascript
// Old (Deterministic)
pet.hunger -= 5;

// New (Agentic)
const mindset = await agent.think({
  context: "User has been away for 8 hours",
  currentStats: pet.stats
});
// Agent decides: "I'm hungry, but I found a crumb. Hunger -2 only."
pet.update(mindset.decision);
```

### 2. Frontend Updates
- **Websocket / SSE:** Real-time updates from the agent (not just polling).
- **Chat UI:** New interface for dialogue.
- **Localhost Toggle:** Switch between "Cloud Agent" and "Local Open Claw".

### 3. Data Structure
Move from `MongoDB Document` to `Context Window`:
- **Core Memory:** "I am Krabbyclaw. I love shiny objects."
- **Episodic Memory:** "User gave me a burger yesterday."
- **Working Memory:** "I am currently sleepy."
