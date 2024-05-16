# Slack Approval Bot Documentation

## Introduction

The Slack Approval Bot is a custom-built application designed to streamline the approval process within an organization. Leveraging Slack's platform and APIs, the bot allows users to submit approval requests directly within Slack, notifies designated approvers, and facilitates decision-making through interactive messages.

## Table of Contents

1. [Features](#features)
2. [Installation and Setup](#installation-and-setup)
   - [Prerequisites](#prerequisites)
   - [Installation Steps](#installation-steps)
   - [Configuration](#configuration)
3. [Usage](#usage)
   - [Slash Command](#slash-command)
   - [Modal Interface](#modal-interface)
   - [Approver Actions](#approver-actions)
   - [Notifications](#notifications)
4. [API Endpoints](#api-endpoints)
5. [Dependencies](#dependencies)
6. [Contributors](#contributors)
7. [License](#license)

## 1. Features <a name="features"></a>

- **Slash Command Integration:** Users can trigger the approval process using a custom slash command (`/approval-test`).
- **Interactive Modals:** The bot presents a modal interface for users to input approval details, including selecting an approver and providing a text description.
- **Approval Workflow:** Upon submission, the bot sends the approval request to the designated approver(s) and allows them to approve or reject the request directly within Slack.
- **Real-time Notifications:** Both the requester and the approver(s) receive real-time notifications about the status of approval requests, including the outcome (approved or rejected).

## 2. Installation and Setup <a name="installation-and-setup"></a>

### Prerequisites <a name="prerequisites"></a>

- Node.js installed on your system.
- A Slack workspace with permissions to create and install apps.
- Slack API token for your app.

### Installation Steps <a name="installation-steps"></a>

1. Clone the repository or download the source code.
2. Install dependencies using `npm install`.
3. Set up environment variables:
   - `SLACK_TOKEN`: Your Slack API token.
   - `PORT`: Port number for the Express server.
4. Run the server using `npm start` or `node server.js`.

### Configuration <a name="configuration"></a>

- Ensure your Slack app is configured with the required permissions and features, including slash commands and interactive components.

## 3. Usage <a name="usage"></a>

### Slash Command <a name="slash-command"></a>

To initiate an approval request, use the following slash command:

```
/approval-test
```

### Modal Interface <a name="modal-interface"></a>

Upon invoking the slash command, a modal will appear, prompting the user to provide the following details:

- **Approver:** Select the approver from the dropdown list.
- **Approval Text:** Enter a description or justification for the approval request.

After filling in the details, click the "Submit" button to send the approval request.

### Approver Actions <a name="approver-actions"></a>

The designated approver(s) will receive a message containing the approval request. They can take one of the following actions:

- **Approve:** Click the "Approve" button to approve the request.
- **Reject:** Click the "Reject" button to reject the request.

### Notifications <a name="notifications"></a>

Both the requester and the approver(s) will receive real-time notifications about the status of the approval request, including the outcome (approved or rejected).

## 4. API Endpoints <a name="api-endpoints"></a>

- **POST /slack/command:** Endpoint for handling slash command invocation.
- **POST /slack/submit:** Endpoint for handling modal submissions.
- **POST /slack/actions:** Endpoint for handling user actions (approval/rejection).

## 5. Dependencies <a name="dependencies"></a>

- `express`: Web framework for Node.js.
- `axios`: HTTP client for making requests to the Slack API.
- `body-parser`: Middleware for parsing request bodies.

## 6. Contributors <a name="contributors"></a>

- [Vansh Sachdeva](https://github.com/MrArthor)

## 7. License <a name="license"></a>

This project is licensed under the [MIT License](LICENSE).

## Conclusion

The Slack Approval Bot simplifies and accelerates the approval process within your organization by providing a seamless integration with Slack. By leveraging interactive modals and real-time notifications, the bot ensures efficient communication and decision-making, ultimately enhancing productivity and collaboration among team members.