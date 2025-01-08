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
       
        { color: 'Red', css: 'linear-gradient(147deg, #e0455f 0%, #44000b 74%)' },
        { color: 'Blue', css: 'linear-gradient(315deg, #090947 0%, #5a585a 74%)' },
        { color: 'Yellow', css: 'linear-gradient(315deg, #d2a813 0%, #000000 74%)' },
        { color: 'Green', css: 'linear-gradient(314deg, #51713a 0%, #000e21 74%)' },
        { color: 'Dark', css: 'linear-gradient(147deg, #4d4855 0%, #000000 74%)'},
        { color: 'Coffee', css: 'linear-gradient(315deg, #ca7968 0%, #0c0c0c 74%)' },
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
            window.location.href = site.url;
        });
        recentSitesContainer.appendChild(siteElement);
    });
}



function displayColorButtons(){
    const colorInfo = getButtons();
    const buttonElementContainer = document.getElementById('insideBox');
    colorInfo.forEach(info => {
        const buttonElement = document.createElement('div');
        buttonElement.className = 'insideButton';
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

//had to comment, due to inline javascript attack
// window.openPop = function openPop() {
//     const popDialog = document.getElementById("inside_box")
//     popDialog.style.display =
//       popDialog.style.display === "block" ? "none" : "block"
// }

document.getElementById('themeButton').addEventListener('click',() => {
    const popDialog = document.getElementById("insideBox")
    popDialog.style.display =
      popDialog.style.display === "block" ? "none" : "block"

});


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

