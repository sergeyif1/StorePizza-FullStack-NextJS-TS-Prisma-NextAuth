export class UserAlreadyExistsError extends Error {
  constructor() {
    super("User already exists");
    this.name = "UserAlreadyExistsError";
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid email or password");
    this.name = "InvalidCredentialsError";
  }
}

export class UserNotVerifiedError extends Error {
  constructor() {
    super("User is not verified");
    this.name = "UserNotVerifiedError";
  }
}

export class OAuthAccountAlreadyLinkedError extends Error {
  constructor() {
    super("OAuth account already linked");
    this.name = "OAuthAccountAlreadyLinkedError";
  }
}
