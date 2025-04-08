const User = require("../models/user");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (posts) => {
  return posts.reduce((sum, post) => sum + post.likes, 0);
};

function favoriteBlog(posts) {
  if (posts.length === 0) {
    return null;
  }

  return posts.reduce((favorite, post) => {
    return post.likes > favorite.likes ? post : favorite;
  });
}

function mostBlogs(posts) {
  if (posts.length === 0) {
    return null;
  }

  const authorCount = posts.reduce((authorMap, post) => {
    authorMap[post.author] = (authorMap[post.author] || 0) + 1;
    return authorMap;
  }, {});

  const maxAuthor = Object.keys(authorCount).reduce((max, author) => {
    if (authorCount[author] > authorCount[max]) {
      return author;
    }
    return max;
  });

  return {
    author: maxAuthor,
    blogs: authorCount[maxAuthor],
  };
}

function mostLikes(posts) {
  if (posts.length === 0) {
    return null;
  }

  const authorLikes = posts.reduce((likesMap, post) => {
    likesMap[post.author] = (likesMap[post.author] || 0) + post.likes;
    return likesMap;
  }, {});

  const maxAuthor = Object.keys(authorLikes).reduce((max, author) => {
    if (authorLikes[author] > authorLikes[max]) {
      return author;
    }
    return max;
  });

  return {
    author: maxAuthor,
    likes: authorLikes[maxAuthor],
  };
}

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  usersInDb,
};
