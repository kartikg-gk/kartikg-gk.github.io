export type Project = {
  slug: string;
  name: string;
  title: string;
  year: string;
  summary: string;
  tags: string[];
  links: { label: string; href: string }[];
  what: string;
  how: string[];
  stats?: { value: string; label: string }[];
  note?: string;
  image?: { src: string; alt: string };
};

export const projects: Project[] = [
  {
    slug: "graphweave",
    name: "GraphWeave",
    title: "GraphWeave: See What Your Retrieval Actually Used",
    year: "2026",
    summary:
      "GraphRAG over GitHub repositories that maps everything a run retrieved and marks each item used or unused in the answer: weighted graph, vector index and a leave-one-out audit.",
    tags: ["Python", "knowledge graph", "retrieval tracing", "MCP"],
    links: [
      { label: "github", href: "https://github.com/kartikg-gk/graphweave" },
      { label: "live", href: "https://www.graphweave.online" },
      { label: "post", href: "https://x.com/kartikgsx/status/2112202403051421969" },
    ],
    image: { src: `${import.meta.env.BASE_URL}img/graphweave-arch.png`, alt: "How GraphWeave retrieves, answers and marks what the answer used" },
    what: "Most of what a retrieval step returns never reaches the answer, but you still pay for it in tokens, latency and distraction. GraphWeave reads a repository's pull requests, issues and commits into a knowledge graph, answers questions from it, and shows the whole run as a map with every retrieved item marked used or unused. No second model grades the evidence, and nothing leaves your machine.",
    how: [
      "A typed, weighted, timestamped graph in LadybugDB with a vector index alongside it. Links from GitHub's own records (AUTHORED, RESOLVES) are trusted most; links read out of prose, least.",
      "Retrieval fuses both signals as (α·vector + β·graph) × recency, with α and β set by question type. A graph path scores the product of its edge weights.",
      "Recency decays by a half-life per entity type, with a floor so old but central items survive.",
      "Entity merging in three tiers: near-identical names merge with no model call, unsure ones get one yes/no question, anything unclear stays separate.",
      "Used/unused is word overlap, checkable with graphweave verify, which reruns the question with each item left out.",
      "pip install, a skill for Claude Code and Codex, a local MCP server, and tracers for LangGraph, LlamaIndex, DSPy and OpenTelemetry spans.",
    ],
    stats: [
      { value: "75 of 171", label: "retrieved sources actually used, across 20 questions" },
      { value: "71%", label: "agreement with leave-one-out on 171 items" },
      { value: "73%", label: "of needed items caught by word overlap" },
    ],
  },
  {
    slug: "delta",
    name: "Delta",
    title: "Delta: Coding-Agent Harness",
    year: "2026",
    summary:
      "A minimal coding-agent harness: streaming tool-use loop, an event-sourced session tree you can branch and rewind, context compaction and four model providers.",
    tags: ["Python", "tool use", "session tree", "context compaction"],
    links: [
      { label: "github", href: "https://github.com/kartikg-gk/delta" },
      { label: "pypi", href: "https://pypi.org/project/deltaa/" },
      { label: "post", href: "https://x.com/kartikgsx/status/2110437499059491008" },
    ],
    what: "Delta gives a model filesystem and shell tools, runs it in a loop you can read end to end, and lets you extend it with tools, skills, prompts and hooks without touching the core runtime. Use it from the terminal, script it for one-shot tasks, or embed it in larger agent and evaluation workflows.",
    how: [
      "An async streaming tool-use loop over a provider-neutral event protocol. OpenAI, Anthropic, OpenRouter and Ollama, switchable mid-session.",
      "Sessions are an append-only, event-sourced tree: branch, rewind or resume any turn by replaying its path from the root.",
      "A deterministic repair pass fixes interrupted tool calls, so a crashed session always reloads.",
      "Token-budgeted compaction keeps long sessions inside the model's window, with token and cost stats per session.",
      "Layered AGENTS.md instructions, markdown skills, hot-reloadable extensions and a plan mode.",
      "Tool approval, a prompt-injection guard that marks tool output as data, and a circuit breaker for failing providers.",
    ],
    stats: [
      { value: "1,168", label: "tests" },
      { value: "4", label: "model providers" },
    ],
  },
  {
    slug: "rlmagent",
    name: "rlmagent",
    title: "rlmagent: A Coding Agent That Edits Its Own Playbook",
    year: "2026",
    summary:
      "A terminal coding agent that improves itself: it works in a persistent Python workspace, runs background sub-agents and rewrites a playbook of lessons from its own runs.",
    tags: ["Python", "coding agent", "self-improving", "playbook"],
    links: [{ label: "github", href: "https://github.com/kartikg-gk/rlmagent" }],
    what: "rlmagent is a coding agent for the terminal and the editor. It does its work by writing Python in a workspace whose state survives from step to step, hands pieces of a task to sub-agents, and asks before it changes anything. After a run it reviews itself and writes what it learned into a playbook that later runs start from.",
    how: [
      "Code cells, not one-off tool calls. The agent reads, searches, edits, patches and runs commands from Python in a persistent workspace, with file access confined to the project and checkpoint recovery when the sandbox restarts.",
      "A playbook that edits itself. Updates are queued at the end of a turn and checked every 5 finished tasks, after compaction, and after any task with 3 or more failed tool calls. A lesson saved automatically is dropped 3 tasks later unless a later edit keeps it, because it describes one moment of the work.",
      "Approvals tied to content. Writes, edits and shell commands go through an approval policy, with a unified diff shown first. A file that changed while approval was pending must be read again. Headless runs deny changes by default, and /undo rolls back files and saved variables.",
      "Background agents. spawn() starts a sub-agent and returns a handle with result, status, send, messages and cancel. Persistent agents keep their variables between questions, and depth, call, cost, live-agent and time limits cover the whole tree.",
      "A terminal UI that shows the work: one row per agent step with its code and output, sub-agents indented under their parent, a run dashboard, a diff view of what the session changed and a task list.",
      "Works in editors over the Agent Client Protocol, and can use Codex, Claude Code and other agents as models, alongside OpenAI, Anthropic, OpenRouter, Gemini, Mistral, Azure, Vertex and Ollama.",
      "Every saved session writes an events file with the generated code, outputs, tool results and per-call token usage, and session view replays it.",
    ],
    note: "The improvement loop is verified end to end on one example. Measuring how much it helps in general is the next step.",
  },
  {
    slug: "rlmness",
    name: "RLMness",
    title: "RLMness: Recursive Language Model Runtime",
    year: "2026",
    summary:
      "A runtime for Recursive Language Models: the input lives in a Python REPL and the model writes code over it, delegating pieces to sub-agents inside shared WebAssembly sandboxes.",
    tags: ["Python", "WebAssembly", "recursive agents", "sandboxes"],
    links: [
      { label: "github", href: "https://github.com/kartikg-gk/rlm-ness" },
      { label: "paper", href: "https://arxiv.org/abs/2512.24601" },
      { label: "post", href: "https://x.com/kartikgsx/status/2105364951644897648" },
    ],
    image: { src: `${import.meta.env.BASE_URL}img/rlmness-arch.png`, alt: "How RLMness runs a recursive agent tree" },
    what: "An implementation of Recursive Language Models. Instead of stuffing a huge input into the context window, rlmness keeps it in a REPL as a variable. The model sees an opening preview, writes code to search and slice it, and delegates pieces to sub-agents whose answers come back as plain values.",
    how: [
      "With the WebAssembly sandbox the whole agent loop runs in Node: model calls, recursion, batches, background agents and the shared budget, with one Pyodide interpreter per agent in its own worker.",
      "Sandboxes share one Node host with isolated globals, about 45MB each instead of 122MB, so an eight-agent fan-out fits in about 400MB instead of about 1GB.",
      "Three runtimes: wasm (blocks network and host files), subprocess, or in-process for live tool objects.",
      "One budget across the agent tree: depth, calls, cost and live agents. A cheaper sub-model can serve the sub-agents.",
      "Sessions persist after every step, so a follow-up question starts with everything the first one built. Live dashboard, trace replay and a timeline view.",
      "From Python: solve() with your own functions as REPL tools and a JSON Schema the answer must match.",
    ],
    stats: [
      { value: "63%", label: "less memory per agent (122MB to 45MB)" },
      { value: "729", label: "tests" },
    ],
  },
  {
    slug: "rivet",
    name: "Rivet",
    title: "Rivet: Coding Agents in Parallel Worktrees",
    year: "2026",
    summary:
      "Runs Claude Code, Codex and local models in parallel, each in its own git worktree, with an orchestrator that spawns workers for the pieces of a larger task.",
    tags: ["TypeScript", "git worktrees", "orchestration", "coding agents"],
    links: [{ label: "github", href: "https://github.com/kartikg-gk/rivetcode" }],
    what: "Rivet runs several coding agents at once without them colliding. Each session gets its own git worktree, so parallel work never edits the same folder.",
    how: [
      "One agent per session, each in an isolated worktree, with Claude Code, Codex or a local model behind it.",
      "An orchestrator that can spawn worker sessions for the pieces of a larger task.",
      "It started as a task tree mapped onto nested worktree branches, with parents merging their children's work. I benchmarked it, then replaced the tree with one agent per session plus an orchestrator that spawns workers.",
    ],
  },
  {
    slug: "tevro",
    name: "Tevro",
    title: "Tevro: A Small Decision Model",
    year: "2026",
    summary:
      "A small open decision model: scores every option against the situation in one forward pass. Qwen3-0.6B layers with LoRA and a 26M-parameter head, 80.2% on held-out questions, runs on a laptop CPU.",
    tags: ["PyTorch", "Qwen3-0.6B", "LoRA", "decision model"],
    links: [
      { label: "github", href: "https://github.com/kartikg-gk/tevro" },
      { label: "model", href: "https://huggingface.co/kartikg1/tevro-decider" },
      { label: "post", href: "https://x.com/kartikgsx/status/2114764851470037406" },
    ],
    image: { src: `${import.meta.env.BASE_URL}img/tevro-arch.png`, alt: "How Tevro scores every option in one forward pass" },
    what: "Tevro makes one kind of call: given a situation, a question and options, pick one and say how confident it is. It reads every option against the situation in one forward pass, so the order of the options never changes the answer. It handles multiple choice, yes/no and rating-scale questions, and runs on a laptop CPU.",
    how: [
      "The first 20 layers of Qwen3-0.6B, with rank-8 LoRA on the last 14 retained layers, read the state, question and each option.",
      "A two-layer bidirectional post-head (about 26M parameters) weighs the options against each other and scores each one.",
      "Trained on a 250K-question decision dataset for 12,000 steps on an A100, at effective batch size 64.",
      "pip-installable, with tevro serve exposing a JEV-compatible /v1/systemone API. No GPU needed at inference.",
    ],
    stats: [
      { value: "80.2%", label: "accuracy on 5,000 held-out questions" },
      { value: "98%", label: "right when at least 95% confident" },
      { value: "0.953", label: "yes/no AUC" },
    ],
    note: "On the public JevBench it scores 57.6% (133 of 231): 97.9% easy, 66.7% standard, 34.2% hard. Fitting its training distribution did not carry over to the hardest questions. Confidence is not calibrated, per the model card.",
  },
  {
    slug: "smollm-arxiv",
    name: "SmolLM arXiv",
    title: "SmolLM arXiv: Pre-Training to DPO on a Free GPU",
    year: "2026",
    summary:
      "Continued pre-training, SFT and DPO on SmolLM-135M for arXiv text, every stage on one free Colab T4, with each model published on Hugging Face.",
    tags: ["PyTorch", "LoRA", "DPO", "post-training"],
    links: [
      { label: "dpo model", href: "https://huggingface.co/kartikg1/smollm-arxiv-dpo" },
      { label: "sft model", href: "https://huggingface.co/kartikg1/smollm-arxiv-sft" },
      { label: "sft data", href: "https://huggingface.co/datasets/kartikg1/smollm-arxiv-sft-data" },
    ],
    what: "A full post-training pipeline that adapts a 135M-parameter base model to scientific writing and instruction following. Each stage builds on the previous stage's artifact on the Hub.",
    how: [
      "Continued pre-training on arXiv articles with LoRA over attention, MLP, embeddings and the LM head. At 135M the embeddings are a big share of the model, so letting them move (at a lower learning rate) is what shifts the domain.",
      "An instruction dataset generated from arXiv passages with a Qwen2.5-1.5B teacher.",
      "The pre-training adapter is merged, then LoRA SFT with ChatML and loss masked to the assistant turn.",
      "DPO on chosen/rejected pairs with a low learning rate, beta 0.1 and one epoch to stay close to the SFT policy, then GGUF export.",
    ],
    stats: [
      { value: "135M", label: "parameters" },
      { value: "1", label: "free T4 GPU" },
    ],
    note: "At this scale DPO is a nudge, not a rewrite. Answers grounded in a passage improve; free-form summaries still hallucinate.",
  },
  {
    slug: "splatbench",
    name: "SplatBench",
    title: "SplatBench: A 3D Reconstruction Environment",
    year: "2026",
    summary:
      "A procedural 3D reconstruction and reassembly environment for Prime Verifiers, published on the Prime Intellect Environments Hub.",
    tags: ["RL environment", "Prime Verifiers", "3D reconstruction", "evals"],
    links: [
      {
        label: "environments hub",
        href: "https://app.primeintellect.ai/dashboard/environments/kartik1/splatbench-prime",
      },
    ],
    what: "SplatBench is a procedural 3D reconstruction and reassembly environment built for Prime Verifiers and published on the Prime Intellect Environments Hub, where agents can be evaluated and trained against it.",
    how: [],
  },
];
