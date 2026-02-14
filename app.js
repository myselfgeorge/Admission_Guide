/**
 * International Student Admission Guide
 * Interactive Functionality
 */

// ========================================
// Navigation System
// ========================================

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeAccordions();
    loadSavedProgress();
    calculateCosts();
    loadChecklist();
});

function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const section = tab.getAttribute('data-section');
            navigateToSection(section);
        });
    });
}

function navigateToSection(sectionId) {
    // Update active tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

    // Update active section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// Accordion Component
// ========================================

function initializeAccordions() {
    // Accordions are initialized via onclick in HTML
    // This function can be used for additional setup if needed
}

function toggleAccordion(header) {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');

    // Close all accordions in the same group
    const accordion = item.parentElement;
    accordion.querySelectorAll('.accordion-item').forEach(accordionItem => {
        accordionItem.classList.remove('active');
    });

    // Toggle current accordion
    if (!isActive) {
        item.classList.add('active');
    }
}

// ========================================
// Cost Calculator
// ========================================

function calculateCosts() {
    const programType = document.getElementById('programType')?.value;
    const location = document.getElementById('location')?.value;

    if (!programType || !location) return;

    const costs = {
        undergraduate: {
            low: { tuition: 25000, living: 12000, books: 1000, insurance: 2000, misc: 2000 },
            medium: { tuition: 35000, living: 15000, books: 1000, insurance: 2000, misc: 2500 },
            high: { tuition: 55000, living: 20000, books: 1200, insurance: 2500, misc: 3000 }
        },
        graduate: {
            low: { tuition: 20000, living: 12000, books: 800, insurance: 2000, misc: 1500 },
            medium: { tuition: 35000, living: 15000, books: 1000, insurance: 2000, misc: 2000 },
            high: { tuition: 50000, living: 20000, books: 1200, insurance: 2500, misc: 2500 }
        },
        doctoral: {
            low: { tuition: 0, living: 18000, books: 500, insurance: 2000, misc: 1000 },
            medium: { tuition: 0, living: 22000, books: 500, insurance: 2000, misc: 1200 },
            high: { tuition: 0, living: 28000, books: 600, insurance: 2500, misc: 1500 }
        }
    };

    const cost = costs[programType][location];
    const total = Object.values(cost).reduce((a, b) => a + b, 0);

    const output = document.getElementById('costBreakdown');
    if (output) {
        output.innerHTML = `
            <div class="card" style="background: rgba(99, 102, 241, 0.1); border-color: var(--color-primary);">
                <h4>Estimated Annual Costs</h4>
                <table style="width: 100%; margin-top: 1rem; color: var(--text-secondary);">
                    <tr>
                        <td>Tuition & Fees:</td>
                        <td style="text-align: right; font-weight: 600;">$${cost.tuition.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Living Expenses:</td>
                        <td style="text-align: right; font-weight: 600;">$${cost.living.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Books & Supplies:</td>
                        <td style="text-align: right; font-weight: 600;">$${cost.books.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Health Insurance:</td>
                        <td style="text-align: right; font-weight: 600;">$${cost.insurance.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Miscellaneous:</td>
                        <td style="text-align: right; font-weight: 600;">$${cost.misc.toLocaleString()}</td>
                    </tr>
                    <tr style="border-top: 2px solid var(--color-primary); font-size: 1.25rem; color: var(--text-primary);">
                        <td><strong>Total Annual Cost:</strong></td>
                        <td style="text-align: right;"><strong>$${total.toLocaleString()}</strong></td>
                    </tr>
                </table>
                ${programType === 'doctoral' ? `
                    <div class="alert alert-success" style="margin-top: 1rem;">
                        <strong>Note:</strong> PhD programs typically provide full tuition waiver + stipend ($18,000-$35,000/year)
                    </div>
                ` : ''}
            </div>
        `;
    }
}

// ========================================
// Timeline Generator
// ========================================

function generateTimeline() {
    const degree = document.getElementById('timelineDegree').value;
    const semester = document.getElementById('admissionSemester').value;

    const timelines = {
        undergraduate: {
            fall2027: [
                { date: 'Now - Spring 2026', title: 'Preparation Phase', desc: 'Take SAT/ACT, TOEFL/IELTS. Build extracurricular profile. Research universities.' },
                { date: 'Summer 2026', title: 'Application Planning', desc: 'Finalize college list (6-12 schools). Draft personal essays. Request letters of recommendation.' },
                { date: 'September - October 2026', title: 'Early Applications', desc: 'Submit Early Action/Early Decision applications (deadline: November 1)' },
                { date: 'November - December 2026', title: 'Regular Decision Prep', desc: 'Finalize remaining applications. Complete financial aid forms (CSS Profile, FAFSA).' },
                { date: 'January 1-15, 2027', title: 'Regular Decision Deadline', desc: 'Submit all remaining applications. Double-check all materials submitted.' },
                { date: 'March - April 2027', title: 'Admission Decisions', desc: 'Receive decisions. Compare financial aid packages. Visit campuses if possible.' },
                { date: 'May 1, 2027', title: 'Commitment Deadline', desc: 'Accept offer and submit deposit. Decline other offers.' },
                { date: 'May - August 2027', title: 'Pre-Arrival', desc: 'Apply for F-1 visa. Arrange housing. Attend orientation. Purchase health insurance.' }
            ],
            fall2026: [
                { date: 'Now - May 2026', title: 'Urgent Preparation', desc: 'Take required tests immediately. Draft essays quickly. Contact recommenders urgently.' },
                { date: 'June - July 2026', title: 'Application Sprint', desc: 'Apply to schools with rolling admissions or late deadlines. Consider gap year programs.' },
                { date: 'August 2026', title: 'Final Preparations', desc: 'If admitted, complete visa process urgently. Otherwise, plan for next cycle.' }
            ]
        },
        graduate: {
            fall2027: [
                { date: 'Now - Summer 2026', title: 'Research & Preparation', desc: 'Take GRE/GMAT. Achieve TOEFL 90+. Research programs and faculty. Build research experience.' },
                { date: 'July - September 2026', title: 'Application Development', desc: 'Draft statement of purpose. Request 3 recommendation letters. Prepare CV. Order transcripts.' },
                { date: 'October - November 2026', title: 'Contact Faculty', desc: 'Email potential advisors. Attend virtual open houses. Refine research interests.' },
                { date: 'December 1-15, 2026', title: 'Priority Deadlines', desc: 'Submit applications for programs with December deadlines (common for funding consideration).' },
                { date: 'January 1-15, 2027', title: 'Main Deadline Wave', desc: 'Submit remaining applications. Most graduate programs have January 1-15 deadlines.' },
                { date: 'February - April 2027', title: 'Interviews & Decisions', desc: 'Participate in interviews (if required). Receive admission decisions and funding offers.' },
                { date: 'April 15, 2027', title: 'Decision Day', desc: 'Accept offer (April 15 is common graduate deadline). Decline other offers.' },
                { date: 'May - August 2027', title: 'Pre-Arrival', desc: 'Apply for F-1/J-1 visa. Secure housing. Connect with current students.' }
            ]
        },
        doctoral: {
            fall2027: [
                { date: 'Now - Summer 2026', title: 'Research Phase', desc: 'Publish/present research. Take GRE. Achieve TOEFL 100+. Identify 15-20 potential programs.' },
                { date: 'July - September 2026', title: 'Faculty Contact Prep', desc: 'Read faculty publications. Draft research statement (2-3 pages). Prepare CV with publications.' },
                { date: 'September - November 2026', title: 'Contact Professors', desc: 'Email 2-3 professors per school. Attend conferences. Refine research proposal based on feedback.' },
                { date: 'November - December 2026', title: 'Application Finalization', desc: 'Complete applications (deadlines typically Dec 1-15). Request 3 strong recommendation letters.' },
                { date: 'January - March 2027', title: 'Interview Season', desc: 'Participate in recruitment weekends. Meet faculty and students. Present research.' },
                { date: 'March - April 2027', title: 'Decision Time', desc: 'Receive offers with funding packages. Compare stipends and benefits. Make decision.' },
                { date: 'April 15, 2027', title: 'Acceptance Deadline', desc: 'Accept PhD offer. Officially decline other programs.' },
                { date: 'May - August 2027', title: 'Preparation', desc: 'Apply for visa. Find housing. Connect with lab group. Review background literature.' }
            ]
        },
        postdoc: {
            fall2027: [
                { date: 'Now - Ongoing', title: 'Job Search', desc: 'Monitor job boards (HigherEdJobs, Nature Careers). Network at conferences. Check lab websites.' },
                { date: 'Ongoing', title: 'Direct Applications', desc: 'Email PIs directly with CV and research statement. Tailor cover letters to each position.' },
                { date: '3-6 months before start', title: 'Offer & Negotiation', desc: 'Receive offers. Negotiate salary, start date, and research support.' },
                { date: '2-3 months before start', title: 'Visa Process', desc: 'Receive DS-2019 or employment letter. Apply for J-1 or H-1B visa.' },
                { date: '1 month before start', title: 'Logistics', desc: 'Arrange housing. Plan travel. Complete hiring paperwork. Set up bank account.' }
            ]
        }
    };

    const timelineData = timelines[degree][semester] || timelines[degree]['fall2027'];
    const output = document.getElementById('timelineOutput');

    let html = '<div class="card"><h4>Your Personalized Timeline</h4><div class="timeline">';
    timelineData.forEach(item => {
        html += `
            <div class="timeline-item">
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-content">
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
            </div>
        `;
    });
    html += '</div></div>';

    output.innerHTML = html;
}

// ========================================
// Document Checklist
// ========================================

const checklists = {
    undergraduate: [
        'Complete Common Application or Coalition Application',
        'Write personal essay (650 words)',
        'Complete supplemental essays for each school',
        'Request 2-3 teacher recommendation letters',
        'Request counselor recommendation and school report',
        'Submit official high school transcripts',
        'Take SAT or ACT (if required)',
        'Take TOEFL (80+) or IELTS (6.5+)',
        'Submit test scores to universities',
        'Complete CSS Profile (for financial aid)',
        'Submit copy of passport',
        'Prepare financial documents for I-20',
        'Pay application fees',
        'Submit mid-year grade report (if required)'
    ],
    graduate: [
        'Take GRE or GMAT',
        'Take TOEFL (90+) or IELTS (7.0+)',
        'Write statement of purpose (500-1000 words)',
        'Request 3 recommendation letters',
        'Prepare academic CV/resume',
        'Order official transcripts from all universities',
        'Complete online applications',
        'Prepare writing sample (if required)',
        'Submit test scores',
        'Pay application fees',
        'Prepare financial documents',
        'Research potential advisors',
        'Email faculty members of interest'
    ],
    doctoral: [
        'Take GRE (if required)',
        'Take TOEFL (100+) or IELTS (7.5+)',
        'Write research statement/proposal (2-3 pages)',
        'Request 3 strong recommendation letters (from research supervisors)',
        'Prepare detailed academic CV with publications',
        'Prepare writing sample (published paper or thesis chapter)',
        'Order official transcripts',
        'Contact potential PhD advisors (2-3 per program)',
        'Complete online applications',
        'Submit test scores',
        'Prepare diversity statement (if required)',
        'Pay application fees',
        'Prepare for interviews'
    ],
    postdoc: [
        'Update CV with all publications and presentations',
        'Write research statement (1-2 pages)',
        'Prepare cover letter template',
        'Identify 3 references (include PhD advisor)',
        'Contact references and get permission',
        'Prepare publication list with citations',
        'Research potential PIs and labs',
        'Draft email template for cold contacts',
        'Monitor job boards regularly',
        'Prepare research talk/presentation',
        'Update GoogleScholar/ResearchGate profiles',
        'Prepare teaching statement (if applicable)'
    ]
};

function loadChecklist() {
    const degree = document.getElementById('checklistDegree')?.value || 'undergraduate';
    const items = checklists[degree];
    const savedChecklist = JSON.parse(localStorage.getItem(`checklist_${degree}`)) || {};

    let html = '<div class="checklist">';
    items.forEach((item, index) => {
        const isChecked = savedChecklist[index] || false;
        html += `
            <div class="checkbox-group">
                <input type="checkbox" 
                       id="check_${index}" 
                       class="checkbox-input" 
                       ${isChecked ? 'checked' : ''}
                       onchange="saveChecklistItem('${degree}', ${index}, this.checked)">
                <label for="check_${index}" class="checkbox-label">${item}</label>
            </div>
        `;
    });
    html += '</div>';

    const output = document.getElementById('checklistOutput');
    if (output) {
        output.innerHTML = html;
        updateProgress();
    }
}

function saveChecklistItem(degree, index, checked) {
    const savedChecklist = JSON.parse(localStorage.getItem(`checklist_${degree}`)) || {};
    savedChecklist[index] = checked;
    localStorage.setItem(`checklist_${degree}`, JSON.stringify(savedChecklist));
    updateProgress();
}

function updateProgress() {
    const degree = document.getElementById('checklistDegree')?.value || 'undergraduate';
    const items = checklists[degree];
    const savedChecklist = JSON.parse(localStorage.getItem(`checklist_${degree}`)) || {};

    const completed = Object.values(savedChecklist).filter(v => v).length;
    const total = items.length;
    const percentage = Math.round((completed / total) * 100);

    const progressFill = document.getElementById('homeProgress');
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
        progressFill.parentElement.nextElementSibling.textContent = `${percentage}% Complete (${completed}/${total} items)`;
    }
}

function printChecklist() {
    window.print();
}

// ========================================
// Local Storage Management
// ========================================

function loadSavedProgress() {
    // Progress is loaded automatically when checklist loads
    updateProgress();
}

// ========================================
// Utility Functions
// ========================================

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount);
}
