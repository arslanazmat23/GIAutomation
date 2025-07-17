Feature: User Signup Flow
  In order to access the GetInsights
  As a new visitor
  I want to complete the signup process from landing page through membership plans

  Background:
    Given the user is on the home page
    And I enter the demo password

  Scenario: Complete signup from landing page to membership plans
    # Screen 1: Landing Page
    When the user clicks "Sign Up" on the hero banner
    And the Get Started Page should be displayed

    # Screen 2: Get Started Page
    When the user enters a valid email "<email>"
    Then the "LET'S DO THIS" button is enabled
    And the user clicks "Let’s Do This"
    Then the first name and last name fields are visible
    And the NEXT button on the name page is disabled

    # Screen 3: Name Input
    When the user enters first name "<firstName>" and last name "<lastName>"
    Then the "NEXT" button is enabled
    When the user clicks "NEXT"
    Then the cell number field is visible
    And the NEXT button on the cell page is disabled

    # Screen 4: Phone Number Input
    When the user enters a valid cell number "<cellNumber>"
    Then the "NEXT" button is enabled
    When the user clicks "NEXT"
    Then the role selection radio buttons are visible
    And the NEXT button on the role page is disabled

    # Screen 5: Role Selection
    When the user selects role "<role>"
    Then the "NEXT" button on role selection Page is enabled
    When the user clicks "NEXT" on role Page
    Then the password and confirm-password fields are visible
    And the "Get Started" button is disabled

    # Screen 6: Password & Agreements
    When the user enters password "<password>" and confirms it
    And the user checks the "Terms and Conditions" checkbox
    And the user checks the "Code of Ethics" checkbox
    And the user clicks "Get Started"
    Then the email verification prompt "emailVerificationPrompt" should be displayed

    # Screen 7: Email Verification Prompt
    When the user clicks "Continue"
    Then the Membership Plans page should be displayed

    # Email Verification Step
    When the user retrieves and visits their verification link for "<email>"
    Then the email verification page should be displayed
    When the user clicks "Proceed" on the verification page
    Then the My Account page should be displayed

    Examples:
      | email                              | firstName | lastName | cellNumber | role       | password         |
      | slave-spend@wrijtpjg.mailosaur.net | Hafiz     | Arslan   | 0123456789 | Contractor | Your@Password123 |
