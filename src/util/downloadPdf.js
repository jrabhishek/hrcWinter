import { jsPDF } from "jspdf";
import "jspdf-autotable";
import store from "../store";

const column = [
  "Invoice Number",
  "PO Number",
  "Invioce Date",
  "Due Date",
  "Currency",
  "Open Amount ($)",
];
const genratePdf = (template, age) => {
  let tdata = template.t1;
  let header = "";
  let footer = "";
  if (age === 20) tdata = template.t2;

  console.log(template);
  let data1 = store.getState().invoice.selectedData;
  if (Object.keys(template).length > 0) {
    console.log(data1);
    header = `${tdata.header}`;

    footer = `${tdata.footer}

Kind Regards,
${tdata.accountName}
Phone : ${tdata.phone}
Fax : ${tdata.phone}
Email : ${tdata.emai}
Company Name ${tdata.cname}`;
  }
  function headRows() {
    return [
      {
        id: "Invoice Number",
        no: "PO Number",
        date: "Invioce Date",
        cur: "Currency",
        amount: "amount",
        ddate: "Due Date",
      },
    ];
  }
  function bodyRows() {
    var body = [];
    for (var j = 0; j < data1.length; j++) {
      body.push({
        id: data1[j].invoiceId,
        no: data1[j].custNumber,
        date: data1[j].postingDate,
        cur: data1[j].invoiceCurrency,
        amount: data1[j].totalOpenAmount,
        ddate: data1[j].dueInDate,
      });
    }
    return body;
  }

  var doc = new jsPDF();
  doc.setFontSize(17);
  doc.text("Invoice Details", 14, 22);
  doc.setFontSize(11);
  doc.setTextColor(90);
  var pageSize = doc.internal.pageSize;
  var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
  var text = doc.splitTextToSize(header, pageWidth - 35, {});
  doc.text(text, 14, 30);

  doc.autoTable({
    head: headRows(),
    body: bodyRows(),
    startY: 80,
    showHead: "firstPage",
  });
  text = doc.splitTextToSize(footer, pageWidth - 35, {});
  doc.text(text, 14, doc.lastAutoTable.finalY + 10);
  window.open(doc.output("bloburl"), "_blank");
};
export default genratePdf;
