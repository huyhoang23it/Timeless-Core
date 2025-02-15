using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventMate_Common.Constants
{
    public static  class Constants
    {
        public const string PasswordChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-";
        public const string SubjectOTPEmail = "EventMate - Xác thực OTP";
        public static string OTPEmailBody = @"
        Chào bạn,

        Bạn đang thực hiện xác thực tài khoản trên Event Mate. Vui lòng sử dụng mã OTP sau để hoàn tất quá trình xác thực:

        🔑 Mã OTP: {0}

        Lưu ý: Mã OTP có hiệu lực trong 5 phút. Không chia sẻ mã này với bất kỳ ai.

        Nếu bạn không yêu cầu mã OTP này, vui lòng bỏ qua email này.

        Trân trọng,
        Event Mate Team
        https://eventmate.com
    ";
    }
}
