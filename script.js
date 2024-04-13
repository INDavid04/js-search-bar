/* Initial code */

const resultsContainer = document.getElementById('resultsContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === '') {
        alert('Please enter a search term.');
        return;
    }

    const articleSections = document.querySelectorAll('article');

    let found = false;
    articleSections.forEach(article => {
        const articleContent = article.textContent.toLowerCase();
        if (articleContent.includes(searchTerm)) {
            found = true;
            resultsContainer.appendChild(article.cloneNode(true));
        }
    });

    if (!found) {
        alert('No results found.');
    }

    searchInput.value = '';
});

resultsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        event.target.parentElement.remove();
    }
});

/* Add an element from website */

const resultsContainer = document.getElementById('resultsContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', () => {
    const url = searchInput.value.trim();

    if (url === '') {
        alert('Please enter a URL.');
        return;
    }

    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const title = doc.querySelector('title').textContent;

            const article = document.createElement('article');
            const h2 = document.createElement('h2');
            h2.textContent = title;
            article.appendChild(h2);

            const contentDiv = document.createElement('div');
            contentDiv.className = 'Chords';
            contentDiv.innerHTML = doc.body.innerHTML;
            article.appendChild(contentDiv);

            resultsContainer.appendChild(article);
        })
        .catch(error => {
            console.error('Error fetching content:', error);
            alert('Failed to fetch content. Please check the URL.');
        });

    searchInput.value = '';
});

/*
From webdevsimplified

const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  users.forEach(user => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    user.element.classList.toggle("hide", !isVisible)
  })
})

fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      header.textContent = user.name
      body.textContent = user.email
      userCardContainer.append(card)
      return { name: user.name, email: user.email, element: card }
    })
  })
*/
