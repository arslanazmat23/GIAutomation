Feature: Login

  Scenario Outline: Login with valid Customer credentials
    Given I open the login page
    When I enter customer valid credentials
    And I click the login button
    Then I should be redirected to the HomePage
    
  Scenario Outline: Login with valid admin credentials
    Given I open the Login page
    When I enter admin valid credentials
    When I click the admin login button
    Then I should be redirected to the Admin Dashboard

    
   
      
