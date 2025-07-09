import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import AdminLoginPage from "../../support/PageObjectModel/AdminLoginPage";  // Ensure correct path

Given("I open the Login page", () => {
    AdminLoginPage.visit();
});

When("I enter admin {string} and {string}", (email: string, password: string) => {
    AdminLoginPage.enterDemoPassword();  // Enter demo password for admin login
    AdminLoginPage.enterEmail(email);
    AdminLoginPage.enterPassword(password);
});

When("I click the admin login button", () => {
    AdminLoginPage.clickLoginButton();
});

Then("I should be redirect to the dashboard", () => {
    //check if the dashboard is displayed after login
    AdminLoginPage.verifyAdminDashboard();
});
