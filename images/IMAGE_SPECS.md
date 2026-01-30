# Project image specs (4–5 images per project)

Use these descriptions in **Canva** or **Figma** to create visuals. Save exports into the folder listed for each project.

**SVG placeholders:** Each project folder already contains 4–5 SVG placeholders (wireframe-style illustrations) you can use on the site or replace with your own PNG/JPG exports.

---

## 1. Poll Management System (Talentica)

**Folder:** `images/poll-management-system/`

| # | Filename | Description |
|---|----------|-------------|
| 1 | `dashboard.png` | Dashboard: sidebar nav, list of active polls with titles and vote counts, real-time stat cards (total votes, participation %). Blue/white, card layout. |
| 2 | `create-poll.png` | Poll creation form: title field, dynamic question builder, add/remove options, single vs multiple choice toggle. Clean form, subtle shadows. |
| 3 | `rbac.png` | Role-based access: admin panel with roles (Admin, Creator, Voter), permissions table or badges. Dashboard style, blue accents. |
| 4 | `analytics.png` | Poll results: bar chart + pie chart for vote distribution, percentages. Blue/gray palette, modern data viz. |
| 5 | `voting.png` | Voting screen: large option buttons, submit CTA. Shown as responsive (mobile + desktop) if desired. |

---

## 2. Julius Influencer Marketing Platform (Talentica / Triller)

**Folder:** `images/julius-influencer-platform/`

| # | Filename | Description |
|---|----------|-------------|
| 1 | `campaign-dashboard.png` | Campaign dashboard: list of campaigns, status (Draft/Live/Complete), metrics (reach, engagement). Dark or light UI, professional. |
| 2 | `influencer-discovery.png` | Influencer discovery: grid or list of creator cards (avatar, name, platform icons Instagram/TikTok/X), filters, search. |
| 3 | `content-ingestion.png` | Content ingestion flow: pipeline diagram or UI showing Stories/Posts ingestion (e.g. Phyllo), status per platform. |
| 4 | `analytics-reporting.png` | GraphQL-based reporting: payout/analytics table or chart, metrics (impressions, CPM, payouts). Dashboard style. |
| 5 | `microservices.png` | High-level architecture: boxes for NestJS microservices, Redis, RabbitMQ, Elasticsearch, AWS. Clean diagram style. |

---

## 3. Real-Time Chat Application (Talentica)

**Folder:** `images/real-time-chat-app/`

| # | Filename | Description |
|---|----------|-------------|
| 1 | `chat-rooms.png` | Chat UI: sidebar with rooms list, main area with message thread, input at bottom. Clean messaging app layout. |
| 2 | `auth-flow.png` | Auth flow: login screen or JWT flow diagram (REST + Socket.IO handshake). Minimal, professional. |
| 3 | `typing-presence.png` | Typing indicator and online presence: “User is typing…” and green dot or “Online” in a message view. |
| 4 | `schema.png` | Relational schema concept: icons or boxes for Users, Rooms, Memberships, Messages, Message_status. Simple diagram. |
| 5 | `websocket-arch.png` | Architecture: NestJS gateway, Socket.IO, Redis adapter, horizontal scaling. One-line diagram. |

---

## 4. FamO Money – FinTech Platform (Eternalight / FamO)

**Folder:** `images/famo-money-fintech/`

| # | Filename | Description |
|---|----------|-------------|
| 1 | `family-dashboard.png` | Family portfolio dashboard: total net worth, allocation (mutual funds, equities, real estate, gold). Cards or simple charts. |
| 2 | `onboarding.png` | Family onboarding flow: steps or screens for adding members, linking accounts. Clean wizard style. |
| 3 | `market-data.png` | Real-time market data: stock/NAV ticker or table, portfolio valuation, P&L. FinTech look. |
| 4 | `discussions.png` | Real-time discussions / messaging: thread or chat related to a deal or investment. Minimal UI. |
| 5 | `deal-digest.png` | Deal digest: list of deals (mutual funds, private deals), key fields. Table or card layout. |

---

## 5. Contract Note Parser (Eternalight / FamO)

**Folder:** `images/contract-note-parser/`

| # | Filename | Description |
|---|----------|-------------|
| 1 | `upload-pdf.png` | Upload screen: drag-and-drop or file picker for PDF contract notes. Simple, clean. |
| 2 | `pipeline.png` | Processing pipeline: PDF → AWS Textract (OCR) → LLM (OpenAI) → structured JSON. Flow diagram. |
| 3 | `extracted-data.png` | Extracted data table: columns for trade date, script, quantity, price, brokerage. Spreadsheet-like. |
| 4 | `validation.png` | Validation step: pass/fail or warning list before saving to DB. Minimal UI. |
| 5 | `accuracy.png` | Accuracy / impact: “>95% accuracy” and “>90% less manual entry” as a simple stat or infographic. |

---

## 6. Vehicle Crash Analytics Platform (SpringML)

**Folder:** `images/vehicle-crash-analytics/`

| # | Filename | Description |
|---|----------|-------------|
| 1 | `analytics-table.png` | Filterable analytics table: crash data columns, filters (date, region, severity), search. Clean table UI. |
| 2 | `filters-search.png` | Filters and debounced search: filter chips, search bar, “Export PDF” button. |
| 3 | `export-pdf.png` | Export to PDF: preview or “Report generated” screen with download. |
| 4 | `dashboard.png` | Overview dashboard: KPIs (total crashes, by region, by type), simple charts. GCP/cloud style. |

---

## 7. MGIC DocAI – Invoice Parser (SpringML)

**Folder:** `images/mgic-docai-invoice-parser/`

| # | Filename | Description |
|---|----------|-------------|
| 1 | `upload-invoice.png` | Invoice upload: drag-and-drop for PDF/images. Angular-style form. |
| 2 | `ai-extraction.png` | AI extraction: Vertex AI / Doc AI concept – document in, structured fields out. Icon or diagram. |
| 3 | `extracted-fields.png` | Extracted invoice data: vendor, date, line items, total. Table or form. |
| 4 | `pre-validation.png` | Pre-validation: checks before save, error/warning list. |
| 5 | `workflow.png` | End-to-end workflow: upload → AI → validation → DB. Simple horizontal flow. |

---

## 8. Cloud Infrastructure & Analytics (SpringML)

**Folder:** `images/cloud-infrastructure-analytics/`

| # | Filename | Description |
|---|----------|-------------|
| 1 | `gcp-iam.png` | GCP IAM: roles and permissions diagram or console-style view (least privilege). |
| 2 | `looker-dashboard.png` | Looker / Looker Studio dashboard: 2–3 widgets (chart, table, KPI). Clean BI style. |
| 3 | `infrastructure.png` | Cloud infrastructure: GCP components (VPC, buckets, BigQuery, etc.). High-level diagram. |
| 4 | `security.png` | Security / best practices: checklist or icons for IAM, encryption, audit. |
| 5 | `scalability.png` | Scalability: auto-scaling or load-balanced architecture sketch. |

---

## Export guidelines

- **Format:** PNG or JPG, 1200px wide (or 2x for retina).
- **Naming:** Use exact filenames above so existing references in the site keep working.
- **Style:** Consistent with your portfolio (e.g. same color palette, card style, typography).

After exporting, place files in the correct `images/<project-folder>/` path.
