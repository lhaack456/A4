function reloadPosts(profile) {
    fetch(`/api/post?profile_id=${profile}`, {
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
            pElm.textContent = post.content;
            postsElm.append(pElm);
        } );
    })
    .catch(error => showError(error));
}

function showError(error) {
    console.log(error);
}

function load() {
    let profile = document.getElementById('profile_id').textContent;

    reloadPosts(profile);
}

window.onload = load;
