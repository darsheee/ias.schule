import fs from 'node:fs/promises'
import path from 'node:path'
import prompts from 'prompts'
import c from 'ansis'

// Template definitions
const templates = {
  emperor: {
    name: 'Emperor/Ruler Biography',
    generate: (data: any) => `---
title: ${data.name}
period: ${data.period}
dynasty: ${data.dynasty}
reign: ${data.reign}
tags: [${data.tags}]
category: Biography
---

# ${data.name}

## Early Life
- **Birth**: ${data.birth || '_To be added_'}
- **Family**: ${data.family || '_To be added_'}
- **Early Career**: _To be added_

## Reign (${data.reign})

### Ascension to Throne
_Describe how they came to power_

### Major Events
- 
- 
- 

### Key Achievements
- 
- 
- 

### Administrative Reforms
- 
- 

### Military Campaigns
- 
- 

## Personal Life
- **Marriage(s)**: 
- **Children**: 
- **Character**: 

## Legacy
### Immediate Impact
- 

### Long-term Influence
- 

### Historical Significance
- 

## Key Dates

| Year | Event |
|------|-------|
| ${data.birth || ''} | Birth |
| ${data.reign.split('-')[0]} | Ascension to throne |
| ${data.reign.split('-')[1]} | Death/End of reign |

## Related Topics
- [[${data.dynasty}]]
- [[${data.period}]]

## Sources
- 
`,
  },

  battle: {
    name: 'Battle/War Event',
    generate: (data: any) => `---
title: ${data.name}
date: ${data.date}
location: ${data.location}
type: Battle
tags: [${data.tags}]
---

# ${data.name}

## Overview
**Date**: ${data.date}  
**Location**: ${data.location}  
**Result**: ${data.result || '_To be determined_'}

## Background
### Political Situation
_Describe the political climate leading to the battle_

### Causes
1. 
2. 
3. 

## Opposing Forces

### ${data.side1 || 'Side 1'}
- **Commander**: 
- **Strength**: 
- **Key Units**: 

### ${data.side2 || 'Side 2'}
- **Commander**: 
- **Strength**: 
- **Key Units**: 

## Battle Sequence

### Initial Positions
_Describe troop deployments_

### Key Phases
1. **Phase 1**: 
2. **Phase 2**: 
3. **Phase 3**: 

### Turning Point
_Describe the decisive moment_

## Outcome

### Immediate Results
- **Victor**: 
- **Casualties**: 
  - ${data.side1}: 
  - ${data.side2}: 

### Treaty/Agreement
_If applicable_

## Significance

### Military Impact
- 

### Political Impact
- 

### Long-term Consequences
- 

## Legacy
_Historical importance of the battle_

## Timeline

| Time | Event |
|------|-------|
|      |       |

## Related Events
- 
- 

## Sources
- 
`,
  },

  dynasty: {
    name: 'Dynasty/Empire',
    generate: (data: any) => `---
title: ${data.name}
founded: ${data.founded}
ended: ${data.ended}
capital: ${data.capital}
tags: [${data.tags}]
category: Dynasty
---

# ${data.name}

## Quick Facts

| Attribute | Details |
|-----------|---------|
| **Founded** | ${data.founded} |
| **Ended** | ${data.ended} |
| **Capital** | ${data.capital} |
| **Founder** | ${data.founder || '_To be added_'} |
| **Peak** | ${data.peak || '_To be added_'} |
| **Territory** | ${data.territory || '_To be added_'} |

## Foundation
### Origins
_Describe the origins of the dynasty_

### Founder
**${data.founder || 'Founder Name'}**
- Background: 
- How they established the dynasty: 

## Major Rulers

### Early Period (${data.founded} - )
1. **Ruler 1** ()
   - Achievements: 
   
2. **Ruler 2** ()
   - Achievements: 

### Golden Age
_Most prosperous period_

### Decline Period
_Factors leading to decline_

## Administration

### Central Government
- 
- 

### Provincial System
- 
- 

### Revenue System
- 
- 

## Military

### Army Organization
- 
- 

### Major Campaigns
- 
- 

## Culture & Society

### Religion
- 
- 

### Architecture
- 
- 

### Literature & Arts
- 
- 

### Economy
- Trade: 
- Agriculture: 
- Industry: 

## Decline & Fall

### Internal Factors
1. 
2. 
3. 

### External Factors
1. 
2. 
3. 

### Final Years
_Describe the end_

## Legacy

### Political Legacy
- 

### Cultural Legacy
- 

### Architectural Legacy
- 

## Dynastic Timeline

| Period | Ruler | Key Events |
|--------|-------|------------|
|        |       |            |

## Related Topics
- 
- 

## Sources
- 
`,
  },

  article: {
    name: 'Constitutional Article',
    generate: (data: any) => `---
title: Article ${data.number} - ${data.title}
part: Part ${data.part}
subject: ${data.subject}
tags: [constitution, ${data.tags}]
category: Constitution
---

# Article ${data.number}: ${data.title}

## Part ${data.part} - ${data.partTitle || ''}

## Text of the Article

> ${data.text || '_Insert article text_'}

## Explanation

### Simple Meaning
_Explain in simple terms_

### Key Provisions
1. 
2. 
3. 

## Historical Context

### Why it was Added
_Background of this article_

### Constitutional Assembly Debates
_Key points from debates_

## Scope & Interpretation

### Who does it apply to?
- 

### What does it cover?
- 

### Limitations/Exceptions
- 

## Related Articles

| Article | Relation |
|---------|----------|
|         |          |

## Amendments

### Original Text (1950)
_If amended_

### Amendment History
| Year | Amendment | Change |
|------|-----------|--------|
|      |           |        |

## Landmark Cases

### Supreme Court Interpretations
1. **Case Name** (Year)
   - Issue: 
   - Ruling: 
   - Impact: 

2. **Case Name** (Year)
   - Issue: 
   - Ruling: 
   - Impact: 

## Practical Application

### How it's used in practice
- 

### Common Scenarios
1. 
2. 

## Comparison

### Similar Provisions in Other Constitutions
- **Country**: Provision
- **Country**: Provision

## UPSC Relevance

### Previous Year Questions
- 

### Important Points to Remember
- 
- 
- 

## Sources
- Constitution of India
- 
`,
  },

  scheme: {
    name: 'Government Scheme',
    generate: (data: any) => `---
title: ${data.name}
launched: ${data.launched}
ministry: ${data.ministry}
tags: [${data.tags}]
category: Government Scheme
---

# ${data.name}

## Overview

| Detail | Information |
|--------|-------------|
| **Launched** | ${data.launched} |
| **Ministry** | ${data.ministry} |
| **Type** | ${data.type || ''} |
| **Budget** | ${data.budget || ''} |
| **Status** | ${data.status || 'Active'} |

## Objectives

### Primary Objectives
1. 
2. 
3. 

### Target Beneficiaries
- 

## Key Features

### Main Components
1. **Component 1**
   - Description: 
   - Benefit: 

2. **Component 2**
   - Description: 
   - Benefit: 

### Eligibility Criteria
- 
- 
- 

### Benefits Provided
- 
- 

## Implementation

### Implementing Agency
- Central: 
- State: 
- District: 

### Process/Mechanism
1. 
2. 
3. 

### Application Process
_How to apply_

## Funding

### Budget Allocation
| Year | Amount |
|------|--------|
|      |        |

### Fund Distribution
- Central: %
- State: %

## Coverage

### Geographic Coverage
- States/UTs covered: 

### Beneficiary Numbers
| Year | Beneficiaries |
|------|---------------|
|      |               |

## Achievements

### Key Milestones
- 

### Impact
- Social Impact: 
- Economic Impact: 
- Statistical Achievement: 

## Challenges

### Implementation Challenges
1. 
2. 
3. 

### Solutions/Improvements
- 

## Related Schemes
- 
- 

## UPSC Relevance
- 
- 

## Recent Updates
- 

## Sources
- Ministry website: 
- 
`,
  },
}

async function main() {
  console.log(c.bold.cyan`\n╔════════════════════════════════════════════════╗`)
  console.log(c.bold.cyan`║     Content Template Generator                ║`)
  console.log(c.bold.cyan`╚════════════════════════════════════════════════╝\n`)

  // Select template type
  const { templateType } = await prompts({
    type: 'select',
    name: 'templateType',
    message: 'What type of content do you want to create?',
    choices: Object.entries(templates).map(([key, value]) => ({
      title: value.name,
      value: key,
    })),
  })

  if (!templateType) {
    console.log(c.yellow`\nCancelled.`)
    return
  }

  // Get template-specific data
  const template = templates[templateType as keyof typeof templates]
  let data: any = {}

  if (templateType === 'emperor') {
    data = await prompts([
      { type: 'text', name: 'name', message: 'Emperor/Ruler name:' },
      { type: 'text', name: 'dynasty', message: 'Dynasty:' },
      { type: 'text', name: 'period', message: 'Period (e.g., Ancient India):' },
      { type: 'text', name: 'reign', message: 'Reign years (e.g., 268-232 BCE):' },
      { type: 'text', name: 'birth', message: 'Birth year (optional):', initial: '' },
      { type: 'text', name: 'family', message: 'Family info (optional):', initial: '' },
      { type: 'text', name: 'tags', message: 'Tags (comma-separated):', initial: '' },
    ])
  }
  else if (templateType === 'battle') {
    data = await prompts([
      { type: 'text', name: 'name', message: 'Battle name:' },
      { type: 'text', name: 'date', message: 'Date:' },
      { type: 'text', name: 'location', message: 'Location:' },
      { type: 'text', name: 'side1', message: 'First side/force:' },
      { type: 'text', name: 'side2', message: 'Second side/force:' },
      { type: 'text', name: 'result', message: 'Result (optional):', initial: '' },
      { type: 'text', name: 'tags', message: 'Tags (comma-separated):', initial: '' },
    ])
  }
  else if (templateType === 'dynasty') {
    data = await prompts([
      { type: 'text', name: 'name', message: 'Dynasty/Empire name:' },
      { type: 'text', name: 'founded', message: 'Founded year:' },
      { type: 'text', name: 'ended', message: 'Ended year:' },
      { type: 'text', name: 'capital', message: 'Capital city:' },
      { type: 'text', name: 'founder', message: 'Founder (optional):', initial: '' },
      { type: 'text', name: 'tags', message: 'Tags (comma-separated):', initial: '' },
    ])
  }
  else if (templateType === 'article') {
    data = await prompts([
      { type: 'number', name: 'number', message: 'Article number:' },
      { type: 'text', name: 'title', message: 'Article title:' },
      { type: 'number', name: 'part', message: 'Part number:' },
      { type: 'text', name: 'partTitle', message: 'Part title (optional):', initial: '' },
      { type: 'text', name: 'subject', message: 'Subject (e.g., Fundamental Rights):' },
      { type: 'text', name: 'tags', message: 'Tags (comma-separated):', initial: '' },
    ])
  }
  else if (templateType === 'scheme') {
    data = await prompts([
      { type: 'text', name: 'name', message: 'Scheme name:' },
      { type: 'text', name: 'launched', message: 'Launch year:' },
      { type: 'text', name: 'ministry', message: 'Ministry:' },
      { type: 'text', name: 'type', message: 'Type (optional):', initial: '' },
      { type: 'text', name: 'tags', message: 'Tags (comma-separated):', initial: '' },
    ])
  }

  if (!data.name && !data.number) {
    console.log(c.yellow`\nCancelled.`)
    return
  }

  // Get file path
  const { filepath } = await prompts({
    type: 'text',
    name: 'filepath',
    message: 'Save to (relative path):',
    initial: `${templateType}s/${(data.name || `article-${data.number}`).toLowerCase().replace(/\s+/g, '-')}.md`,
  })

  if (!filepath) {
    console.log(c.yellow`\nCancelled.`)
    return
  }

  // Generate content
  const content = template.generate(data)

  // Create directory
  const fullPath = path.join(process.cwd(), filepath)
  await fs.mkdir(path.dirname(fullPath), { recursive: true })

  // Write file
  await fs.writeFile(fullPath, content)

  console.log(c.green`\n✓ Template created successfully!`)
  console.log(c.dim`  File: ${filepath}`)
  console.log(c.dim`  Type: ${template.name}`)
  console.log(c.yellow`\n💡 Open the file and fill in the remaining details!`)
}

main().catch(console.error)
