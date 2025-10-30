window.onload = function() {
    //fetching post information from the endpoint(URI)
    //fetch('https://api.jsonsilo.com/public/b23bbb11-8727-4d4a-b11a-09d79b0b6cf7')
    //fetching post information from integrated JSON file
    fetch('res/json/post.json')
            .then((response) => response.json())
            .then(json => {
            for(const individualjson of json){ 
                // create div containers for post and post header
                const div_post = document.createElement("div"); 
                const div_header = document.createElement("div");

                const author = document.createElement("p"); 
                const text = document.createElement("p"); 
 
                const dateP = document.createElement("p");
                const dateObj = new Date(individualjson.Date); // read date as Date object from JSON
                const options = { year: 'numeric', month: 'short', day: 'numeric' }; // date format 'YYYY-MM-DD' to readable style
                const formattedDate = dateObj.toLocaleDateString('en-US', options); // dreate formatted date as text
                dateP.textContent = formattedDate;

                author.textContent = individualjson.Author; 
                text.textContent = individualjson.Body;

                // use same profile picture for every user
                const logoLink = document.createElement("a");
                logoLink.classList.add("logo");
                logoLink.href = "#";
                const logoImg = document.createElement("img");
                logoImg.src = "res/images/icon.png"; 
                logoImg.alt = "User logo";
                logoImg.width = 50;
                logoImg.height = 50;
                logoLink.appendChild(logoImg);
                div_header.appendChild(logoLink);

                // add username and date to post header and header to post
                div_header.appendChild(author); 
                div_header.appendChild(dateP);
                div_post.appendChild(div_header);

                // if the post has an image, add it to the post
                if (individualjson.Image) {
                    const image = document.createElement("img");
                    image.src= individualjson.Image;
                    image.classList.add("post-img");
                    div_post.appendChild(image);
                }
                div_post.appendChild(text);

                // add like button to the post
                const likeIcon = document.createElement("i");
                likeIcon.classList.add("material-symbols-outlined");
                likeIcon.textContent = "thumb_up";
                likeIcon.style.cursor = "pointer";

                // make like button interactive with like counter
                const likeCount = document.createElement("span");
                likeCount.textContent = "0"; // begin with 0
                likeCount.style.marginLeft = "4px";
                likeIcon.addEventListener("click", () => {
                    let count = parseInt(likeCount.textContent);
                    count++;
                    likeCount.textContent = count;
                    likeIcon.style.color = "rgb(55, 96, 157)";
                });

                div_post.appendChild(likeIcon);
                div_post.appendChild(likeCount);
            
                div_post.classList.add('post-card')
                div_header.classList.add('post-details')
                // add post to center wrapper for correct alignment
                document.querySelector(".center-wrapper").appendChild(div_post);
            }
            console.log(json);
        })
        .catch(err => {
            let errDiv = document.createElement("div");
            errDiv.className = 'post';
            errDiv.innerText = err;
            document.body.appendChild(errDiv);
        })
                                                                             
}