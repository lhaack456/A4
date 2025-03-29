function profileLink(profile) {
    let a = document.createElement('a');
    a.href = `/profile/${profile.id}/`;
    a.textContent = profile.username;
    return a;
}

function likeButton(lElm, post) {
    
    let isLiked = false;
    // get all likes for current post
    let allLikes = post.likes;
    let userid = document.getElementById('sessionUser').value;
    
    allLikes.forEach( (profile) => {
        if (profile.profile.id == userid) {
            isLiked = true;
            return;
        }
    });

    if (!isLiked) {
        // Add Like Button
        lElm.textContent = "Like";
        
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
        });
    }

    else {
        // Add Unlike Button
        lElm.textContent = "Unlike";
        
        lElm.addEventListener('click', (evt) => {
            evt.preventDefault();
            
            fetch(`/api/unlike/${post.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => reloadPosts())
            .catch(error => showError(error));
        });
    }


};

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

            let bElm = document.createElement('b');
            bElm.textContent = post.likes.length + " Likes ";
<<<<<<< Updated upstream
            // TODO Modify the event listener to affect modal
			})

            bElm.addEventListener('click', () => {
                fetch(`/api/post?post_id=${post.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                })
                .then(response => response.json())
                .then(data => {
						const myModal = document.getElementById('myModal');
						const myInput = document.getElementById('myInput');

						const bootstrapModal = new bootstrap.Modal(myModal);

						myModal.addEventListener('shown.bs.modal', () => {
							myInput.focus();
						});
						bootstrapModal.show();
                })
                .catch(error => showError(error));
=======
		
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
>>>>>>> Stashed changes
            });

            let lElm = document.createElement('button');
            likeButton(lElm, post);

            pElm.append(document.createElement('br'));
            pElm.append(bElm);
            pElm.append(lElm);
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
