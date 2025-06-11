# Copyright (c) 2025, divya and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class InvoiceItem(Document):
	# pass\
    def validate(self):
        self.amount = self.quantity * self.rate
