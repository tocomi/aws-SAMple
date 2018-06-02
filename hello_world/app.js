'use strict'

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = 'sam-sample-stack-Records-CVC0ZMVF5BOQ';

exports.lambda_handler = (event, context, callback) => {

  const params = {
    TableName: tableName
  };

  docClient.scan(params, function(err, data) {
    if (err) {
      callback(err, null);
      return;
    }
    var response = {
      'statusCode': 200,
      'headers': { // headerを設定しないとajax経由でデータを取得するときにエラーが出る
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      },
      'body': JSON.stringify(data.Items)
    }
    callback(null, response);
  });
};
