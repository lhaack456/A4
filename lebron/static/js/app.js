function profileLink(profile) {
    let a = document.createElement('a');
    a.href = `/profile/${profile.id}/`;
    a.textContent = profile.username;
    return a;
}

function likeButton(lElm) {
    
    lElm.addEventListener('click', (evt) => {
        evt.preventDefault();
        
        fetch(`/api/like/${post.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => reloadPosts())
        .catch(error => showError(error));
    })
}

function reloadPosts() {
    fetch('/api/post', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(posts => {
        let postsElm = document.getElementById('posts');
        postsElm.replaceChildren();

        posts.forEach( (post) => {
            let pElm = document.createElement('p');
            pElm.textContent = post.content + " by ";
            pElm.append(profileLink(post.profile));

            let lElm = document.createElement('a');
            lElm.textContent = " Like/Unlike";

            let brElm = document.createElement('br');
            let bElm = document.createElement('b');
            bElm.textContent = post.likes.length + " Likes";
            pElm.append(lElm);
            pElm.append(brElm);
            pElm.append(bElm);
            postsElm.append(pElm);
        });
    })
    .catch(error => showError(error));
}

function showError(error) {
    console.log(error);
}

function load() {
    document
        .getElementById('post-btn')
        .addEventListener('click', (evt) => {
            evt.preventDefault();

            let content = document.getElementById('content').value;        

            fetch('/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: content })
            })
            .then(response => response.json())
            .then(data => reloadPosts())
            .catch(error => showError(error));
        });

    // Get the current posts.
    reloadPosts();
}

window.onload = load;
