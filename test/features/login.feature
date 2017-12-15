Feature: Login
  As a User,
  I want login so that enter the application.

  Scenario: correct
    Given a correct user
    When I login
    Then return token
  Scenario: incorrect
    Given an incorrect user
    When I login
    Then return error