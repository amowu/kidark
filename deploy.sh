#! /bin/bash

SHA1=$1
DOCKERRUN_FILE=$SHA1-Dockerrun.aws.json
S3_BUCKET=elasticbeanstalk-ap-northeast-1-647768359793
REGION=ap-northeast-1
APPLICATION_NAME=amowu.com
ENVIRONMENT_NAME=amowu-prod

# Deploy image to Docker Hub
docker push amowu/amowu.com:$SHA1

# Create new Elastic Beanstalk version
sed "s/<TAG>/$SHA1/" < Dockerrun.aws.json.template > $DOCKERRUN_FILE
aws s3 cp $DOCKERRUN_FILE s3://$S3_BUCKET/$DOCKERRUN_FILE
aws elasticbeanstalk create-application-version --region=$REGION --application-name "$APPLICATION_NAME" --version-label $SHA1 --source-bundle S3Bucket=$S3_BUCKET,S3Key=$DOCKERRUN_FILE

# Update Elastic Beanstalk environment to new version
aws elasticbeanstalk update-environment --region=$REGION --environment-name "$ENVIRONMENT_NAME" --version-label $SHA1
