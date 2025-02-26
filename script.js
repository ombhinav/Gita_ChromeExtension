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
    return new Promise((resolve, reject) => {
        if (chrome.topSites) {
            chrome.topSites.get((topSites) => {
                // Limit to top 5 sites
                const sites = topSites.slice(0, 5).map((site) => ({
                    url: site.url,
                    title: site.title,
                    favicon: `https://www.google.com/s2/favicons?domain=${site.url}`, // Using a dynamic favicon URL
                }));
                resolve(sites); // Return the sites array
            });
        } else {
            reject(new Error('chrome.topSites API is not available.'));
        }
    });
}



function getButtons(){
    return[
        { color: 'Original', css: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)' }, // Added original theme
        { color: 'Red', css: 'linear-gradient(147deg, #e0455f 0%, #44000b 74%)' },
        { color: 'Blue', css: 'linear-gradient(315deg, #090947 0%, #5a585a 74%)' },
        { color: 'Yellow', css: 'linear-gradient(315deg, #d2a813 0%, #000000 74%)' },
        { color: 'Green', css: 'linear-gradient(314deg, #51713a 0%, #000e21 74%)' },
        { color: 'Dark', css: 'linear-gradient(147deg, #4d4855 0%, #000000 74%)'},
        { color: 'Coffee', css: 'linear-gradient(315deg, #ca7968 0%, #0c0c0c 74%)' },
        { color: 'Pink', css: 'radial-gradient( circle farthest-corner at 3.2% 49.6%,  rgba(80,12,139,0.87) 0%, rgba(161,10,144,0.72) 83.6% )'},
        
    ];
}


async function displayRecentSites() {
    try {
        const recentSites = await getRecentSites();  // Await the promise to get the sites
        const recentSitesContainer = document.getElementById('recent-sites');

        // Loop through the recent sites and create the UI
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
    } catch (error) {
        console.error("Error fetching recent sites:", error);
    }
}

function displayColorButtons() {
    const colorInfo = getButtons();
    const buttonElementContainer = document.getElementById('insideBox');
    
    // Clear existing content
    buttonElementContainer.innerHTML = `
        <h6>Choose Your Theme</h6>
        <button class="close-btn" id="closeThemeBox">&times;</button>
        <div class="theme-grid" id="themeGrid"></div>
    `;
    
    const themeGrid = document.getElementById('themeGrid');
    
    // Get currently active theme
    const currentTheme = localStorage.getItem('selectedTheme') || '';
    
    colorInfo.forEach(info => {
        const themeItem = document.createElement('div');
        themeItem.className = 'theme-item';
        
        const colorPreview = document.createElement('div');
        colorPreview.className = 'color-preview';
        colorPreview.style.background = info.css;
        
        // Add a border for the Original theme to make it visible
        if (info.color === 'Original') {
            colorPreview.style.border = '2px solid #ccc';
        }
        
        // Mark active theme
        if (currentTheme === info.color) {
            colorPreview.classList.add('active');
        } else if (currentTheme === '' && info.color === 'Original') {
            // If no theme is set, mark Original as active
            colorPreview.classList.add('active');
        }
        
        const themeName = document.createElement('div');
        themeName.className = 'theme-name';
        themeName.textContent = info.color;
        
        themeItem.appendChild(colorPreview);
        themeItem.appendChild(themeName);
        themeGrid.appendChild(themeItem);
        
        colorPreview.addEventListener('click', (e) => {
            // Prevent the click from propagating to document
            e.stopPropagation();
            
            // Remove active class from all previews
            document.querySelectorAll('.color-preview').forEach(el => {
                el.classList.remove('active');
            });
            
            // Add active class to selected preview
            colorPreview.classList.add('active');
            
            if (info.color === 'Original') {
                // Clear the background style to revert to the original CSS background
                document.body.style.background = '';
                // Remove the stored theme
                localStorage.removeItem('selectedTheme');
                localStorage.removeItem('themeCSS');
            } else {
                // Apply theme
                document.body.style.background = info.css;
                
                // Save theme preference
                localStorage.setItem('selectedTheme', info.color);
                localStorage.setItem('themeCSS', info.css);
            }
        });
    });
    
    // Add close button functionality
    document.getElementById('closeThemeBox').addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from reaching document
        buttonElementContainer.style.display = 'none';
    });
    
    // Make the insideBox itself stop propagation to prevent closing when clicking on the box
    buttonElementContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}


function setupDocumentClickHandler() {
    document.addEventListener('click', () => {
        const themeBox = document.getElementById('insideBox');
        if (themeBox.style.display === 'block') {
            themeBox.style.display = 'none';
        }
    });
}

function loadThemePreference() {
    const selectedTheme = localStorage.getItem('selectedTheme');
    const themeCSS = localStorage.getItem('themeCSS');
    
    if (selectedTheme && themeCSS) {
        document.body.style.background = themeCSS;
    }
}


//window.openpop because , we have used type as module, which treats
//all the files as modules leaving scope, so we had to define this syntax

//had to comment, due to inline javascript attack
// window.openPop = function openPop() {
//     const popDialog = document.getElementById("inside_box")
//     popDialog.style.display =
//       popDialog.style.display === "block" ? "none" : "block"
// }

document.getElementById('themeButton').addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the click from immediately closing the box
    const popDialog = document.getElementById("insideBox");
    popDialog.style.display = popDialog.style.display === "block" ? "none" : "block";
});


document.addEventListener('DOMContentLoaded', () => {
    setQuote();
    updateTime();
    setInterval(updateTime, 1000);
    displayRecentSites();
    displayColorButtons();
    setupDocumentClickHandler();
    
    
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('change', toggleDarkMode);
    loadDarkModePreference();
    loadThemePreference();
});

