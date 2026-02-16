#!/usr/bin/env node
/**
 * Injects floating navigation bar into all HTML files in public/pages/
 * Navigation includes: back to module link, lesson title, next lesson link
 */

const fs = require('fs');
const path = require('path');

// Mapping: html filename -> { moduleId, lessonTitle, prevLink, nextLink }
const NAV_MAP = {
    // Module 1: intro-and-threats
    'module-1-cyber-foundations-part-1.html': {
        moduleId: 'intro-and-threats', title: 'שיעור 2: משולש ה-CIA',
        prevLink: '/modules/intro-and-threats/?startLesson=0',
        nextLink: '/modules/intro-and-threats/?startLesson=2'
    },
    'module-1-threat-landscape-part-2.html': {
        moduleId: 'intro-and-threats', title: 'שיעור 3: נוף האיומים',
        prevLink: '/pages/module-1-cyber-foundations-part-1.html',
        nextLink: '/modules/intro-and-threats/?startLesson=3'
    },
    'module-1-interactive-cia-game-part-3.html': {
        moduleId: 'intro-and-threats', title: 'שיעור 4: תקיפות סייבר היסטוריות',
        prevLink: '/modules/intro-and-threats/?startLesson=2',
        nextLink: '/'
    },

    // Module 2: governance
    'govern-corporate-strategy-core-part-1.html': {
        moduleId: 'governance', title: 'שיעור 1: אסטרטגיית סייבר',
        prevLink: '/modules/governance/',
        nextLink: '/pages/data-shield-awareness-part-2.html'
    },
    'data-shield-awareness-part-2.html': {
        moduleId: 'governance', title: 'שיעור 2: מדיניות ונהלים',
        prevLink: '/pages/govern-corporate-strategy-core-part-1.html',
        nextLink: '/pages/risk-assessment-heatmap-part-2.html'
    },
    'risk-assessment-heatmap-part-2.html': {
        moduleId: 'governance', title: 'שיעור 3: ניהול נכסים',
        prevLink: '/pages/data-shield-awareness-part-2.html',
        nextLink: '/pages/the-boardroom-simulator-ceo-mode-part-3.html'
    },
    'the-boardroom-simulator-ceo-mode-part-3.html': {
        moduleId: 'governance', title: 'שיעור 4: פונקציית Govern',
        prevLink: '/pages/risk-assessment-heatmap-part-2.html',
        nextLink: '/'
    },

    // Module 3: nist-framework
    'nist-2.0-the-six-functions-part-1.html': {
        moduleId: 'nist-framework', title: 'שיעור 1: סקירת NIST',
        prevLink: '/modules/nist-framework/',
        nextLink: '/pages/nist-implementation-profiles-tiers-part-2.html'
    },
    'nist-implementation-profiles-tiers-part-2.html': {
        moduleId: 'nist-framework', title: 'שיעור 2: מבנה הליבה',
        prevLink: '/pages/nist-2.0-the-six-functions-part-1.html',
        nextLink: '/pages/nist-practice-action-matching-part-3.html'
    },
    'nist-practice-action-matching-part-3.html': {
        moduleId: 'nist-framework', title: 'שיעור 3: פרופילים ושכבות',
        prevLink: '/pages/nist-implementation-profiles-tiers-part-2.html',
        nextLink: '/pages/organization-classification-wizard-part-3.html'
    },
    'organization-classification-wizard-part-3.html': {
        moduleId: 'nist-framework', title: 'שיעור 4: יישום NIST',
        prevLink: '/pages/nist-practice-action-matching-part-3.html',
        nextLink: '/pages/israel-cyber-doctrine-dashboard-part-1.html'
    },
    'israel-cyber-doctrine-dashboard-part-1.html': {
        moduleId: 'nist-framework', title: 'שיעור 5: דוקטרינת ההגנה הישראלית',
        prevLink: '/pages/organization-classification-wizard-part-3.html',
        nextLink: '/'
    },

    // Module 4: standards-compliance
    'global-compliance-hub-part-2.html': {
        moduleId: 'standards-compliance', title: 'שיעור 1: למה צריך תקנים?',
        prevLink: '/modules/standards-compliance/',
        nextLink: '/pages/identity-access-the-gatekeeper-part-1.html'
    },
    'identity-access-the-gatekeeper-part-1.html': {
        moduleId: 'standards-compliance', title: 'שיעור 2: ISO 27001',
        prevLink: '/pages/global-compliance-hub-part-2.html',
        nextLink: '/pages/risk-management-supply-chain-part-2.html'
    },
    'risk-management-supply-chain-part-2.html': {
        moduleId: 'standards-compliance', title: 'שיעור 3: GDPR',
        prevLink: '/pages/identity-access-the-gatekeeper-part-1.html',
        nextLink: '/pages/interactive-risk-calculator-part-3.html'
    },
    'interactive-risk-calculator-part-3.html': {
        moduleId: 'standards-compliance', title: 'שיעור 4: PCI-DSS & SOC2',
        prevLink: '/pages/risk-management-supply-chain-part-2.html',
        nextLink: '/'
    },

    // Module 5: nist-functions
    'identify-asset-management-radar-part-1.html': {
        moduleId: 'nist-functions', title: 'שיעור 1: פונקציית Identify',
        prevLink: '/modules/nist-functions/',
        nextLink: '/pages/protect-defense-in-depth-part-2-1.html'
    },
    'protect-defense-in-depth-part-2-1.html': {
        moduleId: 'nist-functions', title: 'שיעור 2: פונקציית Protect',
        prevLink: '/pages/identify-asset-management-radar-part-1.html',
        nextLink: '/pages/detect-soc-command-center-part-1.html'
    },
    'detect-soc-command-center-part-1.html': {
        moduleId: 'nist-functions', title: 'שיעור 3: פונקציית Detect',
        prevLink: '/pages/protect-defense-in-depth-part-2-1.html',
        nextLink: '/pages/the-security-lab-practice-part-3.html'
    },
    'the-security-lab-practice-part-3.html': {
        moduleId: 'nist-functions', title: 'שיעור 4: יישום הגנה',
        prevLink: '/pages/detect-soc-command-center-part-1.html',
        nextLink: '/'
    },

    // Module 6: global-cyber-policy
    'global-threat-hunting-map.html': {
        moduleId: 'global-cyber-policy', title: 'שיעור 1: מדיניות סייבר בסין',
        prevLink: '/modules/global-cyber-policy/',
        nextLink: '/pages/anomaly-detection-analytics-part-2.html'
    },
    'anomaly-detection-analytics-part-2.html': {
        moduleId: 'global-cyber-policy', title: 'שיעור 2: רוסיה ובריטניה',
        prevLink: '/pages/global-threat-hunting-map.html',
        nextLink: '/pages/cyber-wargame-crisis-simulation-part-3.html'
    },
    'cyber-wargame-crisis-simulation-part-3.html': {
        moduleId: 'global-cyber-policy', title: 'שיעור 3: Cyber Essentials',
        prevLink: '/pages/anomaly-detection-analytics-part-2.html',
        nextLink: '/'
    },

    // Module 7: respond-recover
    'respond-ir-war-room-playbooks-part-1.html': {
        moduleId: 'respond-recover', title: 'שיעור 1: פונקציית Respond',
        prevLink: '/modules/respond-recover/',
        nextLink: '/pages/recover-bcp-lessons-learned-part-2.html'
    },
    'recover-bcp-lessons-learned-part-2.html': {
        moduleId: 'respond-recover', title: 'שיעור 2: פונקציית Recover',
        prevLink: '/pages/respond-ir-war-room-playbooks-part-1.html',
        nextLink: '/pages/soc-analyst-simulation-part-3.html'
    },
    'soc-analyst-simulation-part-3.html': {
        moduleId: 'respond-recover', title: 'שיעור 3: לקחים ושיפור',
        prevLink: '/pages/recover-bcp-lessons-learned-part-2.html',
        nextLink: '/'
    },

    // Module 8: ai-cyber-policy
    'privacy-risks-in-ai-lesson.html': {
        moduleId: 'ai-cyber-policy', title: 'שיעור 1: AI וסייבר - סקירה',
        prevLink: '/modules/ai-cyber-policy/',
        nextLink: '/pages/prompt-injection-simulation.html'
    },
    'prompt-injection-simulation.html': {
        moduleId: 'ai-cyber-policy', title: 'שיעור 2: סיכוני AI',
        prevLink: '/pages/privacy-risks-in-ai-lesson.html',
        nextLink: '/pages/identify-network-asset-scanner-part-1.html'
    },
    'identify-network-asset-scanner-part-1.html': {
        moduleId: 'ai-cyber-policy', title: 'שיעור 3: NIST AI RMF',
        prevLink: '/pages/prompt-injection-simulation.html',
        nextLink: '/pages/rbac-lab-access-simulation-part-3.html'
    },
    'rbac-lab-access-simulation-part-3.html': {
        moduleId: 'ai-cyber-policy', title: 'שיעור 4: רגולציית AI עולמית',
        prevLink: '/pages/identify-network-asset-scanner-part-1.html',
        nextLink: '/'
    },
};

const NAV_TEMPLATE = (nav) => `
<!-- Floating Navigation Bar -->
<nav class="fixed top-0 left-0 right-0 z-50" style="background: rgba(35, 21, 48, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(127, 19, 236, 0.2);">
<div class="container mx-auto px-4 max-w-7xl flex items-center justify-between py-3">
<a href="/modules/${nav.moduleId}/" class="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-medium">
<span class="material-icons-round text-base">arrow_forward</span>
חזרה למודול
</a>
<div class="text-sm text-gray-400" style="font-family: 'Heebo', sans-serif;">${nav.title}</div>
<div class="flex items-center gap-2">
${nav.prevLink !== `/modules/${nav.moduleId}/` ? `<a href="${nav.prevLink}" class="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm py-2 px-3 rounded-lg hover:bg-white/10">
<span class="material-icons-round text-base">arrow_forward</span>
הקודם
</a>` : ''}
${nav.nextLink !== '/' ? `<a href="${nav.nextLink}" class="flex items-center gap-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow transition-all text-sm">
הבא
<span class="material-icons-round text-base">arrow_back</span>
</a>` : `<a href="/" class="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg shadow transition-all text-sm">
סיום מודול
<span class="material-icons-round text-base">check</span>
</a>`}
</div>
</div>
</nav>`;

const dir = path.join(__dirname, '..', 'public', 'pages');
let injected = 0;
let skipped = 0;

for (const [filename, nav] of Object.entries(NAV_MAP)) {
    const filepath = path.join(dir, filename);
    if (!fs.existsSync(filepath)) {
        console.log(`  SKIP (not found): ${filename}`);
        skipped++;
        continue;
    }

    let html = fs.readFileSync(filepath, 'utf-8');

    // Remove any existing nav injection
    html = html.replace(/<!-- Floating Navigation Bar -->[\s\S]*?<\/nav>\n?/g, '');

    // Inject nav right after <body...>
    html = html.replace(/(<body[^>]*>)/, `$1\n${NAV_TEMPLATE(nav)}`);

    // Add top padding to main content so it doesn't hide behind fixed nav
    html = html.replace(
        /(<main[^>]*class="[^"]*)(py-8)/,
        '$1pt-20 pb-8'
    );

    fs.writeFileSync(filepath, html, 'utf-8');
    injected++;
    console.log(`  ✓ ${filename}`);
}

console.log(`\nDone! Injected nav into ${injected} files, skipped ${skipped}`);
