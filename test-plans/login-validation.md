# C360 Login Validation Test Plan

## Application Overview

Validate the C360 UAT sign-in page at https://uat1.kb.mipc.css.cgipdc.cginet/coll/home, including credential entry, required-field feedback, invalid credentials, clearing fields, keyboard interaction, and the available SSO path. Scenarios assume a fresh unauthenticated browser session unless stated otherwise. Do not use production credentials; use approved UAT credentials for positive authentication tests and deliberately invalid values for negative tests.

## Test Scenarios

### 1. C360 sign-in and login validation

**Seed:** ``

#### 1.1. Submitting blank credentials displays validation feedback

**File:** `tests\login-validation\blank-credentials.spec.ts`

**Steps:**
  1. Open the C360 UAT home URL in a fresh unauthenticated browser session.
    - expect: The browser is redirected to the C360 sign-in page.
    - expect: The page shows User ID and Password fields, Sign In and Clear Login buttons, and the available uat-cacsx-sso option.
  2. Leave both credential fields empty and select Sign In.
    - expect: Authentication is not granted and the browser remains on the sign-in page.
    - expect: Both credential fields are visibly identified as invalid or otherwise receive clear validation feedback.
    - expect: The feedback is understandable and does not disclose account existence or sensitive authentication details.

#### 1.2. Submitting a user ID without a password is rejected

**File:** `tests\login-validation\user-id-only.spec.ts`

**Steps:**
  1. Open the sign-in page in a fresh unauthenticated browser session.
    - expect: Both credential fields are empty.
  2. Enter a deliberately invalid, non-sensitive test user ID and leave Password empty; select Sign In.
    - expect: Authentication is not granted.
    - expect: The page remains on sign-in and provides validation feedback without exposing internal errors or confirming whether the user ID exists.

#### 1.3. Submitting a password without a user ID is rejected

**File:** `tests\login-validation\password-only.spec.ts`

**Steps:**
  1. Open the sign-in page in a fresh unauthenticated browser session.
    - expect: Both credential fields are empty.
  2. Leave User ID empty, enter a deliberately invalid test-only password, and select Sign In.
    - expect: Authentication is not granted.
    - expect: The page remains on sign-in and provides validation feedback without exposing internal errors or confirming whether an account exists.

#### 1.4. Invalid credentials do not authenticate and show safe feedback

**File:** `tests\login-validation\invalid-credentials.spec.ts`

**Steps:**
  1. Open the sign-in page in a fresh unauthenticated browser session.
    - expect: The sign-in form is available.
  2. Enter a deliberately invalid, non-sensitive user ID and password; select Sign In.
    - expect: Authentication is not granted and the page remains on sign-in.
    - expect: A clear generic error is shown, such as Invalid username or password.
    - expect: The entered user ID is retained or cleared according to the product requirement; the password is not displayed in plain text after submission.
    - expect: The message does not reveal whether the user ID or password alone was incorrect.

#### 1.5. Clear Login resets entered credentials and validation feedback

**File:** `tests\login-validation\clear-login.spec.ts`

**Steps:**
  1. Open the sign-in page in a fresh unauthenticated browser session and enter a non-sensitive test user ID and test-only password.
    - expect: Both fields contain the test values, with the password masked.
  2. Select Sign In to trigger invalid-credential feedback, then select Clear Login.
    - expect: Both credential fields are empty.
    - expect: Validation/error feedback and invalid-field indicators are cleared.
    - expect: The page remains on the sign-in page and no authentication attempt is initiated by Clear Login.

#### 1.6. Valid UAT credentials sign in successfully

**File:** `tests\login-validation\positive-login.spec.ts`

**Steps:**
  1. In a fresh unauthenticated browser session, enter an approved, active UAT user ID and its valid password.
    - expect: The password is masked while being entered.
    - expect: No validation error is shown before submission.
  2. Select Sign In.
    - expect: Authentication succeeds and the user is redirected to the intended CACS Collection UI destination.
    - expect: The authenticated page loads without returning to the sign-in page or displaying an error.

#### 1.7. Login fields support keyboard use and mask password entry

**File:** `tests\login-validation\keyboard-and-password.spec.ts`

**Steps:**
  1. Open the sign-in page in a fresh unauthenticated browser session.
    - expect: User ID and Password controls have visible labels and can receive keyboard focus.
  2. Use Tab to move through the credential fields and buttons; enter a non-sensitive test user ID and a test-only password.
    - expect: Focus order is logical and visible.
    - expect: The password is masked and is not readable as plain text on screen.
  3. Press Enter while focused in the password field.
    - expect: The form submits once, matching activation of Sign In.
    - expect: Invalid test credentials are rejected with safe feedback; no duplicate authentication request occurs.

#### 1.8. SSO option starts the configured identity-provider flow

**File:** `tests\login-validation\sso-option.spec.ts`

**Steps:**
  1. Open the sign-in page in a fresh unauthenticated browser session.
    - expect: The uat-cacsx-sso option is visible and presented separately from username/password sign-in.
  2. Select uat-cacsx-sso.
    - expect: The browser navigates to the configured SSO identity-provider flow.
    - expect: No local username/password error is shown as a result of selecting SSO.
