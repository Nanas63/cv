const profileDiv = document.getElementById("profile");
const reposDiv = document.querySelector("#repos")



async function fetchGitHubProfile(name) {
    try {
        const response = await fetch(`https://api.github.com/users/${name}`);
        if (!response.ok) {
            throw new Error(`GitHub user not found: ${response.statusText}`);
        }
    
        const data = await response.json();

        // Construire le contenu HTML à partir des données du profil
        const profileHTML = `
            <h2>${data.name || data.login}</h2>
            <p>${data.bio || "No bio available."}</p>
            <p>Public Repositories: ${data.public_repos}</p>
            <a href="${data.html_url}" target="_blank" style="text-decoration: none; color: green;">View GitHub Profile</a>
        `;

        // Insérer le contenu dans la div
        profileDiv.innerHTML = profileHTML;
    } catch (error) {
        profileDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    } 
}

async function fetchGitHubRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            throw new Error(`GitHub repos not found: ${response.statusText}`);
        }
        const repos = await response.json();

        console.log(repos)

        // Construire le contenu HTML pour chaque dépôt
        const reposHTML = repos
            .map(repo => `
                <div style="margin-bottom: 15px; border: 1px solid #ddd; padding: 10px; border-radius: 5px;">
                    <h3 style="margin: 0;"><a href="${repo.html_url}" target="_blank" style="text-decoration: none; color: green;">${repo.name}</a></h3>
                    <p style="margin: 5px 0;">${repo.description || "No description available."}</p>
                    <p style="font-size: 12px; color: #555;">Last updated: ${new Date(repo.updated_at).toLocaleDateString()}</p>
                </div>
            `)
            .join("");

        // Insérer le contenu dans la div
        reposDiv.innerHTML = reposHTML;
    } catch (error) {
        reposDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}



fetchGitHubProfile("nanas63")
fetchGitHubRepos("nanas63")