import { EC2Client, StartInstancesCommand, DescribeInstancesCommand } from "@aws-sdk/client-ec2";

const instanceId = process.env.INSTANCE_ID
const client = new EC2Client({ region: process.env.AWS_REGION });
const command = new StartInstancesCommand({ InstanceIds: [instanceId!] });

exports.handler = async function (event: any) {

  console.log("Attempting to start game server", instanceId);

  return client.send(command)
    .then(async (res) => {
      console.log(JSON.stringify(res));
      
      // Get public IP
      const describeCommand = new DescribeInstancesCommand({ InstanceIds: [instanceId!] });
      const describeResult = await client.send(describeCommand);
      const publicIp = describeResult.Reservations?.[0]?.Instances?.[0]?.PublicIpAddress;
      
      return {
        statusCode: 200,
        headers: { "Content-Type": "text/json" },
        body: JSON.stringify({ message: "Started satisfactory server", response: JSON.stringify(res), publicIp: publicIp })
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      return {
        statusCode: 200,
        headers: { "Content-Type": "text/json" },
        body: JSON.stringify({ message: "Failed to start satisfactory server", response: JSON.stringify(err) })
      }
    });
}
