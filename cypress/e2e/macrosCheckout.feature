Feature: Macros Checkout and Membership Upgrade Flows
  
  @regression
  Scenario: Cancel Active subscription
    Given I open the application URL
    And I wait for 2 seconds
    And I enter demo password
    And I open the hamburger menu
    And I click the Sign In option
    And I log in with valid Macros credentials
    And I wait for 3 seconds
    And I cancel any active subscription gracefully
    And I wait for 1 seconds
    
  @regression
  @macros
  Scenario: No Active Plan -> Buy Plus Plan Monthly -> Buy Macros -> Upgrade to Pro Plan Monthly
    Given I open the application URL
    And I wait for 2 seconds
    And I enter demo password
    And I open the hamburger menu
    And I click the Sign In option
    And I log in with valid Macros credentials
    And I wait for 5 seconds
    When I navigate to the Macros page
    And I wait for 5 seconds
    And I click Buy Macros or Upgrade Plan button and handle flow accordingly
   # And I click on the Plus Plan Monthly Buy button
   # And I complete the checkout form
    And I navigate to the Macros page
    And I click Buy Macros or Upgrade Plan button and handle flow accordingly
    And I navigate to the Macros page
    And I click the Upgrade Plan button in the modal
    And I click on the Pro Plan Monthly Buy button with confirm modal
    And I wait for 2 seconds
    And I complete the checkout form
    And I logout
  
  
 @regression
  @macros
  Scenario: Pro Plan Monthly -> Buy Macros -> Upgrade to Plus Plan Annual
    Given I open the application URL
    And I wait for 5 seconds
    And I enter demo password
    And I open the hamburger menu
    And I click the Sign In option
    And I log in with valid Macros credentials
    And I wait for 5 seconds
    When I navigate to the Macros page
    And I click Buy Macros or Upgrade Plan button and handle flow accordingly
    And I wait for 2 seconds
    And I redirect to the Membership page
    And I click on the Plus Plan Annual Buy button with confirm modal
    And I wait for 2 seconds
    And I fill the event checkout form
    And I wait for 2 seconds
    And I logout
    Then I should be redirected to the thank-you page
  
  
 @regression
  @macros
  Scenario: Plus Plan Annual -> Buy Macros -> Upgrade to Pro Plan Annual
    Given I open the application URL
    And I wait for 2 seconds
    And I enter demo password
    And I open the hamburger menu
    And I click the Sign In option
    And I log in with valid Macros credentials
    And I wait for 5 seconds
    When I navigate to the Macros page
    And I click Buy Macros or Upgrade Plan button and handle flow accordingly
    And I wait for 2 seconds
    And I redirect to the Membership page
    And I click on the Pro Plan Annual Buy button with confirm modal
    And I wait for 2 seconds
    And I fill the event checkout form
    And I wait for 2 seconds
    And I logout
    Then I should be redirected to the thank-you page
