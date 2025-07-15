Feature: Event Checkout Flow

  Scenario: Event Checkout with One Attendee (In Person) and unchecked Checkbox
    Given I visit the login page
    And I enter the demo password in Event Checkout
    And I open the hamburger menu
    And I select the sign-in option
    And I log in with valid credentials
    When I navigate to the Events section from the hamburger menu
    And I click the "Register Now" button
    And I add 1 attendee
    And I fill attendee 1 details with "In Person" as the attendance type
    And I click "Proceed to Checkout"
    And I fill out the checkout form with the address checkbox unchecked
    Then I should see the receipt page after successful checkout

  Scenario: Event Checkout with Two Attendees (In Person and Virtual) and checkbox checked
    Given I visit the login page
    And I enter the demo password in Event Checkout
    And I open the hamburger menu
    And I select the sign-in option
    And I log in with valid credentials
    When I navigate to the Events section from the hamburger menu
    And I click the "Register Now" button
    And I add 2 attendees
    And I fill attendee 1 details with "In Person" as the attendance type
    And I fill attendee 2 details with "Virtual" as the attendance type.
    And I click "Proceed to Checkout"
    And I fill out the checkout form with the address checkbox checked
    Then I should see the receipt page after successful checkout
