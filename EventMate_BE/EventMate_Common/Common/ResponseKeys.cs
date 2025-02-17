using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventMate_Common.Common
{
    public static class ResponseKeys
    {
        public const string EmailAlreadyExist = "email-already-exist";

        public const string InvalidRequest = "invalid-request";
        public const string AccountCreated = "account-created";
        public const string InvalidCredentials = "invalid-credentials";
        public const string AccountDisabled = "account-disabled";
        public const string LoginSuccess = "login-success";
        public const string NotFound = "not-found";
        public const string ErrorSystem = "error-system";
        //OTP
        public const string OtpInvalid = "otp-invalid";
        public const string OtpExpired = "otp-expired";
        public const string OtpSentSuccessfully = "otp-sent-successfully";

        //Auth
        public const string EmailNotFound = "email-not-found";
        public const string EmailSent = "email-sent";
        public const string ResetPassSuccess = "reset-pass-success";
        //TOken error
        public const string TokenExpired = "token-expired";
        public const string InvalidToken = "invalid-token";
        public const string EmailClaimNotFound = "email-claim-not-found";
        public const string TokenNotFound = "token-not-found";
        public const string TokenMismatch = "token-mismatch";
        public const string PasswordNotNull = "pass-not-null";
        public const string OldPassIncorrect = "old-pass-incorrect"; 





    }
}
