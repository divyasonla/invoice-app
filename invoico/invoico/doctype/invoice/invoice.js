frappe.ui.form.on('Invoice', {
    refresh: function (frm) {
        frm.trigger("calculate_total");
    },

    calculate_total: function (frm) {
        let total = 0;
        (frm.doc.invoice_items || []).forEach(item => {
            total += Number(item.amount) || 0;
        });
        frm.set_value("total_amount", total);
    }
});

frappe.ui.form.on("Invoice Item", {
    invoice_items_add: function (frm) {
        frm.trigger("calculate_total");
    },
    invoice_items_remove: function (frm) {
        frm.trigger("calculate_total");
    },
    quantity: function (frm, cdt, cdn) {
        calculate_amount(frm, cdt, cdn);
        frm.trigger("calculate_total");
    },
    rate: function (frm, cdt, cdn) {
        calculate_amount(frm, cdt, cdn);
        frm.trigger("calculate_total");
    }
});

function calculate_amount(frm, cdt, cdn) {
    let row = locals[cdt][cdn];
    let qty = Number(row.quantity) || 0;
    let rate = Number(row.rate) || 0;
    let amount = qty * rate;
    frappe.model.set_value(cdt, cdn, "amount", amount);
}
