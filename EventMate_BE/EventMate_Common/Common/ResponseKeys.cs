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

        //Event
        public const string FetchEventSuccess = "fetch-event-success";
        public const string FetchEventError = "cannot-fetch-event";
        public const string DuplicateEventName = "duplicate-event-name";
        public const string InvalidEventTime = "invalid-event-time";
        public const string EventCreationFailed = "event-creation-failed";
        public const string EventDeleted = "event-deleted";
        public const string EventUpadated = "event-updated";

        // Group  
        public const string FetchGroupSuccess = "fetch-group-success";
        public const string FetchGroupError = "cannot-fetch-group";
        public const string DuplicateGroupName = "duplicate-group-name";
        public const string InvalidGroupTime = "invalid-group-time"; // If applicable, otherwise, you can remove it  
        public const string GroupCreationFailed = "group-creation-failed";
        public const string GroupDeleted = "group-deleted";
        public const string GroupUpdated = "group-updated";
        public const string UserAddedToGroup = "user-added-to-group";
        public const string ConversationAddedToGroup = "conversation-added-to-group";
        public const string NoUsersFound = "no-users-group";
        public const string UsersRetrieved = "users-retrieved";

    }
}
