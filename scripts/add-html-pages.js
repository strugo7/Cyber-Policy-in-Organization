#!/usr/bin/env node
/**
 * Adds htmlPage field to all mapped lessons in modules.ts
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'lib', 'content', 'modules.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Map: lesson id -> htmlPage path
const LESSON_HTML_MAP = {
    // Module 1
    'cia-triad': '/pages/module-1-cyber-foundations-part-1.html', // already done
    'threat-landscape': '/pages/module-1-threat-landscape-part-2.html',
    'cyber-attacks-history': '/pages/module-1-interactive-cia-game-part-3.html',

    // Module 2
    'cyber-strategy': '/pages/govern-corporate-strategy-core-part-1.html',
    'policies-procedures': '/pages/data-shield-awareness-part-2.html',
    'assets-management': '/pages/risk-assessment-heatmap-part-2.html',
    'govern-function': '/pages/the-boardroom-simulator-ceo-mode-part-3.html',

    // Module 3
    'nist-overview': '/pages/nist-2.0-the-six-functions-part-1.html',
    'nist-core-structure': '/pages/nist-implementation-profiles-tiers-part-2.html',
    'nist-profiles-tiers': '/pages/nist-practice-action-matching-part-3.html',
    'nist-implementation': '/pages/organization-classification-wizard-part-3.html',
    'israel-defense-doctrine': '/pages/israel-cyber-doctrine-dashboard-part-1.html',

    // Module 4
    'why-standards': '/pages/global-compliance-hub-part-2.html',
    'iso-27001': '/pages/identity-access-the-gatekeeper-part-1.html',
    'gdpr': '/pages/risk-management-supply-chain-part-2.html',
    'pci-dss-soc2': '/pages/interactive-risk-calculator-part-3.html',
    // 'israeli-privacy': skip — no unique HTML page for it

    // Module 5
    'identify-function': '/pages/identify-asset-management-radar-part-1.html',
    'protect-function': '/pages/protect-defense-in-depth-part-2-1.html',
    'detect-function': '/pages/detect-soc-command-center-part-1.html',
    'protect-implementation': '/pages/the-security-lab-practice-part-3.html',

    // Module 6
    'china-cyber': '/pages/global-threat-hunting-map.html',
    'russia-uk-cyber': '/pages/anomaly-detection-analytics-part-2.html',
    'cyber-essentials': '/pages/cyber-wargame-crisis-simulation-part-3.html',

    // Module 7
    'respond-function': '/pages/respond-ir-war-room-playbooks-part-1.html',
    'recover-function': '/pages/recover-bcp-lessons-learned-part-2.html',
    'lessons-learned': '/pages/soc-analyst-simulation-part-3.html',

    // Module 8
    'ai-overview': '/pages/privacy-risks-in-ai-lesson.html',
    'ai-risks': '/pages/prompt-injection-simulation.html',
    'nist-ai-rmf': '/pages/identify-network-asset-scanner-part-1.html',
    'ai-governance-global': '/pages/rbac-lab-access-simulation-part-3.html',
};

let count = 0;
for (const [lessonId, htmlPage] of Object.entries(LESSON_HTML_MAP)) {
    // Pattern: find the lesson block and add htmlPage after estimatedTime
    // Match: id: 'lessonId', ... estimatedTime: N,
    const regex = new RegExp(
        `(id: '${lessonId}',\\s*\\n\\s*moduleId: '[^']+',\\s*\\n\\s*title: '[^']*',\\s*\\n\\s*order: \\d+,\\s*\\n\\s*estimatedTime: \\d+,)`,
        'g'
    );

    if (regex.test(content)) {
        content = content.replace(regex, `$1\n        htmlPage: '${htmlPage}',`);
        count++;
        console.log(`  ✓ ${lessonId} -> ${htmlPage}`);
    } else {
        console.log(`  ✗ ${lessonId} — pattern not found`);
    }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\nDone! Updated ${count} lessons.`);
