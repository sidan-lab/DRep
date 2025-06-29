# Milestone Data Fix Documentation

## 🔧 **Issue Description**

The catalyst-proposals page was showing milestones correctly in local development but not in production (Netlify deployment). This happened because:

1. **Local Development**: The API route `/api/milestones/[id]` could directly read milestone files from the `/catalyst-proposals` directory using Node.js `fs` module
2. **Production**: The `/catalyst-proposals` directory was not included in the build output, causing the API route to fail

## ✅ **Solution Implemented**

### **1. Pre-generate Milestone Data as JSON**

Created a new script `scripts/sidan-gov/catalyst-proposals/generate-milestones-data.js` that:
- Reads all milestone `.md` files from the `/catalyst-proposals` directory
- Parses the markdown content to extract structured data
- Generates a single JSON file with all milestone data
- Stores it in `sidan-gov-updates/catalyst-proposals/milestones-data.json`

### **2. Updated API Route**

Modified `apps/sidan-gov/pages/api/milestones/[id].ts` to:
- Fetch milestone data from the pre-generated JSON file hosted on GitHub
- Use the same pattern as other data in the project
- Return milestones for specific project IDs

### **3. Added Build Script**

Added `generate-milestones-data` script to `scripts/sidan-gov/package.json` for easy execution.

## 📁 **Files Changed**

1. **New Files:**
   - `scripts/sidan-gov/catalyst-proposals/generate-milestones-data.js` - Milestone data generation script

2. **Modified Files:**
   - `scripts/sidan-gov/package.json` - Added new script
   - `apps/sidan-gov/pages/api/milestones/[id].ts` - Updated to use JSON data instead of filesystem

3. **Generated Files:**
   - `sidan-gov-updates/catalyst-proposals/milestones-data.json` - Pre-generated milestone data

## 🔄 **Data Flow**

```
Milestone .md files in /catalyst-proposals
        ↓
generate-milestones-data.js script
        ↓
milestones-data.json in sidan-gov-updates
        ↓
Committed to GitHub
        ↓
API route fetches from GitHub raw URL
        ↓
Frontend displays milestones
```

## 🚀 **Usage**

### **To Generate Milestone Data:**

```bash
cd scripts/sidan-gov
npm run generate-milestones-data
```

### **JSON Structure:**

```json
{
  "timestamp": "2025-01-20T10:00:00.000Z",
  "milestones": {
    "1300036": [
      {
        "projectId": "1300036",
        "milestoneNumber": 1,
        "link": "[Milestone 1](https://example.com)",
        "challenge": "F13: Cardano Open: Ecosystem",
        "budget": "ADA 29,705",
        "deliveredDate": "February 13, 2025",
        "title": "Milestone Report",
        "content": "Full milestone content...",
        "outcomes": ["Outcome 1", "Outcome 2"],
        "evidence": ["Evidence 1", "Evidence 2"]
      }
    ]
  }
}
```

## 🔧 **Maintenance**

### **When Adding New Milestones:**

1. Add the milestone `.md` file to the appropriate `/catalyst-proposals/catalyst-fundXX/PROJECT-ID/` directory
2. Run the generation script: `npm run generate-milestones-data`
3. Commit the updated `milestones-data.json` file
4. Deploy the changes

### **When Adding New Projects:**

1. Create the project directory in `/catalyst-proposals/catalyst-fundXX/`
2. Add milestone files following the naming pattern: `PROJECT-ID-milestoneN.md`
3. Follow the same maintenance steps as above

## 🏗️ **File Naming Conventions**

- **Project directories**: `PROJECT-ID-project-name` (e.g., `1300036-cardano-buidlerfest`)
- **Milestone files**: `PROJECT-ID-milestoneN.md` (e.g., `1300036-milestone1.md`)
- **Fund directories**: `catalyst-fundXX` (e.g., `catalyst-fund13`)

## 🎯 **Benefits**

1. **Consistent Data Flow**: Uses the same pattern as other data in the project
2. **Production Compatible**: Works in both development and production environments
3. **Version Controlled**: Milestone data is tracked in Git
4. **Cacheable**: JSON data can be cached by CDNs and browsers
5. **Maintainable**: Easy to update with a single script execution

## 🔍 **Testing**

To verify the fix works:

1. **Local Development**: Visit `http://localhost:3000/catalyst-proposals/1300036` and check if milestones are displayed
2. **Production**: The same URL should work on the deployed Netlify site

## 🚨 **Important Notes**

- The script must be run whenever milestone files are added or updated
- The generated JSON file must be committed to Git for production deployment
- The API route now depends on the GitHub raw URL being accessible
- Milestone data is cached according to the browser and CDN settings

## 🔮 **Future Improvements**

1. **Automated Generation**: Set up GitHub Actions to automatically run the script when milestone files change
2. **Incremental Updates**: Only regenerate data for changed projects
3. **Validation**: Add validation to ensure milestone data integrity
4. **Caching Strategy**: Implement intelligent caching based on file modification dates 