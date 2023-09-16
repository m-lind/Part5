import "../support/commands";

describe("Blog", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.visit("");
    cy.contains("Log in");
  });

  it("user can login", function () {
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#login-button").click();

    cy.contains("Matti Luukkainen logged in");
  });

  it("login fails with wrong password", function () {
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error").contains("wrong username or password");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("a new blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title-input").type("Test title");
      cy.get("#author-input").type("Test author");
      cy.get("#url-input").type("Test url");
      cy.get("#create-button").click();
      cy.contains("Test title");
      cy.contains("Test author");
    });

    describe("when a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Third most liked test",
          author: "Third Liked Author",
          url: "www.firsttest.fi",
          likes: 500,
        });
        cy.createBlog({
          title: "Second most liked test",
          author: "Second Liked Author",
          url: "www.secondtest.fi",
          likes: 800,
        });
        cy.createBlog({
          title: "Most liked test",
          author: "Most Liked Author",
          url: "www.mostlikedtest.fi",
          likes: 1000,
        });
      });

      it("it can be liked", function () {
        cy.contains("Second most liked test").contains("view").click();
        cy.contains("Second most liked test").parent().as("theParent");
        cy.get("@theParent").find("#like-button").click();
        cy.get("@theParent").contains("likes 801");
      });

      it("the blog can be removed", function () {
        cy.contains("Third most liked test").contains("view").click();
        cy.contains("Third most liked test")
          .parent()
          .find("#remove-button")
          .click();
        cy.get("Third most liked test").should("not.exist");
      });

      it("the original creator can see the remove button but another user cannot", function () {
        cy.contains("Most liked test").contains("view").click();
        cy.contains("Most liked test").parent().find("#remove-button");
        cy.get("#logout-button").click();
        const user = {
          name: "Tester Testing",
          username: "ttesting",
          password: "salainen",
        };
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
        cy.login({ username: "ttesting", password: "salainen" });
        cy.contains("Most liked test").contains("view").click();
        cy.contains("Most liked test")
          .parent()
          .find("#remove-button")
          .should("not.exist");
      });

      it("the blogs are sorted with blog most liked on top", function () {
        cy.get(".blog").eq(0).should("contain", "Most liked test");
        cy.get(".blog").eq(1).should("contain", "Second most liked test");
        cy.get(".blog").eq(2).should("contain", "Third most liked test");
      });
    });
  });
});
