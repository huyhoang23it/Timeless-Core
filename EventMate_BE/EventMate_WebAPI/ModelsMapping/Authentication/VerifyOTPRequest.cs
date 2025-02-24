namespace EventMate_WebAPI.ModelsMapping.Authentication
{
    public class VerifyOTPRequest
    {
        public string OTP { get; set; } 
        public string Token { get; set; }
    }
}
