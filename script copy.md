# BSR Automation Showcase - Constraints Presentation Script

---

## Project Journey - UAT Commencement (1 minute)

"Let me walk you through our project journey. In **July 2025**, we kicked off our **User Acceptance Testing phase**.

This was a **critical milestone** where we conducted a series of UAT sessions for both **P2P and T&E processes**. However, this phase wasn't without its challenges:

- We encountered **competing priorities and scheduling challenges** that required us to realign timelines and ensure all key stakeholders could remain fully engaged throughout the testing phase.
- The UAT process itself was **time-consuming**, requiring **extensive validation** across multiple scenarios and GL accounts.
- We also dealt with **internet connection issues** that interrupted testing sessions and data transfers.
- Throughout this phase, we performed continuous **debugging and code amendments** to address issues discovered during testing.

Despite these hurdles, we persevered and refined the automation to ensure it met our quality standards."

---

## Project Journey - Current Status (1 minute)

"Fast forward to today—**October 2025**—and I'm pleased to say we are here, in the **'We Are Here' phase**:

- We've successfully **gone live with Wave 1 and Wave 2**—that's **ASIA/MEA and EU regions**—covering both **AP and TNE processes**.
- **UAT is still ongoing for NAM and LATAM regions**, which represent **Wave 3**. We're working closely with these teams to finalize testing and prepare for their go-live.
- We're currently **finalizing our UAT Report using Power BI**, which will provide **comprehensive analytics and insights** into the automation's performance, error rates, and time savings.
- And we always welcome additional feedback—**please feel free to add** any observations or suggestions as we continue to refine the solution.

Looking ahead to our **Next Steps**: We're preparing for **Wave 3 go-live**, implementing **future enhancements** based on lessons learned, and we have a **proposal to share with GPL** for expansion to other regions and markets."

---

## Benefits (1.5 minutes)

"Now let's talk about the tangible benefits this automation delivers—because this is why we invested the time and effort into this project:

### 1. Eliminates Manual Processes
The most obvious benefit: we've **removed repetitive, manual tasks** that were consuming approximately **40 hours per month** across **79 GL accounts**. Our team members can now focus on **value-added activities** like analysis and exception handling rather than data entry.

### 2. Time Savings
Speaking of time—the automation delivers **significant time savings**. What used to take **days now takes hours**. What used to take **hours now takes minutes**. This efficiency gain scales across all regions, multiplying the impact.

### 3. Highly Standardized & Automated Process
We've created a **highly standardized process** that operates **consistently across regions**. This means:
- **Same quality of output** everywhere
- **Predictable timelines**
- **Easier training and knowledge transfer**
- **Reduced dependency on individual expertise**

The automation runs reliably with **minimal human intervention**.

### 4. Reduced Human Error
Perhaps most importantly for data integrity: **reduced human error**. Manual data entry and file preparation are prone to mistakes—typos, copy-paste errors, wrong GL selections. The automation follows the **same logic every time**, significantly improving **data accuracy and reliability**.

These benefits align directly with our **digital transformation objectives**: enhancing productivity, improving data reliability, and fostering better collaboration across teams."

---

## Non-Technical Constraints (3-4 minutes)

"Let me start with the **non-technical constraints**—these are the **people and process challenges** we faced throughout this project:

### 1. Commitment Issues
**The Challenge:** We navigated **competing business priorities** that required careful coordination to keep the project on track. Everyone had their regular responsibilities, and dedicating time to a new automation initiative sometimes took a back seat to **urgent operational needs**.

**Our Solution:** We worked closely with the **Genpact Services Management Team** and **P2P Regional Associate Directors** to ensure **appropriate resource allocation** and maintain **project momentum**. By involving **leadership**, we reinforced the project's **strategic importance** and secured the necessary commitment from key stakeholders.

### 2. Time Constraints
**The Challenge:** **Limited availability from stakeholders** made it difficult to align on requirements and deliverables. Between **month-end closes**, **audit activities**, and **regional initiatives**, finding windows where all necessary participants could engage was challenging.

**Our Solution:** We scheduled **joint demo sessions** with Genpact to ensure everyone was aligned and to maintain momentum. We also **recorded these sessions** and created **documentation** so team members could **catch up asynchronously** if they couldn't attend live.

### 3. Time Zone Differences
**The Challenge:** Our team and Genpact operate across **different time zones**, making **real-time collaboration challenging**. Coordinating between **APAC, Europe, and North American time zones** meant potentially **12-15 hour differences**, which made spontaneous problem-solving calls nearly impossible.

**Our Solution:** We spent **non-working hours** conducting calls and demo sessions to accommodate these differences and keep the project moving forward. We also implemented **asynchronous communication strategies**—detailed emails with screenshots, video walkthroughs, and shared documentation—so work could continue **around the clock**.

### 4. Stakeholder Expectations
**The Challenge:** There were concerns about the **initial automation performance** and whether it would meet expectations immediately. Some stakeholders hoped for a **perfect, hands-off solution from day one**, but automation is inherently **iterative**—the first run helps identify edge cases and refine the logic.

**Our Solution:** We provided clarification that the **first run was primarily for testing and adjustment**. As the saying goes, **'present difficulties for future comfort'**—we're building a **foundation for long-term success**. We also set **realistic success metrics** focused on **improvement over manual processes** rather than perfection.

### 5. Communication Gap
**The Challenge:** **Misalignment between teams** led to confusion and rework. Different teams had **different assumptions** about scope, timelines, and responsibilities. What seemed clear in one meeting was **interpreted differently** by another team, creating downstream issues.

**Our Solution:** We established **regular communication** and **feedback sessions** to keep all stakeholders **aligned and informed** throughout the project lifecycle. We also created **clear documentation**—including **RACI matrices** and **shared project trackers**—to ensure **transparency and accountability**.

### 6. Resource Availability
**The Challenge:** **Key resources weren't always available** when needed, causing **bottlenecks**. Sometimes it was **SAP access**, other times it was **subject matter experts** who could explain specific business rules, or **IT resources** for troubleshooting technical issues.

**Our Solution:** We coordinated with teams to **optimize resource allocation** and **prioritize critical tasks** to maintain progress. This included **advance planning** for the next two weeks, building **redundancy through cross-training**, and adjusting timelines to respect **natural busy periods** like month-end close."

---

## Technical Constraints (3-4 minutes)

"Now let's dive into the **technical constraints**—the **system and infrastructure challenges** that required creative problem-solving:

### 1. Environment Limitation
**The Challenge:** The **T&E automation couldn't run** due to **Citrix environment restrictions**, which limited our testing capabilities. Citrix is a **virtual desktop environment** that provides security but imposes **significant limitations** on what automated scripts can do—**standard automation libraries simply don't work** as expected.

**Our Solution:** We enhanced the coding structure to adhere to the Citrix Environment by **manually writing our Python library from scratch** rather than depending on the open-source methods and functions available. We essentially built **custom automation capabilities** using **Windows API calls**, **coordinate-based automation**, and **image recognition techniques**. We also developed **offline mock testing capabilities** to validate **80% of our logic** without requiring actual Citrix access.

### 2. Manual Effort
**The Challenge:** We still needed **manual input for GL data updates**, which reduced some of the automation benefits. When **new GL accounts were added** or **structures changed**, someone had to manually update the configuration file—creating **errors, bottlenecks**, and **dependency on specific knowledge**.

**Our Solution:** We coordinated with Genpact to upload **GL files directly to SharePoint**. This allows our script to **automatically pull and update data** into the report and SAP, eliminating manual intervention except when GL structures change fundamentally—which happens only **once or twice a year** rather than monthly. The script now **dynamically reads the GL master file** at runtime and adapts to changes automatically, reducing manual effort from **3-4 hours per month to virtually zero**.

### 3. Connection Issues
**The Challenge:** We encountered **intermittent connection problems** that disrupted the automation workflow. Sometimes **SAP connections timed out mid-process**, other times **network latency** caused the script to think a process failed when it was just slow to respond. These **unpredictable failures** made troubleshooting particularly difficult.

**Our Solution:** This is **currently being investigated**. We're gathering feedback and working collaboratively with **Rolando** to identify the **root cause** and implement a **permanent fix**. Meanwhile, we've implemented several **mitigation strategies**: **robust error handling** with **retry logic**, **comprehensive logging** to track patterns, and **checkpoint-and-resume capability** so connection failures don't require starting over from scratch.

### 4. Large Data Volumes
**The Challenge:** Processing **large datasets**—particularly files with **hundreds of thousands of line items**—caused the script to fail or require the screen to remain active for extended periods. For example, the **NAM 4314 file contains approximately 800,000 line items**, requiring **6-8 hours of processing time** where the desktop session had to remain **active and undisturbed**.

**Our Solution:** We're implementing a **background job in SAP** to extract data. This allows data processing to happen **in the background without needing to keep the process visible on screen**, significantly improving **efficiency and reliability**. SAP background jobs run **server-side** with much more **powerful resources**, can run **overnight without supervision**, and aren't affected by desktop interruptions. We're also implementing **data chunking** to break large files into **smaller batches** for more **resilient processing**."

---

## Future Enhancements (1 minute)

"Looking beyond our current constraints, we have an exciting roadmap of **Future Enhancements**:

### 1. Automated Data Update
**Allow the script to automatically pull and update data from SharePoint to report/SAP.** This is already in progress—we're working with GenPact to upload **GL listing files to SharePoint**, enabling **fully automated data synchronization**.

### 2. Rollback System for Citrix Issues
**Implement a rollback system for the Citrix issue.** This will provide **fault tolerance**—if the automation encounters a Citrix-related problem, it can **recover gracefully** and **resume processing** without manual intervention.

### 3. Centralized BSR Automation
As I just discussed, **centralize the BSR template** to enable **unified script management** across all regions.

### 4. APAC Team Initial File Execution
**Enable the APAC team to run the initial file**—shifting more **control to regional teams** while maintaining **centralized oversight and support**.

### 5. GenPact Process Flow Optimization
Finally, **work with GenPact to continue optimizing the next steps** in the process flow, ensuring **smooth handoffs** and **minimizing bottlenecks**.

These enhancements represent our **commitment to continuous improvement** and our vision for a **truly world-class automated process**."

---

## Constraints Solution Proposal - Centralization (2 minutes)

"Now I'd like to present a strategic proposal that addresses multiple constraints we've discussed: the **Centralization of BSR Preparation Template**—specifically, who prepares the initial run file.

### The Current Situation
Currently, **each region prepares their own BSR working file**. While we've provided automation to help with this process, their practices remain **mostly manual**. And even when they do use our automation script, they still encounter many of the constraints we've mentioned—**environment limitations**, **connection issues**, **time zone challenges**, and the **learning curve** of running the automation themselves.

This **decentralized approach** creates **inefficiencies and inconsistencies** across regions.

### The Proposal
**Our proposal is to shift the first step to a single team in APAC—specifically, the KL team.** Here's how it would work:

This team will **run the automation script for all regions** to prepare the initial BSR working files. Once the script finishes, **APAC will hand over a clean, ready-to-use working file** to Genpact in each region, who will then continue with the remaining steps of the BSR process.

Essentially, we're **centralizing the automation execution** while keeping the downstream business process distributed.

### The Benefits - Pros:

**First: Centralized Maintenance**
By centralizing the preparation process, **the script can be maintained from our side, reducing interventions from Genpact**. When we need to **update logic**, **fix bugs**, or **enhance functionality**, we do it **once in one place** rather than coordinating updates across multiple regional teams.

**Second: Improved Debugging & Support**
This will **improve script debugging** and make it easier to **handle all regions at once**. When issues arise, we have **direct visibility and control**. We're not trying to troubleshoot remotely or rely on screenshots and descriptions from regional teams—we can see **exactly what's happening in real-time**.

**Third: Time Savings & Efficiency**
We can also **achieve maximum time savings** by running scripts **in parallel** or during **optimal windows**. More importantly, we **reduce the long wait time for Genpact to run the automation script**. Instead of waiting for each regional team to find time in their schedules, coordinate resources, and execute the script, we **handle it proactively** and **deliver ready-to-use files**.

This creates a more **predictable timeline** for the entire BSR process.

### The Challenges - Cons:

Let's be transparent about the challenges:

**First: Stakeholder Expectations**
There's a **stakeholder expectation on delivering the working file on time—with no issues**. By centralizing this responsibility, we're taking on **accountability for a critical first step**. Any delays or errors on our end will **impact the entire downstream process**.

We need to build **trust** that we can consistently deliver **quality, on-time results**.

**Second: Resource Investment**
There will be **additional 7 hours required during month-end** to execute this centralized process. However, here's the good news: we've already reached out to **Emily and Jun Yi** about this proposal, and we received **support from them**. They're willing to help during the transition and provide **backup support** as needed.

This investment of **7 hours from our team** potentially saves **10-15 hours across all regional Genpact teams** combined, plus eliminates coordination overhead.

### The Business Case
This proposal represents a **strategic shift from distributed execution to centralized excellence**. Yes, we're taking on more responsibility. Yes, there's an upfront time investment.

But consider what we gain: **consistent quality**, **faster turnaround**, **easier maintenance**, **better problem resolution**, and ultimately a **more scalable solution**. As we expand to more regions or markets, we don't need to train new teams on the automation—we simply **add their parameters to our centralized execution**.

This is truly a case of **'present difficulties for future comfort.'** We're building a foundation for **long-term operational excellence**."

---

## Conclusion (30 seconds)

"In summary, this project taught us that **automation isn't just about writing code**—it's about **managing expectations**, **coordinating across time zones and teams**, and building **robust solutions** that can handle **real-world complexities**.

Every constraint we faced became an **opportunity to improve our approach**, and the solutions we implemented have created a more **resilient and scalable automation framework**.

Thank you. We're happy to take any questions."

---

## Q&A Tips

**If asked about ROI:** Focus on **time savings**, **error reduction**, and **scalability**.

**If asked about timeline:** Acknowledge that constraints extended the timeline but resulted in a **more robust solution**.

**If asked about future plans:** Mention completing the **background job implementation** and resolving remaining **connection issues**.