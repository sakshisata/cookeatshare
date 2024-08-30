document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Login Form submission handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Perform validation and login logic here
        
        // On successful login
        alert('Login Successful!');
        window.location.hash = '#home';  // Redirect to home
        document.getElementById('login').style.display = 'none';
    });

    // Signup Form submission handler
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Perform validation and signup logic here
        
        // On successful signup
        alert('Signup Successful!');
        window.location.hash = '#home';  // Redirect to home
        document.getElementById('signup').style.display = 'none';
    });

    // Show the correct section based on the URL hash
    window.addEventListener('hashchange', () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => section.style.display = 'none');

        const hash = window.location.hash || '#home';
        document.querySelector(hash).style.display = 'block';
    });

    // Trigger the hashchange event on page load
    window.dispatchEvent(new Event('hashchange'));
});

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    const form = document.querySelector('#submit form');
    const currentUser = 'user123';  // Simulating a logged-in user. Replace with actual user ID from backend.

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const title = document.getElementById('recipe-title').value;
        const description = document.getElementById('recipe-description').value;
        const ingredients = document.getElementById('recipe-ingredients').value;
        const steps = document.getElementById('recipe-steps').value;
        const image = document.getElementById('recipe-image').files[0];
        
        if (image) {
            const reader = new FileReader();
            reader.onload = function(e) {
                addRecipe(title, description, ingredients, steps, e.target.result, currentUser);
            }
            reader.readAsDataURL(image);
        } else {
            addRecipe(title, description, ingredients, steps, '', currentUser);
        }

        form.reset();
        alert('Recipe submitted successfully!');
    });

    function addRecipe(title, description, ingredients, steps, imageUrl, userId) {
        const recipesContainer = document.querySelector('.recipes-container');
        
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.dataset.userId = userId;  // Store the user ID for this recipe

        const recipeImage = document.createElement('img');
        recipeImage.src = imageUrl;
        recipeImage.alt = title;

        const recipeTitle = document.createElement('h3');
        recipeTitle.textContent = title;

        const recipeDescription = document.createElement('p');
        recipeDescription.textContent = description;

        const recipeIngredients = document.createElement('p');
        recipeIngredients.textContent = `Ingredients: ${ingredients}`;

        const recipeSteps = document.createElement('p');
        recipeSteps.textContent = `Steps: ${steps}`;

        const userActions = document.createElement('div');

        if (userId === currentUser) {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn');
            deleteButton.addEventListener('click', () => {
                recipeCard.remove();
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('btn');
            editButton.addEventListener('click', () => {
                editRecipe(recipeCard, title, description, ingredients, steps);
            });

            userActions.appendChild(deleteButton);
            userActions.appendChild(editButton);
        }

        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeTitle);
        recipeCard.appendChild(recipeDescription);
        recipeCard.appendChild(recipeIngredients);
        recipeCard.appendChild(recipeSteps);
        recipeCard.appendChild(userActions);
        
        recipesContainer.appendChild(recipeCard);
    }

    function editRecipe(card, title, description, ingredients, steps) {
        // Implement an edit form or direct editing functionality here
        const newTitle = prompt("Edit Title", title);
        const newDescription = prompt("Edit Description", description);
        const newIngredients = prompt("Edit Ingredients", ingredients);
        const newSteps = prompt("Edit Steps", steps);

        if (newTitle && newDescription && newIngredients && newSteps) {
            card.querySelector('h3').textContent = newTitle;
            card.querySelector('p:nth-child(3)').textContent = newDescription;
            card.querySelector('p:nth-child(4)').textContent = `Ingredients: ${newIngredients}`;
            card.querySelector('p:nth-child(5)').textContent = `Steps: ${newSteps}`;
        }
    }
});

