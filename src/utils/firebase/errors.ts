import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";

export const getMessageFromCode = (error: FirebaseError) => {
  if (error) {
    let msg: string;
    switch (error.code) {
      case AuthErrorCodes.EMAIL_EXISTS: {
        msg = "An account with this email already exists.";
        break;
      }
      case AuthErrorCodes.INVALID_PASSWORD: {
        msg = "Password does not match email.";
        break;
      }
      case AuthErrorCodes.USER_DELETED: {
        msg = "No user associated with this email.";
        break;
      }
      case AuthErrorCodes.WEAK_PASSWORD: {
        msg =
          "Your password is too weak. It must be at least six characters long.";
        break;
      }
      default: {
        msg = `Unknown error >> code = ${error.code}`;
        break;
      }
    }
    return msg;
  }
};
