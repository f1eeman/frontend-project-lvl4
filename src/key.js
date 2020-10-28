import aws from 'aws-sdk';

const rollbarKey = new aws.S3({
  accessKeyId: process.env.SECRET_KEY_ROLLBAR_KEY,
  secretAccesKey: process.env.SECRET_KEY_ROLLBAR_SECRET,
});

export default rollbarKey;
