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



    }
}
