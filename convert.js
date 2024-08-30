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
