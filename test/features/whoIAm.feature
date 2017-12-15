Feature: Who I Am
  As a user with Token,
  I want to know who I am so the application knows.

  Scenario: correct
    Given a correct user
    And I login
    And return token
    When I make the request the Who am I
    Then return data
  Scenario: incorrect
    Given an incorrect token
    When I make the request the Who am I
    Then return unauthorized