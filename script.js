function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;
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

document.addEventListener('DOMContentLoaded', () => {
    setQuote();
    updateTime();
    setInterval(updateTime, 1000);
});