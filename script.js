import { getRandomQuote } from "./quotes.js";

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


function setQuote() {
    const quote = getRandomQuote();
    document.getElementById('sanskrit-quote').textContent = quote.sanskrit;
    document.getElementById('english-quote').textContent = quote.english;
    document.getElementById('chapter-verse').textContent = `Chapter/Verse: ${quote.chapter}:${quote.verse}`;
}


function getRecentSites() {
    // Mock function. In a real extension, we would use the Chrome extension API
    // to get the actual recently visited sites.
    return [
        { url: 'https://www.vtop.ac.in', title: 'Vitian', favicon: 'https://vtop.vit.ac.in/favicon.ico' },
        { url: 'https://www.gmail.com', title: 'Gmail', favicon: 'gmail_favicon.png' },
        { url: 'https://web.whatsapp.com/', title: 'WhatsApp', favicon: 'https://web.whatsapp.com/favicon.ico' },
        { url: 'https://www.youtube.com', title: 'YouTube', favicon: 'https://youtube.com/favicon.ico' },
    ];
}

function getButtons(){
    return[
       
        { color: 'Red', css: 'linear-gradient(to right, #ff0084, #33001b)' },
        { color: 'Blue', css: 'radial-gradient( circle 382px at 50% 50.2%,  rgba(73,76,212,1) 0.1%, rgba(3,1,50,1) 100.2% )' },
        { color: 'Yellow', css: 'linear-gradient(135deg, rgb(216, 216, 116) 0%, rgb(137, 164, 16) 100%)' },
        { color: 'Green', css: 'radial-gradient( circle farthest-corner at 96.1% 7.2%,  rgba(9,178,62,1) 0%, rgba(19,19,19,1) 100.2% )' },
        { color: 'Dark', css: 'radial-gradient( circle 710px at 5.2% 7.2%,  rgba(37,89,222,1) 0%, rgba(37,89,222,1) 7.5%, rgba(4,4,29,1) 44.7% )'},
        { color: 'Default', css: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)' },
        { color: 'Pink', css: 'radial-gradient( circle farthest-corner at 3.2% 49.6%,  rgba(80,12,139,0.87) 0%, rgba(161,10,144,0.72) 83.6% )'},
        
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



function displayColorButtons(){
    const colorInfo = getButtons();
    const buttonElementContainer = document.getElementById('recent-sites');
    colorInfo.forEach(info => {
        const buttonElement = document.createElement('div');
        buttonElement.className = 'site-item';
        buttonElement.innerHTML=`
        <button id="colorChange${info.color}"> Click ${info.color}</button>
        `;
        buttonElementContainer.appendChild(buttonElement);

        const colorChangeButton = document.getElementById(`colorChange${info.color}`);
        colorChangeButton.addEventListener('click',() =>{
            document.body.style.background = info.css;
        });

    });
}

//window.openpop because , we have used type as module, which treats
//all the files as modules leaving scope, so we had to define this syntax
window.openPop = function openPop() {
    const popDialog = document.getElementById("inside_box")
    popDialog.style.display =
      popDialog.style.display === "block" ? "none" : "block"
}

document.addEventListener('DOMContentLoaded', () => {
    setQuote();
    updateTime();
    setInterval(updateTime, 1000);
    displayRecentSites();
    displayColorButtons();
    
    
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('change', toggleDarkMode);
    loadDarkModePreference();
});

