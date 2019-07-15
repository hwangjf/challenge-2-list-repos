document.addEventListener("DOMContentLoaded", function() {
  console.log('document ready');
  const githubUsernameInput = document.querySelector('#github-username-input')
  const githubUsernameSearchForm = document.querySelector('#github-username-search-form')

  const githubRequest = (username) => {  
    return fetch(`https://api.github.com/users/${username}/repos`)
      .then(res => res.json())
      .then(data => {
        document.querySelector('.container h1').innerText = username
        console.log(data)

        const githubUrl = document.querySelector('#github-url')
        githubUrl.innerText = username
        githubUrl.setAttribute('href', `https://github.com/${username}`)

        const repoList = document.querySelector('.repo-list')

        data.forEach(repo => {
          const repoRow = document.createElement('DIV')
          repoRow.classList.add('repo', 'row')
          repoRow.innerHTML = ''
          
          repoRow.innerHTML = `
            <h3>
              <a href=${repo.html_url}>
                ${repo.name}
              </a>
            </h3>
            <p><strong>Description:</strong>
              <span>${repo.description}</span>
            </p>
            <p><strong>Owner:</strong>
              <span>${repo.owner.login}</span>
            </p>
            <div class="stats">
              <div class="col-sm-1 stars">
              <svg class="icon" aria-hidden="true" height="16" version="1.1" viewBox="0 0 14 16" width="14">
                <use xlink:href="./svg/sprites.svg#star"></use>
              </svg>
                <span>${repo.stargazers_count}</span>
              </div>
              <div class="col-sm-1 forks">
                <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 10 16" width="10">
                  <use xlink:href="./svg/sprites.svg#fork"></use>
                </svg>
                <span>${repo.forks_count}</span>
              </div>
            </div>
          `

          repoList.appendChild(repoRow)
        })
      })
  }

  githubUsernameSearchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const githubUsername = githubUsernameInput.value
    console.log(githubUsername)

    githubRequest(githubUsername)

    githubUsernameInput.value = ""
  })



});
