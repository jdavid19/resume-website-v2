# Deploying a Static Website with Amazon S3, AWS CodePipeline, Amazon Route 53, and Amazon CloudFront

This guide will walk you through the process of setting up a pipeline using AWS CodePipeline to automatically deploy changes made to your static website hosted on GitHub to Amazon S3. Additionally, we'll cover how to use Amazon Route 53 for domain management, request a certificate through AWS Certificate Manager, and CloudFront for content delivery with HTTPS.

In this project, I created a resume website to be used for deployment. You can check it out here: [jd-espiritu.website](https://jd-espiritu.website)

## Architecture

![Diagram](https://i.imgur.com/8ytQX6j.png)

## Prerequisites

Before you begin, make sure you have the following:

- An AWS account with necessary permissions.
- A static website hosted on GitHub.
- A domain purchased from Amazon Route 53 or from a 3rd party registrar (e.g., Hostinger).

## Steps

### 1. Setting up Amazon S3 Bucket

1. Go to the [Amazon S3](https://console.aws.amazon.com/s3/) console.
2. Create a new S3 bucket to host your website content.
   Note: The bucket name must match the domain name. Otherwise, the S3 endpoint will not appear when you create an alias record on your hosted zone.
3. Enable static website hosting for the bucket.
4. Make sure the bucket policy allows public read access to objects.

### 2. Setting up AWS CodePipeline

1. Go to the [AWS CodePipeline](https://console.aws.amazon.com/codesuite/codepipeline/pipelines) console.
2. Create a new pipeline.
3. Connect the pipeline to your GitHub repository.
4. Configure the pipeline to deploy changes to your S3 bucket.

### 3. Setting up Amazon Route 53

1. Go to the [Amazon Route 53](https://console.aws.amazon.com/route53/) console.
2. Create a new hosted zone for your domain if you purchased the domain from a 3rd party registrar. If you purchased the domain in Amazon Route 53, hosted zone is created automatically for you.
3. Add an alias record pointing to your S3 endpoint.
  

Note : After you finish setting up Amazon Route 53, you can proceed to Step 6 to test your static website and verify if it is working using your purchased domain.

### 4. Setting up AWS Certificate Manager

1. Go to the [AWS Certificate Manager](https://console.aws.amazon.com/acm/) console.
2. Request a new certificate for your domain.
3. Complete the validation process (e.g., via [DNS validation](https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html#setting-up-dns-validation)). 

### 5. Setting up Amazon CloudFront

1. Go to the [Amazon CloudFront](https://console.aws.amazon.com/cloudfront/) console.
2. Create a new CloudFront distribution.
3. Configure the distribution with your S3 bucket as the origin.
4. Specify the ACM certificate for HTTPS support.
5. Update your Route 53 alias record to point to the CloudFront distribution.

### 6. Testing

1. Make changes to your static website in the GitHub repository.
2. Commit and push the changes.
3. Monitor the CodePipeline execution in the AWS console.
4. Verify that the changes are reflected on your website.

## Resources

- [AWS Documentation](https://docs.aws.amazon.com/)
- [GitHub Documentation](https://docs.github.com/)
- [Hostinger Documentation](https://www.hostinger.com/tutorials)
