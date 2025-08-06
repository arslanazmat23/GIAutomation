Feature: Login and purchase different types of Membership Plans

  Background:
    Given I navigate to the application URL
    And I wait for 5 seconds
    And I enter the demo password
    And I click the Hamburger menu
    And I click on the Sign In option
    And I enter the email
    And I enter the password
    And I click the login button
    And I wait for 3 seconds
    And I cancel any active subscription gracefully

  Scenario: Purchase Plus Plan Monthly
    Given I click the Hamburger menu
    And I click on the Sign In option
    And I enter the email
    And I enter the password
    And I click the login button
    And I wait for 3 seconds
    And I navigate to the Membership page
    When I click on the Plus Plan Monthly buy button
    Then I complete the checkout form
    And I wait for 2 seconds
    And I logout
@skip
  Scenario: Purchase Pro Plan Monthly
    Given I click the Hamburger menu
    And I click on the Sign In option
    And I enter the email
    And I enter the password
    And I click the login button
    And I wait for 3 seconds
    And I navigate to the Membership page
    When I click on the Pro Plan Monthly buy button
    Then I complete the checkout form
    And I wait for 2 seconds
    And I logout
@skip
  Scenario: Purchase Plus Plan Annual
    Given I click the Hamburger menu
    And I click on the Sign In option
    And I enter the email
    And I enter the password
    And I click the login button
    And I wait for 3 seconds
    And I navigate to the Membership page
    When I click on the Plus Plan Annual buy button
    Then I complete the checkout form
    And I wait for 2 seconds
    And I logout
@skip
  Scenario: Purchase Pro Plan Annual
    Given I click the Hamburger menu
    And I click on the Sign In option
    And I enter the email
    And I enter the password
    And I click the login button
    And I wait for 3 seconds
    And I navigate to the Membership page
    When I click on the Pro Plan Annual buy button
    Then I complete the checkout form
    And I wait for 2 seconds
    And I logout
