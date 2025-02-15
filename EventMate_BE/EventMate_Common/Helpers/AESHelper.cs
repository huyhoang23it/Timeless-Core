using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Eventmate_Common.Helpers
{
    public class AESHelper
    {
        private readonly string _key;
        private readonly string _iv;

        public AESHelper(IConfiguration configuration)
        {
            _key = configuration["AES:Key"];
            _iv = configuration["AES:IV"];
        }

        public string Encrypt(string plainText)
        {
            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(_key.PadRight(32, '0').Substring(0, 32)); // Đảm bảo 32 bytes cho AES-256
                aes.IV = Encoding.UTF8.GetBytes("EventMateSecure1".Substring(0, 16)); // Đảm bảo 16 bytes cho IV
                aes.Mode = CipherMode.CBC;
                aes.Padding = PaddingMode.PKCS7;

                using (ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV))
                {
                    byte[] plainBytes = Encoding.UTF8.GetBytes(plainText);
                    byte[] encryptedBytes = encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);
                    return Convert.ToBase64String(encryptedBytes);
                }
            }
        }


        public string Decrypt(string encryptedText)
        {
            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(_key);
                aes.IV = Encoding.UTF8.GetBytes(_iv);
                aes.Mode = CipherMode.CBC;
                aes.Padding = PaddingMode.PKCS7;

                using (ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV))
                {
                    byte[] encryptedBytes = Convert.FromBase64String(encryptedText);
                    byte[] decryptedBytes = decryptor.TransformFinalBlock(encryptedBytes, 0, encryptedBytes.Length);
                    return Encoding.UTF8.GetString(decryptedBytes);
                }
            }
        }
    }
}
