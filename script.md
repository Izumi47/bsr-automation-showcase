# BSR Automation Showcase - Constraints Presentation Script

---

## Non-Technical Constraints (3-4 minutes)

"Let me start with the **non-technical constraints**—these are the people and process challenges we faced throughout this project:

### 1. Commitment Issues
**The Challenge:** We navigated competing business priorities that required careful coordination to keep the project on track. Everyone had their regular responsibilities, and dedicating time to a new automation initiative sometimes took a back seat to urgent operational needs.

**Our Solution:** We worked closely with the Genpact Services Management Team and P2P Regional Associate Directors to ensure appropriate resource allocation and maintain project momentum. By involving leadership, we reinforced the project's strategic importance and secured the necessary commitment from key stakeholders.

### 2. Time Constraints
**The Challenge:** Limited availability from stakeholders made it difficult to align on requirements and deliverables. Between month-end closes, audit activities, and regional initiatives, finding windows where all necessary participants could engage was challenging.

**Our Solution:** We scheduled joint demo sessions with Genpact to ensure everyone was aligned and to maintain momentum. We also recorded these sessions and created documentation so team members could catch up asynchronously if they couldn't attend live.

### 3. Time Zone Differences
**The Challenge:** Our team and Genpact operate across different time zones, making real-time collaboration challenging. Coordinating between APAC, Europe, and North American time zones meant potentially 12-15 hour differences, which made spontaneous problem-solving calls nearly impossible.

**Our Solution:** We spent non-working hours conducting calls and demo sessions to accommodate these differences and keep the project moving forward. We also implemented asynchronous communication strategies—detailed emails with screenshots, video walkthroughs, and shared documentation—so work could continue around the clock.

### 4. Stakeholder Expectations
**The Challenge:** There were concerns about the initial automation performance and whether it would meet expectations immediately. Some stakeholders hoped for a perfect, hands-off solution from day one, but automation is inherently iterative—the first run helps identify edge cases and refine the logic.

**Our Solution:** We provided clarification that the first run was primarily for testing and adjustment. As the saying goes, 'present difficulties for future comfort'—we're building a foundation for long-term success. We also set realistic success metrics focused on improvement over manual processes rather than perfection.

### 5. Communication Gap
**The Challenge:** Misalignment between teams led to confusion and rework. Different teams had different assumptions about scope, timelines, and responsibilities. What seemed clear in one meeting was interpreted differently by another team, creating downstream issues.

**Our Solution:** We established regular communication and feedback sessions to keep all stakeholders aligned and informed throughout the project lifecycle. This included monthly meetings with GenPact team members, Associate Directors, and Regional Associate Directors to provide status updates and ensure executive visibility into our progress.

### 6. Resource Availability
**The Challenge:** Key resources weren't always available when needed, causing bottlenecks. Sometimes it was SAP access, other times it was subject matter experts who could explain specific business rules, or IT resources for troubleshooting technical issues.

**Our Solution:** We coordinated with teams to optimize resource allocation and prioritize critical tasks to maintain progress. This included advance planning for the next two weeks, building redundancy through cross-training, and adjusting timelines to respect natural busy periods like month-end close."

---

## Technical Constraints (3-4 minutes)

"Now let's dive into the **technical constraints**—the system and infrastructure challenges that required creative problem-solving:

### 1. Environment Limitation
**The Challenge:** The T&E automation couldn't run due to Citrix environment restrictions, which limited our testing capabilities. Citrix is a virtual desktop environment that provides security but imposes significant limitations on what automated scripts can do—standard automation libraries simply don't work as expected.

**Our Solution:** We enhanced the coding structure to adhere to the Citrix Environment by manually writing our Python library from scratch rather than depending on the open-source methods and functions available. We essentially built custom automation capabilities using Windows API calls, coordinate-based automation, and image recognition techniques. We also developed offline mock testing capabilities to validate 80% of our logic without requiring actual Citrix access.

### 2. Manual Effort
**The Challenge:** We still needed manual input for GL data updates, which reduced some of the automation benefits. When new GL accounts were added or structures changed, someone had to manually update the configuration file—creating errors, bottlenecks, and dependency on specific knowledge.

**Our Solution:** We coordinated with Genpact to upload GL files directly to SharePoint. This allows our script to automatically pull and update data into the report and SAP, eliminating manual intervention except when GL structures change fundamentally—which happens only once or twice a year rather than monthly. The script now dynamically reads the GL master file at runtime and adapts to changes automatically, reducing manual effort from 3-4 hours per month to virtually zero.

### 3. Connection Issues
**The Challenge:** We encountered intermittent connection problems that disrupted the automation workflow. Sometimes SAP connections timed out mid-process, other times network latency caused the script to think a process failed when it was just slow to respond. These unpredictable failures made troubleshooting particularly difficult.

**Our Solution:** This is currently being investigated. We're gathering feedback and working collaboratively with Rolando to identify the root cause and implement a permanent fix. Meanwhile, we've implemented several mitigation strategies: robust error handling with retry logic, comprehensive logging to track patterns, and checkpoint-and-resume capability so connection failures don't require starting over from scratch.

### 4. Large Data Volumes
**The Challenge:** Processing large datasets—particularly files with hundreds of thousands of line items—caused the script to fail or require the screen to remain active for extended periods. For example, the NAM 4314 file contains approximately 800,000 line items, requiring 6-8 hours of processing time where the desktop session had to remain active and undisturbed.

**Our Solution:** We're implementing a background job in SAP to extract data. This allows data processing to happen in the background without needing to keep the process visible on screen, significantly improving efficiency and reliability. SAP background jobs run server-side with much more powerful resources, can run overnight without supervision, and aren't affected by desktop interruptions. We're also implementing data chunking to break large files into smaller batches for more resilient processing."

---