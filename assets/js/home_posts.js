//Description: This file contains the code to handle the jax requests for posts

{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');    //selecting the form with id new-post-form using jquery and storing it in a variable

        //event listener/handler for the form submission
        newPostForm.submit(function(e){
            e.preventDefault();

            //sending a ajax post request to the server
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),  //converting the form data into a query string(json object) and sending it to the server
                success: function(data){      //if the request is successful, the data is logged in the console 
                    console.log(data);
                    let newPost = newPostDom(data.data.post);    //calling the method to create a post in DOM
                    $('#posts-list-container>ul').prepend(newPost);   //inserting the post at the beginning of the list in the DOM  
                    deletePost($(' .delete-post-button', newPost));     //calling the method to delete a post from DOM   
                },
                error: function(error){        //if there is an error, the error is logged in the console
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
            <p>
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                </small>
                ${post.content}
                <br>
                <small>
                    ${ post.user.name }
                </small>
            </p>
            <div class="post-comments">
                <form action="/comments/create" id="new-comment-form" method="POST">
                    <input type="text" name="content" id="content" placeholder="Add your comments" required>
                    <input type="hidden" name="post" value="${post._id}"> <!-- Hidden input to send the post id -->
                    <input type="submit" value="Add Comment">
                </form>
                <div class="post-comments-list">
                    <ul id="post-comments-<${post._id}">
                       
                    </ul>
                </div>
            </div>
        </li>`);
    }

    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            //sending a ajax get request to the server
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),    //getting the value of href attribute of the delete link
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();      //removing the post from the DOM
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    createPost();
}