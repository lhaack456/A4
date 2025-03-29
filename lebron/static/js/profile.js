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

            let bElm = document.createElement('b');
            bElm.textContent = post.likes.length + " Likes ";
		
            bElm.addEventListener('click', () => {
                let content = document.getElementById('modal-body');
                content.replaceChildren();
                post.likes.forEach( (user) => {
                    let uElm = document.createElement('p').textContent = user.profile.username;
                    content.append(uElm);
                    content.append(document.createElement('br'));
                });

                const myModal = new bootstrap.Modal(document.getElementById('myModal'));
                myModal.show();
            });

            pElm.append(document.createElement('br'));
            pElm.append(bElm);
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
