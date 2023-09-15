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
          title: "First test",
          author: "First Author",
          url: "www.firsttest.fi",
        });
        cy.createBlog({
          title: "Second test",
          author: "Second Author",
          url: "www.secondtest.fi",
        });
        cy.createBlog({
          title: "Third test",
          author: "Third Author",
          url: "www.thirdtest.fi",
        });
      });

      it("it can be liked", function () {
        cy.contains("Second test").contains("view").click();
        cy.contains("Second test").parent().as("theParent");
        cy.get("@theParent").find("#like-button").click();
        cy.get("@theParent").contains("likes 1");
      });
    });
  });
});
