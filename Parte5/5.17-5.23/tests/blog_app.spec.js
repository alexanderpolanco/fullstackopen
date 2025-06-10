const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.delete("http://localhost:5173/api/users/testing/reset");
    await request.delete("http://localhost:5173/api/blogs/testing/reset");
    await request.post("http://localhost:5173/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });
  });

  test("Login form is shown", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const locator = await page.getByText("log in to application");
    await expect(locator).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.goto("http://localhost:5173");

      await page.getByTestId("username").fill("mluukkai");
      await page.getByTestId("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();

      const locator = await page.getByText("logged in");
      await expect(locator).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.goto("http://localhost:5173");

      await page.getByTestId("username").fill("mluukkai");
      await page.getByTestId("password").fill("1234");
      await page.getByRole("button", { name: "login" }).click();

      const locator = await page.getByText("wrong username or password");
      await expect(locator).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page, request }) => {
      await page.goto("http://localhost:5173");

      await page.getByTestId("username").fill("mluukkai");
      await page.getByTestId("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();

      const locatorLoggedIn = await page.getByText("logged in");
      await expect(locatorLoggedIn).toBeVisible();

      await page.getByRole("button", { name: "create new blog" }).click();

      await page.getByTestId("title").fill("New Post 1");
      await page.getByTestId("author").fill("New Author 1");
      await page.getByTestId("url").fill("https://www.google.com/");
      await page.getByRole("button", { name: "create" }).click();

      const locatorNewAuthor = await page.getByText(
        "a new blog New Post 1 New Author 1"
      );
      await expect(locatorNewAuthor).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "create new blog" }).click();

      await page.getByTestId("title").fill("New Post 2");
      await page.getByTestId("author").fill("New Author 2");
      await page.getByTestId("url").fill("https://www.google.com/");
      await page.getByRole("button", { name: "create" }).click();

      const locator = await page.getByText(
        "a new blog New Post 2 New Author 2"
      );
      await expect(locator).toBeVisible();
    });

    test("a new blog can be edited", async ({ page }) => {
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();

      const locator = await page.getByText("likes 1");
      await expect(locator).toBeVisible();
    });

    test("a new blog can be deleted", async ({ page }) => {
      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "remove" }).click();

      const locator = await page.getByText("likes 0");
      await expect(locator).not.toBeVisible();
    });

    test("Only the created user can see the delete button", async ({
      page,
      request,
    }) => {
      await page.getByRole("button", { name: "view" }).click();
      const locator = page.getByRole("button", { name: "remove" });
      await expect(locator).toBeVisible();
      await page.getByRole("button", { name: "logout" }).click();

      await request.post("http://localhost:5173/api/users", {
        data: {
          name: "test",
          username: "test",
          password: "test",
        },
      });

      await page.getByTestId("username").fill("test");
      await page.getByTestId("password").fill("test");
      await page.getByRole("button", { name: "login" }).click();

      await page.getByRole("button", { name: "view" }).click();

      const locator2 = page.getByRole("button", { name: "remove" });
      await expect(locator2).not.toBeVisible();
    });

    test("blogs are ordered by likes", async ({ page }) => {
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();

      await page.getByRole("button", { name: "create new blog" }).click();

      await page.getByTestId("title").fill("New Post 2");
      await page.getByTestId("author").fill("New Author 2");
      await page.getByTestId("url").fill("https://www.google.com/");
      await page.getByRole("button", { name: "create" }).click();

      const postDetailDivs = page.locator('[data-testid="post"]');

      await expect(postDetailDivs).toHaveCount(2, { timeout: 10000 });
      const count = await postDetailDivs.count();

      const actualLikesOrder = [];
      for (let i = 0; i < count; i++) {
        const currentPostDetailsDiv = postDetailDivs.nth(i);
        const blogContainer = currentPostDetailsDiv.locator("..");

        const viewButton = blogContainer.getByRole("button", { name: "view" });
        if (!(await currentPostDetailsDiv.isVisible())) {
          await viewButton.click();
        }

        await expect(currentPostDetailsDiv).toBeVisible();
        const likesTextElement = currentPostDetailsDiv.locator(
          'div:has-text("likes ")'
        );
        const likesText = await likesTextElement.textContent();
        const likesMatch = likesText.match(/likes (\d+)/);

        if (likesMatch && likesMatch[1]) {
          actualLikesOrder.push(parseInt(likesMatch[1], 10));
        } else {
          const blogHtmlForError = await currentPostDetailsDiv.innerHTML();
          throw new Error(
            `Could not parse likes for blog at index ${i}. Likes text: "${likesText}". HTML: ${blogHtmlForError}`
          );
        }
      }

      const expectedLikesOrder = [1, 0];
      expect(actualLikesOrder).toEqual(expectedLikesOrder);
    });
  });
});
