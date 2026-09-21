import { jsPDF } from "jspdf";
import { toast } from "sonner";

export interface ReportMeta {
  title: string;
  subtitle?: string;
  reportId?: string;
  classification?: "TOP SECRET" | "CONFIDENTIAL" | "INTERNAL SOC" | "RESTRICTED" | "PUBLIC";
  organization?: string;
  author?: string;
  date?: string;
}

export interface MetricCard {
  label: string;
  value: string | number;
  sublabel?: string;
  color?: [number, number, number]; // RGB
}

export interface TableColumn {
  header: string;
  key: string;
  width: number;
  align?: "left" | "center" | "right";
}

export interface ReportSection {
  title: string;
  description?: string;
  metrics?: MetricCard[];
  columns?: TableColumn[];
  rows?: Record<string, string | number>[];
  bulletPoints?: string[];
}

export interface GeneratePdfOptions {
  filename: string;
  meta: ReportMeta;
  executiveSummary?: string;
  sections: ReportSection[];
}

/**
 * Universal SOC-Grade Letterhead PDF Generator for GetCyber Platform
 */
export function generateGetCyberPDF(options: GeneratePdfOptions): void {
  try {
    toast.info(`Generating ${options.meta.title}...`, {
      description: "Preparing SOC-grade encrypted PDF report with official letterhead.",
    });

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // ~210mm
    const pageHeight = doc.internal.pageSize.getHeight(); // ~297mm
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    const classification = options.meta.classification || "CONFIDENTIAL // SOC-GRADE AUDIT";
    const reportId = options.meta.reportId || `GC-REP-${Math.floor(100000 + Math.random() * 900000)}`;
    const organization = options.meta.organization || "TechCorp Industries (SOC Operations)";
    const author = options.meta.author || "Alex Morgan · Lead Security Analyst";
    const reportDate = options.meta.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

    // Function to draw official GetCyber Letterhead Header
    const drawHeader = (isFirstPage = false) => {
      // Top security classification stripe
      doc.setFillColor(7, 11, 22); // #070b16
      doc.rect(0, 0, pageWidth, 12, "F");

      doc.setFillColor(37, 99, 235); // #2563eb
      doc.rect(0, 11.5, pageWidth, 0.8, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(77, 141, 255); // #4d8dff
      doc.text("GETCYBER ENTERPRISE AI CYBERSECURITY", margin, 7.5);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(239, 68, 68); // Red classification badge
      doc.text(classification, pageWidth - margin, 7.5, { align: "right" });

      if (isFirstPage) {
        // Main Branded Letterhead Banner
        doc.setFillColor(11, 18, 34); // #0b1222
        doc.roundedRect(margin, 16, contentWidth, 32, 2, 2, "F");

        // Subtle border
        doc.setDrawColor(45, 55, 72);
        doc.setLineWidth(0.3);
        doc.roundedRect(margin, 16, contentWidth, 32, 2, 2, "S");

        // Brand Shield Icon & Name
        doc.setFillColor(37, 99, 235);
        doc.roundedRect(margin + 5, 21, 10, 10, 1.5, 1.5, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text("GC", margin + 10, 27.5, { align: "center" });

        doc.setFontSize(16);
        doc.setTextColor(255, 255, 255);
        doc.text("GetCyber", margin + 18, 26);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(147, 162, 196);
        doc.text("AI-POWERED SOC INTELLIGENCE PLATFORM", margin + 18, 30);

        // Document Meta Details (Right Side of Banner)
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(77, 141, 255);
        doc.text(`REPORT ID: ${reportId}`, pageWidth - margin - 6, 23, { align: "right" });

        doc.setFont("helvetica", "normal");
        doc.setTextColor(203, 213, 225);
        doc.text(`Target: ${organization}`, pageWidth - margin - 6, 28, { align: "right" });
        doc.text(`Generated: ${reportDate}`, pageWidth - margin - 6, 33, { align: "right" });
        doc.text(`Analyst: ${author}`, pageWidth - margin - 6, 38, { align: "right" });

        // Accent bottom gradient bar inside banner
        doc.setFillColor(49, 208, 170); // Teal
        doc.rect(margin, 47.4, contentWidth, 0.6, "F");

        y = 54;
      } else {
        y = 18;
      }
    };

    // Function to draw official footer
    const drawFooter = (pageNum: number, totalPages: number) => {
      doc.setDrawColor(45, 55, 72);
      doc.setLineWidth(0.3);
      doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `CONFIDENTIAL & PROPRIETARY — Generated via GetCyber AI Command Center (getcyber.co.in)`,
        margin,
        pageHeight - 7
      );

      doc.setFont("helvetica", "bold");
      doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: "right" });
    };

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > pageHeight - 16) {
        doc.addPage();
        drawHeader(false);
      }
    };

    // 1. Initial Page Header
    drawHeader(true);

    // 2. Document Title & Subtitle
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(15, 23, 42); // Dark slate for clear printability
    doc.text(options.meta.title, margin, y);
    y += 5.5;

    if (options.meta.subtitle) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text(options.meta.subtitle, margin, y);
      y += 6;
    } else {
      y += 2;
    }

    // 3. Executive Summary (if provided)
    if (options.executiveSummary) {
      checkPageBreak(25);
      doc.setFillColor(241, 245, 249); // light slate background
      doc.roundedRect(margin, y, contentWidth, 18, 1.5, 1.5, "F");
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(margin, y, contentWidth, 18, 1.5, 1.5, "S");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      doc.text("EXECUTIVE AUDIT SUMMARY", margin + 3.5, y + 4.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      const splitSummary = doc.splitTextToSize(options.executiveSummary, contentWidth - 7);
      doc.text(splitSummary, margin + 3.5, y + 9);
      y += 22;
    }

    // 4. Iterate over sections
    options.sections.forEach((section) => {
      checkPageBreak(20);

      // Section Title with blue pill bar
      doc.setFillColor(37, 99, 235);
      doc.rect(margin, y, 2.5, 6, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text(section.title, margin + 5, y + 4.8);
      y += 8;

      if (section.description) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        const descLines = doc.splitTextToSize(section.description, contentWidth);
        doc.text(descLines, margin, y);
        y += descLines.length * 4 + 2;
      }

      // Section Metrics Cards (if any)
      if (section.metrics && section.metrics.length > 0) {
        checkPageBreak(18);
        const count = section.metrics.length;
        const cardGap = 3;
        const cardWidth = (contentWidth - (count - 1) * cardGap) / count;
        const cardHeight = 15;

        section.metrics.forEach((metric, i) => {
          const cardX = margin + i * (cardWidth + cardGap);
          doc.setFillColor(248, 250, 252);
          doc.roundedRect(cardX, y, cardWidth, cardHeight, 1.5, 1.5, "F");
          doc.setDrawColor(226, 232, 240);
          doc.roundedRect(cardX, y, cardWidth, cardHeight, 1.5, 1.5, "S");

          doc.setFont("helvetica", "normal");
          doc.setFontSize(7);
          doc.setTextColor(100, 116, 139);
          doc.text(metric.label, cardX + 3, y + 4.5);

          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
          if (metric.color) {
            doc.setTextColor(metric.color[0], metric.color[1], metric.color[2]);
          } else {
            doc.setTextColor(15, 23, 42);
          }
          doc.text(String(metric.value), cardX + 3, y + 10);

          if (metric.sublabel) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(6.5);
            doc.setTextColor(148, 163, 184);
            doc.text(metric.sublabel, cardX + 3, y + 13.5);
          }
        });
        y += cardHeight + 5;
      }

      // Section Bullet points
      if (section.bulletPoints && section.bulletPoints.length > 0) {
        checkPageBreak(section.bulletPoints.length * 5);
        section.bulletPoints.forEach((point) => {
          doc.setFillColor(49, 208, 170); // Teal dot
          doc.circle(margin + 2, y - 1, 0.9, "F");

          doc.setFont("helvetica", "normal");
          doc.setFontSize(8);
          doc.setTextColor(51, 65, 85);
          const lines = doc.splitTextToSize(point, contentWidth - 6);
          doc.text(lines, margin + 5, y);
          y += lines.length * 4;
        });
        y += 3;
      }

      // Section Data Table
      if (section.columns && section.rows && section.rows.length > 0) {
        checkPageBreak(15);

        // Table Header
        const headerHeight = 7;
        doc.setFillColor(15, 23, 42); // Dark slate header
        doc.rect(margin, y, contentWidth, headerHeight, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(255, 255, 255);

        let currentX = margin;
        section.columns.forEach((col) => {
          const textX = col.align === "right" ? currentX + col.width - 2 : col.align === "center" ? currentX + col.width / 2 : currentX + 2;
          doc.text(col.header, textX, y + 4.8, { align: col.align || "left" });
          currentX += col.width;
        });
        y += headerHeight;

        // Table Rows
        const rowHeight = 6.5;
        section.rows.forEach((row, rowIndex) => {
          checkPageBreak(rowHeight + 2);

          // Alternating row background
          if (rowIndex % 2 === 0) {
            doc.setFillColor(248, 250, 252);
          } else {
            doc.setFillColor(255, 255, 255);
          }
          doc.rect(margin, y, contentWidth, rowHeight, "F");

          // Row bottom border
          doc.setDrawColor(226, 232, 240);
          doc.setLineWidth(0.15);
          doc.line(margin, y + rowHeight, margin + contentWidth, y + rowHeight);

          currentX = margin;
          doc.setFont("helvetica", "normal");
          doc.setFontSize(7.5);

          section.columns!.forEach((col) => {
            const rawVal = String(row[col.key] ?? "-");
            const textX = col.align === "right" ? currentX + col.width - 2 : col.align === "center" ? currentX + col.width / 2 : currentX + 2;

            // Severity colored highlights
            const valUpper = rawVal.toUpperCase();
            if (valUpper === "CRITICAL") {
              doc.setTextColor(220, 38, 38); // Red
              doc.setFont("helvetica", "bold");
            } else if (valUpper === "HIGH") {
              doc.setTextColor(234, 88, 12); // Orange
              doc.setFont("helvetica", "bold");
            } else if (valUpper === "MEDIUM") {
              doc.setTextColor(202, 138, 4); // Yellow
              doc.setFont("helvetica", "bold");
            } else if (valUpper === "LOW" || valUpper === "PASS" || valUpper === "RESOLVED") {
              doc.setTextColor(22, 163, 74); // Green
              doc.setFont("helvetica", "bold");
            } else {
              doc.setTextColor(51, 65, 85);
              doc.setFont("helvetica", "normal");
            }

            // Truncate if too long for column
            const maxChars = Math.max(4, Math.floor(col.width / 2.2));
            const displayVal = rawVal.length > maxChars ? `${rawVal.slice(0, maxChars - 2)}...` : rawVal;

            doc.text(displayVal, textX, y + 4.5, { align: col.align || "left" });
            currentX += col.width;
          });

          y += rowHeight;
        });

        y += 4;
      }

      y += 2;
    });

    // 5. Apply Footers to all pages
    const totalPages = doc.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      drawFooter(p, totalPages);
    }

    // 6. Save PDF
    doc.save(`${options.filename.replace(/\.pdf$/i, "")}.pdf`);

    toast.success("Report Exported Successfully", {
      description: `Downloaded ${options.filename} with official GetCyber SOC Letterhead.`,
    });
  } catch (err) {
    console.error("PDF Export error:", err);
    toast.error("Export Failed", {
      description: "An error occurred while generating the PDF. Please try again.",
    });
  }
}
