
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const companyId = getQueryParam('id');

async function fetchCompanyDetails() {
    try {
        const response = await fetch(`http://localhost:3000/api/companies/${companyId}`);
        const company = await response.json();
        renderCompanyDetails(company);
    } catch (error) {
        console.error('Error fetching company details:', error);
    }
}

function renderCompanyDetails(company) {
    const companyDetailContainer = document.querySelector('.company-detail');
    companyDetailContainer.innerHTML = `
        <h2>${company.name}</h2>
        <p class="comp-certs"><strong>Equal Pay</strong>: <span class="${company.wg_certified ? 'certified' : 'not-certified'}">
            ${company.wg_certified ? 'Certified' : 'Not Certified'}</span></p>
        <p><strong>Industry</strong>: ${company.industry}</p>
        <p><strong>Description</strong>: ${company.description}</p>
        <p><strong>User Rating</strong>: ⭐ (${company.rating})</p>
        <h3>Company Ratings</h3>
        <ul>
            <li><strong>Inclusion:</strong> 5/ 5</li>
            <li><strong>Company Culture:</strong> 5 / 5</li>
            <li><strong>Work-Life Balance:</strong> 5 / 5</li>
        </ul>
        <h3>Anonymous Reviews</h3>
        <div class="reviews">
            <div class="review-card">
                <p>"Great company culture"</p>
                <span>- Anonymous</span>
            </div>
            <div class="review-card">
                <p>"Work-life balance is excellent, and the team is inclusive."</p>
                <span>- Anonymous</span>
            </div>
            <div class="review-card">
                <p>"I liked the food!"</p>
                <span>- Anonymous</span>
            </div>
        </div>
    `;
}

fetchCompanyDetails();
