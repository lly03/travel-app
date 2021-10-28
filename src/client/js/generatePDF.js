import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * This function is called when the "Generate PDF" button is clicked.
 * We used a npm package "jspdf", where it will generate the html into a pdf.
 */

const generatePDF = async (e) => {
    const tripCard = e.target.parentNode.parentNode;
    const doc = new jsPDF('l', 'pt');

    await html2canvas(tripCard, {
        allowTaint: true,
        useCORS: true
    }).then((canvas) => {
        doc.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, 800, 600);
        doc.save("trip.pdf");
    })
}

export { generatePDF };
