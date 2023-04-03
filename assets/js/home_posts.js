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

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    //adding noty notification for sucessful post creation using ajax
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
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
                <form action="/comments/create" id="post-${ post._id }-comments-form" method="POST">
                    <input type="text" name="content" id="content" placeholder="Add your comments" required>
                    <input type="hidden" name="post" value="${post._id}"> <!-- Hidden input to send the post id -->
                    <input type="submit" value="Add Comment">
                </form>
                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                       
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
                    //adding noty notification for sucessful post deletion using ajax
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1];
            new PostComments(postId);
        });
    }

    createPost();
    convertPostsToAjax();
}