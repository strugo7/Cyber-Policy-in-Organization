# CyberScape Academy: Content Research Findings

## 1. NIST Cybersecurity Framework (CSF) 2.0
*Fundamental for Module 3 (NIST Citadel)*

### Core Functions & Categories
The "Six Pillars" of the updated framework:
1.  **GOVERN (GV)**: *The Strategy Center.*
    *   **Goal**: Establish organizational risk culture and policy.
    *   **Categories**: Organizational Context, Risk Management Strategy, Roles & Responsibilities, Policy.
2.  **IDENTIFY (ID)**: *The Asset Map.*
    *   **Goal**: Know what you have to protect.
    *   **Categories**: Asset Management (Hardware/Software), Risk Assessment, Supply Chain Risk.
3.  **PROTECT (PR)**: *The Shield.*
    *   **Goal**: Safeguards to ensure service delivery.
    *   **Categories**: Identity Management & Access Control, Awareness & Training, Data Security, Platform Security.
4.  **DETECT (DE)**: *The Radar.*
    *   **Goal**: Find incidents when they happen.
    *   **Categories**: Anomalies & Events, Continuous Security Monitoring, Adversary Discovery.
5.  **RESPOND (RS)**: *The Counter-Attack.*
    *   **Goal**: Take action regarding a detected incident.
    *   **Categories**: Incident Management, Analysis, Mitigation, Communication.
6.  **RECOVER (RC)**: *The Rebuild.*
    *   **Goal**: Restore assets and operations.
    *   **Categories**: Recovery Planning, Improvement (Lessons Learned), Communication.

### Implementation Tiers (Student Analogy)
*   **Tier 1 (Partial)**: "The Novice" - Reactive, ad-hoc, no real plan.
*   **Tier 2 (Risk Informed)**: "The Apprentice" - Aware of risks, but inconsistent execution.
*   **Tier 3 (Repeatable)**: "The Pro" - Policies are documented, updated, and followed organization-wide.
*   **Tier 4 (Adaptive)**: "The Elite" - Continuous improvement, adapting to new threats in real-time.

---

## 2. Threat Landscape 2025
*Content for Module 1 (Threat Zone) & Simulations*

### Top Threats
1.  **AI-Driven Phishing**: Attackers use GenAI to write perfect emails (no typos) and create deepfake voice/video for CEO fraud.
2.  **Ransomware 2.0**: "Double Extortion" - encrypting data AND threatening to leak it. Shift to targeting backup systems first.
3.  **Supply Chain Attacks**: Breaching a small vendor to get into a big target (e.g., HVAC vendor -> Target, SolarWinds).
4.  **"Quishing" (QR Phishing)**: Malicious QR codes in emails/PDFs to bypass standard URL filters.
5.  **MFA Fatigue**: Bombarding users with "Approve Login" notifications until they click "Yes" out of frustration.

---

## 3. Simulation Scenarios
*Blueprints for "The War Room"*

### Scenario A: Corporate Ransomware Attack
**Theme**: "The Golden Hour"
*   **Inject 1 (00:00)**: Users report slow file access.
*   **Inject 2 (00:15)**: "README_NOW.txt" appears on File Server. Demand: 50 BTC.
*   **Decision Point 1**: Disconnect Internet vs. Keep active to monitor?
    *   *Correct*: Disconnect immediately to stop spread.
*   **Inject 3 (00:30)**: attacker emails saying they have exfiltrated 500GB of customer data.
*   **Decision Point 2**: Contact Legal/PR vs. Reply to Attacker?
    *   *Correct*: Contact Legal/PR. Never negotiate without professional negotiators.
*   **Inject 4 (02:00)**: Media calls asking for comment.
*   **Decision Point 3**: "No Comment" vs. "Holding Statement"?
    *   *Correct*: Holding statement ("We are investigating..."). "No Comment" looks suspicious.

### Scenario B: Social Engineering Guantlet
**Theme**: "Trust No One"
1.  **The "Urgent" CEO Email**: Requesting a wire transfer for a "Secret Acquisition".
    *   *Red Flags*: Urgency, bypasses procedure, unusual sender domain (@company-c0rp.com).
2.  **The IT Support Call**: "We need to sync your MFA token, read me the code on your phone."
    *   *Red Flags*: IT never asks for token codes.
3.  **The "Shared Document"**: Email from Dropbox/DocuSign with a generic "View Invoice" link.
    *   *Red Flags*: Generic greeting, hovering link shows separate URL.
