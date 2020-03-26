const DataTableMixin = {
    data() {
        return {
            headers: [
                {
                    text: "Dessert (100g serving)",
                    align: "start",
                    sortable: false,
                    value: "name"
                },
                { text: "Calories", value: "calories" },
                { text: "Fat (g)", value: "fat" },
                { text: "Carbs (g)", value: "carbs" },
                { text: "Protein (g)", value: "protein" },
                { text: "Iron (%)", value: "iron" },
                { text: "Glouten Free", value: "glutenfree" }
            ],
            searchText: ""
        }
    },
    methods: {
        getColor(calories: Number) {
            if (calories > 400) return 'red'
            else if (calories > 200) return 'orange'
            else return 'green'
        },
    },
}

module.exports = DataTableMixin;