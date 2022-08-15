const APIURL = 'https://api.github.com/users/'

const form = document.querySelector('.form');
const search = document.querySelector('#search');
const main = document.querySelector('.main');


async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    console.log(respData);

    createUserProfile(respData);

    getRepos(username)


}
getUser('sammy-multiply');

async function getRepos(username) {
    const resp = await fetch(APIURL + username + '/repos')
    const respData = await resp.json();

    addReposToCard(respData);

}


function createUserProfile(user) {
    const CardHTML = `
    <div class="card">
    <div>
    <img class="image" src="${user.avatar_url}" alt="${user.name}" />
    </div>
    
    <div class="user_info">
    <h2>${user.name}</h2>
    <p>${user.bio}</p>
    
    <ul class="info">
   <li>${user.followers}<strong>Followers</strong></li> 
   <li>${user.following}<strong>Following</strong></li> 
   <li>${user.public_repos}<strong>Repos</strong></li> 
    </ul>
    
    
    
    <h4>Repos:</h4>
    <div class="repos"></div>
    </div>
    </div>
    
    `;

    main.innerHTML = CardHTML;
}


function addReposToCard(repos) {
    const reposEl = document.querySelector('.repos');

    repos.sort((a, b) => b.starred_url - a.starred_url).slice(0, 10).forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');

        repoEl.href = repo.html_url;
        repoEl.target = '_blank';
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);

    })
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = '';
    }

})