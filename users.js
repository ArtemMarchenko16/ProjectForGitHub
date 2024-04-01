fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(users => {
        const container = document.createElement("div");
        container.classList.add("container");
        for (const user of users) {
            let div = document.createElement("div");
            div.classList.add("block", "user-container");

            let userInfo = document.createElement("div");
            userInfo.classList.add("user-infoTitle");
            userInfo.innerHTML = `
                <p class="user-id">ID: ${user.id}</p>
                <p class="user-name">Name: ${user.name}</p>
            `;

            let btn = document.createElement("button");
            btn.classList.add("button");
            btn.innerText = "Details";
            btn.addEventListener("click", function () {
                window.location.href = "user-details.html?id=" + user.id;
            });

            div.appendChild(userInfo);
            div.appendChild(btn);
            container.appendChild(div);
        }
        document.body.appendChild(container);
    });
