# TRACEHER — AI-Powered Digital Safety & Evidence Intelligence Platform

> **"Your Digital Safety. Your Evidence. Your Control."**
> **Challenge:** InnovateHER | **Primary Track:** Safety & Accessibility | **Secondary Track:** Best AI Project

---

## 1. Product Overview

**TRACEHER** is an AI-powered cybersecurity and evidence intelligence platform engineered to help women and girls manage, understand, organize, and preserve digital harassment evidence.

Instead of a generic chatbot, period tracker, or emergency panic button, TRACEHER delivers a structured, stress-free digital safety workspace addressing:
- Cyberstalking & physical surveillance
- Direct threatening messages & intimidation
- Unauthorized profile cloning & impersonation
- Blackmail, sextortion, & non-consensual image distribution
- Coordinated multi-account harassment & nocturnal call barrages

---

## 2. End-to-End Workflow

```
[ Upload Evidence ]  ──>  [ SHA-256 Hashing ]  ──>  [ OCR Extraction ]
                                                            │
[ Generate PDF Dossier ] <── [ Privacy Redaction ] <── [ AI Threat Matrix & Graph ]
```

1. **Ingest & Hash:** Computes a 256-bit cryptographic digest (SHA-256) upon upload, locking byte-level custody integrity.
2. **OCR Extraction:** Extracts textual transcripts from screenshots with full character fidelity.
3. **Multi-Label AI Classification:** Assesses content across 8 harassment categories with calibrated explainability and supporting snippets.
4. **Relational Intelligence:** NetworkX builds interactive relationship graphs linking burner handles, VoIP numbers, and incident clusters.
5. **Privacy Guardian:** Dual-pane visual redaction tool enables non-destructive masking of sensitive phone numbers, emails, physical addresses, and avatars.
6. **Report Compilation:** Compiles court- and cyber-cell-ready PDF evidence dossiers using ReportLab, paired with verified links to India's National Cyber Crime Reporting Portal (`cybercrime.gov.in`) and 112 / 1930 helplines.

---

## 3. Tech Stack & Architecture

- **Frontend:**
  - React 19 + TypeScript + Vite
  - Tailwind CSS v4 custom palette (`#F7F8FC` primary bg, `#6556D9` purple brand, `#17172F` navy text)
  - Framer Motion animations & transitions
  - Lucide React icon system
  - Recharts for incident distribution and activity analytics
  - Multilingual localization: English, Malayalam (മലയാളം), Hindi (हिन्दी)
- **Backend:**
  - FastAPI (Python 3.12)
  - Pydantic v2 data models & validation
  - NetworkX for relational graph analysis
  - Pillow & Regex for entity detection and solid non-destructive image masking
  - ReportLab for official cryptographic PDF dossier generation
  - Pytest + HTTPX test suite

---

## 4. Quickstart & Installation

### Prerequisites
- Node.js v18+ and npm
- Python 3.10+ and uv / pip

### Running the Backend
```bash
cd backend
python -m venv .venv
# On Windows:
.\.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

pip install -r ../requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
API Documentation will be live at: `http://127.0.0.1:8000/docs`

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```
The application will launch at: `http://localhost:5173/`

### Running Automated Tests
```bash
cd backend
$env:PYTHONPATH="."
pytest -v
```

---

## 5. Judge Demonstration Workspace

TRACEHER includes a dedicated **Judge Demo Mode** preloaded with three fictional scenarios (no real victim data):
- **Scenario A: Online Threats & Extortion** (Location surveillance on MG Road, DM ultimatums, timeline, ReportLab PDF dossier).
- **Scenario B: Profile Impersonation** (Cloned Instagram profile, fraudulent solicitations, Privacy Guardian redaction, platform takedown protocol).
- **Scenario C: Repeated Multi-Account Harassment** (Multiple burner accounts, nocturnal call barrages, NetworkX relationship graph).

Click the **Judge Demo Mode** pill in the sidebar to test any scenario with one click, or use the **Reset Demo Data** button to return to the benchmark state.

---

## 6. Official Safety Resources (India)

- **National Cyber Crime Reporting Portal:** [https://cybercrime.gov.in](https://cybercrime.gov.in)
- **National Emergency Number:** `112`
- **National Cybercrime Helpline:** `1930`
- **Women Helpline (NCW):** `7827-170-170` | [https://ncw.nic.in](https://ncw.nic.in)
- **StopNCII.org:** [https://stopncii.org](https://stopncii.org)
