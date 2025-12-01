// public/healthiq.js
// Health IQ Specialty Group Explorer (Premium)
// Exports initHealthIQ(rootEl) to be used from custom-elements.js

export function initHealthIQ(rootEl) {
  if (!rootEl) return;

  // 1) Inject HTML + CSS layout into the container
  rootEl.innerHTML = `
  <style>
    #health-iq-browser {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:#ffffff;
      color:#111827;
      padding:32px 5vw;
      font-size:15px;
    }

    .hib-shell {
      max-width:1280px;
      margin:0 auto;
      background:#ffffff;
      border-radius:12px;
      border:1px solid #000000;
      display:flex;
      min-height:620px;
      overflow:hidden;
    }

    .hib-sidebar {
      width:320px;
      background:#f9fafb;
      border-right:1px solid #000000;
      padding:16px 12px 16px 14px;
      display:flex;
      flex-direction:column;
      gap:10px;
    }

    .hib-logo {
      font-size:14px;
      text-transform:uppercase;
      letter-spacing:0.16em;
      color:#111827;
      font-weight:600;
    }

    .hib-title-main {
      font-size:20px;
      font-weight:700;
      margin:6px 0 2px;
    }

    .hib-sub {
      font-size:13px;
      color:#374151;
    }

    .hib-list-head {
      display:flex;
      justify-content:space-between;
      font-size:13px;
      font-weight:600;
      padding:6px 8px 4px;
      border-bottom:1px solid #000000;
      margin-top:10px;
    }

    .hib-group-list {
      list-style:none;
      padding:0;
      margin:0;
      flex:1;
      overflow:auto;
    }

    .hib-group-item {
      padding:8px 8px;
      font-size:14px;
      margin:0;
      cursor:pointer;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:6px;
      border-bottom:1px solid #000000;
      background:#ffffff;
      transition:background 0.12s ease, color 0.12s ease;
    }

    .hib-group-item::before {
      content:"";
      display:inline-block;
      width:6px;
      height:18px;
      border-radius:999px;
      margin-right:6px;
      background:#1d4ed8;
    }

    .hib-group-item:nth-child(4n+1)::before { background:#2563eb; }
    .hib-group-item:nth-child(4n+2)::before { background:#16a34a; }
    .hib-group-item:nth-child(4n+3)::before { background:#ea580c; }
    .hib-group-item:nth-child(4n+0)::before { background:#7c3aed; }

    .hib-group-name-wrap {
      display:flex;
      align-items:center;
      gap:6px;
      flex:1;
    }

    .hib-group-item:hover {
      background:#e5e7eb;
    }

    .hib-group-item.hib-active {
      background:#111827;
      color:#ffffff;
    }

    .hib-group-count-pill {
      font-size:12px;
      padding:2px 8px;
      border-radius:999px;
      border:1px solid #000000;
      background:#ffffff;
      color:#111827;
      font-variant-numeric:tabular-nums;
    }

    .hib-group-item.hib-active .hib-group-count-pill {
      background:#111827;
      color:#ffffff;
      border-color:#ffffff;
    }

    .hib-main {
      flex:1;
      padding:18px 20px 20px;
      display:flex;
      flex-direction:column;
      gap:10px;
      background:#ffffff;
    }

    .hib-main-header {
      display:flex;
      justify-content:space-between;
      align-items:flex-start;
      gap:14px;
      flex-wrap:wrap;
      border-bottom:1px solid #000000;
      padding-bottom:10px;
    }

    .hib-main-title-block {
      display:flex;
      flex-direction:column;
      gap:4px;
    }

    #hib-group-title {
      font-size:22px;
      font-weight:750;
    }

    #hib-group-metrics {
      font-size:13px;
      color:#374151;
    }

    .hib-search-wrap {
      display:flex;
      flex-direction:column;
      gap:6px;
      align-items:flex-end;
      font-size:13px;
    }

    .hib-filters-row {
      display:flex;
      gap:8px;
      flex-wrap:wrap;
      justify-content:flex-end;
    }

    #hib-search,
    #hib-type-filter,
    #hib-range-filter {
      padding:7px 11px;
      border-radius:4px;
      border:1px solid #000000;
      background:#ffffff;
      color:#111827;
      font-size:13px;
    }

    #hib-search::placeholder {
      color:#6b7280;
    }

    .hib-summary-row {
      display:flex;
      gap:10px;
      margin-top:10px;
      flex-wrap:wrap;
    }

    .hib-card {
      flex:1;
      min-width:160px;
      border:1px solid #000000;
      border-radius:6px;
      padding:8px 10px;
      background:#f9fafb;
    }

    .hib-card-label {
      font-size:12px;
      color:#4b5563;
      text-transform:uppercase;
      letter-spacing:0.08em;
      margin-bottom:4px;
    }

    .hib-card-value {
      font-size:18px;
      font-weight:750;
    }

    .hib-card-sub {
      font-size:12px;
      color:#4b5563;
      margin-top:2px;
    }

    .hib-chart-export-row {
      display:flex;
      gap:10px;
      margin-top:8px;
      flex-wrap:wrap;
      align-items:center;
    }

    .hib-chart-box {
      flex:1;
      min-width:220px;
      border:1px solid #000000;
      border-radius:6px;
      padding:8px 10px;
      background:#ffffff;
      display:flex;
      gap:10px;
      align-items:center;
    }

    .hib-chart-meta {
      font-size:12px;
      color:#374151;
    }

    .hib-export-buttons {
      display:flex;
      gap:6px;
      flex-wrap:wrap;
    }

    .hib-btn {
      padding:6px 10px;
      border-radius:4px;
      border:1px solid #000000;
      background:#111827;
      color:#ffffff;
      font-size:12px;
      cursor:pointer;
    }

    .hib-btn.secondary {
      background:#ffffff;
      color:#111827;
    }

    .hib-table-wrap {
      margin-top:10px;
      flex:1;
      border-radius:4px;
      border:1px solid #000000;
      overflow:auto;
      background:#ffffff;
    }

    table.hib-table {
      width:100%;
      border-collapse:collapse;
      min-width:650px;
      font-size:13px;
    }

    table.hib-table thead {
      position:sticky;
      top:0;
      background:#f3f4f6;
      z-index:5;
    }

    table.hib-table th,
    table.hib-table td {
      padding:9px 10px;
      border-bottom:1px solid #000000;
      text-align:left;
      white-space:nowrap;
    }

    table.hib-table th {
      font-weight:700;
      cursor:pointer;
      border-bottom:2px solid #000000;
    }

    table.hib-table tbody tr:nth-child(even) {
      background:#f9fafb;
    }

    table.hib-table tbody tr:nth-child(odd) {
      background:#ffffff;
    }

    table.hib-table tbody tr:hover {
      background:#e5e7eb;
    }

    .hib-num {
      text-align:right;
      font-variant-numeric:tabular-nums;
      font-weight:700;
    }

    .hib-type-pill {
      display:inline-flex;
      align-items:center;
      gap:4px;
      padding:2px 7px;
      border-radius:999px;
      border:1px solid #000000;
      background:#ffffff;
      font-size:12px;
    }

    .hib-empty {
      padding:16px;
      font-size:14px;
      color:#374151;
    }

    .hib-footer {
      margin-top:8px;
      font-size:13px;
      color:#111827;
      display:flex;
      justify-content:space-between;
      gap:10px;
      flex-wrap:wrap;
      border-top:1px solid #000000;
      padding-top:8px;
    }

    .hib-footer-strong {
      font-weight:700;
    }

    .hib-pagination {
      margin-top:6px;
      font-size:12px;
      display:flex;
      justify-content:space-between;
      gap:10px;
      flex-wrap:wrap;
      align-items:center;
    }

    .hib-page-buttons {
      display:flex;
      gap:4px;
      flex-wrap:wrap;
    }

    .hib-page-btn {
      padding:4px 8px;
      border-radius:4px;
      border:1px solid #000000;
      background:#ffffff;
      cursor:pointer;
      font-size:12px;
    }

    .hib-page-btn[disabled] {
      opacity:0.4;
      cursor:default;
    }

    .hib-cta {
      margin-top:10px;
      border-radius:6px;
      border:1px solid #000000;
      padding:10px 12px;
      background:#fef3c7;
      font-size:13px;
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:10px;
      flex-wrap:wrap;
    }

    .hib-cta strong {
      font-size:14px;
    }

    .hib-cta a {
      text-decoration:none;
    }

    .hib-cta-btn {
      padding:7px 12px;
      border-radius:4px;
      border:1px solid #000000;
      background:#111827;
      color:#ffffff;
      font-size:13px;
      cursor:pointer;
      white-space:nowrap;
    }

    canvas#hib-pie {
      width:80px;
      height:80px;
    }

    @media (max-width:900px) {
      .hib-shell {
        flex-direction:column;
      }
      .hib-sidebar {
        width:100%;
        border-right:none;
        border-bottom:1px solid #000000;
        max-height:260px;
      }
    }

    @media (max-width:640px) {
      #health-iq-browser {
        padding:20px 4vw;
      }
      .hib-main-header {
        flex-direction:column;
        align-items:flex-start;
      }
      .hib-search-wrap {
        align-items:flex-start;
      }
      #hib-search {
        width:100%;
      }
    }
  </style>

  <div class="hib-shell">
    <aside class="hib-sidebar">
      <div>
        <div class="hib-logo">Health IQ Datacard</div>
        <div class="hib-title-main">Specialty Groups</div>
        <div class="hib-sub">Click a group to see all specialties, types &amp; contacts.</div>
      </div>
      <div class="hib-list-head">
        <span>Specialty Group</span>
        <span>Contacts</span>
      </div>
      <ul id="hib-group-list" class="hib-group-list"></ul>
    </aside>

    <main class="hib-main">
      <div class="hib-main-header">
        <div class="hib-main-title-block">
          <div id="hib-group-title">Select a Specialty Group</div>
          <div id="hib-group-metrics">No group selected.</div>
        </div>
        <div class="hib-search-wrap">
          <div class="hib-filters-row">
            <select id="hib-type-filter">
              <option value="">All Specialty Types</option>
            </select>
            <select id="hib-range-filter">
              <option value="">All Contact Sizes</option>
              <option value="1">0 – 1,000</option>
              <option value="2">1,001 – 5,000</option>
              <option value="3">5,001 – 10,000</option>
              <option value="4">10,001+</option>
            </select>
          </div>
          <input id="hib-search" type="text" placeholder="Search specialties in this group..." />
        </div>
      </div>

      <div class="hib-summary-row">
        <div class="hib-card">
          <div class="hib-card-label">Total Contacts</div>
          <div class="hib-card-value" id="hib-card-total">0</div>
          <div class="hib-card-sub">Across all specialties in this group</div>
        </div>
        <div class="hib-card">
          <div class="hib-card-label">Specialties in Group</div>
          <div class="hib-card-value" id="hib-card-specialties">0</div>
          <div class="hib-card-sub">Unique specialty rows</div>
        </div>
        <div class="hib-card">
          <div class="hib-card-label">Distinct Types</div>
          <div class="hib-card-value" id="hib-card-types">0</div>
          <div class="hib-card-sub">Physician, Nurse, Technician & more</div>
        </div>
        <div class="hib-card">
          <div class="hib-card-label">Top Specialty</div>
          <div class="hib-card-value" id="hib-card-top">–</div>
          <div class="hib-card-sub" id="hib-card-top-count">–</div>
        </div>
      </div>

      <div class="hib-chart-export-row">
        <div class="hib-chart-box">
          <canvas id="hib-pie" width="80" height="80"></canvas>
          <div class="hib-chart-meta" id="hib-chart-meta">
            Breakdown of contacts by specialty type in this group.
          </div>
        </div>
        <div class="hib-export-buttons">
          <button class="hib-btn" id="hib-export-csv">Export CSV</button>
          <button class="hib-btn secondary" id="hib-export-xlsx">Export Excel</button>
          <button class="hib-btn secondary" id="hib-export-pdf">Print / PDF</button>
          <button class="hib-btn secondary" id="hib-copy">Copy to Clipboard</button>
        </div>
      </div>

      <div class="hib-table-wrap">
        <table class="hib-table" id="hib-table">
          <thead>
            <tr>
              <th data-col="specialty">Specialty</th>
              <th data-col="type">Specialty Type</th>
              <th data-col="contacts">Contacts</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colspan="3" class="hib-empty">Choose a specialty group from the left to view details.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="hib-pagination">
        <div id="hib-page-info">Page 1 of 1 (0 rows)</div>
        <div class="hib-page-buttons">
          <button class="hib-page-btn" id="hib-prev">&laquo; Prev</button>
          <button class="hib-page-btn" id="hib-next">Next &raquo;</button>
        </div>
      </div>

      <div class="hib-footer">
        <div id="hib-footer-total"><span class="hib-footer-strong">Total contacts in this group:</span> 0</div>
        <div id="hib-footer-rows"><span class="hib-footer-strong">Specialties in this group:</span> 0</div>
      </div>

      <div class="hib-cta">
        <div>
          <strong>Need the full verified contact list for this specialty group?</strong><br/>
          Get a custom export with decision-makers, emails & direct dials from Nplus Global Health IQ.
        </div>
        <a href="mailto:steve.d@nplusglobal.com?subject=Health IQ Specialty Group Data Request">
          <button class="hib-cta-btn">Email Steve for a Free Sample</button>
        </a>
      </div>
    </main>
  </div>
  `;

  // 2) DATA – IMPORTANT:
  // Right now: only SAMPLE rows.
  // You will replace this with the FULL array from your premium HTML file.
  const healthIqData = [{"group": "Allergy & Immunology", "specialty": "Allergist", "type": "Physician", "contacts": "767"}, {"group": "Allergy & Immunology", "specialty": "Allergist & Immunologist", "type": "Physician", "contacts": "3154"}, {"group": "Allergy & Immunology", "specialty": "Clinical & Laboratory Dermatological Immunologist", "type": "Physician", "contacts": "55"}, {"group": "Allergy & Immunology", "specialty": "Clinical & Laboratory Immunologist", "type": "Physician", "contacts": "75"}, {"group": "Allergy & Immunology", "specialty": "Immunologist", "type": "Physician", "contacts": "422"}, {"group": "Allergy & Immunology", "specialty": "Pediatrics - Allergist", "type": "Physician", "contacts": "82"}, {"group": "Allergy & Immunology", "specialty": "Pediatrics - Clinical & Laboratory Immunologist", "type": "Physician", "contacts": "11"}, {"group": "Allergy & Immunology", "specialty": "Pediatrics - Allergist & Immunologist", "type": "Physician", "contacts": "358"}, {"group": "Allergy & Immunology", "specialty": "Clinical Lab Immunologist", "type": "Technologists/Technicians", "contacts": "35"}, {"group": "Allergy & Immunology", "specialty": "nan", "type": "nan", "contacts": "4,959"}, {"group": "Alternative Medicine", "specialty": "Osteopathic (Osteopathy)", "type": "Physician", "contacts": "2623"}, {"group": "Alternative Medicine", "specialty": "Acupuncturist", "type": "Healthcare Professional", "contacts": "4672"}, {"group": "Alternative Medicine", "specialty": "Chiropractor", "type": "Healthcare Professional", "contacts": "22308"}, {"group": "Alternative Medicine", "specialty": "Chiropractor - Independent Medical Examiner", "type": "Healthcare Professional", "contacts": "54"}, {"group": "Alternative Medicine", "specialty": "Chiropractor - Internist", "type": "Healthcare Professional", "contacts": "93"}, {"group": "Alternative Medicine", "specialty": "Chiropractor - Neurologist", "type": "Healthcare Professional", "contacts": "169"}, {"group": "Alternative Medicine", "specialty": "Chiropractor - Nutritionist", "type": "Healthcare Professional", "contacts": "228"}, {"group": "Alternative Medicine", "specialty": "Chiropractor - Occupational Health", "type": "Healthcare Professional", "contacts": "45"}, {"group": "Alternative Medicine", "specialty": "Chiropractor - Orthopedic", "type": "Healthcare Professional", "contacts": "241"}, {"group": "Alternative Medicine", "specialty": "Chiropractor - Radiologist", "type": "Healthcare Professional", "contacts": "36"}, {"group": "Alternative Medicine", "specialty": "Chiropractor - Rehabilitation", "type": "Healthcare Professional", "contacts": "396"}, {"group": "Alternative Medicine", "specialty": "Chiropractor - Sports Physician", "type": "Healthcare Professional", "contacts": "496"}, {"group": "Alternative Medicine", "specialty": "Chiropractor - Thermography", "type": "Healthcare Professional", "contacts": "12"}, {"group": "Alternative Medicine", "specialty": "Pediatrics - Chiropractor", "type": "Healthcare Professional", "contacts": "29"}, {"group": "Alternative Medicine", "specialty": "Dietary Manager", "type": "Healthcare Professional", "contacts": "190"}, {"group": "Alternative Medicine", "specialty": "Holistic Medicine", "type": "Healthcare Professional", "contacts": "294"}, {"group": "Alternative Medicine", "specialty": "Homeopathy", "type": "Healthcare Professional", "contacts": "67"}, {"group": "Alternative Medicine", "specialty": "Naturopathic Medicine (Naturopathy)", "type": "Healthcare Professional", "contacts": "8924"}, {"group": "Alternative Medicine", "specialty": "Nutritionist (Dietitian)", "type": "Healthcare Professional", "contacts": "1581"}, {"group": "Alternative Medicine", "specialty": "Pediatrics - Registered Dietitian (Nutritionist)", "type": "Healthcare Professional", "contacts": "362"}, {"group": "Alternative Medicine", "specialty": "Registered Dietitian", "type": "Healthcare Professional", "contacts": "18593"}, {"group": "Alternative Medicine", "specialty": "Registered Dietitian - Nutrition, Metabolic", "type": "Healthcare Professional", "contacts": "188"}, {"group": "Alternative Medicine", "specialty": "Registered Dietitian - Nutritionist, Renal", "type": "Healthcare Professional", "contacts": "174"}, {"group": "Alternative Medicine", "specialty": "Marriage & Family Therapist", "type": "Therapist", "contacts": "11715"}, {"group": "Alternative Medicine", "specialty": "Naprapathy", "type": "Therapist", "contacts": "17"}, {"group": "Alternative Medicine", "specialty": "Massage Therapist", "type": "Therapist", "contacts": "12416"}, {"group": "Alternative Medicine", "specialty": "Registered Dietetic Technician", "type": "Technologists/Technicians", "contacts": "188"}, {"group": "Alternative Medicine", "specialty": "nan", "type": "nan", "contacts": "86,111"}, {"group": "Anesthesiology", "specialty": "Anesthesiologist", "type": "Physician", "contacts": "43518"}, {"group": "Anesthesiology", "specialty": "Anesthesiologist - Addiction Medicine", "type": "Physician", "contacts": "70"}, {"group": "Anesthesiology", "specialty": "Anesthesiologist - Critical Care Medicine", "type": "Physician", "contacts": "1785"}, {"group": "Anesthesiology", "specialty": "Anesthesiologist - Hospice & Palliative Medicine", "type": "Physician", "contacts": "18"}, {"group": "Anesthesiology", "specialty": "Anesthesiologist - Pain Medicine", "type": "Physician", "contacts": "3853"}, {"group": "Anesthesiology", "specialty": "Interventional Pain Medicine", "type": "Physician", "contacts": "1620"}, {"group": "Anesthesiology", "specialty": "Pain Medicine", "type": "Physician", "contacts": "2143"}, {"group": "Anesthesiology", "specialty": "Pediatrics - Anesthesiologist", "type": "Physician", "contacts": "1196"}, {"group": "Anesthesiology", "specialty": "Pediatrics - Critical Care Medicine", "type": "Physician", "contacts": "2235"}, {"group": "Anesthesiology", "specialty": "Pediatrics - Sleep Medicine", "type": "Physician", "contacts": "83"}, {"group": "Anesthesiology", "specialty": "Sleep Medicine", "type": "Physician", "contacts": "650"}, {"group": "Anesthesiology", "specialty": "Certified Registered Nurse Anesthetist", "type": "Nurse", "contacts": "44142"}, {"group": "Anesthesiology", "specialty": "Anesthesiologist Assistant", "type": "Physician Assistant", "contacts": "2548"}, {"group": "Anesthesiology", "specialty": "nan", "type": "nan", "contacts": "103,861"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Behavioral Neurologist & Neuropsychiatrist", "type": "Physician", "contacts": "101"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Addiction Medicine", "type": "Physician", "contacts": "1145"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Addiction Psychiatry", "type": "Physician", "contacts": "402"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Forensic Psychiatry", "type": "Physician", "contacts": "406"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Geriatric Psychiatry", "type": "Physician", "contacts": "528"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Pediatrics - Developmental & Behavioral", "type": "Physician", "contacts": "684"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Child & Adolescent Psychiatrist", "type": "Physician", "contacts": "4161"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychoanalyst", "type": "Physician", "contacts": "129"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychosomatic Medicine", "type": "Physician", "contacts": "214"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Neuropsychiatrist", "type": "Physician", "contacts": "48"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Pediatrics - Psychiatrist", "type": "Physician", "contacts": "80"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychiatrist", "type": "Physician", "contacts": "35582"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Behavioral Analyst", "type": "Healthcare Professional", "contacts": "7817"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Counselor", "type": "Healthcare Professional", "contacts": "28565"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Counselor - Addiction (Substance Use Disorder)", "type": "Healthcare Professional", "contacts": "13842"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Counselor - Mental Health", "type": "Healthcare Professional", "contacts": "44508"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Counselor - Pastoral", "type": "Healthcare Professional", "contacts": "193"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Counselor - Professional", "type": "Healthcare Professional", "contacts": "15423"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Counselor - School", "type": "Healthcare Professional", "contacts": "375"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Genetic Counselor, MS", "type": "Healthcare Professional", "contacts": "1811"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Licensed Clinical Social Worker", "type": "Healthcare Professional", "contacts": "1126"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychiatric Services Director", "type": "Healthcare Professional", "contacts": "1300"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychologist", "type": "Healthcare Professional", "contacts": "37274"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychologist - Addiction (Substance Use Disorder)", "type": "Healthcare Professional", "contacts": "165"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychologist - Adult Development & Aging", "type": "Healthcare Professional", "contacts": "79"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychologist - Clinical", "type": "Healthcare Professional", "contacts": "13689"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychologist - Clinical Child & Adolescent", "type": "Healthcare Professional", "contacts": "1030"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychologist - Cognitive & Behavioral", "type": "Healthcare Professional", "contacts": "448"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychologist - Counseling", "type": "Healthcare Professional", "contacts": "1219"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Rehabilitation Counselor", "type": "Healthcare Professional", "contacts": "535"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Social Worker", "type": "Healthcare Professional", "contacts": "33754"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Social Worker - Clinical", "type": "Healthcare Professional", "contacts": "53155"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Social Worker - School", "type": "Healthcare Professional", "contacts": "657"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychologist - Exercise & Sports", "type": "Healthcare Professional", "contacts": "20"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychologist - Family", "type": "Healthcare Professional", "contacts": "63"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychologist - Forensic", "type": "Healthcare Professional", "contacts": "136"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychologist - Health Service", "type": "Healthcare Professional", "contacts": "266"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychologist - Mental Retardation & Developmental Disabilities", "type": "Healthcare Professional", "contacts": "72"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychologist - Prescribing (Medical)", "type": "Healthcare Professional", "contacts": "44"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychologist - Psychoanalysis", "type": "Healthcare Professional", "contacts": "56"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychologist - Rehabilitation", "type": "Healthcare Professional", "contacts": "139"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychologist - School", "type": "Healthcare Professional", "contacts": "805"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Poetry Therapist", "type": "Therapist", "contacts": "10"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Psychotherapy (Psychotherapist)", "type": "Therapist", "contacts": "1217"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Clinical Nurse - Psych/Mental Health", "type": "Nurse", "contacts": "448"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Clinical Nurse - Psych/Mental Health, Adult", "type": "Nurse", "contacts": "482"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Clinical Nurse - Psych/Mental Health, Child & Adolescent", "type": "Nurse", "contacts": "93"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Nurse Practitioner - Psych/Mental Health", "type": "Nurse", "contacts": "14921"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Registered Nurse - Psych/Mental Health", "type": "Nurse", "contacts": "3790"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Registered Nurse - Psych/Mental Health, Adult", "type": "Nurse", "contacts": "1645"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Registered Nurse - Psych/Mental Health, Child & Adolescent", "type": "Nurse", "contacts": "377"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Clinical Nurse - Psych/Mental Health, Child & Family", "type": "Nurse", "contacts": "26"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Clinical Nurse - Psych/Mental Health, Chronically Ill", "type": "Nurse", "contacts": "2"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Clinical Nurse - Psych/Mental Health, Community", "type": "Nurse", "contacts": "8"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Clinical Nurse - Psych/Mental Health, Geropsychiatric", "type": "Nurse", "contacts": "9"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Pharmacist - Psychiatrist", "type": "Pharmacists/Pharmacies", "contacts": "371"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "Licensed Psychiatric Technician", "type": "Technologists/Technicians", "contacts": "421"}, {"group": "Behavioral Health (Mental Health) & Social Service", "specialty": "nan", "type": "nan", "contacts": "325,866"}, {"group": "Cardiology", "specialty": "Cardiac Electrophysiologist", "type": "Physician", "contacts": "533"}, {"group": "Cardiology", "specialty": "Cardiothoracic Surgery", "type": "Physician", "contacts": "231"}, {"group": "Cardiology", "specialty": "Cardiovascular Disease (Cardiologist)", "type": "Physician", "contacts": "25725"}, {"group": "Cardiology", "specialty": "Cardiovascular Surgery", "type": "Physician", "contacts": "600"}, {"group": "Cardiology", "specialty": "Clinical Cardiac Electrophysiologist", "type": "Physician", "contacts": "2255"}, {"group": "Cardiology", "specialty": "Interventional Cardiologist", "type": "Physician", "contacts": "4905"}, {"group": "Cardiology", "specialty": "Nuclear Cardiologist", "type": "Physician", "contacts": "656"}, {"group": "Cardiology", "specialty": "Pediatrics - Cardiologist", "type": "Physician", "contacts": "2467"}, {"group": "Cardiology", "specialty": "Thoracic Surgery (Cardiothoracic Vascular Surgery)", "type": "Physician", "contacts": "4248"}, {"group": "Cardiology", "specialty": "Cardiac Cath Lab Director", "type": "Healthcare Professional", "contacts": "1298"}, {"group": "Cardiology", "specialty": "Cardiology Director", "type": "Healthcare Professional", "contacts": "1605"}, {"group": "Cardiology", "specialty": "Physical Therapist - Cardiopulmonary", "type": "Therapist", "contacts": "37"}, {"group": "Cardiology", "specialty": "Registered Nurse - Cardiac Rehabilitation", "type": "Nurse", "contacts": "79"}, {"group": "Cardiology", "specialty": "Perfusionist", "type": "Technologists/Technicians", "contacts": "450"}, {"group": "Cardiology", "specialty": "Cardiology Technician", "type": "Technologists/Technicians", "contacts": "396"}, {"group": "Cardiology", "specialty": "Cardiovascular Invasive Specialist", "type": "Technologists/Technicians", "contacts": "73"}, {"group": "Cardiology", "specialty": "Cardiovascular-Interventional Technology", "type": "Technologists/Technicians", "contacts": "11"}, {"group": "Cardiology", "specialty": "nan", "type": "nan", "contacts": "45,569"}, {"group": "Chiropractor", "specialty": "Chiropractor", "type": "Healthcare Professional", "contacts": "22308"}, {"group": "Chiropractor", "specialty": "Chiropractor - Independent Medical Examiner", "type": "Healthcare Professional", "contacts": "54"}, {"group": "Chiropractor", "specialty": "Chiropractor - Internist", "type": "Healthcare Professional", "contacts": "93"}, {"group": "Chiropractor", "specialty": "Chiropractor - Neurologist", "type": "Healthcare Professional", "contacts": "169"}, {"group": "Chiropractor", "specialty": "Chiropractor - Nutritionist", "type": "Healthcare Professional", "contacts": "228"}, {"group": "Chiropractor", "specialty": "Chiropractor - Occupational Health", "type": "Healthcare Professional", "contacts": "45"}, {"group": "Chiropractor", "specialty": "Chiropractor - Orthopedic", "type": "Healthcare Professional", "contacts": "241"}, {"group": "Chiropractor", "specialty": "Chiropractor - Radiologist", "type": "Healthcare Professional", "contacts": "36"}, {"group": "Chiropractor", "specialty": "Chiropractor - Rehabilitation", "type": "Healthcare Professional", "contacts": "396"}, {"group": "Chiropractor", "specialty": "Chiropractor - Sports Physician", "type": "Healthcare Professional", "contacts": "496"}, {"group": "Chiropractor", "specialty": "Chiropractor - Thermography", "type": "Healthcare Professional", "contacts": "12"}, {"group": "Chiropractor", "specialty": "Pediatrics - Chiropractor", "type": "Healthcare Professional", "contacts": "29"}, {"group": "Chiropractor", "specialty": "nan", "type": "nan", "contacts": "24,107"}, {"group": "Dental Medicine", "specialty": "Dental Laboratory Technician", "type": "Dentist", "contacts": "287"}, {"group": "Dental Medicine", "specialty": "Dental Therapist", "type": "Dentist", "contacts": "56"}, {"group": "Dental Medicine", "specialty": "Dentist - Dental Public Health", "type": "Dentist", "contacts": "433"}, {"group": "Dental Medicine", "specialty": "Dentist - Dentist Anesthesiologist", "type": "Dentist", "contacts": "126"}, {"group": "Dental Medicine", "specialty": "Dentist - Endodontics", "type": "Dentist", "contacts": "2615"}, {"group": "Dental Medicine", "specialty": "Dentist - Oral & Maxillofacial Pathologist", "type": "Dentist", "contacts": "299"}, {"group": "Dental Medicine", "specialty": "Dentist - Oral & Maxillofacial Radiologist", "type": "Dentist", "contacts": "61"}, {"group": "Dental Medicine", "specialty": "Dentist - Oral & Maxillofacial Surgery", "type": "Dentist", "contacts": "5896"}, {"group": "Dental Medicine", "specialty": "Dentist - Orthodontics", "type": "Dentist", "contacts": "1622"}, {"group": "Dental Medicine", "specialty": "Dentist - Orthodontics & Dentofacial Orthopedics", "type": "Dentist", "contacts": "5284"}, {"group": "Dental Medicine", "specialty": "Dentist - Pedodontics (Pediatric Dentist)", "type": "Dentist", "contacts": "5876"}, {"group": "Dental Medicine", "specialty": "Dentist - Periodontics", "type": "Dentist", "contacts": "1652"}, {"group": "Dental Medicine", "specialty": "Dentist - Prosthodontics", "type": "Dentist", "contacts": "1772"}, {"group": "Dental Medicine", "specialty": "General Dentist (General Practitioner)", "type": "Dentist", "contacts": "89278"}, {"group": "Dental Medicine", "specialty": "Dental Assistant", "type": "Physician Assistant ", "contacts": "1538"}, {"group": "Dental Medicine", "specialty": "Dental Hygienist", "type": "Physician Assistant ", "contacts": "5356"}, {"group": "Dental Medicine", "specialty": "Denturist", "type": "Physician Assistant ", "contacts": "98"}, {"group": "Dental Medicine", "specialty": "nan", "type": "nan", "contacts": "122,249"}, {"group": "Dermatology", "specialty": "Dermatologist", "type": "Physician ", "contacts": "14716"}, {"group": "Dermatology", "specialty": "Clinical & Laboratory Dermatological Immunologist", "type": "Physician ", "contacts": "55"}, {"group": "Dermatology", "specialty": "Dermatopathologist", "type": "Physician ", "contacts": "888"}, {"group": "Dermatology", "specialty": "MOHS-Micrographic Surgery", "type": "Physician ", "contacts": "962"}, {"group": "Dermatology", "specialty": "Pediatrics - Dermatologist", "type": "Physician ", "contacts": "173"}, {"group": "Dermatology", "specialty": "Procedural Dermatologist", "type": "Physician ", "contacts": "473"}, {"group": "Dermatology", "specialty": "nan", "type": "nan", "contacts": "17,267"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Anesthesiologist - Critical Care Medicine", "type": "Physician ", "contacts": "1785"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Anesthesiologist - Hospice & Palliative Medicine", "type": "Physician ", "contacts": "18"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Anesthesiologist - Pain Medicine", "type": "Physician ", "contacts": "3853"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Emergency Medical Services", "type": "Physician ", "contacts": "2207"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Emergency Medicine", "type": "Physician ", "contacts": "48927"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Emergency Room Doctor", "type": "Physician ", "contacts": "149"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Internal Medicine - Critical Care Medicine", "type": "Physician ", "contacts": "5480"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Hospice & Palliative Medicine", "type": "Physician ", "contacts": "2223"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Interventional Pain Medicine", "type": "Physician ", "contacts": "1620"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Medical Toxicologist", "type": "Physician ", "contacts": "585"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Pain Medicine", "type": "Physician ", "contacts": "2143"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Pediatrics - Critical Care Medicine", "type": "Physician ", "contacts": "2235"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Pediatrics - Emergency Medicine", "type": "Physician ", "contacts": "2576"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Pediatrics - Medical Toxicologist", "type": "Physician ", "contacts": "11"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Pulmonary Critical Care", "type": "Physician ", "contacts": "332"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Surgical Critical Care", "type": "Physician ", "contacts": "1325"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Undersea & Hyperbaric Medicine", "type": "Physician ", "contacts": "298"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Urgent Care", "type": "Physician ", "contacts": "296"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Pediatrics - Sports Medicine", "type": "Physician ", "contacts": "157"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Pediatrics - Hospice & Palliative Medicine", "type": "Physician ", "contacts": "138"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Sports Medicine", "type": "Physician ", "contacts": "5159"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Emergency Room Director", "type": "Healthcare Professional ", "contacts": "2679"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "ICU/CCU Director", "type": "Healthcare Professional ", "contacts": "1691"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Podiatrist - Sports Medicine", "type": "Healthcare Professional ", "contacts": "39"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Certified Respiratory Therapist - Emergency Care", "type": "Therapist ", "contacts": "4"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Registered Respiratory Therapist - Emergency Care", "type": "Therapist ", "contacts": "7"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Clinical Nurse - Emergency", "type": "Nurse ", "contacts": "51"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Clinical Nurse - Critical Care Medicine", "type": "Nurse ", "contacts": "91"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Nurse Practitioner - Critical Care Medicine", "type": "Nurse ", "contacts": "789"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Nurse Practitioner - Neonatal, Critical Care", "type": "Nurse ", "contacts": "1380"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Pediatrics - Critical Care Nurse Practitioner", "type": "Nurse ", "contacts": "657"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Registered Nurse - Critical Care Medicine", "type": "Nurse ", "contacts": "1918"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Registered Nurse - Emergency", "type": "Nurse ", "contacts": "1702"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "nan", "type": "nan", "contacts": "92,525"}, {"group": "Emergency Medicine / Critical Care Medicine", "specialty": "Emergency Medical Technician (Paramedic)", "type": "Technologists/Technicians ", "contacts": "597"}, {"group": "Endocrinology/Diabetes/Metabolism", "specialty": "Endocrinologist, Diabetes & Metabolism", "type": "Physician ", "contacts": "7735"}, {"group": "Endocrinology/Diabetes/Metabolism", "specialty": "Pediatrics - Endocrinologist", "type": "Physician ", "contacts": "1319"}, {"group": "Endocrinology/Diabetes/Metabolism", "specialty": "Reproductive Endocrinologist", "type": "Physician ", "contacts": "1020"}, {"group": "Endocrinology/Diabetes/Metabolism", "specialty": "Diabetes Educator", "type": "Healthcare Professional ", "contacts": "2503"}, {"group": "Endocrinology/Diabetes/Metabolism", "specialty": "Registered Nurse - Reproductive Endocrinologist/Infertility", "type": "Nurse ", "contacts": "14"}, {"group": "Endocrinology/Diabetes/Metabolism", "specialty": "Registered Nurse - Diabetes Educator", "type": "Nurse ", "contacts": "1200"}, {"group": "Endocrinology/Diabetes/Metabolism", "specialty": "nan", "type": "nan", "contacts": "14,388"}, {"group": "Eye and Vision", "specialty": "Ophthalmologist", "type": "Physician ", "contacts": "18091"}, {"group": "Eye and Vision", "specialty": "Pediatrics - Ophthalmologist", "type": "Physician ", "contacts": "56"}, {"group": "Eye and Vision", "specialty": "Optometrist", "type": "Healthcare Professional ", "contacts": "27970"}, {"group": "Eye and Vision", "specialty": "Optometrist - Corneal & Contact Management", "type": "Healthcare Professional ", "contacts": "587"}, {"group": "Eye and Vision", "specialty": "Optometrist - Low Vision Rehabilitation", "type": "Healthcare Professional ", "contacts": "100"}, {"group": "Eye and Vision", "specialty": "Optometrist - Occupational Vision", "type": "Healthcare Professional ", "contacts": "13"}, {"group": "Eye and Vision", "specialty": "Optometrist - Sports Vision", "type": "Healthcare Professional ", "contacts": "8"}, {"group": "Eye and Vision", "specialty": "Optometrist - Vision Therapist", "type": "Healthcare Professional ", "contacts": "112"}, {"group": "Eye and Vision", "specialty": "Orthoptist", "type": "Healthcare Professional ", "contacts": "98"}, {"group": "Eye and Vision", "specialty": "Pediatrics - Optometrist", "type": "Healthcare Professional ", "contacts": "121"}, {"group": "Eye and Vision", "specialty": "Registered Nurse - Ophthalmic", "type": "Nurse ", "contacts": "11"}, {"group": "Eye and Vision", "specialty": "Ophthalmic Assistant", "type": "Physician Assistant ", "contacts": "216"}, {"group": "Eye and Vision", "specialty": "Optometric Assistant", "type": "Physician Assistant ", "contacts": "16"}, {"group": "Eye and Vision", "specialty": "Contact Lens Fitter", "type": "Technologists/Technicians ", "contacts": "20"}, {"group": "Eye and Vision", "specialty": "Ocularist", "type": "Technologists/Technicians ", "contacts": "18"}, {"group": "Eye and Vision", "specialty": "Optician", "type": "Technologists/Technicians ", "contacts": "978"}, {"group": "Eye and Vision", "specialty": "Optometric Technician", "type": "Technologists/Technicians ", "contacts": "61"}, {"group": "Eye and Vision", "specialty": "nan", "type": "nan", "contacts": "48,476"}, {"group": "Family/General Practice", "specialty": "Adult Medicine", "type": "Physician ", "contacts": "1331"}, {"group": "Family/General Practice", "specialty": "Family Medicine (Family Practitioner)", "type": "Physician ", "contacts": "100693"}, {"group": "Family/General Practice", "specialty": "General Practice (General Practitioner)", "type": "Physician ", "contacts": "35763"}, {"group": "Family/General Practice", "specialty": "Geriatric Medicine", "type": "Physician ", "contacts": "3183"}, {"group": "Family/General Practice", "specialty": "Geriatric Psychiatry", "type": "Physician ", "contacts": "528"}, {"group": "Family/General Practice", "specialty": "nan", "type": "nan", "contacts": "141,498"}, {"group": "Internal Medicine", "specialty": "Geriatric Medicine", "type": "Physician ", "contacts": "3183"}, {"group": "Internal Medicine", "specialty": "Geriatric Psychiatry", "type": "Physician ", "contacts": "528"}, {"group": "Internal Medicine", "specialty": "Internal Medicine (Internist)", "type": "Physician ", "contacts": "125067"}, {"group": "Internal Medicine", "specialty": "Internal Medicine - Addiction Medicine", "type": "Physician ", "contacts": "320"}, {"group": "Internal Medicine", "specialty": "Internal Medicine - Adolescent Medicine", "type": "Physician ", "contacts": "788"}, {"group": "Internal Medicine", "specialty": "Internal Medicine - Bariatric Medicine", "type": "Physician ", "contacts": "193"}, {"group": "Internal Medicine", "specialty": "Internal Medicine - Critical Care Medicine", "type": "Physician ", "contacts": "5480"}, {"group": "Internal Medicine", "specialty": "Internal Medicine - Gastroenterologist", "type": "Physician ", "contacts": "14148"}, {"group": "Internal Medicine", "specialty": "Internal Medicine - Geriatric Medicine", "type": "Physician ", "contacts": "3267"}, {"group": "Internal Medicine", "specialty": "Internal Medicine - Hematologist", "type": "Physician ", "contacts": "2690"}, {"group": "Internal Medicine", "specialty": "Internal Medicine - Hepatologist", "type": "Physician ", "contacts": "410"}, {"group": "Internal Medicine", "specialty": "Internal Medicine - Hospitalist", "type": "Physician ", "contacts": "19010"}, {"group": "Internal Medicine", "specialty": "Internal Medicine - Hypertension Specialist", "type": "Physician ", "contacts": "43"}, {"group": "Internal Medicine", "specialty": "Internal Medicine - Infectious Disease", "type": "Physician ", "contacts": "8382"}, {"group": "Internal Medicine", "specialty": "Internal Medicine - Magnetic Resonance Imaging (MRI)", "type": "Physician ", "contacts": "60"}, {"group": "Internal Medicine", "specialty": "Internal Medicine - Nephrologist", "type": "Physician ", "contacts": "10254"}, {"group": "Internal Medicine", "specialty": "Internal Medicine - Rheumatologist", "type": "Physician ", "contacts": "5831"}, {"group": "Internal Medicine", "specialty": "Internal Medicine - Sleep Medicine", "type": "Physician ", "contacts": "650"}, {"group": "Internal Medicine", "specialty": "Internal Medicine - Transplant Hepatologist", "type": "Physician ", "contacts": "147"}, {"group": "Internal Medicine", "specialty": "Pediatrics - Adolescent Medicine", "type": "Physician ", "contacts": "2426"}, {"group": "Internal Medicine", "specialty": "Pediatrics - Gastroenterologist", "type": "Physician ", "contacts": "1522"}, {"group": "Internal Medicine", "specialty": "Pediatrics - Internal Medicine", "type": "Physician ", "contacts": "374"}, {"group": "Internal Medicine", "specialty": "Pediatrics - Nephrologist", "type": "Physician ", "contacts": "608"}, {"group": "Internal Medicine", "specialty": "Pediatrics - Pulmonologist", "type": "Physician ", "contacts": "964"}, {"group": "Internal Medicine", "specialty": "Pediatrics - Rheumatologist", "type": "Physician ", "contacts": "338"}, {"group": "Internal Medicine", "specialty": "Pediatrics - Transplant Hepatologist", "type": "Physician ", "contacts": "19"}, {"group": "Internal Medicine", "specialty": "Pulmonary Critical Care", "type": "Physician ", "contacts": "332"}, {"group": "Internal Medicine", "specialty": "Pulmonary Disease (Pulmonologist)", "type": "Physician ", "contacts": "11149"}, {"group": "Internal Medicine", "specialty": "nan", "type": "nan", "contacts": "218,183"}, {"group": "Laboratory Medicine", "specialty": "Clinical & Laboratory Immunologist", "type": "Physician ", "contacts": "75"}, {"group": "Laboratory Medicine", "specialty": "Clinical & Laboratory Dermatological Immunologist", "type": "Physician ", "contacts": "55"}, {"group": "Laboratory Medicine", "specialty": "Clinical Pathologist/Laboratory Medicine", "type": "Physician ", "contacts": "937"}, {"group": "Laboratory Medicine", "specialty": "Pediatrics - Clinical & Laboratory Immunologist", "type": "Physician ", "contacts": "11"}, {"group": "Laboratory Medicine", "specialty": "Cardiac Cath Lab Director", "type": "Healthcare Professional ", "contacts": "1298"}, {"group": "Laboratory Medicine", "specialty": "Sleep Lab Director", "type": "Healthcare Professional ", "contacts": "1281"}, {"group": "Laboratory Medicine", "specialty": "Clinical Laboratory Director, Non-physician", "type": "Healthcare Professional ", "contacts": "101"}, {"group": "Laboratory Medicine", "specialty": "Clinical Lab Immunologist", "type": "Technologists/Technicians ", "contacts": "35"}, {"group": "Laboratory Medicine", "specialty": "Clinical Medical Laboratory", "type": "Technologists/Technicians ", "contacts": "59"}, {"group": "Laboratory Medicine", "specialty": "Laboratory Management", "type": "Technologists/Technicians ", "contacts": "3184"}, {"group": "Laboratory Medicine", "specialty": "Laboratory Technician", "type": "Technologists/Technicians ", "contacts": "6144"}, {"group": "Laboratory Medicine", "specialty": "Medical Laboratory", "type": "Technologists/Technicians ", "contacts": "8417"}, {"group": "Laboratory Medicine", "specialty": "Phlebotomy (Phlebotomist)", "type": "Technologists/Technicians ", "contacts": "3162"}, {"group": "Laboratory Medicine", "specialty": "Physiological Laboratory", "type": "Technologists/Technicians ", "contacts": "21"}, {"group": "Laboratory Medicine", "specialty": "Military Clinical Medical Laboratory", "type": "Technologists/Technicians ", "contacts": "2"}, {"group": "Laboratory Medicine", "specialty": "nan", "type": "nan", "contacts": "24,782"}, {"group": "Medical Genetics", "specialty": "Clinical Biochemical Genetics", "type": "Physician ", "contacts": "60"}, {"group": "Medical Genetics", "specialty": "Clinical Cytogenetic", "type": "Physician ", "contacts": "204"}, {"group": "Medical Genetics", "specialty": "Clinical Genetics", "type": "Physician ", "contacts": "692"}, {"group": "Medical Genetics", "specialty": "Clinical Molecular Genetics", "type": "Physician ", "contacts": "50"}, {"group": "Medical Genetics", "specialty": "Genetic (Geneticist)", "type": "Physician ", "contacts": "1129"}, {"group": "Medical Genetics", "specialty": "Molecular Genetic Pathologist", "type": "Physician ", "contacts": "140"}, {"group": "Medical Genetics", "specialty": "Genetic Counselor, MS", "type": "Healthcare Professional ", "contacts": "1811"}, {"group": "Medical Genetics", "specialty": "Medical Genetics", "type": "Healthcare Professional ", "contacts": "155"}, {"group": "Medical Genetics", "specialty": "nan", "type": "nan", "contacts": "4,241"}, {"group": "Neurology", "specialty": "Behavioral Neurologist & Neuropsychiatrist", "type": "Physician ", "contacts": "101"}, {"group": "Neurology", "specialty": "Clinical Neuropsychologist", "type": "Physician ", "contacts": "2375"}, {"group": "Neurology", "specialty": "Electrodiagnostic Medicine", "type": "Physician ", "contacts": "28"}, {"group": "Neurology", "specialty": "Neurodevelopmental Disabilities", "type": "Physician ", "contacts": "28"}, {"group": "Neurology", "specialty": "Neurological Surgery (Neurosurgery)", "type": "Physician ", "contacts": "6006"}, {"group": "Neurology", "specialty": "Neuromuscular Medicine", "type": "Physician ", "contacts": "228"}, {"group": "Neurology", "specialty": "Neuromusculoskeletal Medicine & OMM", "type": "Physician ", "contacts": "953"}, {"group": "Neurology", "specialty": "Pediatrics - Neurodevelopmental Disabilities", "type": "Physician ", "contacts": "151"}, {"group": "Neurology", "specialty": "Neurologist", "type": "Physician ", "contacts": "18459"}, {"group": "Neurology", "specialty": "Pediatrics - Neurologist", "type": "Physician ", "contacts": "1669"}, {"group": "Neurology", "specialty": "Vascular Neurologist", "type": "Physician ", "contacts": "521"}, {"group": "Neurology", "specialty": "Chiropractor - Neurologist", "type": "Healthcare Professional ", "contacts": "169"}, {"group": "Neurology", "specialty": "Physical Therapist - Neurologist", "type": "Therapist ", "contacts": "309"}, {"group": "Neurology", "specialty": "Electroencephalography (EEG)", "type": "Technologists/Technicians ", "contacts": "34"}, {"group": "Neurology", "specialty": "nan", "type": "nan", "contacts": "31,031"}, {"group": "Nuclear Medicine", "specialty": "In Vivo & In Vitro Nuclear Medicine", "type": "Physician ", "contacts": "8"}, {"group": "Nuclear Medicine", "specialty": "Nuclear Cardiologist", "type": "Physician ", "contacts": "656"}, {"group": "Nuclear Medicine", "specialty": "Nuclear Imaging & Therapist", "type": "Physician ", "contacts": "118"}, {"group": "Nuclear Medicine", "specialty": "Nuclear Medicine", "type": "Physician ", "contacts": "917"}, {"group": "Nuclear Medicine", "specialty": "Nuclear Radiologist", "type": "Physician ", "contacts": "400"}, {"group": "Nuclear Medicine", "specialty": "Pharmacist - Nuclear", "type": "Pharmacists/Pharmacies ", "contacts": "30"}, {"group": "Nuclear Medicine", "specialty": "Nuclear Medicine Technologist", "type": "Technologists/Technicians ", "contacts": "823"}, {"group": "Nuclear Medicine", "specialty": "nan", "type": "nan", "contacts": "2,952"}, {"group": "Nursing", "specialty": "Clinical Nurse - Psych/Mental Health", "type": "Nurse ", "contacts": "448"}, {"group": "Nursing", "specialty": "Clinical Nurse - Psych/Mental Health, Adult", "type": "Nurse ", "contacts": "482"}, {"group": "Nursing", "specialty": "Registered Nurse - Reproductive Endocrinologist/Infertility", "type": "Nurse ", "contacts": "14"}, {"group": "Nursing", "specialty": "Advanced Practice Midwife", "type": "Nurse ", "contacts": "6182"}, {"group": "Nursing", "specialty": "Certified Registered Nurse Anesthetist", "type": "Nurse ", "contacts": "44142"}, {"group": "Nursing", "specialty": "Clinical Nurse", "type": "Nurse ", "contacts": "3219"}, {"group": "Nursing", "specialty": "Clinical Nurse - Acute Care", "type": "Nurse", "contacts": "276"}, {"group": "Nursing", "specialty": "Clinical Nurse - Adult Health", "type": "Nurse", "contacts": "744"}, {"group": "Nursing", "specialty": "Clinical Nurse - Chronic Care", "type": "Nurse", "contacts": "6"}, {"group": "Nursing", "specialty": "Clinical Nurse - Community Health/Public Health", "type": "Nurse", "contacts": "36"}, {"group": "Nursing", "specialty": "Clinical Nurse - Critical Care Medicine", "type": "Nurse", "contacts": "91"}, {"group": "Nursing", "specialty": "Clinical Nurse - Emergency", "type": "Nurse", "contacts": "51"}, {"group": "Nursing", "specialty": "Clinical Nurse - Family Health", "type": "Nurse", "contacts": "361"}, {"group": "Nursing", "specialty": "Clinical Nurse - Gerontologist", "type": "Nurse", "contacts": "167"}, {"group": "Nursing", "specialty": "Clinical Nurse - Holistic", "type": "Nurse", "contacts": "2"}, {"group": "Nursing", "specialty": "Clinical Nurse - Home Health", "type": "Nurse", "contacts": "5"}, {"group": "Nursing", "specialty": "Clinical Nurse - Long-Term Care", "type": "Nurse", "contacts": "56"}, {"group": "Nursing", "specialty": "Clinical Nurse - Medical-Surgical", "type": "Nurse", "contacts": "132"}, {"group": "Nursing", "specialty": "Clinical Nurse - Neonatal", "type": "Nurse", "contacts": "58"}, {"group": "Nursing", "specialty": "Clinical Nurse - Neuroscience", "type": "Nurse", "contacts": "26"}, {"group": "Nursing", "specialty": "Clinical Nurse - Occupational Health", "type": "Nurse", "contacts": "7"}, {"group": "Nursing", "specialty": "Clinical Nurse - Oncologist", "type": "Nurse", "contacts": "125"}, {"group": "Nursing", "specialty": "Clinical Nurse - Perinatal", "type": "Nurse", "contacts": "12"}, {"group": "Nursing", "specialty": "Clinical Nurse - Perioperative", "type": "Nurse", "contacts": "20"}, {"group": "Nursing", "specialty": "Clinical Nurse - Psych/Mental Health, Child & Adolescent", "type": "Nurse", "contacts": "93"}, {"group": "Nursing", "specialty": "Clinical Nurse - Psych/Mental Health, Child & Family", "type": "Nurse", "contacts": "26"}, {"group": "Nursing", "specialty": "Clinical Nurse - Psych/Mental Health, Chronically Ill", "type": "Nurse", "contacts": "2"}, {"group": "Nursing", "specialty": "Clinical Nurse - Rehabilitation", "type": "Nurse", "contacts": "10"}, {"group": "Nursing", "specialty": "Clinical Nurse - School", "type": "Nurse", "contacts": "3"}, {"group": "Nursing", "specialty": "Clinical Nurse - Women's Health", "type": "Nurse", "contacts": "78"}, {"group": "Nursing", "specialty": "Licensed Practical Nurse", "type": "Nurse", "contacts": "18419"}, {"group": "Nursing", "specialty": "Licensed Vocational Nurse", "type": "Nurse", "contacts": "4157"}, {"group": "Nursing", "specialty": "Midwife", "type": "Nurse", "contacts": "1971"}, {"group": "Nursing", "specialty": "Nurse", "type": "Nurse", "contacts": "27172"}, {"group": "Nursing", "specialty": "Nurse Practitioner", "type": "Nurse", "contacts": "64443"}, {"group": "Nursing", "specialty": "Nurse Practitioner - Acute Care", "type": "Nurse", "contacts": "14392"}, {"group": "Nursing", "specialty": "Nurse Practitioner - Adult Health", "type": "Nurse", "contacts": "18031"}, {"group": "Nursing", "specialty": "Nurse Practitioner - Community Health", "type": "Nurse", "contacts": "224"}, {"group": "Nursing", "specialty": "Nurse Practitioner - Critical Care Medicine", "type": "Nurse", "contacts": "789"}, {"group": "Nursing", "specialty": "Nurse Practitioner - Family", "type": "Nurse", "contacts": "103450"}, {"group": "Nursing", "specialty": "Nurse Practitioner - Gerontologist", "type": "Nurse", "contacts": "4885"}, {"group": "Nursing", "specialty": "Nurse Practitioner - Neonatal", "type": "Nurse", "contacts": "2473"}, {"group": "Nursing", "specialty": "Nurse Practitioner - Neonatal, Critical Care", "type": "Nurse", "contacts": "1380"}, {"group": "Nursing", "specialty": "Nurse Practitioner - Obstetrics & Gynecologist", "type": "Nurse", "contacts": "1662"}, {"group": "Nursing", "specialty": "Nurse Practitioner - Occupational Health", "type": "Nurse", "contacts": "177"}, {"group": "Nursing", "specialty": "Nurse Practitioner - Perinatal", "type": "Nurse", "contacts": "43"}, {"group": "Nursing", "specialty": "Nurse Practitioner - Primary Care", "type": "Nurse", "contacts": "4962"}, {"group": "Nursing", "specialty": "Nurse Practitioner - Psych/Mental Health", "type": "Nurse", "contacts": "14921"}, {"group": "Nursing", "specialty": "Nurse Practitioner - School", "type": "Nurse", "contacts": "38"}, {"group": "Nursing", "specialty": "Nurse Practitioner - Women's Health", "type": "Nurse", "contacts": "4596"}, {"group": "Nursing", "specialty": "Nurse's Aide", "type": "Nurse", "contacts": "2799"}, {"group": "Nursing", "specialty": "Nursing Facility/Intermediate Care Facility", "type": "Nurse", "contacts": "30"}, {"group": "Nursing", "specialty": "Pediatrics - Clinical Nurse", "type": "Nurse", "contacts": "138"}, {"group": "Nursing", "specialty": "Pediatrics - Critical Care Nurse Practitioner", "type": "Nurse", "contacts": "657"}, {"group": "Nursing", "specialty": "Pediatrics - Nurse Practitioner", "type": "Nurse", "contacts": "11395"}, {"group": "Nursing", "specialty": "Pediatrics - Nursing Care", "type": "Nurse", "contacts": "1592"}, {"group": "Nursing", "specialty": "Pediatrics - Oncology Clinical Nurse", "type": "Nurse", "contacts": "4"}, {"group": "Nursing", "specialty": "Pediatrics - Oncology Registered Nurse", "type": "Nurse", "contacts": "46"}, {"group": "Nursing", "specialty": "Pediatrics - Registered Nurse", "type": "Nurse", "contacts": "876"}, {"group": "Nursing", "specialty": "Registered Nurse", "type": "Nurse", "contacts": "80169"}, {"group": "Nursing", "specialty": "Registered Nurse - Addiction (Substance Use Disorder)", "type": "Nurse", "contacts": "566"}, {"group": "Nursing", "specialty": "Registered Nurse - Administrator", "type": "Nurse", "contacts": "597"}, {"group": "Nursing", "specialty": "Registered Nurse - Ambulatory Care", "type": "Nurse", "contacts": "927"}, {"group": "Nursing", "specialty": "Registered Nurse - Cardiac Rehabilitation", "type": "Nurse", "contacts": "79"}, {"group": "Nursing", "specialty": "Registered Nurse - Case Management", "type": "Nurse", "contacts": "1502"}, {"group": "Nursing", "specialty": "Registered Nurse - College Health", "type": "Nurse", "contacts": "114"}, {"group": "Nursing", "specialty": "Registered Nurse - Community Health", "type": "Nurse", "contacts": "2096"}, {"group": "Nursing", "specialty": "Registered Nurse - Continence Care", "type": "Nurse", "contacts": "12"}, {"group": "Nursing", "specialty": "Registered Nurse - Continuing Education/Staff Development", "type": "Nurse", "contacts": "71"}, {"group": "Nursing", "specialty": "Registered Nurse - Critical Care Medicine", "type": "Nurse", "contacts": "1918"}, {"group": "Nursing", "specialty": "Registered Nurse - Diabetes Educator", "type": "Nurse", "contacts": "1200"}, {"group": "Nursing", "specialty": "Registered Nurse - Dialysis, Peritoneal", "type": "Nurse", "contacts": "94"}, {"group": "Nursing", "specialty": "Registered Nurse - Emergency", "type": "Nurse", "contacts": "1702"}, {"group": "Nursing", "specialty": "Registered Nurse - Enterostomal", "type": "Nurse", "contacts": "38"}, {"group": "Nursing", "specialty": "Registered Nurse - Flight", "type": "Nurse", "contacts": "42"}, {"group": "Nursing", "specialty": "Registered Nurse - Gastroenterologist", "type": "Nurse", "contacts": "131"}, {"group": "Nursing", "specialty": "Registered Nurse - General Practice", "type": "Nurse", "contacts": "1064"}, {"group": "Nursing", "specialty": "Registered Nurse - Gerontologist", "type": "Nurse", "contacts": "228"}, {"group": "Nursing", "specialty": "Registered Nurse - Hemodialysis", "type": "Nurse", "contacts": "42"}, {"group": "Nursing", "specialty": "Registered Nurse - Home Health", "type": "Nurse", "contacts": "1546"}, {"group": "Nursing", "specialty": "Registered Nurse - Hospice", "type": "Nurse", "contacts": "207"}, {"group": "Nursing", "specialty": "Registered Nurse - Infection Control", "type": "Nurse", "contacts": "72"}, {"group": "Nursing", "specialty": "Registered Nurse - Infusion", "type": "Nurse", "contacts": "161"}, {"group": "Nursing", "specialty": "Registered Nurse - Lactation Consultant", "type": "Nurse", "contacts": "602"}, {"group": "Nursing", "specialty": "Registered Nurse - Maternal Newborn", "type": "Nurse", "contacts": "182"}, {"group": "Nursing", "specialty": "Registered Nurse - Medical-Surgical", "type": "Nurse", "contacts": "1336"}, {"group": "Nursing", "specialty": "Registered Nurse - Neonatal Intensive Care", "type": "Nurse", "contacts": "325"}, {"group": "Nursing", "specialty": "Registered Nurse - Neonatal, Low-Risk", "type": "Nurse", "contacts": "8"}, {"group": "Nursing", "specialty": "Registered Nurse - Nephrologist", "type": "Nurse", "contacts": "45"}, {"group": "Nursing", "specialty": "Registered Nurse - Neuroscience", "type": "Nurse", "contacts": "89"}, {"group": "Nursing", "specialty": "Registered Nurse - Nurse Massage Therapist (NMT)", "type": "Nurse", "contacts": "33"}, {"group": "Nursing", "specialty": "Registered Nurse - Nutrition Support", "type": "Nurse", "contacts": "24"}, {"group": "Nursing", "specialty": "Registered Nurse - Obstetric, High-Risk", "type": "Nurse", "contacts": "38"}, {"group": "Nursing", "specialty": "Registered Nurse - Obstetric, Inpatient", "type": "Nurse", "contacts": "113"}, {"group": "Nursing", "specialty": "Registered Nurse - Occupational Health", "type": "Nurse", "contacts": "94"}, {"group": "Nursing", "specialty": "Registered Nurse - Oncologist", "type": "Nurse", "contacts": "412"}, {"group": "Nursing", "specialty": "Registered Nurse - Ophthalmic", "type": "Nurse", "contacts": "11"}, {"group": "Nursing", "specialty": "Registered Nurse - Orthopedic", "type": "Nurse", "contacts": "136"}, {"group": "Nursing", "specialty": "Registered Nurse - Ostomy Care", "type": "Nurse", "contacts": "25"}, {"group": "Nursing", "specialty": "Registered Nurse - Otorhinolaryngologist & Head-Neck", "type": "Nurse", "contacts": "22"}, {"group": "Nursing", "specialty": "Registered Nurse - Pain Management", "type": "Nurse", "contacts": "97"}, {"group": "Nursing", "specialty": "Registered Nurse - Psych/Mental Health", "type": "Nurse", "contacts": "3790"}, {"group": "Nursing", "specialty": "Registered Nurse - Psych/Mental Health, Adult", "type": "Nurse", "contacts": "1645"}, {"group": "Nursing", "specialty": "Registered Nurse - Psych/Mental Health, Child & Adolescent", "type": "Nurse", "contacts": "377"}, {"group": "Nursing", "specialty": "Registered Nurse - Rehabilitation", "type": "Nurse", "contacts": "129"}, {"group": "Nursing", "specialty": "Registered Nurse - School", "type": "Nurse", "contacts": "1904"}, {"group": "Nursing", "specialty": "Registered Nurse - Women's Health Care, Ambulatory", "type": "Nurse", "contacts": "283"}, {"group": "Nursing", "specialty": "Registered Nurse - Wound Care", "type": "Nurse", "contacts": "186"}, {"group": "Nursing", "specialty": "Religious Nonmedical Nursing Personnel", "type": "Nurse", "contacts": "38"}, {"group": "Nursing", "specialty": "Religious Nonmedical Practitioner", "type": "Nurse", "contacts": "5"}, {"group": "Nursing", "specialty": "School Nurse", "type": "Nurse", "contacts": "604"}, {"group": "Nursing", "specialty": "Skilled Nursing", "type": "Nurse", "contacts": "215"}, {"group": "Nursing", "specialty": "Registered Nurse - Perinatal", "type": "Nurse", "contacts": "53"}, {"group": "Nursing", "specialty": "Clinical Nurse - Psych/Mental Health, Community", "type": "Nurse", "contacts": "8"}, {"group": "Nursing", "specialty": "Clinical Nurse - Psych/Mental Health, Geropsychiatric", "type": "Nurse", "contacts": "9"}, {"group": "Nursing", "specialty": "Registered Nurse - Urologist", "type": "Nurse", "contacts": "152"}, {"group": "Nursing", "specialty": "Registered Nurse - Plastic Surgery", "type": "Nurse", "contacts": "41"}, {"group": "Nursing", "specialty": "Case Manager/Care Coordinator", "type": "Healthcare Professional", "contacts": "30559"}, {"group": "Nursing", "specialty": "Doula", "type": "Healthcare Professional", "contacts": "752"}, {"group": "Nursing", "specialty": "Hospice, Inpatient", "type": "Healthcare Professional", "contacts": "316"}, {"group": "Nursing", "specialty": "Maternal Newborn Specialist", "type": "Healthcare Professional", "contacts": "786"}, {"group": "Nursing", "specialty": "Nursing Service Director", "type": "Healthcare Professional", "contacts": "10540"}, {"group": "Nursing", "specialty": "Certified First Assistant", "type": "Physician Assistant", "contacts": "672"}, {"group": "Nursing", "specialty": "Physician Assistant", "type": "Physician Assistant", "contacts": "85093"}, {"group": "Nursing", "specialty": "Physician Assistant - Medical", "type": "Physician Assistant", "contacts": "24743"}, {"group": "Nursing", "specialty": "Physician Assistant - Surgical", "type": "Physician Assistant", "contacts": "11687"}, {"group": "Nursing", "specialty": "Registered Nurse - Registered Nurse First Assistant", "type": "Physician Assistant", "contacts": "654"}, {"group": "Nursing", "specialty": "Licensed Psychiatric Technician", "type": "Technologists/Technicians", "contacts": "421"}, {"group": "Nursing", "specialty": "nan", "type": "nan", "contacts": "636,428"}, {"group": "Obstetrics & Gynecology", "specialty": "Female Pelvic Medicine & Reconstructive Surgery", "type": "Physician", "contacts": "675"}, {"group": "Obstetrics & Gynecology", "specialty": "Gynecologist", "type": "Physician", "contacts": "3270"}, {"group": "Obstetrics & Gynecology", "specialty": "Gynecologic Oncologist", "type": "Physician", "contacts": "1231"}, {"group": "Obstetrics & Gynecology", "specialty": "Maternal & Fetal Medicine", "type": "Physician", "contacts": "1884"}, {"group": "Obstetrics & Gynecology", "specialty": "Obstetrics", "type": "Physician", "contacts": "1042"}, {"group": "Obstetrics & Gynecology", "specialty": "Urogynecologist", "type": "Physician", "contacts": "527"}, {"group": "Obstetrics & Gynecology", "specialty": "Women's Health", "type": "Physician", "contacts": "101"}, {"group": "Obstetrics & Gynecology", "specialty": "Obstetrics & Gynecologist", "type": "Physician", "contacts": "33650"}, {"group": "Obstetrics & Gynecology", "specialty": "Reproductive Endocrinologist", "type": "Physician", "contacts": "1020"}, {"group": "Obstetrics & Gynecology", "specialty": "Womens Health Services Director", "type": "Healthcare Professional", "contacts": "1548"}, {"group": "Obstetrics & Gynecology", "specialty": "Advanced Practice Midwife", "type": "Nurse", "contacts": "6182"}, {"group": "Obstetrics & Gynecology", "specialty": "Clinical Nurse - Women's Health", "type": "Nurse", "contacts": "78"}, {"group": "Obstetrics & Gynecology", "specialty": "Midwife", "type": "Nurse", "contacts": "1971"}, {"group": "Obstetrics & Gynecology", "specialty": "Nurse Practitioner - Obstetrics & Gynecologist", "type": "Nurse", "contacts": "1662"}, {"group": "Obstetrics & Gynecology", "specialty": "Registered Nurse - Reproductive Endocrinologist/Infertility", "type": "Nurse", "contacts": "14"}, {"group": "Obstetrics & Gynecology", "specialty": "Nurse Practitioner - Women's Health", "type": "Nurse", "contacts": "4596"}, {"group": "Obstetrics & Gynecology", "specialty": "Registered Nurse - Obstetric, High-Risk", "type": "Nurse", "contacts": "38"}, {"group": "Obstetrics & Gynecology", "specialty": "Registered Nurse - Obstetric, Inpatient", "type": "Nurse", "contacts": "113"}, {"group": "Obstetrics & Gynecology", "specialty": "Registered Nurse - Women's Health Care, Ambulatory", "type": "Nurse", "contacts": "283"}, {"group": "Obstetrics & Gynecology", "specialty": "nan", "type": "nan", "contacts": "59,885"}, {"group": "Oncology-Cancer", "specialty": "Dosimetry (Radiation Oncologist)", "type": "Physician", "contacts": "35"}, {"group": "Oncology-Cancer", "specialty": "Gynecologic Oncologist", "type": "Physician", "contacts": "1231"}, {"group": "Oncology-Cancer", "specialty": "Hematologist & Oncologist", "type": "Physician", "contacts": "10550"}, {"group": "Oncology-Cancer", "specialty": "Medical Oncologist", "type": "Physician", "contacts": "3889"}, {"group": "Oncology-Cancer", "specialty": "Oncologist", "type": "Physician", "contacts": "7026"}, {"group": "Oncology-Cancer", "specialty": "Pediatrics - Hematologist & Oncologist", "type": "Physician", "contacts": "2397"}, {"group": "Oncology-Cancer", "specialty": "Radiation Oncologist", "type": "Physician", "contacts": "4784"}, {"group": "Oncology-Cancer", "specialty": "Surgical Oncologist", "type": "Physician", "contacts": "1337"}, {"group": "Oncology-Cancer", "specialty": "Oncology Services Director", "type": "Healthcare Professional", "contacts": "1318"}, {"group": "Oncology-Cancer", "specialty": "Clinical Nurse - Oncologist", "type": "Nurse", "contacts": "125"}, {"group": "Oncology-Cancer", "specialty": "Pediatrics - Oncology Clinical Nurse", "type": "Nurse", "contacts": "4"}, {"group": "Oncology-Cancer", "specialty": "Pediatrics - Oncology Registered Nurse", "type": "Nurse", "contacts": "46"}, {"group": "Oncology-Cancer", "specialty": "Registered Nurse - Oncologist", "type": "Nurse", "contacts": "412"}, {"group": "Oncology-Cancer", "specialty": "Pharmacist - Oncologist", "type": "Pharmacists/Pharmacies", "contacts": "488"}, {"group": "Oncology-Cancer", "specialty": "nan", "type": "nan", "contacts": "33,642"}, {"group": "Orthopaedic", "specialty": "Pediatrics - Sports Medicine", "type": "Physician", "contacts": "157"}, {"group": "Orthopaedic", "specialty": "Adult Reconstructive Orthopaedic Surgery", "type": "Physician", "contacts": "1014"}, {"group": "Orthopaedic", "specialty": "Foot & Ankle Surgery", "type": "Physician", "contacts": "643"}, {"group": "Orthopaedic", "specialty": "Orthopaedic Surgery - Foot & Ankle", "type": "Physician", "contacts": "138"}, {"group": "Orthopaedic", "specialty": "Orthopaedic Surgery - Reconstructive", "type": "Physician", "contacts": "191"}, {"group": "Orthopaedic", "specialty": "Orthopaedic Surgery - Spine", "type": "Physician", "contacts": "1652"}, {"group": "Orthopaedic", "specialty": "Orthopaedic Surgery (Orthopedics)", "type": "Physician", "contacts": "22647"}, {"group": "Orthopaedic", "specialty": "Orthopaedic Surgery -Trauma", "type": "Physician", "contacts": "677"}, {"group": "Orthopaedic", "specialty": "Pediatrics - Orthopaedic Surgery", "type": "Physician", "contacts": "523"}, {"group": "Orthopaedic", "specialty": "Trauma Surgery (Traumatologist)", "type": "Physician", "contacts": "1454"}, {"group": "Orthopaedic", "specialty": "Sports Medicine", "type": "Physician", "contacts": "5159"}, {"group": "Orthopaedic", "specialty": "Chiropractor - Orthopedic", "type": "Healthcare Professional", "contacts": "241"}, {"group": "Orthopaedic", "specialty": "Registered Nurse - Orthopedic", "type": "Nurse", "contacts": "136"}, {"group": "Orthopaedic", "specialty": "Physical Therapist - Orthopaedic", "type": "Therapist", "contacts": "2832"}, {"group": "Orthopaedic", "specialty": "nan", "type": "nan", "contacts": "37,464"}, {"group": "Others - Healthcare Professional", "specialty": "Activities Director", "type": "Healthcare Professional", "contacts": "10397"}, {"group": "Others - Healthcare Professional", "specialty": "Ambulatory Services Director", "type": "Healthcare Professional", "contacts": "2668"}, {"group": "Others - Healthcare Professional", "specialty": "Assisted Living Director", "type": "Healthcare Professional", "contacts": "3716"}, {"group": "Others - Healthcare Professional", "specialty": "Biomedical Engineer", "type": "Healthcare Professional", "contacts": "2170"}, {"group": "Others - Healthcare Professional", "specialty": "Blood Bank Director", "type": "Healthcare Professional", "contacts": "658"}, {"group": "Others - Healthcare Professional", "specialty": "Cardiac Cath Lab Director", "type": "Healthcare Professional", "contacts": "1298"}, {"group": "Others - Healthcare Professional", "specialty": "Cardiology Director", "type": "Healthcare Professional", "contacts": "1605"}, {"group": "Others - Healthcare Professional", "specialty": "Credentialing Specialist", "type": "Healthcare Professional", "contacts": "2620"}, {"group": "Others - Healthcare Professional", "specialty": "Diabetes Educator", "type": "Healthcare Professional", "contacts": "2503"}, {"group": "Others - Healthcare Professional", "specialty": "Emergency Room Director", "type": "Healthcare Professional", "contacts": "2679"}, {"group": "Others - Healthcare Professional", "specialty": "Exercise Physiologist", "type": "Healthcare Professional", "contacts": "1042"}, {"group": "Others - Healthcare Professional", "specialty": "Chief Executive Officer", "type": "Healthcare Professional", "contacts": "46686"}, {"group": "Others - Healthcare Professional", "specialty": "Chief Financial Officer", "type": "Healthcare Professional", "contacts": "7556"}, {"group": "Others - Healthcare Professional", "specialty": "Chief Medical Officer", "type": "Healthcare Professional", "contacts": "3201"}, {"group": "Others - Healthcare Professional", "specialty": "Chief Nursing Officer", "type": "Healthcare Professional", "contacts": "2086"}, {"group": "Others - Healthcare Professional", "specialty": "Chief of Anesthesiology", "type": "Healthcare Professional", "contacts": "1118"}, {"group": "Others - Healthcare Professional", "specialty": "Chief of Neurosurgery", "type": "Healthcare Professional", "contacts": "349"}, {"group": "Others - Healthcare Professional", "specialty": "Chief of Obstetrics/Gynecology", "type": "Healthcare Professional", "contacts": "828"}, {"group": "Others - Healthcare Professional", "specialty": "Chief of Orthopedic Surgery", "type": "Healthcare Professional", "contacts": "690"}, {"group": "Others - Healthcare Professional", "specialty": "Chief of Pediatrics", "type": "Healthcare Professional", "contacts": "813"}, {"group": "Others - Healthcare Professional", "specialty": "Chief of Radiology", "type": "Healthcare Professional", "contacts": "1093"}, {"group": "Others - Healthcare Professional", "specialty": "Chief Operating Officer", "type": "Healthcare Professional", "contacts": "6924"}, {"group": "Others - Healthcare Professional", "specialty": "Health Educator", "type": "Healthcare Professional", "contacts": "1110"}, {"group": "Others - Healthcare Professional", "specialty": "Home Healthcare Services Director", "type": "Healthcare Professional", "contacts": "833"}, {"group": "Others - Healthcare Professional", "specialty": "ICU/CCU Director", "type": "Healthcare Professional", "contacts": "1691"}, {"group": "Others - Healthcare Professional", "specialty": "Independent Medical Examiner", "type": "Healthcare Professional", "contacts": "52"}, {"group": "Others - Healthcare Professional", "specialty": "Infection Prevention Director", "type": "Healthcare Professional", "contacts": "3790"}, {"group": "Others - Healthcare Professional", "specialty": "Informatics Specialist", "type": "Healthcare Professional", "contacts": "2077"}, {"group": "Others - Healthcare Professional", "specialty": "Lactation Consultant, Non-RN", "type": "Healthcare Professional", "contacts": "391"}, {"group": "Others - Healthcare Professional", "specialty": "Legal Medicine", "type": "Healthcare Professional", "contacts": "634"}, {"group": "Others - Healthcare Professional", "specialty": "Licensed Clinical Social Worker", "type": "Healthcare Professional", "contacts": "1126"}, {"group": "Others - Healthcare Professional", "specialty": "Medical Library Director", "type": "Healthcare Professional", "contacts": "663"}, {"group": "Others - Healthcare Professional", "specialty": "Medical Records Director", "type": "Healthcare Professional", "contacts": "6900"}, {"group": "Others - Healthcare Professional", "specialty": "Medical Transcriptionist", "type": "Healthcare Professional", "contacts": "1115"}, {"group": "Others - Healthcare Professional", "specialty": "Nursing Service Director", "type": "Healthcare Professional", "contacts": "10540"}, {"group": "Others - Healthcare Professional", "specialty": "Occupational Therapy Director", "type": "Healthcare Professional", "contacts": "3823"}, {"group": "Others - Healthcare Professional", "specialty": "Office Manager", "type": "Healthcare Professional", "contacts": "56942"}, {"group": "Others - Healthcare Professional", "specialty": "Oncology Services Director", "type": "Healthcare Professional", "contacts": "1318"}, {"group": "Others - Healthcare Professional", "specialty": "Operating Room Director", "type": "Healthcare Professional", "contacts": "1422"}, {"group": "Others - Healthcare Professional", "specialty": "Pastoral Care Director", "type": "Healthcare Professional", "contacts": "1274"}, {"group": "Others - Healthcare Professional", "specialty": "Patient Director", "type": "Healthcare Professional", "contacts": "644"}, {"group": "Others - Healthcare Professional", "specialty": "Physical Therapy/Rehab Director", "type": "Healthcare Professional", "contacts": "3810"}, {"group": "Others - Healthcare Professional", "specialty": "Practice Manager", "type": "Healthcare Professional", "contacts": "3306"}, {"group": "Others - Healthcare Professional", "specialty": "Psychiatric Services Director", "type": "Healthcare Professional", "contacts": "1300"}, {"group": "Others - Healthcare Professional", "specialty": "Radiology Director", "type": "Healthcare Professional", "contacts": "3875"}, {"group": "Others - Healthcare Professional", "specialty": "Recruiter", "type": "Healthcare Professional", "contacts": "6207"}, {"group": "Others - Healthcare Professional", "specialty": "Respiratory Therapy Director", "type": "Healthcare Professional", "contacts": "1956"}, {"group": "Others - Healthcare Professional", "specialty": "Sleep Lab Director", "type": "Healthcare Professional", "contacts": "1281"}, {"group": "Others - Healthcare Professional", "specialty": "Social Services Director", "type": "Healthcare Professional", "contacts": "7434"}, {"group": "Others - Healthcare Professional", "specialty": "Telemedicine", "type": "Healthcare Professional", "contacts": "1935"}, {"group": "Others - Healthcare Professional", "specialty": "Womens Health Services Director", "type": "Healthcare Professional", "contacts": "1548"}, {"group": "Others - Healthcare Professional", "specialty": "Administrator", "type": "Healthcare Professional", "contacts": "16253"}, {"group": "Others - Healthcare Professional", "specialty": "nan", "type": "nan", "contacts": "247,950"}, {"group": "Others - Physician", "specialty": "Adult Care", "type": "Physician", "contacts": "313"}, {"group": "Others - Physician", "specialty": "Bariatric Medicine", "type": "Physician", "contacts": "882"}, {"group": "Others - Physician", "specialty": "Clinical Ethicist", "type": "Physician", "contacts": "30"}, {"group": "Others - Physician", "specialty": "Doctor Of Medicine (MD)", "type": "Physician", "contacts": "17017"}, {"group": "Others - Physician", "specialty": "Medical Director", "type": "Physician", "contacts": "32095"}, {"group": "Others - Physician", "specialty": "Phlebologist", "type": "Physician", "contacts": "156"}, {"group": "Others - Physician", "specialty": "Physician Not Classified", "type": "Physician", "contacts": "27528"}, {"group": "Others - Physician", "specialty": "Primary Care", "type": "Physician", "contacts": "592"}, {"group": "Others - Physician", "specialty": "nan", "type": "nan", "contacts": "574,513"}, {"group": "Others - Technologists/Technicians", "specialty": "Clinical Medical Laboratory", "type": "Technologists/Technicians", "contacts": "59"}, {"group": "Others - Technologists/Technicians", "specialty": "Blood Banking & Transfusion Medicine", "type": "Technologists/Technicians", "contacts": "385"}, {"group": "Others - Technologists/Technicians", "specialty": "Bone Densitometry", "type": "Technologists/Technicians", "contacts": "8"}, {"group": "Others - Technologists/Technicians", "specialty": "Cardiology Technician", "type": "Technologists/Technicians", "contacts": "396"}, {"group": "Others - Technologists/Technicians", "specialty": "Cardiovascular Invasive Specialist", "type": "Technologists/Technicians", "contacts": "73"}, {"group": "Others - Technologists/Technicians", "specialty": "Cardiovascular-Interventional Technology", "type": "Technologists/Technicians", "contacts": "11"}, {"group": "Others - Technologists/Technicians", "specialty": "Clinical Lab Immunologist", "type": "Technologists/Technicians", "contacts": "35"}, {"group": "Others - Technologists/Technicians", "specialty": "Medical Laboratory", "type": "Technologists/Technicians", "contacts": "8417"}, {"group": "Others - Technologists/Technicians", "specialty": "Computed Tomography", "type": "Technologists/Technicians", "contacts": "4250"}, {"group": "Others - Technologists/Technicians", "specialty": "Contact Lens Fitter", "type": "Technologists/Technicians", "contacts": "20"}, {"group": "Others - Technologists/Technicians", "specialty": "Electroencephalography (EEG)", "type": "Technologists/Technicians", "contacts": "34"}, {"group": "Others - Technologists/Technicians", "specialty": "Electroneurodiagnostic", "type": "Technologists/Technicians", "contacts": "552"}, {"group": "Others - Technologists/Technicians", "specialty": "Emergency Medical Technician (Paramedic)", "type": "Technologists/Technicians", "contacts": "597"}, {"group": "Others - Technologists/Technicians", "specialty": "Health Information Technician", "type": "Technologists/Technicians", "contacts": "132"}, {"group": "Others - Technologists/Technicians", "specialty": "Histologist", "type": "Technologists/Technicians", "contacts": "473"}, {"group": "Others - Technologists/Technicians", "specialty": "Laboratory Management", "type": "Technologists/Technicians", "contacts": "3184"}, {"group": "Others - Technologists/Technicians", "specialty": "Laboratory Technician", "type": "Technologists/Technicians", "contacts": "6144"}, {"group": "Others - Technologists/Technicians", "specialty": "Licensed Psychiatric Technician", "type": "Technologists/Technicians", "contacts": "421"}, {"group": "Others - Technologists/Technicians", "specialty": "Magnetic Resonance Imaging", "type": "Technologists/Technicians", "contacts": "4810"}, {"group": "Others - Technologists/Technicians", "specialty": "Mammography", "type": "Technologists/Technicians", "contacts": "2203"}, {"group": "Others - Technologists/Technicians", "specialty": "Medical Technician/Technologist", "type": "Technologists/Technicians", "contacts": "2436"}, {"group": "Others - Technologists/Technicians", "specialty": "Military Clinical Medical Laboratory", "type": "Technologists/Technicians", "contacts": "2"}, {"group": "Others - Technologists/Technicians", "specialty": "Nuclear Medicine Technologist", "type": "Technologists/Technicians", "contacts": "823"}, {"group": "Others - Technologists/Technicians", "specialty": "Ocularist", "type": "Technologists/Technicians", "contacts": "18"}, {"group": "Others - Technologists/Technicians", "specialty": "Optician", "type": "Technologists/Technicians", "contacts": "978"}, {"group": "Others - Technologists/Technicians", "specialty": "Optometric Technician", "type": "Technologists/Technicians", "contacts": "61"}, {"group": "Others - Technologists/Technicians", "specialty": "Pathology Technician", "type": "Technologists/Technicians", "contacts": "110"}, {"group": "Others - Technologists/Technicians", "specialty": "Perfusionist", "type": "Technologists/Technicians", "contacts": "450"}, {"group": "Others - Technologists/Technicians", "specialty": "Pharmacy Technician", "type": "Technologists/Technicians", "contacts": "3200"}, {"group": "Others - Technologists/Technicians", "specialty": "Phlebotomy (Phlebotomist)", "type": "Technologists/Technicians", "contacts": "3162"}, {"group": "Others - Technologists/Technicians", "specialty": "Physiological Laboratory", "type": "Technologists/Technicians", "contacts": "21"}, {"group": "Others - Technologists/Technicians", "specialty": "Pulmonary Function Technologist", "type": "Technologists/Technicians", "contacts": "32"}, {"group": "Others - Technologists/Technicians", "specialty": "Radiography", "type": "Technologists/Technicians", "contacts": "1363"}, {"group": "Others - Technologists/Technicians", "specialty": "Radiologic Technologist", "type": "Technologists/Technicians", "contacts": "14691"}, {"group": "Others - Technologists/Technicians", "specialty": "Registered Dietetic Technician", "type": "Technologists/Technicians", "contacts": "188"}, {"group": "Others - Technologists/Technicians", "specialty": "Sonography", "type": "Technologists/Technicians", "contacts": "6429"}, {"group": "Others - Technologists/Technicians", "specialty": "Specialist/Technologist - Athletic Trainer", "type": "Technologists/Technicians", "contacts": "4973"}, {"group": "Others - Technologists/Technicians", "specialty": "Specialist/Technologist - Rehabilitation, Blind", "type": "Technologists/Technicians", "contacts": "120"}, {"group": "Others - Technologists/Technicians", "specialty": "Vascular Sonography", "type": "Technologists/Technicians", "contacts": "646"}, {"group": "Others - Technologists/Technicians", "specialty": "Vascular-Interventional Technology", "type": "Technologists/Technicians", "contacts": "931"}, {"group": "Others - Technologists/Technicians", "specialty": "nan", "type": "nan", "contacts": "72,838"}, {"group": "Pathology", "specialty": "Anatomic Pathologist", "type": "Physician", "contacts": "2286"}, {"group": "Pathology", "specialty": "Anatomic Pathologist & Clinical Pathologist", "type": "Physician", "contacts": "9926"}, {"group": "Pathology", "specialty": "Chemical Pathologist", "type": "Physician", "contacts": "24"}, {"group": "Pathology", "specialty": "Clinical Pathologist", "type": "Physician", "contacts": "486"}, {"group": "Pathology", "specialty": "Clinical Pathologist/Laboratory Medicine", "type": "Physician", "contacts": "937"}, {"group": "Pathology", "specialty": "Cytopathologist", "type": "Physician", "contacts": "792"}, {"group": "Pathology", "specialty": "Forensic Pathologist", "type": "Physician", "contacts": "258"}, {"group": "Pathology", "specialty": "Immunopathologist", "type": "Physician", "contacts": "35"}, {"group": "Pathology", "specialty": "Medical Microbiologist", "type": "Physician", "contacts": "736"}, {"group": "Pathology", "specialty": "Molecular Genetic Pathologist", "type": "Physician", "contacts": "140"}, {"group": "Pathology", "specialty": "Neuropathologist", "type": "Physician", "contacts": "316"}, {"group": "Pathology", "specialty": "Pathology", "type": "Physician", "contacts": "7577"}, {"group": "Pathology", "specialty": "Pediatrics - Pathologist", "type": "Physician", "contacts": "135"}, {"group": "Pathology", "specialty": "Blood Bank Director", "type": "Healthcare Professional", "contacts": "658"}, {"group": "Pathology", "specialty": "Clinical Laboratory Director, Non-physician", "type": "Healthcare Professional", "contacts": "101"}, {"group": "Pathology", "specialty": "Microbiologist", "type": "Healthcare Professional", "contacts": "908"}, {"group": "Pathology", "specialty": "Histologist", "type": "Technologists/Technicians", "contacts": "473"}, {"group": "Pathology", "specialty": "Blood Banking & Transfusion Medicine", "type": "Technologists/Technicians", "contacts": "385"}, {"group": "Pathology", "specialty": "Pathology Technician", "type": "Technologists/Technicians", "contacts": "110"}, {"group": "Pathology", "specialty": "nan", "type": "nan", "contacts": "26,283"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Allergist", "type": "Physician", "contacts": "82"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Neurologist", "type": "Physician", "contacts": "1669"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Urologist", "type": "Physician", "contacts": "344"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Neonatal-Perinatal Medicine", "type": "Physician", "contacts": "4633"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Sports Medicine", "type": "Physician", "contacts": "157"}, {"group": "Pediatrics Medicine", "specialty": "Neonatologist", "type": "Physician", "contacts": "1589"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Adolescent Medicine", "type": "Physician", "contacts": "2426"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Allergist & Immunologist", "type": "Physician", "contacts": "358"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Anesthesiologist", "type": "Physician", "contacts": "1196"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Cardiologist", "type": "Physician", "contacts": "2467"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Child Abuse", "type": "Physician", "contacts": "79"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Clinical & Laboratory Immunologist", "type": "Physician", "contacts": "11"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Critical Care Medicine", "type": "Physician", "contacts": "2235"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Dermatologist", "type": "Physician", "contacts": "173"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Developmental & Behavioral", "type": "Physician", "contacts": "684"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Emergency Medicine", "type": "Physician", "contacts": "2576"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Endocrinologist", "type": "Physician", "contacts": "1319"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Gastroenterologist", "type": "Physician", "contacts": "1522"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Hematologist & Oncologist", "type": "Physician", "contacts": "2397"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Infectious Diseases", "type": "Physician", "contacts": "885"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Internal Medicine", "type": "Physician", "contacts": "374"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Medical Toxicologist", "type": "Physician", "contacts": "11"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Nephrologist", "type": "Physician", "contacts": "608"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Neurodevelopmental Disabilities", "type": "Physician", "contacts": "151"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Orthopaedic Surgery", "type": "Physician", "contacts": "523"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Pathologist", "type": "Physician", "contacts": "135"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Pulmonologist", "type": "Physician", "contacts": "964"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Radiologist", "type": "Physician", "contacts": "715"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Rehabilitation Medicine", "type": "Physician", "contacts": "211"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Rheumatologist", "type": "Physician", "contacts": "338"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Sleep Medicine", "type": "Physician", "contacts": "83"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Transplant Hepatologist", "type": "Physician", "contacts": "19"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics (Pediatrician)", "type": "Physician", "contacts": "55260"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Psychiatrist", "type": "Physician", "contacts": "80"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Hospice & Palliative Medicine", "type": "Physician", "contacts": "138"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Ophthalmologist", "type": "Physician", "contacts": "56"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Otolaryngologist", "type": "Physician", "contacts": "447"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Audiologist", "type": "Healthcare Professional", "contacts": "45"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Optometrist", "type": "Healthcare Professional", "contacts": "121"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Registered Dietitian (Nutritionist)", "type": "Healthcare Professional", "contacts": "362"}, {"group": "Pediatrics Medicine", "specialty": "Perinatal", "type": "Healthcare Professional", "contacts": "195"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Chiropractor", "type": "Healthcare Professional", "contacts": "29"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Clinical Nurse", "type": "Nurse", "contacts": "138"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Critical Care Nurse Practitioner", "type": "Nurse", "contacts": "657"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Nurse Practitioner", "type": "Nurse", "contacts": "11395"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Nursing Care", "type": "Nurse", "contacts": "1592"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Oncology Clinical Nurse", "type": "Nurse", "contacts": "4"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Oncology Registered Nurse", "type": "Nurse", "contacts": "46"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Registered Nurse", "type": "Nurse", "contacts": "876"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Occupational Therapist", "type": "Therapist", "contacts": "2454"}, {"group": "Pediatrics Medicine", "specialty": "Pediatrics - Physical Therapist", "type": "Therapist", "contacts": "1401"}, {"group": "Pediatrics Medicine", "specialty": "Certified Respiratory Therapist - Neonatal/Pediatrics", "type": "Therapist", "contacts": "39"}, {"group": "Pediatrics Medicine", "specialty": "Registered Respiratory Therapist - Neonatal/Pediatrics", "type": "Therapist", "contacts": "46"}, {"group": "Pediatrics Medicine", "specialty": "nan", "type": "nan", "contacts": "106,315"}, {"group": "Pharmacy Service", "specialty": "Clinical Pharmacologist", "type": "Physician", "contacts": "97"}, {"group": "Pharmacy Service", "specialty": "Pharmacist", "type": "Pharmacists/Pharmacies", "contacts": "61893"}, {"group": "Pharmacy Service", "specialty": "Pharmacist - Clinical", "type": "Pharmacists/Pharmacies", "contacts": "3650"}, {"group": "Pharmacy Service", "specialty": "Pharmacist - Geriatric", "type": "Pharmacists/Pharmacies", "contacts": "293"}, {"group": "Pharmacy Service", "specialty": "Pharmacist - Nuclear", "type": "Pharmacists/Pharmacies", "contacts": "30"}, {"group": "Pharmacy Service", "specialty": "Pharmacist - Nutrition Support", "type": "Pharmacists/Pharmacies", "contacts": "46"}, {"group": "Pharmacy Service", "specialty": "Pharmacist - Oncologist", "type": "Pharmacists/Pharmacies", "contacts": "488"}, {"group": "Pharmacy Service", "specialty": "Pharmacist - Pharmacotherapist", "type": "Pharmacists/Pharmacies", "contacts": "2396"}, {"group": "Pharmacy Service", "specialty": "Pharmacist - Psychiatrist", "type": "Pharmacists/Pharmacies", "contacts": "371"}, {"group": "Pharmacy Service", "specialty": "Pharmacy Technician", "type": "Technologists/Technicians", "contacts": "3200"}, {"group": "Pharmacy Service", "specialty": "nan", "type": "nan", "contacts": "72,464"}, {"group": "Physical Medicine & Rehabilitation", "specialty": "Anesthesiologist - Hospice & Palliative Medicine", "type": "Physician", "contacts": "18"}, {"group": "Physical Medicine & Rehabilitation", "specialty": "Hospice & Palliative Medicine", "type": "Physician", "contacts": "2223"}, {"group": "Physical Medicine & Rehabilitation", "specialty": "Pediatrics - Sports Medicine", "type": "Physician", "contacts": "157"}, {"group": "Physical Medicine & Rehabilitation", "specialty": "Palliative Medicine", "type": "Physician", "contacts": "505"}, {"group": "Physical Medicine & Rehabilitation", "specialty": "Pediatrics - Hospice & Palliative Medicine", "type": "Physician", "contacts": "138"}, {"group": "Physical Medicine & Rehabilitation", "specialty": "Spinal Cord Injury Medicine", "type": "Physician", "contacts": "175"}, {"group": "Physical Medicine & Rehabilitation", "specialty": "Sports Medicine", "type": "Physician", "contacts": "5159"}, {"group": "Physical Medicine & Rehabilitation", "specialty": "Orthotics & Prosthetics", "type": "Healthcare Professional", "contacts": "733"}, {"group": "Physical Medicine & Rehabilitation", "specialty": "Rehabilitation Counselor", "type": "Healthcare Professional", "contacts": "535"}, {"group": "Physical Medicine & Rehabilitation", "specialty": "Rehabilitation Practitioner", "type": "Healthcare Professional", "contacts": "3203"}, {"group": "Physical Medicine & Rehabilitation", "specialty": "nan", "type": "nan", "contacts": "12,846"}, {"group": "Plastic Surgery", "specialty": "Otolaryngologist - Facial Plastic Surgery", "type": "Physician", "contacts": "934"}, {"group": "Plastic Surgery", "specialty": "Cosmetic Surgery", "type": "Physician", "contacts": "525"}, {"group": "Plastic Surgery", "specialty": "Plastic & Reconstructive Surgery", "type": "Physician", "contacts": "1785"}, {"group": "Plastic Surgery", "specialty": "Plastic Surgery", "type": "Physician", "contacts": "5253"}, {"group": "Plastic Surgery", "specialty": "Plastic Surgery - Hand", "type": "Physician", "contacts": "246"}, {"group": "Plastic Surgery", "specialty": "Plastic Surgery - Head & Neck", "type": "Physician", "contacts": "538"}, {"group": "Plastic Surgery", "specialty": "Registered Nurse - Plastic Surgery", "type": "Nurse", "contacts": "41"}, {"group": "Plastic Surgery", "specialty": "nan", "type": "nan", "contacts": "9,322"}, {"group": "Podiatric Medicine", "specialty": "Podiatrist - Sports Medicine", "type": "Healthcare Professional", "contacts": "39"}, {"group": "Podiatric Medicine", "specialty": "Podiatrist - Foot & Ankle Surgery", "type": "Healthcare Professional", "contacts": "4960"}, {"group": "Podiatric Medicine", "specialty": "Podiatrist - Foot Surgery", "type": "Healthcare Professional", "contacts": "677"}, {"group": "Podiatric Medicine", "specialty": "Podiatrist - Primary Podiatric Medicine", "type": "Healthcare Professional", "contacts": "363"}, {"group": "Podiatric Medicine", "specialty": "Podiatrist - Public Medicine", "type": "Healthcare Professional", "contacts": "12"}, {"group": "Podiatric Medicine", "specialty": "Podiatrist - Radiologist", "type": "Healthcare Professional", "contacts": "12"}, {"group": "Podiatric Medicine", "specialty": "Podiatry (Podiatrist)", "type": "Healthcare Professional", "contacts": "5761"}, {"group": "Podiatric Medicine", "specialty": "Podiatric Assistant", "type": "Physician Assistant", "contacts": "45"}, {"group": "Podiatric Medicine", "specialty": "nan", "type": "nan", "contacts": "11,869"}, {"group": "Preventive Medicine", "specialty": "Aerospace Medicine", "type": "Physician", "contacts": "311"}, {"group": "Preventive Medicine", "specialty": "Occupational Medicine", "type": "Physician", "contacts": "2127"}, {"group": "Preventive Medicine", "specialty": "Preventive Medicine", "type": "Physician", "contacts": "525"}, {"group": "Preventive Medicine", "specialty": "Preventive Medicine/Occupational Environmental Medicine", "type": "Physician", "contacts": "1061"}, {"group": "Preventive Medicine", "specialty": "Public Health & General Preventive Medicine", "type": "Physician", "contacts": "801"}, {"group": "Preventive Medicine", "specialty": "nan", "type": "nan", "contacts": "4,825"}, {"group": "Psychiatry", "specialty": "Behavioral Neurologist & Neuropsychiatrist", "type": "Physician", "contacts": "101"}, {"group": "Psychiatry", "specialty": "Child & Adolescent Psychiatrist", "type": "Physician", "contacts": "4161"}, {"group": "Psychiatry", "specialty": "Neuropsychiatrist", "type": "Physician", "contacts": "48"}, {"group": "Psychiatry", "specialty": "Addiction Medicine", "type": "Physician", "contacts": "1145"}, {"group": "Psychiatry", "specialty": "Addiction Psychiatry", "type": "Physician", "contacts": "402"}, {"group": "Psychiatry", "specialty": "Pediatrics - Psychiatrist", "type": "Physician", "contacts": "80"}, {"group": "Psychiatry", "specialty": "Forensic Psychiatry", "type": "Physician", "contacts": "406"}, {"group": "Psychiatry", "specialty": "Geriatric Psychiatry", "type": "Physician", "contacts": "528"}, {"group": "Psychiatry", "specialty": "Psychoanalyst", "type": "Physician", "contacts": "129"}, {"group": "Psychiatry", "specialty": "Psychosomatic Medicine", "type": "Physician", "contacts": "214"}, {"group": "Psychiatry", "specialty": "Psychiatrist", "type": "Physician", "contacts": "35582"}, {"group": "Psychiatry", "specialty": "Psychiatric Services Director", "type": "Healthcare Professional", "contacts": "1300"}, {"group": "Psychiatry", "specialty": "Clinical Nurse - Psych/Mental Health", "type": "Nurse", "contacts": "448"}, {"group": "Psychiatry", "specialty": "Clinical Nurse - Psych/Mental Health, Adult", "type": "Nurse", "contacts": "482"}, {"group": "Psychiatry", "specialty": "Clinical Nurse - Psych/Mental Health, Child & Adolescent", "type": "Nurse", "contacts": "93"}, {"group": "Psychiatry", "specialty": "Clinical Nurse - Psych/Mental Health, Child & Family", "type": "Nurse", "contacts": "26"}, {"group": "Psychiatry", "specialty": "Clinical Nurse - Psych/Mental Health, Community", "type": "Nurse", "contacts": "8"}, {"group": "Psychiatry", "specialty": "Clinical Nurse - Psych/Mental Health, Geropsychiatric", "type": "Nurse", "contacts": "9"}, {"group": "Psychiatry", "specialty": "Nurse Practitioner - Psych/Mental Health", "type": "Nurse", "contacts": "14921"}, {"group": "Psychiatry", "specialty": "Registered Nurse - Psych/Mental Health", "type": "Nurse", "contacts": "3790"}, {"group": "Psychiatry", "specialty": "Registered Nurse - Psych/Mental Health, Adult", "type": "Nurse", "contacts": "1645"}, {"group": "Psychiatry", "specialty": "Registered Nurse - Psych/Mental Health, Child & Adolescent", "type": "Nurse", "contacts": "377"}, {"group": "Psychiatry", "specialty": "Pharmacist - Psychiatrist", "type": "Pharmacists/Pharmacies", "contacts": "371"}, {"group": "Psychiatry", "specialty": "Licensed Psychiatric Technician", "type": "Technologists/Technicians", "contacts": "421"}, {"group": "Psychiatry", "specialty": "nan", "type": "nan", "contacts": "66,687"}, {"group": "Psychology", "specialty": "Clinical Neuropsychologist", "type": "Physician", "contacts": "2375"}, {"group": "Psychology", "specialty": "Psychologist", "type": "Healthcare Professional", "contacts": "37274"}, {"group": "Psychology", "specialty": "Psychologist - Addiction (Substance Use Disorder)", "type": "Healthcare Professional", "contacts": "165"}, {"group": "Psychology", "specialty": "Psychologist - Adult Development & Aging", "type": "Healthcare Professional", "contacts": "79"}, {"group": "Psychology", "specialty": "Psychologist - Clinical", "type": "Healthcare Professional", "contacts": "13689"}, {"group": "Psychology", "specialty": "Psychologist - Clinical Child & Adolescent", "type": "Healthcare Professional", "contacts": "1030"}, {"group": "Psychology", "specialty": "Psychologist - Cognitive & Behavioral", "type": "Healthcare Professional", "contacts": "448"}, {"group": "Psychology", "specialty": "Psychologist - Counseling", "type": "Healthcare Professional", "contacts": "1219"}, {"group": "Psychology", "specialty": "Psychologist - Exercise & Sports", "type": "Healthcare Professional", "contacts": "20"}, {"group": "Psychology", "specialty": "Psychologist - Family", "type": "Healthcare Professional", "contacts": "63"}, {"group": "Psychology", "specialty": "Psychologist - Forensic", "type": "Healthcare Professional", "contacts": "136"}, {"group": "Psychology", "specialty": "Psychologist - Health Service", "type": "Healthcare Professional", "contacts": "266"}, {"group": "Psychology", "specialty": "Psychologist - Mental Retardation & Developmental Disabilities", "type": "Healthcare Professional", "contacts": "72"}, {"group": "Psychology", "specialty": "Psychologist - Prescribing (Medical)", "type": "Healthcare Professional", "contacts": "44"}, {"group": "Psychology", "specialty": "Psychologist - Psychoanalysis", "type": "Healthcare Professional", "contacts": "56"}, {"group": "Psychology", "specialty": "Psychologist - Rehabilitation", "type": "Healthcare Professional", "contacts": "139"}, {"group": "Psychology", "specialty": "Psychologist - School", "type": "Healthcare Professional", "contacts": "805"}, {"group": "Psychology", "specialty": "Psychotherapy (Psychotherapist)", "type": "Therapist", "contacts": "1217"}, {"group": "Psychology", "specialty": "nan", "type": "nan", "contacts": "59,097"}, {"group": "Radiology", "specialty": "Body Imaging", "type": "Physician", "contacts": "1343"}, {"group": "Radiology", "specialty": "Diagnostic Neuroimaging", "type": "Physician", "contacts": "120"}, {"group": "Radiology", "specialty": "Diagnostic Radiologist", "type": "Physician", "contacts": "29867"}, {"group": "Radiology", "specialty": "Diagnostic Ultrasound", "type": "Physician", "contacts": "408"}, {"group": "Radiology", "specialty": "Neuroradiologist", "type": "Physician", "contacts": "1644"}, {"group": "Radiology", "specialty": "Nuclear Radiologist", "type": "Physician", "contacts": "400"}, {"group": "Radiology", "specialty": "Pediatrics - Radiologist", "type": "Physician", "contacts": "715"}, {"group": "Radiology", "specialty": "Radiation Oncologist", "type": "Physician", "contacts": "4784"}, {"group": "Radiology", "specialty": "Radiological Physics", "type": "Physician", "contacts": "78"}, {"group": "Radiology", "specialty": "Radiologist", "type": "Physician", "contacts": "8295"}, {"group": "Radiology", "specialty": "Therapeutic Radiologist", "type": "Physician", "contacts": "196"}, {"group": "Radiology", "specialty": "Vascular & Interventional Radiologist", "type": "Physician", "contacts": "3225"}, {"group": "Radiology", "specialty": "Radiology Director", "type": "Healthcare Professional", "contacts": "3875"}, {"group": "Radiology", "specialty": "Chiropractor - Radiologist", "type": "Healthcare Professional", "contacts": "36"}, {"group": "Radiology", "specialty": "Radiology Practitioner Assistant", "type": "Physician Assistant", "contacts": "266"}, {"group": "Radiology", "specialty": "Radiation Therapist", "type": "Therapist", "contacts": "2631"}, {"group": "Radiology", "specialty": "Bone Densitometry", "type": "Technologists/Technicians", "contacts": "8"}, {"group": "Radiology", "specialty": "Computed Tomography", "type": "Technologists/Technicians", "contacts": "4250"}, {"group": "Radiology", "specialty": "Magnetic Resonance Imaging", "type": "Technologists/Technicians", "contacts": "4810"}, {"group": "Radiology", "specialty": "Mammography", "type": "Technologists/Technicians", "contacts": "2203"}, {"group": "Radiology", "specialty": "Radiography", "type": "Technologists/Technicians", "contacts": "1363"}, {"group": "Radiology", "specialty": "Radiologic Technologist", "type": "Technologists/Technicians", "contacts": "14691"}, {"group": "Radiology", "specialty": "Sonography", "type": "Technologists/Technicians", "contacts": "6429"}, {"group": "Radiology", "specialty": "Vascular Sonography", "type": "Technologists/Technicians", "contacts": "646"}, {"group": "Radiology", "specialty": "Vascular-Interventional Technology", "type": "Technologists/Technicians", "contacts": "931"}, {"group": "Radiology", "specialty": "nan", "type": "nan", "contacts": "93,214"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Physical Medicine & Rehabilitation (Physiatry)", "type": "Physician", "contacts": "8743"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Anaplastologist", "type": "Healthcare Professional", "contacts": "8"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Pedorthist", "type": "Healthcare Professional", "contacts": "30"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Physical Therapy/Rehab Director", "type": "Healthcare Professional", "contacts": "3810"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Occupational Therapy Assistant", "type": "Physician Assistant", "contacts": "8881"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Occupational Therapy Assistant - Environmental Modification", "type": "Physician Assistant", "contacts": "21"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Occupational Therapy Assistant - Feeding, Eating & Swallowing", "type": "Physician Assistant", "contacts": "12"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Occupational Therapy Assistant - Low Vision", "type": "Physician Assistant", "contacts": "4"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Physical Therapy Assistant", "type": "Physician Assistant", "contacts": "13605"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Art Therapist", "type": "Therapist", "contacts": "436"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Certified Respiratory Therapist", "type": "Therapist", "contacts": "429"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Certified Respiratory Therapist - Critical Care", "type": "Therapist", "contacts": "47"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Certified Respiratory Therapist - Educational", "type": "Therapist", "contacts": "7"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Certified Respiratory Therapist - Emergency Care", "type": "Therapist", "contacts": "4"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Certified Respiratory Therapist - General Care", "type": "Therapist", "contacts": "53"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Certified Respiratory Therapist - Geriatric Care", "type": "Therapist", "contacts": "2"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Certified Respiratory Therapist - Home Health", "type": "Therapist", "contacts": "16"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Certified Respiratory Therapist - Neonatal/Pediatrics", "type": "Therapist", "contacts": "39"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Certified Respiratory Therapist - Pulmonary Diagnostics", "type": "Therapist", "contacts": "11"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Certified Respiratory Therapist - Pulmonary Function", "type": "Therapist", "contacts": "75"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Certified Respiratory Therapist - Pulmonary Rehabilitation", "type": "Therapist", "contacts": "18"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Certified Respiratory Therapist - SNF/Subacute Care", "type": "Therapist", "contacts": "8"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Clinical Exercise Physiologist", "type": "Therapist", "contacts": "121"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Dance Therapist", "type": "Therapist", "contacts": "18"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Kinesiotherapist", "type": "Therapist", "contacts": "365"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Mechanotherapist", "type": "Therapist", "contacts": "143"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Music Therapist", "type": "Therapist", "contacts": "480"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Occupational Therapist", "type": "Therapist", "contacts": "33654"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Occupational Therapist - Driving & Community Mobility", "type": "Therapist", "contacts": "17"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Occupational Therapist - Environmental Modification", "type": "Therapist", "contacts": "8"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Occupational Therapist - Ergonomics", "type": "Therapist", "contacts": "23"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Occupational Therapist - Feeding, Eating & Swallowing", "type": "Therapist", "contacts": "17"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Occupational Therapist - Gerontologist", "type": "Therapist", "contacts": "185"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Occupational Therapist - Hand", "type": "Therapist", "contacts": "1094"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Occupational Therapist - Human Factors", "type": "Therapist", "contacts": "9"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Occupational Therapist - Low Vision", "type": "Therapist", "contacts": "21"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Occupational Therapist - Mental Health", "type": "Therapist", "contacts": "129"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Occupational Therapist - Neurorehabilitation", "type": "Therapist", "contacts": "144"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Occupational Therapist - Physical Rehabilitation", "type": "Therapist", "contacts": "586"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Pediatrics - Physical Therapist", "type": "Therapist", "contacts": "1401"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Pediatrics - Occupational Therapist", "type": "Therapist", "contacts": "2454"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Physical Therapist", "type": "Therapist", "contacts": "76241"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Physical Therapist - Cardiopulmonary", "type": "Therapist", "contacts": "37"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Physical Therapist - Clinical Electrophysiologist", "type": "Therapist", "contacts": "25"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Physical Therapist - Ergonomics", "type": "Therapist", "contacts": "31"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Physical Therapist - Geriatrics", "type": "Therapist", "contacts": "446"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Physical Therapist - Hand", "type": "Therapist", "contacts": "74"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Physical Therapist - Neurologist", "type": "Therapist", "contacts": "309"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Physical Therapist - Orthopaedic", "type": "Therapist", "contacts": "2832"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Physical Therapist - Sports", "type": "Therapist", "contacts": "266"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Recreation Therapist", "type": "Therapist", "contacts": "1064"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Reflexologist", "type": "Therapist", "contacts": "63"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Registered Respiratory Therapist", "type": "Therapist", "contacts": "1215"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Registered Respiratory Therapist - Critical Care", "type": "Therapist", "contacts": "176"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Registered Respiratory Therapist - Educational", "type": "Therapist", "contacts": "13"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Registered Respiratory Therapist - Emergency Care", "type": "Therapist", "contacts": "7"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Registered Respiratory Therapist - General Care", "type": "Therapist", "contacts": "149"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Registered Respiratory Therapist - Geriatric Care", "type": "Therapist", "contacts": "2"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Registered Respiratory Therapist - Home Health", "type": "Therapist", "contacts": "52"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Registered Respiratory Therapist - Neonatal/Pediatrics", "type": "Therapist", "contacts": "46"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Registered Respiratory Therapist - Pulmonary Diagnostics", "type": "Therapist", "contacts": "6"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Registered Respiratory Therapist - Pulmonary Rehabilitation", "type": "Therapist", "contacts": "31"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Registered Respiratory Therapist - SNF/Subacute Care", "type": "Therapist", "contacts": "7"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Respiratory Therapist", "type": "Therapist", "contacts": "19158"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Respite Care", "type": "Therapist", "contacts": "49"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Respite Care, Mental Illness, Child", "type": "Therapist", "contacts": "9"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Wound Care", "type": "Therapist", "contacts": "222"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Registered Respiratory Therapist - Pulmonary Function Technologist", "type": "Therapist", "contacts": "12"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Pulmonary Function Technologist", "type": "Technologists/Technicians", "contacts": "32"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Specialist/Technologist - Athletic Trainer", "type": "Technologists/Technicians", "contacts": "4973"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "Specialist/Technologist - Rehabilitation, Blind", "type": "Technologists/Technicians", "contacts": "120"}, {"group": "Respiratory, Developmental, Rehabilitative & Restorative", "specialty": "nan", "type": "nan", "contacts": "184,795"}, {"group": "Speech-Language Hearing - Otolaryngology (ENT)", "specialty": "Otolaryngologist", "type": "Physician", "contacts": "8696"}, {"group": "Speech-Language Hearing - Otolaryngology (ENT)", "specialty": "Otolaryngologist - Facial Plastic Surgery", "type": "Physician", "contacts": "934"}, {"group": "Speech-Language Hearing - Otolaryngology (ENT)", "specialty": "Head & Neck Surgery", "type": "Physician", "contacts": "239"}, {"group": "Speech-Language Hearing - Otolaryngology (ENT)", "specialty": "Otolaryngic Allergist", "type": "Physician", "contacts": "76"}, {"group": "Speech-Language Hearing - Otolaryngology (ENT)", "specialty": "Otology & Neurotologist", "type": "Physician", "contacts": "275"}, {"group": "Speech-Language Hearing - Otolaryngology (ENT)", "specialty": "Pediatrics - Otolaryngologist", "type": "Physician", "contacts": "447"}, {"group": "Speech-Language Hearing - Otolaryngology (ENT)", "specialty": "Audiologist-Hearing Aid Fitter", "type": "Healthcare Professional", "contacts": "848"}, {"group": "Speech-Language Hearing - Otolaryngology (ENT)", "specialty": "Audiology (Audiologist)", "type": "Healthcare Professional", "contacts": "7878"}, {"group": "Speech-Language Hearing - Otolaryngology (ENT)", "specialty": "Hearing Instrument Specialist", "type": "Healthcare Professional", "contacts": "644"}, {"group": "Speech-Language Hearing - Otolaryngology (ENT)", "specialty": "Pediatrics - Audiologist", "type": "Healthcare Professional", "contacts": "45"}, {"group": "Speech-Language Hearing - Otolaryngology (ENT)", "specialty": "Speech-Language Pathologist", "type": "Healthcare Professional", "contacts": "32383"}, {"group": "Speech-Language Hearing - Otolaryngology (ENT)", "specialty": "Audiology Assistant", "type": "Physician Assistant", "contacts": "20"}, {"group": "Speech-Language Hearing - Otolaryngology (ENT)", "specialty": "Speech-Language Assistant", "type": "Physician Assistant", "contacts": "946"}, {"group": "Speech-Language Hearing - Otolaryngology (ENT)", "specialty": "Developmental Therapist", "type": "Therapist", "contacts": "3149"}, {"group": "Speech-Language Hearing - Otolaryngology (ENT)", "specialty": "nan", "type": "nan", "contacts": "56,580"}, {"group": "Surgery", "specialty": "Ophthalmologist", "type": "Physician", "contacts": "18091"}, {"group": "Surgery", "specialty": "Pediatrics - Urologist", "type": "Physician", "contacts": "344"}, {"group": "Surgery", "specialty": "Otolaryngologist", "type": "Physician", "contacts": "8696"}, {"group": "Surgery", "specialty": "Otolaryngologist - Facial Plastic Surgery", "type": "Physician", "contacts": "934"}, {"group": "Surgery", "specialty": "Plastic Surgery", "type": "Physician", "contacts": "5253"}, {"group": "Surgery", "specialty": "Plastic Surgery - Hand", "type": "Physician", "contacts": "2450"}, {"group": "Surgery", "specialty": "Adult Reconstructive Orthopaedic Surgery", "type": "Physician", "contacts": "1014"}, {"group": "Surgery", "specialty": "Cardiovascular Surgery", "type": "Physician", "contacts": "600"}, {"group": "Surgery", "specialty": "Colon & Rectal Surgery", "type": "Physician", "contacts": "1520"}, {"group": "Surgery", "specialty": "Cosmetic Surgery", "type": "Physician", "contacts": "525"}, {"group": "Surgery", "specialty": "Female Pelvic Medicine & Reconstructive Surgery", "type": "Physician", "contacts": "675"}, {"group": "Surgery", "specialty": "Foot & Ankle Surgery", "type": "Physician", "contacts": "643"}, {"group": "Surgery", "specialty": "General Surgery", "type": "Physician", "contacts": "26027"}, {"group": "Surgery", "specialty": "Gynecologic Oncologist", "type": "Physician", "contacts": "1231"}, {"group": "Surgery", "specialty": "Neurological Surgery (Neurosurgery)", "type": "Physician", "contacts": "6006"}, {"group": "Surgery", "specialty": "Obstetrics & Gynecologist", "type": "Physician", "contacts": "33650"}, {"group": "Surgery", "specialty": "Orthopaedic Surgery - Foot & Ankle", "type": "Physician", "contacts": "138"}, {"group": "Surgery", "specialty": "Orthopaedic Surgery - Reconstructive", "type": "Physician", "contacts": "191"}, {"group": "Surgery", "specialty": "Orthopaedic Surgery - Spine", "type": "Physician", "contacts": "1652"}, {"group": "Surgery", "specialty": "Orthopaedic Surgery (Orthopedics)", "type": "Physician", "contacts": "22647"}, {"group": "Surgery", "specialty": "Orthopaedic Surgery -Trauma", "type": "Physician", "contacts": "677"}, {"group": "Surgery", "specialty": "Pediatrics - Ophthalmologist", "type": "Physician", "contacts": "56"}, {"group": "Surgery", "specialty": "Pediatrics - Orthopaedic Surgery", "type": "Physician", "contacts": "523"}, {"group": "Surgery", "specialty": "Pediatrics - Otolaryngologist", "type": "Physician", "contacts": "447"}, {"group": "Surgery", "specialty": "Plastic & Reconstructive Surgery", "type": "Physician", "contacts": "1785"}, {"group": "Surgery", "specialty": "Plastic Surgery - Head & Neck", "type": "Physician", "contacts": "538"}, {"group": "Surgery", "specialty": "Thoracic Surgery (Cardiothoracic Vascular Surgery)", "type": "Physician", "contacts": "4248"}, {"group": "Surgery", "specialty": "Transplant Surgery", "type": "Physician", "contacts": "883"}, {"group": "Surgery", "specialty": "Trauma Surgery (Traumatologist)", "type": "Physician", "contacts": "1454"}, {"group": "Surgery", "specialty": "Urogynecologist", "type": "Physician", "contacts": "527"}, {"group": "Surgery", "specialty": "Urologist", "type": "Physician", "contacts": "9916"}, {"group": "Surgery", "specialty": "Vascular Surgery", "type": "Physician", "contacts": "4243"}, {"group": "Surgery", "specialty": "nan", "type": "nan", "contacts": "157,584"}, {"group": "Urology", "specialty": "Pediatrics - Urologist", "type": "Physician", "contacts": "344"}, {"group": "Urology", "specialty": "Urologist", "type": "Physician", "contacts": "9916"}, {"group": "Urology", "specialty": "Urogynecologist", "type": "Physician", "contacts": "527"}, {"group": "Urology", "specialty": "nan", "type": "nan", "contacts": "10,787"}, {"group": "Veterinary", "specialty": "Veterinarian", "type": "Healthcare Professional", "contacts": "10640"}, {"group": "Veterinary", "specialty": "nan", "type": "nan", "contacts": "10,640"}];

  // 3) JS logic (same as premium version)

  const groupMap = new Map();
  const typeSet = new Set();
  healthIqData.forEach(row => {
    const g = row.group || "Other";
    const key = g.trim();
    const contacts = parseInt(String(row.contacts || "0").replace(/,/g, "")) || 0;
    const t = row.type || "";
    if (t) typeSet.add(t);
    if (!groupMap.has(key)) {
      groupMap.set(key, { name: key, totalContacts: 0, rows: [] });
    }
    const entry = groupMap.get(key);
    entry.totalContacts += contacts;
    entry.rows.push(row);
  });

  const sortedGroups = Array.from(groupMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  const groupListEl    = document.getElementById("hib-group-list");
  const titleEl        = document.getElementById("hib-group-title");
  const metricsEl      = document.getElementById("hib-group-metrics");
  const searchEl       = document.getElementById("hib-search");
  const typeFilterEl   = document.getElementById("hib-type-filter");
  const rangeFilterEl  = document.getElementById("hib-range-filter");
  const tableBody      = document.querySelector("#hib-table tbody");
  const headerEls      = document.querySelectorAll("#hib-table thead th");
  const footerTotalEl  = document.getElementById("hib-footer-total");
  const footerRowsEl   = document.getElementById("hib-footer-rows");
  const pageInfoEl     = document.getElementById("hib-page-info");
  const prevBtn        = document.getElementById("hib-prev");
  const nextBtn        = document.getElementById("hib-next");

  const cardTotalEl    = document.getElementById("hib-card-total");
  const cardSpecsEl    = document.getElementById("hib-card-specialties");
  const cardTypesEl    = document.getElementById("hib-card-types");
  const cardTopEl      = document.getElementById("hib-card-top");
  const cardTopCountEl = document.getElementById("hib-card-top-count");
  const pieCanvas      = document.getElementById("hib-pie");
  const pieCtx         = pieCanvas ? pieCanvas.getContext("2d") : null;
  const chartMetaEl    = document.getElementById("hib-chart-meta");

  const exportCsvBtn   = document.getElementById("hib-export-csv");
  const exportXlsxBtn  = document.getElementById("hib-export-xlsx");
  const exportPdfBtn   = document.getElementById("hib-export-pdf");
  const copyBtn        = document.getElementById("hib-copy");

  let currentGroupKey = null;
  let currentSort     = { col: "specialty", asc: true };
  let currentPage     = 1;
  const pageSize      = 25;
  let cachedRows      = [];

  // Populate type filter
  Array.from(typeSet).sort().forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    typeFilterEl.appendChild(opt);
  });

  function formatNumber(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function renderGroupList() {
    if (!groupListEl) return;
    groupListEl.innerHTML = "";
    sortedGroups.forEach((g, idx) => {
      const li = document.createElement("li");
      li.className = "hib-group-item" + (idx === 0 ? " hib-active" : "");
      li.dataset.group = g.name;

      const nameWrap = document.createElement("span");
      nameWrap.className = "hib-group-name-wrap";
      const nameText = document.createElement("span");
      nameText.textContent = g.name;
      nameWrap.appendChild(nameText);

      const spanCount = document.createElement("span");
      spanCount.className = "hib-group-count-pill";
      spanCount.textContent = formatNumber(g.totalContacts);

      li.appendChild(nameWrap);
      li.appendChild(spanCount);

      li.addEventListener("click", () => {
        document.querySelectorAll(".hib-group-item").forEach(x => x.classList.remove("hib-active"));
        li.classList.add("hib-active");
        currentGroupKey = g.name;
        currentPage = 1;
        if (searchEl) searchEl.value = "";
        renderMainForGroup();
      });

      groupListEl.appendChild(li);
    });

    if (sortedGroups.length > 0) {
      currentGroupKey = sortedGroups[0].name;
      renderMainForGroup();
    }
  }

  function withinRange(contacts, rangeVal) {
    if (!rangeVal) return true;
    const n = parseInt(String(contacts || "0").replace(/,/g, "")) || 0;
    if (rangeVal === "1") return n <= 1000;
    if (rangeVal === "2") return n > 1000 && n <= 5000;
    if (rangeVal === "3") return n > 5000 && n <= 10000;
    if (rangeVal === "4") return n > 10000;
    return true;
  }

  function getFilteredRowsForCurrentGroup() {
    if (!currentGroupKey || !groupMap.has(currentGroupKey)) return [];
    const base    = groupMap.get(currentGroupKey).rows.slice();
    const term    = (searchEl && searchEl.value || "").toLowerCase().trim();
    const typeVal = typeFilterEl ? typeFilterEl.value : "";
    const rangeVal= rangeFilterEl ? rangeFilterEl.value : "";

    let filtered = base.filter(row => {
      const inType  = !typeVal || row.type === typeVal;
      const inRange = withinRange(row.contacts, rangeVal);
      if (!inType || !inRange) return false;
      if (!term) return true;
      const hay = (row.specialty + " " + row.type).toLowerCase();
      return hay.indexOf(term) > -1;
    });

    filtered.sort((a, b) => {
      let x, y;
      if (currentSort.col === "specialty") {
        x = a.specialty || "";
        y = b.specialty || "";
      } else if (currentSort.col === "type") {
        x = a.type || "";
        y = b.type || "";
      } else {
        const xn = parseInt(String(a.contacts || "0").replace(/,/g, "")) || 0;
        const yn = parseInt(String(b.contacts || "0").replace(/,/g, "")) || 0;
        return currentSort.asc ? xn - yn : yn - xn;
      }
      return currentSort.asc ? x.localeCompare(y) : y.localeCompare(x);
    });
    return filtered;
  }

  function drawPie(rows) {
    if (!pieCtx) return;
    pieCtx.clearRect(0, 0, pieCanvas.width, pieCanvas.height);
    const totals = new Map();
    rows.forEach(r => {
      const t = r.type || "Other";
      const n = parseInt(String(r.contacts || "0").replace(/,/g, "")) || 0;
      totals.set(t, (totals.get(t) || 0) + n);
    });
    const entries = Array.from(totals.entries());
    const sum = entries.reduce((acc, [,v]) => acc + v, 0);
    if (sum === 0) return;

    const colors = ["#2563eb","#16a34a","#ea580c","#7c3aed","#0f766e","#92400e"];
    let start = 0;
    entries.forEach(([type, value], idx) => {
      const angle = (value / sum) * Math.PI * 2;
      pieCtx.beginPath();
      pieCtx.moveTo(40,40);
      pieCtx.arc(40,40,38,start,start+angle);
      pieCtx.closePath();
      pieCtx.fillStyle = colors[idx % colors.length];
      pieCtx.fill();
      start += angle;
    });

    if (chartMetaEl) {
      const lines = entries
        .sort((a,b)=>b[1]-a[1])
        .slice(0,4)
        .map(([type,value])=> type + ": " + formatNumber(value));
      chartMetaEl.textContent = lines.length
        ? ("Contacts by type – " + lines.join(" • "))
        : "No contacts in this group.";
    }
  }

  function iconForType(t) {
    if (!t) return "❓";
    const lc = t.toLowerCase();
    if (lc.includes("physician"))    return "👨‍⚕️";
    if (lc.includes("nurse"))        return "👩‍⚕️";
    if (lc.includes("technologist") || lc.includes("technician")) return "🧪";
    if (lc.includes("assistant"))    return "🧑‍⚕️";
    if (lc.includes("pharmac"))      return "💊";
    return "🏥";
  }

  function renderMainForGroup() {
    if (!currentGroupKey || !groupMap.has(currentGroupKey)) return;
    const group = groupMap.get(currentGroupKey);
    if (titleEl) titleEl.textContent = group.name;

    cachedRows = getFilteredRowsForCurrentGroup();
    const totalContacts = group.totalContacts;
    const rowsCount     = group.rows.length;
    const distinctTypes = new Set(group.rows.map(r => r.type || "")).size || 0;

    let topName  = "–";
    let topCount = 0;
    group.rows.forEach(r => {
      const n = parseInt(String(r.contacts || "0").replace(/,/g, "")) || 0;
      if (n > topCount) {
        topCount = n;
        topName  = r.specialty;
      }
    });

    if (metricsEl) {
      metricsEl.textContent = formatNumber(totalContacts) + " contacts · " + rowsCount + " specialties in this group";
    }
    if (footerTotalEl) {
      footerTotalEl.innerHTML = "<span class='hib-footer-strong'>Total contacts in this group:</span> " + formatNumber(totalContacts);
    }
    if (footerRowsEl) {
      footerRowsEl.innerHTML = "<span class='hib-footer-strong'>Specialties in this group:</span> " + rowsCount;
    }

    if (cardTotalEl)    cardTotalEl.textContent    = formatNumber(totalContacts);
    if (cardSpecsEl)    cardSpecsEl.textContent    = rowsCount;
    if (cardTypesEl)    cardTypesEl.textContent    = distinctTypes;
    if (cardTopEl)      cardTopEl.textContent      = topName || "–";
    if (cardTopCountEl) cardTopCountEl.textContent = topCount ? (formatNumber(topCount) + " contacts") : "–";

    drawPie(group.rows);

    currentPage = 1;
    renderTable();
  }

  function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = "";
    const totalRows  = cachedRows.length;
    const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;

    if (totalRows === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 3;
      td.className = "hib-empty";
      td.textContent = "No specialties match your filters in this group.";
      tr.appendChild(td);
      tableBody.appendChild(tr);
    } else {
      const start    = (currentPage - 1) * pageSize;
      const end      = Math.min(start + pageSize, totalRows);
      const pageRows = cachedRows.slice(start, end);
      pageRows.forEach(row => {
        const tr = document.createElement("tr");
        tr.title = row.specialty + " • " + row.type + " • " + row.contacts + " contacts";

        const tdSpec = document.createElement("td");
        tdSpec.textContent = row.specialty;
        tr.appendChild(tdSpec);

        const tdType = document.createElement("td");
        const span   = document.createElement("span");
        span.className = "hib-type-pill";
        const icon = document.createElement("span");
        icon.textContent = iconForType(row.type);
        const txt  = document.createElement("span");
        txt.textContent  = row.type;
        span.appendChild(icon);
        span.appendChild(txt);
        tdType.appendChild(span);
        tr.appendChild(tdType);

        const tdContacts = document.createElement("td");
        tdContacts.textContent = row.contacts;
        tdContacts.className   = "hib-num";
        tr.appendChild(tdContacts);

        tableBody.appendChild(tr);
      });
    }

    if (pageInfoEl) {
      pageInfoEl.textContent =
        "Page " + currentPage + " of " + (Math.max(1, Math.ceil(totalRows / pageSize))) +
        " (" + totalRows + " row" + (totalRows === 1 ? "" : "s") + " after filters)";
    }
    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= Math.max(1, Math.ceil(totalRows / pageSize));
  }

  if (searchEl) {
    searchEl.addEventListener("keyup", () => {
      renderMainForGroup();
    });
  }
  if (typeFilterEl) {
    typeFilterEl.addEventListener("change", () => {
      renderMainForGroup();
    });
  }
  if (rangeFilterEl) {
    rangeFilterEl.addEventListener("change", () => {
      renderMainForGroup();
    });
  }

  if (headerEls) {
    headerEls.forEach(th => {
      th.addEventListener("click", () => {
        const col = th.getAttribute("data-col");
        if (!col) return;
        if (currentSort.col === col) {
          currentSort.asc = !currentSort.asc;
        } else {
          currentSort.col = col;
          currentSort.asc = true;
        }
        renderMainForGroup();
      });
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentPage++;
      renderTable();
    });
  }

  function exportRowsAsCSV(rows, filename) {
    const header = ["Specialty","Specialty Type","Contacts"];
    const lines  = [header.join(",")];
    rows.forEach(r => {
      const vals = [r.specialty, r.type, String(r.contacts).replace(/,/g,"")];
      lines.push(vals.map(v => '"' + String(v).replace(/"/g,'""') + '"').join(","));
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function copyRowsToClipboard(rows) {
    const header = ["Specialty","Specialty Type","Contacts"];
    const lines  = [header.join("\t")];
    rows.forEach(r => {
      lines.push([r.specialty, r.type, r.contacts].join("\t"));
    });
    const text = lines.join("\n");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        alert("Table copied to clipboard.");
      }).catch(() => {
        alert("Copy failed – your browser may not allow clipboard access.");
      });
    } else {
      alert("Clipboard not supported in this browser.");
    }
  }

  if (exportCsvBtn) {
    exportCsvBtn.addEventListener("click", () => {
      const groupLabel = currentGroupKey ? currentGroupKey.replace(/\s+/g,"_") : "group";
      exportRowsAsCSV(cachedRows, "health_iq_" + groupLabel + ".csv");
    });
  }
  if (exportXlsxBtn) {
    exportXlsxBtn.addEventListener("click", () => {
      const groupLabel = currentGroupKey ? currentGroupKey.replace(/\s+/g,"_") : "group";
      exportRowsAsCSV(cachedRows, "health_iq_" + groupLabel + ".xlsx");
    });
  }
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener("click", () => {
      window.print();
    });
  }
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      copyRowsToClipboard(cachedRows);
    });
  }

  // Start the UI
  renderGroupList();
}
