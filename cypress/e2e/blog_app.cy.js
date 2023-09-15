describe("Blog", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000/");
  });

  it("front page can be opened", function () {
    cy.visit("http://localhost:3000/");
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
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
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
  });
});
