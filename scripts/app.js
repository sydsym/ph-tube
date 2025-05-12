// const categoryContainer = document.getElementById("category-container");


const loadCategories = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`);
    const data = await response.json();
    showCategories(data.data);
    return;
}

const showCategories = (categories) => {
    console.log(categories)
    return;
}

loadCategories();
