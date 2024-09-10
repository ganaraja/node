
================================================================
var aws = require("aws-sdk");
var ec2 = null;

exports.handler = function(event, context) {
ec2 = new aws.EC2({region: event.ResourceProperties.Region})
var params = getParams(event);
ec2.describeImages(params, ProcResult)
}
================================================================
// Import required AWS SDK clients and commands for Node.js
const { EC2Client, DescribeImagesCommand } = require("@aws-sdk/client-ec2");

exports.handler = async function(event, context) {
    // Create an EC2 client configured with the specified region
    const ec2 = new EC2Client({ region: event.ResourceProperties.Region });

    try {
        // Extract parameters from the event
        const params = getParams(event);
        
        // Create the command with the parameters
        const command = new DescribeImagesCommand(params);
        
        // Send the command to the EC2 client
        const data = await ec2.send(command);
        
        console.log("Success", data);
        return data;  // Return the data as the result of the Lambda function
    } catch (err) {
        console.error("Error", err);
        throw err;  // Throw the error to signal a failure
    }
};

// This function should return the parameters for describeImages based on the event input
function getParams(event) {
    return {
        // Example parameters, replace with real ones based on your requirements
        ImageIds: event.ResourceProperties.ImageIds || [],
        Filters: event.ResourceProperties.Filters || []
    };
}
================================================================
var apiGateway = new AWS.APIGateway({
  apiVersion: ''
});

exports.handler = function (event, context, callback){
  var apId = event.ResourceProperties.ApiId;
  var buildTag = event.ResourceProperties.BuildTag;
  var apiStage = event. ResourceProperties.ApiStage;
  var deployOrRollback = event.ResourceProperties.DeployOrRollback;

  apiGateway.updateStage({
    restApiId: apiId,
    stageName: apiStage,
    patchOperations: [{
      path: "/deploymentId",
      op: "replace",
      value: deployment.id
    }]
  })

  apiGateway.createDeployment(param,function(err, data){
    console.log("Error")
  })
}

================================================================
// Import required AWS SDK clients and commands for Node.js
const { APIGatewayClient, UpdateStageCommand, CreateDeploymentCommand } = require("@aws-sdk/client-api-gateway");

exports.handler = async function (event, context) {
    // Initialize the API Gateway client
    const apiGateway = new APIGatewayClient({});

    const apId = event.ResourceProperties.ApiId;
    const buildTag = event.ResourceProperties.BuildTag;
    const apiStage = event.ResourceProperties.ApiStage;
    const deployOrRollback = event.ResourceProperties.DeployOrRollback;

    try {
        // Update the stage with the new deployment ID
        const updateStageParams = {
            restApiId: apId,
            stageName: apiStage,
            patchOperations: [{
                path: "/deploymentId",
                op: "replace",
                value: buildTag  // Assuming `buildTag` holds the deployment ID
            }]
        };
        const updateStageCommand = new UpdateStageCommand(updateStageParams);
        await apiGateway.send(updateStageCommand);

        // Create a new deployment
        const createDeploymentParams = {
            restApiId: apId,
            stageName: apiStage,
            description: `Deployment triggered by ${deployOrRollback}`,
            stageDescription: `Deployed by Lambda function - ${buildTag}`
        };
        const createDeploymentCommand = new CreateDeploymentCommand(createDeploymentParams);
        const deploymentData = await apiGateway.send(createDeploymentCommand);

        console.log("Deployment successful:", deploymentData);
    } catch (err) {
        console.error("Error:", err);
        throw err;  // Propagate the error to signal a failure in the Lambda execution
    }
};

================================================================
    var AWS = require("aws-sdk")

var apiGateway = new AWS.APIGateway({
  apiVersion: ''
});

exports.handler = function (event, context, callback){
  var apId = event.ResourceProperties.ApiId;
  var buildTag = event.ResourceProperties.BuildTag;
  var apiStage = event. ResourceProperties.ApiStage;
  var deployOrRollback = event.ResourceProperties.DeployOrRollback;

  if(apiStage && apiStage != null){
    apiGateway.updateStage({
      restApiId: apiId,
      stageName: apiStage,
      patchOperations: [{
        path: "/deploymentId",
        op: "replace",
        value: deployment.id
      }]
    }, function(err, data){
      if(err){
        console.log("apiGateway.updateStage error", err.stack);
        callback(err);
      }
      else {
        callback(null);
      }
    })
    
  }


  apiGateway.createDeployment(param,function(err, data){
    if(err){
      console.log("Error");
      callback(err);
    }
    else{
      callback(null);
    }
  })
}
================================================================
const { APIGateway } = require("@aws-sdk/client-api-gateway");

const apiGateway = new APIGateway({
  apiVersion: ''
});

exports.handler = async function (event, context) {
  const apId = event.ResourceProperties.ApiId;
  const buildTag = event.ResourceProperties.BuildTag;
  const apiStage = event.ResourceProperties.ApiStage;
  const deployOrRollback = event.ResourceProperties.DeployOrRollback;

  try {
    if (apiStage && apiStage !== null) {
      const updateStageParams = {
        restApiId: apId,
        stageName: apiStage,
        patchOperations: [{
          path: "/deploymentId",
          op: "replace",
          value: deployment.id // Make sure "deployment" is defined
        }]
      };
      const updateStageResponse = await apiGateway.updateStage(updateStageParams);
      console.log("Update stage response:", updateStageResponse);
    }

    const createDeploymentParams = {
      restApiId: apId,
      stageName: apiStage,
      description: buildTag
      // Include other necessary parameters for deployment
    };
    const createDeploymentResponse = await apiGateway.createDeployment(createDeploymentParams);
    console.log("Deployment created:", createDeploymentResponse);

    return { statusCode: 200, body: "Deployment or update successful" };

  } catch (error) {
    console.error("Error occurred:", error);
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};

================================================================
