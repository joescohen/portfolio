/* =====================================================================
   Journey chapters — structured content.

   The page renders chapters from this array. Each Chapter is a sequence
   of typed Blocks. A Block tells <Chapter /> what to render and with
   what props. Add a new variant by extending the Block discriminated
   union and adding a case in <Chapter />.
   ===================================================================== */

export type DiagramKey =
  | 'v-model'
  | 'v-model-agent-mapping'
  | 'recursive-loop'
  | 'platform-architecture'

export interface ProjectCardData {
  title: string
  year: string
  /**
   * A description body — either a single string or a list of paragraph
   * strings rendered in order. Sub-sections (What happened / How it works
   * / The pattern / Architecture) are nested below.
   */
  description?: string | string[]
  /**
   * Sub-sections rendered after `description`. Each has a label
   * (rendered as a mono uppercase eyebrow) and one or more blocks of
   * content — either paragraphs or bullet items.
   */
  sections?: ProjectCardSection[]
  /**
   * Optional internal link. If present, renders the footer link.
   */
  link?: {
    label: string
    to: string
  }
}

export interface ProjectCardSection {
  label: string
  /** Plain paragraphs to render under the label. */
  paragraphs?: string[]
  /**
   * Bullet items, used for "How it works" / "Architecture" / "The pattern".
   * Each entry can carry a leading bolded label followed by descriptive text.
   */
  items?: { lead?: string; body: string }[]
}

/**
 * Block-type taxonomy. <Chapter /> uses this discriminated union to
 * render each piece of chapter content.
 */
export type Block =
  | { kind: 'paragraph'; text: string }
  | { kind: 'paragraph-emphasis'; text: string } // closing chapter para — italicised / larger
  | { kind: 'project-card'; card: ProjectCardData }
  | { kind: 'diagram'; diagram: DiagramKey; caption?: string }
  | { kind: 'key-insight'; text: string }
  | { kind: 'subheading'; text: string }
  | { kind: 'priority-list'; items: { heading: string; body: string }[] }
  | { kind: 'contact-block'; entries: { label: string; value: string; href: string }[] }

export interface Chapter {
  id: string
  number: string // e.g. "01"
  label: string  // e.g. "CHAPTER 01 · 2019–2023"
  navLabel: string // short label for ProgressRail
  title: string
  hook: string
  blocks: Block[]
}

/* ----------------------------------------------------------------------
   Hero copy
   ---------------------------------------------------------------------- */

export const heroContent = {
  label: 'THE JOURNEY',
  title: 'From systems engineering to AI agent architecture.',
  lead: 'This is the story of how a decade of large-system engineering turned out to be the right preparation for building AI agents. Seven chapters, six years, and one operating principle that ties every project worth doing back to the same thing — converting tacit judgment into systems that act on it.',
  meta: '~12 MIN READ · LAST UPDATED MAY 2025',
  scrollCueLabel: 'Begin',
  scrollCueAnchor: '#foundation',
}

/* ----------------------------------------------------------------------
   Chapters
   ---------------------------------------------------------------------- */

export const chapters: Chapter[] = [
  /* ============================ Chapter 1 ============================ */
  {
    id: 'foundation',
    number: '01',
    label: 'CHAPTER 01 · 2019–2023',
    navLabel: 'Foundation',
    title: 'The foundation.',
    hook: 'Before AI entered the picture, I spent years learning how to decompose complex systems, verify the pieces work, and validate that the whole serves its purpose. That discipline doesn’t go away when the system is made of language models instead of hardware.',
    blocks: [
      {
        kind: 'paragraph',
        text: 'Systems engineering is, at its core, a discipline for managing complexity that would otherwise be unmanageable. You take a need that exists in the real world — a satellite that has to survive launch, an autonomous vehicle that has to make a safety-critical decision in fifty milliseconds, a power plant that has to run for forty years without failure — and you decompose it into pieces small enough that human engineers can actually build them. Then you reconstruct the pieces and prove that the whole thing works.',
      },
      {
        kind: 'paragraph',
        text: 'That’s the V-model in one sentence. Decompose down the left side. Build up the right. Verification flows back across every level.',
      },
      {
        kind: 'paragraph',
        text: 'I learned this discipline in MEng Systems Engineering at Johns Hopkins, then practiced it for six years at Northrop Grumman on large-system Integration and Test campaigns — payload integration, subsystem architecture, CDR delivery under real schedule pressure. The artifacts were SysML models in Cameo, requirements traced in DOORS, test plans that mapped every shall-statement to a verification method, peer reviews where adversarial questioning was the point.',
      },
      {
        kind: 'paragraph',
        text: 'What I didn’t realize at the time was that I was building a mental operating system — a way of converting tacit judgment into reusable process. The instincts I developed — *decompose before you build; trace everything; verify before you trust; assume your tests are incomplete* — would turn out to apply far beyond hardware-software systems.',
      },
      {
        kind: 'project-card',
        card: {
          title: 'Model-Based Systems Engineering Capstone',
          year: '2019',
          description:
            'A capstone project applying SysML and Cameo Systems Modeler to a complex system architecture, with full requirements traceability through DOORS. The deliverable was less interesting than the discipline it forced — model-based thinking, where every system element exists in a structured relationship to every other, became the lens for everything that came after.',
          link: { label: 'See the MBSE Capstone', to: '/projects/angars' },
        },
      },
      {
        kind: 'project-card',
        card: {
          title: 'Integration & Test — Large Systems',
          year: '2019–2025',
          description:
            'Six years as Subsystem Deputy Architect and I&T lead at Northrop Grumman. Test planning, interface verification, anomaly resolution, peer review under pressure. Led 40 engineers across concurrent I&T campaigns through ATP and TVAC milestones; built a Cameo MBSE tool suite from scratch that compressed months of documentation into days. The discipline transfers wherever complexity has to be managed reliably.',
        },
      },
      {
        kind: 'diagram',
        diagram: 'v-model',
        caption: 'Fig. 1 — The V-model. Decomposition flows down the left, integration up the right, verification across.',
      },
      {
        kind: 'paragraph-emphasis',
        text: 'I didn’t yet know how this would translate. But the patterns were there, waiting for a problem that fit them.',
      },
    ],
  },

  /* ============================ Chapter 2 ============================ */
  {
    id: 'first-contact',
    number: '02',
    label: 'CHAPTER 02 · 2023–2024',
    navLabel: 'First Contact',
    title: 'First contact.',
    hook: 'Like everyone, I started by typing questions into a chat box. Unlike most people, I kept trying to shove it into systems that weren’t designed for it.',
    blocks: [
      {
        kind: 'paragraph',
        text: 'The first wave of AI usage looked the same for almost everyone I know. ChatGPT for debugging. Quick explanations of unfamiliar concepts. Help with writing. It was useful but not transformative — a faster reference, not a different way of working.',
      },
      {
        kind: 'paragraph',
        text: 'I wanted more than that. I’d seen what AI could do in demo videos and I couldn’t shake the feeling that there was a deeper integration available if I could just find the right seam.',
      },
      {
        kind: 'paragraph',
        text: 'So I tried to plug it directly into the tools I used every day.',
      },
      {
        kind: 'project-card',
        card: {
          title: 'GPT-4o as a Cameo plugin',
          year: '2024',
          description:
            'An attempt to integrate GPT-4o into the MBSE workflow by having it operate directly on raw Cameo system model files. The idea: if I could give the model write access to the underlying file structure, it could automate the tedious parts of model editing — propagating changes, fixing broken references, restructuring diagrams.',
          sections: [
            {
              label: 'What happened',
              paragraphs: [
                'It didn’t work. Cameo’s internal format is XML-adjacent markup with embedded styling and tool-specific bindings. There is no clean programmatic interface. The model could produce text that looked like Cameo file content, but the actual file format is intolerant of even minor structural drift. Every attempt left the file corrupted in ways that took longer to fix than the original task would have taken to do by hand.',
              ],
            },
            {
              label: 'What it taught',
              paragraphs: [
                'AI doesn’t slot into existing tools by force. The integration point matters more than the capability. The right move isn’t to brute-force AI into a workflow that wasn’t designed for it — it’s to build a new workflow where AI is a first-class component from the start. This lesson is why everything I built after this is purpose-built rather than retrofit.',
              ],
            },
          ],
        },
      },
      {
        kind: 'paragraph',
        text: 'After the Cameo attempt, I plateaued. For most of 2024, I used AI the way most people did — as a slightly smarter search engine. The transformative version felt like it required either a research lab or a different kind of problem than the ones I was bringing to it.',
      },
      {
        kind: 'paragraph-emphasis',
        text: 'The problem I was missing wasn’t capability. It was scope. I was asking AI to help with discrete tasks. The unlock came when I started asking it to help build entire systems.',
      },
    ],
  },

  /* ============================ Chapter 3 ============================ */
  {
    id: 'the-click',
    number: '03',
    label: 'CHAPTER 03 · EARLY 2025',
    navLabel: 'The Click',
    title: 'The click.',
    hook: 'The hardest part was never the building. It was figuring out what to build. Once I found a real problem — one I actually had — everything changed.',
    blocks: [
      {
        kind: 'paragraph',
        text: 'My girlfriend and I are going to Italy in September. We’ve been planning the trip on and off for months, and I kept getting frustrated with every travel planning app I tried. They were either too rigid (pick from these prebuilt itineraries) or too loose (here’s a blank Google Doc, good luck). What I wanted was something that could ingest the messy, fragmented way real trip planning actually works — a confirmation email here, a screenshot of a recommendation there, a half-formed thought about a town someone mentioned — and turn it into a structured itinerary I could actually use.',
      },
      {
        kind: 'paragraph',
        text: 'So I built it.',
      },
      {
        kind: 'project-card',
        card: {
          title: 'Voyage — an AI-native travel planning app',
          year: 'Early 2025',
          description:
            'A full-stack travel planner built with Claude Code. React frontend, Node backend, persistent storage, multi-user support. The features that mattered: an itinerary builder where you drop in places and the system organizes them by day; a map view that plots every itinerary item geographically; intelligent routing suggestions based on distance and transportation between stops; booking and reservation tracking integrated into the timeline; and the critical piece — an embedded AI chat interface that reads and writes to the same data the UI displays.',
          sections: [
            {
              label: 'What made it different',
              paragraphs: [
                'The AI isn’t a sidebar feature. It’s the input mechanism. You can paste a raw email confirmation into the chat and the system extracts the booking, locates it on the map, and slots it into the right day. You can ask it to find gaps in your itinerary, suggest restaurants near a hotel, or restructure your days for better flow. The chat operates on the application’s actual state, not in a separate context.',
              ],
            },
          ],
          link: { label: 'See the Voyage build', to: '/projects/voyage' },
        },
      },
      {
        kind: 'paragraph',
        text: 'Voyage taught me two things — one obvious, one important.',
      },
      {
        kind: 'paragraph',
        text: 'The obvious lesson: Claude Code changes what’s possible for a solo builder. The speed and scope of what I could ship working alone, in evenings, was different in kind from anything I’d built before. I’d written software before. This wasn’t that.',
      },
      {
        kind: 'paragraph',
        text: 'The important lesson came in the form of frustration.',
      },
      {
        kind: 'paragraph',
        text: 'The AI was great at building features. It was bad at noticing when those features were broken. UI states drifted out of sync with backend data. Visual bugs that I’d catch instantly took half a dozen turns of prompting for the model to even acknowledge. I found myself in a strange role: not the engineer building the system, not really the user, but a kind of permanent test operator, manually verifying every change.',
      },
      {
        kind: 'key-insight',
        text: 'If I’m acting as the test engineer for every bug, I haven’t actually leveraged AI — I’ve just built a faster way to create things that need me to verify them. The verification layer was the missing piece.',
      },
      {
        kind: 'paragraph-emphasis',
        text: 'That sentence — *the verification layer was the missing piece* — is the moment everything else started.',
      },
    ],
  },

  /* ============================ Chapter 4 ============================ */
  {
    id: 'process',
    number: '04',
    label: 'CHAPTER 04 · MID 2025',
    navLabel: 'Process Discovery',
    title: 'Process discovery.',
    hook: 'The travel app worked. Mostly. But “mostly” isn’t how I was trained to think. In systems engineering, “mostly works” means you haven’t finished verification. So I started building the verification layer — and realized I was designing agent architectures using the same playbook I’d used on large-system programs.',
    blocks: [
      {
        kind: 'paragraph',
        text: 'I started reading about Claude Code skills — defined, reusable processes that an AI agent can follow. Skills sit at a level above prompts: they’re not “ask the model to do X,” they’re “here is the structured procedure the model should follow when invoked.” Reading the documentation, the concept clicked immediately. *This is a process spec. This is how SE programs define their own verification procedures.*',
      },
      {
        kind: 'paragraph',
        text: 'So I built one.',
      },
      {
        kind: 'project-card',
        card: {
          title: 'System Validator — the first skill',
          year: 'Mid 2025',
          description:
            'A Claude Code skill designed to systematically validate a web application. Instead of ad-hoc bug-hunting prompts, the skill applies a structured verification campaign with defined phases.',
          sections: [
            {
              label: 'How it works',
              items: [
                {
                  lead: 'Intake agent.',
                  body: 'Analyzes the application’s current state and derives a set of requirements and user needs — what would someone using this app expect to do? What are the functional threads? This is the ConOps / stakeholder needs phase, translated into an AI context.',
                },
                {
                  lead: 'Planning agent.',
                  body: 'Takes those needs and generates structured test cases. Every test traces back to a need. This is test planning — not random exploration, but methodical coverage.',
                },
                {
                  lead: 'Executor agent.',
                  body: 'Follows the test procedures. Clicks through the application systematically, tests edge cases, tries to break things, documents findings. Test execution — repeatable, recorded, traceable.',
                },
                {
                  lead: 'Report output.',
                  body: 'Structured findings traced to requirements, categorized by severity, actionable.',
                },
              ],
            },
          ],
          link: { label: 'See the System Validator build', to: '/projects/cei' },
        },
      },
      {
        kind: 'paragraph',
        text: 'I built it, ran it against Voyage, and watched it work — and as I watched, I realized I’d just implemented the V-model.',
      },
      {
        kind: 'paragraph',
        text: 'Not a metaphor for the V-model. The V-model. Decompose stakeholder needs into requirements. Plan verification against those requirements. Execute the verification systematically. Report findings with traceability. This is the same process I’d used on large-system programs where failure isn’t an option. The medium changed; the discipline didn’t.',
      },
      {
        kind: 'diagram',
        diagram: 'v-model-agent-mapping',
        caption: 'Fig. 2 — SE V-model (left) mapped to the agent pipeline (right). The disciplines mirror.',
      },
      {
        kind: 'key-insight',
        text: 'Stakeholder needs analysis maps to agent requirements definition. Functional decomposition maps to agent role architecture. Interface control maps to structured handoffs. V&V planning maps to eval design. The mappings aren’t loose analogies. They’re the same patterns operating on different substrates.',
      },
      {
        kind: 'paragraph',
        text: 'The first version of System Validator worked. It caught real bugs in Voyage that I’d missed. It produced structured reports I could act on.',
      },
      {
        kind: 'paragraph-emphasis',
        text: 'It also missed things. Obvious things. Categories of issues that a junior I&T engineer would have caught on their first day. The process was right — but the coverage model was incomplete. That gap is the subject of the next chapter.',
      },
    ],
  },

  /* ============================ Chapter 5 ============================ */
  {
    id: 'recursive',
    number: '05',
    label: 'CHAPTER 05 · MID 2025',
    navLabel: 'Recursive Learning',
    title: 'Recursive learning.',
    hook: 'The system validator worked — but it still missed things I wouldn’t have missed. The question wasn’t “what did it miss?” It was “why does it keep missing that kind of thing?” Fixing the instance is a patch. Fixing the category is learning.',
    blocks: [
      {
        kind: 'paragraph',
        text: 'Every SE program runs lessons learned reviews. The point isn’t to fix the specific failure that just happened — it’s to identify the underlying category of failure and update the process so the same class of issue can’t recur. When a test misses a defect, you don’t just add the missed defect to the test. You ask: *what dimension of the system was my test not covering? How do I extend the coverage model so the next test catches not just this issue, but the whole category it represents?*',
      },
      {
        kind: 'paragraph',
        text: 'That’s the question I started asking about my own skills.',
      },
      {
        kind: 'project-card',
        card: {
          title: 'Skill Auditor — a meta-skill for recursive improvement',
          year: 'Mid 2025',
          description:
            'A skill that sits on top of any other skill (initially System Validator) and attempts to close categorical gaps in the underlying skill’s coverage. When System Validator misses something it should have caught, Skill Auditor examines the miss, identifies the dimension that was missed (not just the instance), and modifies the underlying skill’s process to address that dimension. Then it re-runs the original skill — without telling it the specific miss — to see whether fixing the systematic problem also resolves the specific manifestation.',
          sections: [
            {
              label: 'The pattern',
              items: [
                { body: 'Take the artifact that was missed (the thing the skill should have caught but didn’t).' },
                { body: 'Compare it against the current implementation of the skill.' },
                { body: 'Look up one or two levels of abstraction — what *dimension* was missed, not just what *instance*?' },
                { body: 'Modify the skill’s process to address the dimension.' },
                { body: 'Re-run the original skill. Did the fix generalize, or did it only patch the specific case?' },
              ],
            },
          ],
          link: { label: 'See the Skill Auditor build', to: '/projects/cei' },
        },
      },
      {
        kind: 'diagram',
        diagram: 'recursive-loop',
        caption: 'Fig. 3 — Recursive learning loop. Branches on whether the fix generalises or only patches the case.',
      },
      {
        kind: 'paragraph',
        text: 'This is the meta-problem every SE program deals with: *how do you verify your verification?* You can have a perfect test plan that systematically misses one category of failure, and no amount of running the test plan will reveal the gap. The only way out is a process that examines its own coverage and updates itself.',
      },
      {
        kind: 'paragraph',
        text: 'The pattern works conceptually. The implementation is incomplete.',
      },
      {
        kind: 'paragraph',
        text: 'The hard part — the part I’m still working through — is the scoring function. How do I know, in an automated way, that a patched skill is actually better than the unpatched version? Not just that it caught the specific thing it missed, but that it didn’t introduce regressions, didn’t overcorrect, didn’t optimize for one dimension at the cost of another? This is the eval problem, and it’s where my work intersects with what the broader AI field is actively trying to solve.',
      },
      {
        kind: 'key-insight',
        text: 'Recursive learning without reliable evaluation is just recursive guessing. The bottleneck isn’t the loop — it’s the scoring function inside the loop.',
      },
      {
        kind: 'paragraph-emphasis',
        text: 'That recognition is what set up the current phase.',
      },
    ],
  },

  /* ============================ Chapter 6 ============================ */
  {
    id: 'platform',
    number: '06',
    label: 'CHAPTER 06 · CURRENT',
    navLabel: 'The Platform',
    title: 'The platform.',
    hook: 'Everything before this was building toward a question: what if you applied this thinking — layered verification, structured agent roles, recursive improvement — not to a web app, but to the systems engineering process itself?',
    blocks: [
      {
        kind: 'paragraph',
        text: 'System Validator validated a web app. Skill Auditor tried to improve System Validator. The next layer up is the one I’ve been building toward: a platform that applies this entire pattern to the systems engineering process — to the requirements documents, ConOps, interface control documents, and test procedures that define real engineering programs.',
      },
      {
        kind: 'paragraph',
        text: 'The architecture has three layers.',
      },
      {
        kind: 'project-card',
        card: {
          title: 'SE Validation Platform (in development)',
          year: 'Current',
          description:
            'A multi-layered platform that applies LLM-powered validation to systems engineering documentation across the SE lifecycle.',
          sections: [
            {
              label: 'Architecture',
              items: [
                {
                  lead: 'Layer 0 — Skills.',
                  body: 'Individual validation skills, each designed for a specific document type or check: requirements validator, ConOps validator, ICD cross-checker, traceability auditor, and others. Modular and configurable. Each skill is small enough to be reliably testable on its own.',
                },
                {
                  lead: 'Layer 1 — Engine.',
                  body: 'The orchestration layer. Runs configured skills against documentation through a structured validation pipeline. The novel piece is the archetype debate pattern: rather than a single agent reviewing a document, multiple agents with different roles examine it turn by turn. A defender argues for the document’s adequacy. An auditor watches for process compliance. A cross-checker validates against related documents. An observer monitors review quality. This mirrors how real SE review boards work — diverse perspectives catch different classes of issues.',
                },
                {
                  lead: 'Layer 2 — Program.',
                  body: 'The program-level layer that orchestrates multiple skills across multiple documents. Uses retrieval-augmented generation over a full document repository — vectorized embeddings, hybrid search, metadata-filtered retrieval — to enable cross-document validation. Maps to SE lifecycle milestones, since different documentation fidelity is required at different stages of a program.',
                },
              ],
            },
          ],
          link: { label: 'See the SE Platform architecture', to: '/projects/sepal' },
        },
      },
      {
        kind: 'diagram',
        diagram: 'platform-architecture',
        caption: 'Fig. 4 — Three layers: Skills (L0) feed Engine (L1); Engine reports up to Program (L2) over a RAG corpus.',
      },
      {
        kind: 'paragraph',
        text: 'The platform is in active development. Layer 0 skills are being built and evaluated. Layer 1 engine is in progress. Layer 2 is designed but waits on reliable Layer 0/1 performance — building program-level RAG on top of unreliable skills would compound failures.',
      },
      {
        kind: 'paragraph',
        text: 'The reason I’m building this — the reason it feels worth doing — is that almost nobody is approaching it from this angle. There are SE tool vendors adding AI features. There are AI startups building general-purpose agent frameworks. The intersection — someone with real V&V discipline on one side and real AI architecture understanding on the other — is mostly empty space.',
      },
      {
        kind: 'key-insight',
        text: 'The gap in AI right now isn’t people who can prompt a model. It’s people who can architect systems of models that work reliably under real conditions. That’s integration and test. That’s systems engineering.',
      },
    ],
  },

  /* ============================ Chapter 7 ============================ */
  {
    id: 'next',
    number: '07',
    label: 'CHAPTER 07 · ONGOING',
    navLabel: 'What’s Next',
    title: 'What’s next.',
    hook: 'The journey isn’t a destination. It’s an operating principle that keeps producing the next problem worth solving.',
    blocks: [
      {
        kind: 'paragraph',
        text: 'Looking back, the four projects in this journey — Voyage, System Validator, Skill Auditor, SEPAL — aren’t separate pursuits that happen to share a thread. They’re expressions of the same operating principle, the one I had been practicing for years inside an MBSE environment without yet having a name for it.',
      },
      {
        kind: 'key-insight',
        text: 'Executable judgment: convert tacit expertise into systems that act with it, evaluate whether those systems actually work, and capture every lesson so the next version starts stronger than the last.',
      },
      {
        kind: 'paragraph',
        text: 'That principle is the filter I now use to decide what’s worth building. A project earns its place if it externalizes useful judgment, produces an inspectable artifact, carries its own evaluation loop, and compounds into future work. Voyage taught me where verification fails when AI is the builder. System Validator and Skill Auditor turned that lesson into reusable infrastructure. SEPAL applies the whole pattern to the engineering process itself. Each project is the next compounding step.',
      },
      {
        kind: 'subheading',
        text: 'The work in front of me, in order of priority',
      },
      {
        kind: 'priority-list',
        items: [
          {
            heading: 'Evaluation infrastructure.',
            body: 'The single highest-leverage thing I can build right now is a real eval harness for SEPAL’s skills. Without measurable ground truth, every claim about whether a skill is improving is a guess. With it, the platform becomes verifiable in the same way the large-system programs I worked on professionally were verifiable. This is the V&V problem of my own work, and the SE discipline applies to it directly.',
          },
          {
            heading: 'One skill, all the way to reliability.',
            body: 'Before scaling to a full library of skills, I’m taking the Requirements Validator end-to-end: structured input parsing, defect taxonomy, eval harness, reliability metrics. One bulletproof skill is more valuable than five fragile ones. The pattern that proves out on Requirements Validator becomes the template for everything else.',
          },
          {
            heading: 'Retrieval at the program layer.',
            body: 'L2’s value depends on retrieval working well across heterogeneous SE documents. Chunking strategies that respect requirement boundaries, metadata schemas that enable traceability filtering, hybrid search that handles both semantic queries and exact-match lookups (SYS-REQ-042 is not a fuzzy concept). This is where the platform either becomes powerful or becomes plausible-looking but unreliable.',
          },
          {
            heading: 'Public work.',
            body: 'Writing about the SE ↔ AI mapping. Publishing the architecture. Putting the thinking into the world so the work is visible to the people it should reach.',
          },
        ],
      },
      {
        kind: 'paragraph',
        text: 'Beyond that, the longer-term questions stay open. Whether this becomes a tool I bring into a role at an organization that takes review-board rigor seriously, a product sold to teams that run formal engineering processes, or a startup I commit to fully — those decisions follow from what the platform demonstrates. Right now, the priority is building something that works. The business model question is downstream of the engineering result.',
      },
      {
        kind: 'paragraph-emphasis',
        text: 'If you’re working at the intersection of rigorous systems engineering and reliable AI architecture — or think you should be — I want to talk. That’s where the most important unsolved problems live, and there’s room for more people in it than are currently occupying it.',
      },
      {
        kind: 'contact-block',
        entries: [
          { label: 'email', value: 'jsc6121@gmail.com', href: 'mailto:jsc6121@gmail.com' },
          { label: 'linkedin', value: '/in/josephscohen', href: 'https://www.linkedin.com/in/josephscohen' },
          { label: 'github', value: '/joescohen', href: 'https://github.com/joescohen' },
        ],
      },
    ],
  },
]
