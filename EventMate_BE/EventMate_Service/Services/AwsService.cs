using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace EventMate_Service.Services
{
    public class AwsService
    {
        private readonly IAmazonS3 _s3Client;

        public AwsService(IAmazonS3 s3Client)
        {
            _s3Client = s3Client;
        }
        public async Task<string> addFile(IFormFile file, string bucketName, string? prefix)
        {
            try
            {
                var bucketExists = await Amazon.S3.Util.AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, bucketName);
                if (!bucketExists) return "Bucket {bucketName} does not exist.";
                var request = new PutObjectRequest()
                {
                    BucketName = bucketName,
                    Key = string.IsNullOrEmpty(prefix) ? file.FileName : $"{prefix?.TrimEnd('/')}/{file.FileName}",
                    InputStream = file.OpenReadStream()
                };
                request.Metadata.Add("Content-Type", file.ContentType);
                await _s3Client.PutObjectAsync(request);
                return "success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
