"use client";

import { Download } from "lucide-react";
import { useState } from "react";

type Props = {
  fileName?: string;
  targetId?: string;
};

export default function PDFExportButton({
  fileName = "AI_Product_Report",
  targetId = "ai-product-report",
}: Props) {
  const [loading, setLoading] = useState(false);

  async function exportPDF() {
    try {
      setLoading(true);

      const element = document.getElementById(
        targetId
      );

      if (!element) {
        alert("Report not found.");
        return;
      }

      const html2canvas = (
        await import("html2canvas")
      ).default;

      const jsPDF = (
        await import("jspdf")
      ).default;

      const canvas =
        await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
        });

      const image = canvas.toDataURL(
        "image/png"
      );

      const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );

      const pdfWidth =
        pdf.internal.pageSize.getWidth();

      const pdfHeight =
        pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;

      const imgHeight =
        (canvas.height * imgWidth) /
        canvas.width;

      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(
        image,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;

        pdf.addPage();

        pdf.addImage(
          image,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight
        );

        heightLeft -= pdfHeight;
      }

      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error(error);

      alert("Unable to export PDF.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={exportPDF}
      disabled={loading}
      className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download size={18} />

      {loading
        ? "Generating PDF..."
        : "Download PDF"}
    </button>
  );
}