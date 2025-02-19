const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("debería sumar correctamente los likes de todas las publicaciones", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 36, "La suma total de likes debe ser 36");
  });

  test("debería devolver 0 cuando la lista de publicaciones está vacía", () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 0, "El total debe ser 0");
  });

  test("debería devolver el número de likes cuando hay una sola publicación", () => {
    const blogs = [
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 10, "El total de likes debe ser 10");
  });

  test("debería manejar publicaciones con 0 likes", () => {
    const blogs = [
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 0,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(
      result,
      0,
      "La suma total de likes debe ser 0 cuando todos los likes son 0"
    );
  });
});

describe("favorite Blog", () => {
  test("debería devolver el blog con más likes", () => {
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });

  test("debería devolver null cuando la lista de publicaciones está vacía", () => {
    const blogs = [];
    const result = listHelper.favoriteBlog(blogs);
    assert.strictEqual(result, null, "Debe devolver null para una lista vacía");
  });

  test("debería devolver uno de los blogs con el número máximo de likes si hay empate", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 7,
        __v: 0,
      },
    ];
    const result = listHelper.favoriteBlog(blogs);
    // Como hay un empate, basta con que devuelva uno de los blogs
    assert.ok(result.likes === 7, "Debe devolver uno de los blogs con 7 likes");
  });
});

describe("most blogs", () => {
  test("debería devolver el autor con más blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
  });

  test("debería devolver null cuando la lista de publicaciones está vacía", () => {
    const blogs = [];
    const result = listHelper.mostBlogs(blogs);
    assert.strictEqual(result, null, "Debe devolver null para una lista vacía");
  });

  test("debería devolver uno de los autores con la mayor cantidad de blogs en caso de empate", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
      },
    ];
    const result = listHelper.mostBlogs(blogs);
    // Como hay un empate, la función debe devolver uno de los autores con el máximo número de blogs
    assert.ok(
      result.blogs === 2,
      "Debe devolver uno de los autores con 2 blogs"
    );
  });
});

describe("most likes", () => {
  test("debería devolver el autor con más likes", () => {
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 17 });
  });

  test("debería devolver null cuando la lista de publicaciones está vacía", () => {
    const blogs = [];
    const result = listHelper.mostLikes(blogs);
    assert.strictEqual(result, null, "Debe devolver null para una lista vacía");
  });

  test("debería devolver uno de los autores con la mayor cantidad de likes en caso de empate", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 7,
        __v: 0,
      },
    ];
    const result = listHelper.mostLikes(blogs);
    // Como hay un empate, la función debe devolver uno de los autores con el máximo número de likes
    assert.ok(
      result.likes === 7,
      "Debe devolver uno de los autores con 7 likes"
    );
  });
});
