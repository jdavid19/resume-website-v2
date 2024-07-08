# Deploying a Static Website using AWS

This guide will walk you through the process of setting up a pipeline using AWS CodePipeline to automatically deploy changes made to your static website hosted on GitHub to Amazon S3. Additionally, we'll cover how to use Amazon Route 53 for domain management, request a certificate through AWS Certificate Manager, and use CloudFront for content delivery with HTTPS. The site also includes a page views counter implemented using AWS Lambda, API Gateway, and DynamoDB.
In this project, I created a resume website to be used for deployment.
You can check it out here: [jd-espiritu.website](https://jd-espiritu.website)

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
  
   Note : After you finish setting up Amazon Route 53, test your static website and verify if it is working using your purchased domain name.

### 4. Setting up AWS Certificate Manager

1. Go to the [AWS Certificate Manager](https://console.aws.amazon.com/acm/) console.
2. Request a public certificate.
3. Provide one or more domain names for your certificate. You can add additional names to this certificate.

   For example, if you're requesting a certificate for "www.example.com", you might want to add the name "example.com" so that customers can reach your site by either name.

   In this certificate, I used a wildcard (e.g., *.jd-espiritu.website) and jd-espiritu.website. My purpose on using a wildcard is that I want to secure multiple subdomains with a single certificate. For example, a wildcard certificate for *.example.com can secure www.example.com, api.example.com, blog.example.com, etc., without needing to obtain and manage individual certificates for each subdomain. Later on, I will use api subdomain for my custom domain name for my API in API Gateway.
   
4. Complete the validation process (e.g., via [DNS validation](https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html#setting-up-dns-validation)). 

### 5. Setting up Amazon CloudFront

1. Go to the [Amazon CloudFront](https://console.aws.amazon.com/cloudfront/) console.
2. Create a new CloudFront distribution.
3. Configure the distribution with your S3 bucket as the origin.
4. For alternate domain names, specify your domain. You can add subdomains. In this project, I added jd-espiritu.website and *.jd-espiritu.website.
5. Specify the ACM certificate for HTTPS support.
6. After creating the distribution, you will configure the Origin and create Origin Access Control (OAC). The purpose is to restrict public access to the Origin which is on S3 Bucket and allow access only to CloudFront. You will update your bucket policy.
7. Update your Route 53 alias record to point to the CloudFront distribution.

## Implementing Page Views Counter
The site includes a page views counter implemented using AWS Lambda, API Gateway, and DynamoDB.

### 6. Setting up DynamoDB
1. Go to the [Amazon DynamoDB](https://console.aws.amazon.com/dynamodb/) console.
2. Create a new table named PageCounter with "page" as the partition key (type: String).

### 7. Creating the Lambda Function
1. Go to the [AWS Lambda](https://console.aws.amazon.com/lambda/) console.
2. Create a new Lambda function.
3. Copy and paste the following code into the Lambda function editor:

```py
import json
import boto3

dynamodb = boto3.client('dynamodb')

# Define a list of valid pages
VALID_PAGE = 'home'

def lambda_handler(event, context):
    page = event.get('pathParameters', {}).get('page', '')

    # Validate the page parameter
    if not page or not page.isalnum() or page not in VALID_PAGE:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid page parameter'})
        }

    try:
        response = dynamodb.update_item(
            TableName='PageCounter',
            Key={'page': {'S': page}},
            UpdateExpression='ADD view_count :increment',
            ExpressionAttributeValues={':increment': {'N': '1'}},
            ReturnValues='UPDATED_NEW'
        )

        view_count = response['Attributes']['view_count']['N']

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'page': page, 'count': view_count})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }

```
4. Set up an execution role for the Lambda function that allows it to read from and write to DynamoDB.

### 8. Setting up API Gateway
1. Go to the [API Gateway](https://console.aws.amazon.com/apigateway/) console.
2. Create a new API.
3. Create a new resource named /counter.
4. Create a new resource named {page}
5. Create a new GET method for the {page} resource.
6. Set the integration type to Lambda Function and select your Lambda function.
7. After setting up the integration type, add a mapping template on Integration Request Settings.

   Content-Type: application/json

   Template Body:
   ```
   {
     "pathParameters": {
       "page": "$input.params('page')"
     }
   }
   ```
9. Deploy the API to a new stage (e.g., prod).
10. Enable CORS for the API.
11. Configure a custom domain for the API:
- Go to the API Gateway Custom Domain Names section.
- Create a new custom domain (I will now use my subdomain that I secured using AWS Certificate Manager) and specify the public certificate requested earlier.
- Associate it with your API stage.

## Testing

1. Make changes to your static website in the GitHub repository.
2. Commit and push the changes.
3. Monitor the CodePipeline execution in the AWS console.
4. Verify that the changes are reflected on your website.
5. Check the page views counter to ensure it updates correctly.

## Resources

- [AWS Documentation](https://docs.aws.amazon.com/)
- [GitHub Documentation](https://docs.github.com/)
- [Hostinger Documentation](https://www.hostinger.com/tutorials)
