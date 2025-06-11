frappe.ui.form.on('Invoice', {
    refresh: function(frm) {
        frm.fields_dict.customer_autocomplete.$wrapper.html(`
            <label for="customer_autocomplete_input">Customer Name</label>
            <input type="text" id="customer_autocomplete_input" class="form-control" placeholder="Select Customer...">
        `);

        new Autocomp({
            input: document.getElementById("customer_autocomplete_input"),
            fetch: function(text, update) {
                frappe.call({
                    method: "frappe.client.get_list",
                    args: {
                        doctype: "Customers",
                        fields: ["name", "customer_name"],
                        filters: [["customer_name", "like", "%" + text + "%"]],
                        limit_page_length: 10
                    },
                    callback: function(r) {
                        let options = r.message.map(customer => ({
                            label: customer.customer_name,
                            value: customer.name
                        }));
                        update(options);
                    }
                });
            },
            onSelect: function(item) {
                frm.set_value("customer", item.value);
            }
        });

    }
});
