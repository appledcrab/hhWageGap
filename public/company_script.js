// Fetch and render company cards
// 
async function fetchCompanies(industry = '', minRating = '') {
    const response = await fetch(`http://localhost:3000/api/companies?industry=${industry}&minRating=${minRating}`);
    const companies = await response.json();
    renderCompanies(companies);
}



function renderCompanies(companies) {
    const companyList = document.querySelector('.company-list');
    companyList.innerHTML = ''; 

    companies.forEach(company => {
        const companyCard = document.createElement('div');
        companyCard.classList.add('company-card');
        companyCard.innerHTML = `
            <h3>${company.name}</h3>
            <p class="comp-certs"><strong>Equal Pay</strong>: <span class="${company.wg_certified ? 'certified' : 'not-certified'}">
                ${company.wg_certified ? 'Certified' : 'Not Certified'}</span></p>
            <p><strong>Industry</strong>: ${company.industry}</p>
            <p><strong>Description</strong>: ${company.description}</p>
            <p>User Rating: ⭐ (${company.rating})</p>
            <p>Reviews: ${company.reviews}</p>
            <button class="review-btn">Write a Review</button>
        `;

        companyCard.addEventListener('click', () => {
            console.log("Clicked on companyCard")
            window.location.href = `./company_detail.html?id=${company._id}`;
        });

        companyList.appendChild(companyCard);
    });
}


// gettings all companies on load
fetchCompanies();


// filters oncec button is clicked / form is "submitted" 
document.getElementById('filter-form').addEventListener('submit', event => {
    event.preventDefault();

    const industry = document.getElementById('industry').value;
    const minRating = document.getElementById('min-rating').value;

    fetchCompanies(industry, minRating);
});
