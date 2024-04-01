const userId = new URL(location.href).searchParams.get("id");

fetch("https://jsonplaceholder.typicode.com/users/" + userId)
    .then(res => res.json())
    .then(user => {
        let div = document.createElement("div");
        div.classList.add("user-info-container");

        let userInfoDiv = document.createElement("div");
        userInfoDiv.id = "user-info";
        userInfoDiv.classList.add("user-info");
        div.appendChild(userInfoDiv);

        let showPostsBtn = document.createElement("button");
        showPostsBtn.innerText = "Posts of Current User";
        showPostsBtn.classList.add("button");
        div.appendChild(showPostsBtn);

        document.body.appendChild(div);

        showPostsBtn.addEventListener("click", async function () {
            const posts = await fetchUserPosts(userId);
            const userPostsContainer = document.createElement("div");
            userPostsContainer.id = "user-posts-container";
            userPostsContainer.classList.add("user-posts-container");

            posts.forEach(post => {
                let postDiv = document.createElement("div");
                postDiv.classList.add("user-post");

                let titleHeader = document.createElement("h3");
                titleHeader.innerText = "Title:";
                postDiv.appendChild(titleHeader);

                let titleParagraph = document.createElement("p");
                titleParagraph.innerText = post.title;
                postDiv.appendChild(titleParagraph);

                let seeFullPostBtn = document.createElement("button");
                seeFullPostBtn.innerText = "See Full Post";
                postDiv.appendChild(seeFullPostBtn);

                seeFullPostBtn.addEventListener("click", function () {
                    window.location.href = "post-Details.html?id=" + post.id;
                });

                userPostsContainer.appendChild(postDiv);
            });

            document.body.appendChild(userPostsContainer);
        });

        let userInfo = `
            <h2>Info about User:</h2>
            <h4>ID: ${user.id}</h4>
            <p>Name: ${user.name}</p>
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <h3>Address:</h3>
            <p>Street: ${user.address.street}</p>
            <p>Suite: ${user.address.suite}</p>
            <p>City: ${user.address.city}</p>
            <p>Zipcode: ${user.address.zipcode}</p>
            <h3>Geo:</h3>
            <p>Lat: ${user.address.geo.lat}</p>
            <p>Lng: ${user.address.geo.lng}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
            <h4>Company:</h4>
            <p>Name: ${user.company.name}</p>
            <p>CatchPhrase: ${user.company.catchPhrase}</p>
            <p>bs: ${user.company.bs}</p>
        `;
        userInfoDiv.innerHTML = userInfo;
    });

async function fetchUserPosts(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    const userPosts = await response.json();
    return userPosts;
}
