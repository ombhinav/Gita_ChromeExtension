function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function loadDarkModePreference() {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').checked = true;
    }
}

function getRandomQuote() {
    const quotes = [
        {
            sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
            english: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions."
        },
        {
            sanskrit: "योगः कर्मसु कौशलम्।",
            english: "Yoga is skill in action."
        },
        {
            sanskrit: "मा ते सङ्गोऽस्त्वकर्मणि।",
            english: "Do not be attached to inaction."
        },
        {
            sanskrit: "जातस्य हि ध्रुवो मृत्युर्ध्रुवं जन्म मृतस्य च।",
            english: "For one who has taken birth, death is certain; and for one who is dead, birth is certain."
        },
        {
            sanskrit: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।",
            english: "Whatever action a great man performs, common men follow."
        }
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function setQuote() {
    const quote = getRandomQuote();
    document.getElementById('sanskrit-quote').textContent = quote.sanskrit;
    document.getElementById('english-quote').textContent = quote.english;
}

function getRecentSites() {
    // This is a mock function. In a real extension, you would use the Chrome extension API
    // to get the actual recently visited sites.
    return [
        { url: 'https://www.google.com', title: 'Google', favicon: 'https://www.google.com/favicon.ico' },
        { url: 'https://www.youtube.com', title: 'YouTube', favicon: 'https://www.youtube.com/favicon.ico' },
        { url: 'https://www.github.com', title: 'GitHub', favicon: 'https://github.com/favicon.ico' },
        { url: 'https://www.stackoverflow.com', title: 'Stack Overflow', favicon: 'https://stackoverflow.com/favicon.ico' },
    ];
}

function displayRecentSites() {
    const recentSites = getRecentSites();
    const recentSitesContainer = document.getElementById('recent-sites');

    recentSites.forEach(site => {
        const siteElement = document.createElement('div');
        siteElement.className = 'site-item';
        siteElement.innerHTML = `
            <img src="${site.favicon}" alt="${site.title} favicon">
            <span>${site.title}</span>
        `;
        siteElement.addEventListener('click', () => {
            window.open(site.url, '_blank');
        });
        recentSitesContainer.appendChild(siteElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setQuote();
    updateTime();
    setInterval(updateTime, 1000);
    displayRecentSites();

    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('change', toggleDarkMode);
    loadDarkModePreference();
});