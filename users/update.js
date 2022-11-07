"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.DYNAMO_USERS_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      "#users_name": "name",
      "#users_age": "age",
      "#users_gender": "gender",
      "#users_email": "email",
    },
    ExpressionAttributeValues: {
      ":name": data.name,
      ":age": data.age,
      ":gender": data.gender,
      ":email": data.email,
      ":updatedAt": timestamp,
    },
    UpdateExpression:
      "SET #users_name = :name, #users_age = :age, #users_gender = :gender, #users_email = :email , updatedAt = :updatedAt",
    ReturnValues: "ALL_NEW",
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't fetch the todo item.",
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
