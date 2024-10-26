// Fetch and render company cards
// 
async function fetchCompanies(industry = '', minRating = '') {
    const response = await fetch(`http://localhost:3000/api/companies?industry=${industry}&minRating=${minRating}`);
    const companies = await response.json();
    renderCompanies(companies);
}

// Function to render companies to the HTML
function renderCompanies(companies) {
    const companyList = document.querySelector('.company-list');
    companyList.innerHTML = ''; // Clear existing content

    companies.forEach(company => {
        const companyCard = document.createElement('div');
        companyCard.classList.add('company-card');
        companyCard.innerHTML = `
            <h3>${company.name}</h3>
            <p><strong>Certification</strong>: <span class="${company.wg_certified ? 'certified' : 'not-certified'}">
                ${company.wg_certified ? 'Certified' : 'Not Certified'}</span></p>
            <p><strong>Industry</strong>: ${company.industry}</p>
            <p><strong>Description</strong>: ${company.description}</p>
            <p>User Rating: ⭐ (${company.rating})</p>
            <p>Reviews: ${company.reviews}</p>
            <button class="review-btn">Write a Review</button>
        `;
        companyList.appendChild(companyCard);
    });
}

// gettings all companies on load
fetchCompanies();

document.getElementById('filter-form').addEventListener('submit', event => {
    event.preventDefault();

    const industry = document.getElementById('industry').value;
    const minRating = document.getElementById('min-rating').value;

    fetchCompanies(industry, minRating);
});
