class Autocomp {
    constructor({input, fetch, onSelect}) {
        this.input = input;
        this.fetch = fetch;
        this.onSelect = onSelect;
        this.list = null;
        this.input.addEventListener("input", () => this.onInput());
    }
    onInput() {
        const val = this.input.value;
        if (!val) {
            this.closeList();
            return;
        }
        this.fetch(val, items => this.showList(items));
    }
    showList(items) {
        this.closeList();
        this.list = document.createElement("div");
        this.list.setAttribute("class", "autocomplete-items");
        this.list.style.border = "1px solid #ccc";
        this.list.style.maxHeight = "150px";
        this.list.style.width = "150px";
        this.list.style.overflowY = "auto";
        this.input.parentNode.appendChild(this.list);
        items.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.innerHTML = item.label;
            itemDiv.style.padding = "5px";
            itemDiv.style.cursor = "pointer";
            itemDiv.addEventListener("click", () => {
                this.input.value = item.label;
                this.closeList();
                this.onSelect(item);
            });
            this.list.appendChild(itemDiv);
        });
    }
    closeList() {
        if (this.list) {
            this.list.parentNode.removeChild(this.list);
            this.list = null;
        }
    }
}
