# Sonnet 4.5 Extended - Mega Prompt for Invoice Portal Features

**Copy this entire prompt + your codebase and paste into Sonnet 4.5 Extended**

---

## CONTEXT

I'm providing the complete codebase for a React invoice portal system. I need to add two major features to make it suitable for contractors who need to send quotes before invoicing.

---

## CURRENT CODEBASE

**IMPORTANT:** After this section, paste the COMPLETE contents of these files:

```
src/
  components/
    - All .jsx and .css files
  config/
    - client.js
    - firebase.js
  hooks/
    - Any custom hooks
  utils/
    - Any utility files
  App.jsx
  App.css
  index.js

functions/
  - index.js
  - package.json

firebase.json
.firebaserc
package.json
```

**[PASTE ALL FILE CONTENTS HERE]**

---

## REQUIRED FEATURES

### FEATURE 1 - QUOTES/ESTIMATES SYSTEM

**Core Functionality:**
- Add "Quotes" tab in AdminDashboard alongside existing "Invoices" tab
- Quote creation form uses the same customer selection + service calculator as invoices
- Quote-specific fields:
  - Quote number format: `TFS-Q-2026-0001` (prefix-Q-year-number)
  - Valid Until date (quote expiration)
  - Status field: Draft, Sent, Accepted, Declined, Converted to Invoice
  - Optional: Terms & Conditions textarea

**Quote Management:**
- Quotes list view (similar to invoices list)
- Filter quotes by status
- Search quotes by customer or number
- "Convert to Invoice" button on each quote that:
  - Copies all quote data (customer, services, totals)
  - Creates new invoice with copied data
  - Marks original quote status as "Converted to Invoice"
  - Links invoice back to original quote (add `convertedFromQuote` field)

**PDF Generation:**
- Create separate quote PDF template (copy invoice template, modify):
  - Header says "QUOTE" instead of "INVOICE"
  - Shows "Valid Until" date prominently
  - Shows quote number instead of invoice number
  - Footer text: "This is a quote, not an invoice. No payment is due until work is completed and invoice is issued."

**Email System:**
- Add `sendQuoteEmail` Firebase function (similar to `sendInvoiceEmail`)
- Email subject: "Quote #TFS-Q-2026-XXXX from [Company Name]"
- Email body mentions it's a quote, not an invoice
- Attach quote PDF

**Data Structure:**
- New Firestore collection: `quotes/`
- Quote document structure (same as invoice, plus):
  ```javascript
  {
    userId: string,
    quoteNumber: string,  // TFS-Q-2026-0001
    customer: {...},
    services: {...},
    totals: {...},
    status: 'draft' | 'sent' | 'accepted' | 'declined' | 'converted',
    validUntil: date,
    convertedToInvoice: string | null,  // invoice ID if converted
    createdAt: timestamp,
    sentAt: timestamp | null
  }
  ```

**Client Portal:**
- Show both quotes and invoices in client view
- Separate sections or tabs
- Quotes show "Valid Until" date and status

---

### FEATURE 2 - FILTERING & SORTING

**Admin Dashboard Enhancements:**

**Filter Controls (add above invoice/quote lists):**
- Year dropdown: 2024, 2025, 2026, All Years
- Status dropdown: All, Paid, Unpaid, Cancelled (for invoices) / Draft, Sent, Accepted, Declined, Converted (for quotes)
- Document type: All, Invoices Only, Quotes Only

**Search Bar:**
- Real-time search input
- Searches: customer name, invoice number, quote number
- Debounced for performance (300ms)

**Sort Options:**
- Dropdown or buttons for:
  - Date (Newest First / Oldest First)
  - Amount (High to Low / Low to High)
  - Status (Alphabetical)
  - Customer Name (A-Z)

**Stats Summary Card (above filters):**
- Display key metrics:
  ```
  Total Invoices: X
  Total Paid: $X,XXX.XX
  Outstanding: $X,XXX.XX
  This Year Revenue: $X,XXX.XX
  Total Quotes: X
  Pending Quotes: X
  ```
- Calculate from filtered data (respect current filters)
- Update in real-time as filters change

**Implementation Notes:**
- Use React `useMemo` for filtering/sorting to avoid re-renders
- Use `useState` for filter selections
- Persist filter preferences in localStorage (optional but nice)
- Make sure filters work on both invoices and quotes

---

## CONSTRAINTS

**Code Quality:**
- Maintain existing code style and formatting
- Use same state management approach (React hooks: useState, useEffect, useMemo)
- Follow existing component structure and naming conventions
- Keep consistent with current Firebase integration patterns

**Compatibility:**
- Ensure all existing features continue working exactly as before
- Don't break white-labeling system (client.js config)
- Maintain backwards compatibility with existing invoice data
- Invoice counter system should work independently from quote counter

**Performance:**
- Efficient Firestore queries (use indexes where needed)
- Debounce search input
- Memoize expensive calculations
- Don't load all data at once if there are many documents

---

## DELIVERABLES

**Please provide COMPLETE, READY-TO-USE files in this exact format:**

```
===== FILENAME: src/components/QuoteForm.jsx =====
[COMPLETE file content - no placeholders, no "rest of code unchanged"]
===== END FILE =====

===== FILENAME: src/components/QuoteList.jsx =====
[COMPLETE file content]
===== END FILE =====

[Continue for ALL files...]
```

**Required Deliverables:**

1. **All Modified Existing Files:**
   - AdminDashboard.jsx (add Quotes tab)
   - Dashboard.jsx (client view - show quotes)
   - Any other components that need changes
   - Firebase functions/index.js (add quote functions)
   - Firestore security rules (if changed)

2. **All New Files:**
   - QuoteForm.jsx and QuoteForm.css
   - QuoteList.jsx and QuoteList.css
   - Any new hooks (useQuotes.js, useQuoteCounter.js)
   - Any new utility functions

3. **Configuration Files (if changed):**
   - firebase.json
   - package.json (if new dependencies added)

4. **Database Setup:**
   - Firestore indexes needed (provide firestore.indexes.json)
   - Any initial data setup needed

5. **Step-by-Step Deployment Instructions:**
   ```
   Step 1: Update files
   Step 2: Install dependencies (if any)
   Step 3: Update Firestore rules
   Step 4: Deploy Firebase functions
   Step 5: Test checklist
   ```

---

## OUTPUT FORMAT REQUIREMENTS

**Critical:** 
- Provide COMPLETE file contents, not diffs or partial updates
- Do NOT use placeholders like "// rest of code unchanged" or "// previous code here"
- Include ALL imports, ALL functions, ALL components in each file
- Use clear file separators: `===== FILENAME: path/to/file.js =====`
- End each file with: `===== END FILE =====`

**File Order:**
1. New files first (easier to create)
2. Modified files second (easier to replace)
3. Configuration files last
4. Deployment instructions at the very end

---

## EXAMPLE OUTPUT FORMAT

```
===== FILENAME: src/components/QuoteForm.jsx =====
import React, { useState, useEffect } from 'react';
import './QuoteForm.css';

const QuoteForm = ({ onSubmit, onCancel }) => {
  // COMPLETE component code here
  // ALL state, ALL functions, ALL JSX
  return (
    <div className="quote-form">
      {/* COMPLETE JSX */}
    </div>
  );
};

export default QuoteForm;
===== END FILE =====

===== FILENAME: src/components/QuoteForm.css =====
.quote-form {
  /* COMPLETE styles */
}
===== END FILE =====

[Continue for all files...]

===== DEPLOYMENT INSTRUCTIONS =====
Step 1: Update files
  - Copy QuoteForm.jsx to src/components/
  - Copy QuoteList.jsx to src/components/
  [etc...]

Step 2: Install dependencies
  npm install

Step 3: Update Firestore rules
  firebase deploy --only firestore:rules

Step 4: Deploy functions
  firebase deploy --only functions

Step 5: Test
  - npm run dev
  - Create a test quote
  - Send quote email
  - Convert quote to invoice
  - Verify filtering works
===== END INSTRUCTIONS =====
```

---

## READY TO RECEIVE CODEBASE

**Paste your complete codebase below this line, then submit:**

---

[PASTE ALL FILE CONTENTS HERE]
