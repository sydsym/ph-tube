const categoryContainer = document.getElementById("category-container");


const loadCategories = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`);
    const data = await response.json();
    showCategories(data.categories);
    return;
}

const showCategories = (categories) => {
    
    categories.forEach(item => {
        const button = document.createElement('button');
        button.className = 'btn';
        button.id = item.category_id;
        button.textContent = item.category;
        categoryContainer.appendChild(button);
    });
}

loadCategories();
