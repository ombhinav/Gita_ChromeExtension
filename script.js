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
    // const quotes = [
    //     {
    //         sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
    //         english: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions."
    //     },
    //     {
    //         sanskrit: "योगः कर्मसु कौशलम्।",
    //         english: "Yoga is skill in action."
    //     },
    //     {
    //         sanskrit: "मा ते सङ्गोऽस्त्वकर्मणि।",
    //         english: "Do not be attached to inaction."
    //     },
    //     {
    //         sanskrit: "जातस्य हि ध्रुवो मृत्युर्ध्रुवं जन्म मृतस्य च।",
    //         english: "For one who has taken birth, death is certain; and for one who is dead, birth is certain."
    //     },
    //     {
    //         sanskrit: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।",
    //         english: "Whatever action a great man performs, common men follow."
    //     }
    // ];
    const quotes = [
        {
            sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
            english: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.",
            chapter: 2,
            verse: 47
        },
        {
            sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनंजय।",
            english: "Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure.",
            chapter: 2,
            verse: 48
        },
        {
            sanskrit: "बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते।",
            english: "A person in divine consciousness, although engaged in seeing, hearing, touching, smelling, eating, moving about, sleeping and breathing, always knows within himself that he actually does nothing at all.",
            chapter: 5,
            verse: 8
        },
        {
            sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।",
            english: "Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion—at that time I descend Myself.",
            chapter: 4,
            verse: 7
        },
        {
            sanskrit: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।",
            english: "It is better to perform one's own duties imperfectly than to master the duties of another.",
            chapter: 3,
            verse: 35
        },
        {
            sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।",
            english: "O son of Kunti, the nonpermanent appearance of happiness and distress, and their disappearance in due course, are like the appearance and disappearance of winter and summer seasons.",
            chapter: 2,
            verse: 14
        },
        {
            sanskrit: "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः।",
            english: "The soul can never be cut to pieces by any weapon, nor burned by fire, nor moistened by water, nor withered by the wind.",
            chapter: 2,
            verse: 23
        },
        {
            sanskrit: "जातस्य हि ध्रुवो मृत्युर्ध्रुवं जन्म मृतस्य च।",
            english: "For one who has taken birth, death is certain; and for one who is dead, birth is certain.",
            chapter: 2,
            verse: 27
        },
        {
            sanskrit: "वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि।",
            english: "As a person puts on new garments, giving up old ones, the soul similarly accepts new material bodies, giving up the old and useless ones.",
            chapter: 2,
            verse: 22
        },
        {
            sanskrit: "यं हि न व्यथयन्त्येते पुरुषं पुरुषर्षभ।",
            english: "O best among men, the person who is not disturbed by happiness and distress and is steady in both is certainly eligible for liberation.",
            chapter: 2,
            verse: 15
        },
        {
            sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
            english: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.",
            chapter: 2,
            verse: 47
        },
        {
            sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनंजय।",
            english: "Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure.",
            chapter: 2,
            verse: 48
        },
        {
            sanskrit: "दूरेण ह्यवरं कर्म बुद्धियोगाद्धनंजय।",
            english: "Work done with selfish motives is far inferior to work done without attachment, O Arjuna.",
            chapter: 2,
            verse: 49
        },
        {
            sanskrit: "बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते।",
            english: "One who is engaged in devotional service, despite the most abominable action, is to be considered saintly because he is properly situated in his determination.",
            chapter: 9,
            verse: 30
        },
        {
            sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।",
            english: "Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion—at that time I descend Myself.",
            chapter: 4,
            verse: 7
        },
        {
            sanskrit: "परित्राणाय साधूनां विनाशाय च दुष्कृताम्।",
            english: "To deliver the pious and to annihilate the miscreants, as well as to reestablish the principles of religion, I Myself appear, millennium after millennium.",
            chapter: 4,
            verse: 8
        },
        {
            sanskrit: "जन्म कर्म च मे दिव्यमेवं यो वेत्ति तत्त्वतः।",
            english: "One who knows the transcendental nature of My appearance and activities does not, upon leaving the body, take his birth again in this material world, but attains My eternal abode, O Arjuna.",
            chapter: 4,
            verse: 9
        },
        {
            sanskrit: "वीतरागभयक्रोधा मन्मया मामुपाश्रिताः।",
            english: "Being freed from attachment, fear and anger, being fully absorbed in Me and taking refuge in Me, many, many persons in the past became purified by knowledge of Me—and thus they all attained transcendental love for Me.",
            chapter: 4,
            verse: 10
        },
        {
            sanskrit: "ये यथा मां प्रपद्यन्ते तांस्तथैव भजाम्यहम्।",
            english: "As all surrender unto Me, I reward them accordingly. Everyone follows My path in all respects, O son of Prtha.",
            chapter: 4,
            verse: 11
        },
        {
            sanskrit: "काङ्क्षन्तः कर्मणां सिद्धिं यजन्त इह देवताः।",
            english: "Men in this world desire success in fruitive activities, and therefore they worship the demigods.",
            chapter: 4,
            verse: 12
        },
        {
            sanskrit: "चातुर्वर्ण्यं मया सृष्टं गुणकर्मविभागशः।",
            english: "According to the three modes of material nature and the work associated with them, the four divisions of human society are created by Me.",
            chapter: 4,
            verse: 13
        },
        {
            sanskrit: "न मां कर्माणि लिम्पन्ति न मे कर्मफले स्पृहा।",
            english: "There is no work that affects Me; nor do I aspire for the fruits of action. One who understands this truth about Me also does not become entangled in the fruitive reactions of work.",
            chapter: 4,
            verse: 14
        },
        {
            sanskrit: "कर्म ब्रह्मोद्भवं विद्धि ब्रह्माक्षरसमुद्भवम्।",
            english: "You should understand that all species of life, O Arjuna, are made possible by birth in this material nature, and that I am the seed-giving father.",
            chapter: 14,
            verse: 3
        },
        {
            sanskrit: "मम योनिर्महद्ब्रह्म तस्मिन्गर्भं दधाम्यहम्।",
            english: "It should be understood that all species of life, O son of Kunti, are made possible by birth in this material nature, and that I am the seed-giving father.",
            chapter: 14,
            verse: 4
        },
        {
            sanskrit: "सर्वभूतस्थमात्मानं सर्वभूतानि चात्मनि।",
            english: "A true yogi observes Me in all beings and also sees every being in Me. Indeed, the self-realized person sees Me, the same Supreme Lord, everywhere.",
            chapter: 6,
            verse: 29
        },
        {
            sanskrit: "यो मां पश्यति सर्वत्र सर्वं च मयि पश्यति।",
            english: "For one who sees Me everywhere and sees everything in Me, I am never lost, nor is he ever lost to Me.",
            chapter: 6,
            verse: 30
        },
        {
            sanskrit: "आत्मौपम्येन सर्वत्र समं पश्यति योऽर्जुन।",
            english: "He is a perfect yogi who, by comparison to his own self, sees the true equality of all beings, in both their happiness and their distress, O Arjuna!",
            chapter: 6,
            verse: 32
        },
        {
            sanskrit: "अभ्यासेऽप्यसमर्थोऽसि मत्कर्मपरमो भव।",
            english: "If you cannot practice the regulations of bhakti-yoga, then just try to work for Me, because by working for Me you will come to the perfect stage.",
            chapter: 12,
            verse: 10
        },
        {
            sanskrit: "अथैतदप्यशक्तोऽसि कर्तुं मद्योगमाश्रितः।",
            english: "If, however, you are unable to work in this consciousness of Me, then try to act giving up all results of your work and try to be self-situated.",
            chapter: 12,
            verse: 11
        },
        {
            sanskrit: "श्रेयो हि ज्ञानमभ्यासाज्ज्ञानाद्ध्यानं विशिष्यते।",
            english: "Better than mechanical practice is knowledge, and better than knowledge is meditation.",
            chapter: 12,
            verse: 12
        },
        {
            sanskrit: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।",
            english: "One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor and is free from false ego, who is equal in both happiness and distress, who is tolerant, always satisfied, self-controlled, and engaged in devotional service with determination, his mind and intelligence fixed on Me—such a devotee of Mine is very dear to Me.",
            chapter: 12,
            verse: 13-14
        },
        {
            sanskrit: "यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः।",
            english: "He for whom no one is put into difficulty and who is not disturbed by anyone, who is equipoised in happiness and distress, fear and anxiety, is very dear to Me.",
            chapter: 12,
            verse: 15
        },
        {
            sanskrit: "अनपेक्षः शुचिर्दक्ष उदासीनो गतव्यथः।",
            english: "My devotee who is not dependent on the ordinary course of activities, who is pure, expert, without cares, free from all pains, and not striving for some result, is very dear to Me.",
            chapter: 12,
            verse: 16
        },
        {
            sanskrit: "यो न हृष्यति न द्वेष्टि न शोचति न काङ्क्षति।",
            english: "One who neither rejoices nor grieves, neither laments nor desires, and who renounces both auspicious and inauspicious things—such a devotee is very dear to Me.",
            chapter: 12,
            verse: 17
        },
        {
            sanskrit: "ये तु धर्म्यामृतमिदं यथोक्तं पर्युपासते।",
            english: "Those who follow this imperishable path of devotional service and who completely engage themselves with faith, making Me the supreme goal, are very, very dear to Me.",
            chapter: 12,
            verse: 20
        },
        {
            sanskrit: "मच्चित्ता मद्गतप्राणा बोधयन्तः परस्परम्।",
            english: "The thoughts of My pure devotees dwell in Me, their lives are fully devoted to My service, and they derive great satisfaction and bliss from always enlightening one another and conversing about Me.",
            chapter: 10,
            verse: 9
        },
        {
            sanskrit: "तेषां सततयुक्तानां भजतां प्रीतिपूर्वकम्।",
            english: "To those who are constantly devoted to serving Me with love, I give the understanding by which they can come to Me.",
            chapter: 10,
            verse: 10
        },
        {
            sanskrit: "तेषामेवानुकम्पार्थमहमज्ञानजं तमः।",
            english: "To show them special mercy, I, dwelling in their hearts, destroy with the shining lamp of knowledge the darkness born of ignorance.",
            chapter: 10,
            verse: 11
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