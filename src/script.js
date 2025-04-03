document.addEventListener('DOMContentLoaded', function() {

// DOM ELEMENTS
  let postsListEl = document.getElementById('postsList');

  let postForm = document.getElementById('postForm');
  
  let titleInput = document.getElementById('postTitle');
  let contentInput = document.getElementById('postContent');

  let postTitleDisplay = document.getElementById('postTitleDisplay');
  let postContentDisplay = document.getElementById('postContentDisplay');

  let createPostBtn = document.getElementById('createPostBtn');
  let viewBtn = document.getElementById('viewBtn');
  let editBtn = document.getElementById('editBtn');
  let deleteBtn = document.getElementById('deleteBtn');

  let posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');

// INDEX.HTML
  if (postsListEl) {
    for (let i = 0; i < posts.length; i++) {
      let post = posts[i];
      let li = document.createElement('li');
      li.innerHTML = 
                    '<a href="post.html?id=' + i + '">' +
                    '<h1>' + post.title + '</h1>' +
                    '<p>' + post.content.substring(0, 50) + '...</p>' +
                    '</a>';
      postsListEl.appendChild(li);
    }

    if (createPostBtn) {
      createPostBtn.onclick = function() {
        window.location.href = 'new-post.html';
      };
    }
  }

// NEW-POST.HTML
  if (postForm) {
    let pageUrl = window.location.href;
    let postId = pageUrl.includes('id=') ? Number(pageUrl.split('id=')[1]) : null;


    if (postId !== null && posts[postId]) {
      titleInput.value = posts[postId].title;
      contentInput.value = posts[postId].content;
    }

    postForm.onsubmit = function(event) {
      event.preventDefault();
      
      if (postId !== null) {
        posts[postId] = {
          title: titleInput.value,
          content: contentInput.value
        };
      } else {
        posts.push({
          title: titleInput.value,
          content: contentInput.value
        });
      }
      
      localStorage.setItem('blogPosts', JSON.stringify(posts));
      window.location.href = postId !== null ? 
      'post.html?id=' + postId : 
      'post.html?id=' + (posts.length - 1);
    };    

    if (viewBtn) {
      viewBtn.onclick = function() {
        window.location.href = 'index.html';
      };
    }
  }

// POST.HTML
  if (postTitleDisplay && postContentDisplay) {
    let postId = Number(window.location.href.split('id=')[1]);

    if (posts[postId]) {
      postTitleDisplay.textContent = posts[postId].title;
      postContentDisplay.textContent = posts[postId].content;
    }

    if (editBtn) {
      editBtn.onclick = function() {
        window.location.href = 'new-post.html?id=' + postId;
      };
    }

    if (deleteBtn) {
      deleteBtn.onclick = function() {
        if (confirm('Delete this post?')) {
          posts.splice(postId, 1);
          localStorage.setItem('blogPosts', JSON.stringify(posts));
          window.location.href = 'index.html';
        }
      };
    }

    if (createPostBtn) {
      createPostBtn.onclick = function() {
        window.location.href = 'new-post.html';
      };
    }
  }
});