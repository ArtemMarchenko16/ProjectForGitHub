let postID = new URL(location.href).searchParams.get('id');
console.log(postID);

let baseURL = `https://jsonplaceholder.typicode.com/posts/${postID}`;
fetch(baseURL)
    .then(value => value.json())
    .then(post => {
        let BLOCK = document.createElement("div");
        BLOCK.classList.add("BLOCK");
        document.body.appendChild(BLOCK);
        let block = document.createElement('div');
        block.classList.add('post-info');
        document.body.appendChild(block);
        let h2 = document.createElement('h2')
        h2.innerText = `Post ID: ${post.id}`;
        block.appendChild(h2);
        let p = document.createElement("h2");
        p.innerText = `Title: ${post.title}`;
        block.appendChild(p);

        let commentsURL = `https://jsonplaceholder.typicode.com/posts/${postID}/comments`;
        fetch(commentsURL)
            .then(res => res.json())
            .then(comments => {
                let main = document.createElement('div');
                main.classList.add('comments');
                document.body.appendChild(main);
                for (const comment of comments) {

                    let commentBlock = document.createElement('div');
                    commentBlock.classList.add('comment');
                    main.appendChild(commentBlock);

                    let divForComments = document.createElement('div');

                    divForComments.innerHTML = `
                        <h4>ID: ${comment.id},</h4> 
                        <h4>NAME: ${comment.name},</h4>
                        <h4>EMAIL: ${comment.email},</h4>
                        <h4>BODY: ${comment.body}.</h4>`

                    commentBlock.append(divForComments);
                }
            })

    });
