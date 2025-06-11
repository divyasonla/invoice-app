# Copyright (c) 2025, divya and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Invoice(Document):
	# pass
    def validate(self):
        self.total_amount = 0
        for item in self.invoice_items:
            item.amount = item.quantity * item.rate 
            self.total_amount += item.amount
