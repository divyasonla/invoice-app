
import frappe
from frappe.utils.pdf import get_pdf
from frappe.www.printview import get_print_content

@frappe.whitelist()  
def download_invoice_pdf(name):
    doc = frappe.get_doc("Invoice", name)
    print_format = "Invoice Print Format"
    html = get_print_content(doc.doctype, doc.name, print_format=print_format)
    pdf = get_pdf(html)
    return pdf
