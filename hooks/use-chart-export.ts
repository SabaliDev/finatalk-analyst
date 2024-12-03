import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function useChartExport() {
  const exportRef = useRef<HTMLDivElement | null>(null);

  const exportToPNG = async (fileName = 'chart.png') => {
    if (!exportRef.current) return;

    const canvas = await html2canvas(exportRef.current, {
      scale: 2, // Increase resolution
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
      allowTaint: true,
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = fileName;
    link.click();
  };

  const exportToPDF = async (fileName = 'chart.pdf') => {
    if (!exportRef.current) return;

    const canvas = await html2canvas(exportRef.current, {
      scale: 2, // Increase resolution
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(fileName);
  };

  return { exportRef, exportToPNG, exportToPDF };
}