const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('querystring');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to handle slash command invocation
app.post('/slack/command', (req, res) => {
  const { command, text, user_id, trigger_id } = req.body;

  if (command === '/approval-test') {
    openApprovalModal(trigger_id);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

// Endpoint to handle modal submissions
app.post('/slack/submit', async (req, res) => {
  const payload = JSON.parse(req.body.payload);
  const { type, user, view } = payload;

  if (type === 'view_submission') {
    const { approver, approvalText } = view.state.values;
    const approverId = approver.select.selected_user;
    const requesterId = user.id;

    // Send approval message to approver
    await sendApprovalMessage(approverId, approvalText.plain_text_input.value, requesterId);

    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

// Function to open approval modal
async function openApprovalModal(triggerId) {
  const modalData = {
    trigger_id: triggerId,
    view: JSON.stringify({
      type: 'modal',
      callback_id: 'approval_modal',
      title: {
        type: 'plain_text',
        text: 'Request Approval',
      },
      blocks: [
        {
          type: 'input',
          block_id: 'approver',
          element: {
            type: 'static_select',
            placeholder: {
              type: 'plain_text',
              text: 'Select an approver',
            },
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: 'User 1',
                },
                value: 'user1_id',
              },
              {
                text: {
                  type: 'plain_text',
                  text: 'User 2',
                },
                value: 'user2_id',
              },
            ],
          },
          label: {
            type: 'plain_text',
            text: 'Approver',
          },
        },
        {
          type: 'input',
          block_id: 'approvalText',
          element: {
            type: 'plain_text_input',
            multiline: true,
          },
          label: {
            type: 'plain_text',
            text: 'Approval Text',
          },
        },
      ],
      submit: {
        type: 'plain_text',
        text: 'Submit',
      },
    }),
  };

  try {
    await axios.post('https://slack.com/api/views.open', qs.stringify(modalData), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
      },
    });
  } catch (error) {
    console.error('Error opening modal:', error);
  }
}

// Function to send approval message to approver
async function sendApprovalMessage(approverId, approvalText, requesterId) {
  const messageData = {
    channel: approverId,
    text: `Request for approval from <@${requesterId}>:\n${approvalText}`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Request for approval from <@${requesterId}>:\n${approvalText}`,
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Approve',
            },
            action_id: 'approve_approval',
            value: 'approved',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Reject',
            },
            action_id: 'reject_approval',
            value: 'rejected',
          },
        ],
      },
    ],
  };

  try {
    await axios.post('https://slack.com/api/chat.postMessage', messageData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
      },
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

// Endpoint to handle interactions (approval/rejection)
app.post('/slack/actions', (req, res) => {
  const payload = JSON.parse(req.body.payload);
  const { actions, user, channel, message } = payload;

  actions.forEach(async (action) => {
    const { action_id, value } = action;

    // Handle approval/rejection actions
    if (action_id === 'approve_approval' || action_id === 'reject_approval') {
      const decision = value === 'approved' ? 'Approved' : 'Rejected';
      const responseText = `<@${user.id}> has ${decision} the request.`;

      // Send response to requester
      await sendResponseToRequester(channel.id, responseText);

      // Delete original message after decision
      try {
        await axios.post('https://slack.com/api/chat.delete', qs.stringify({ channel: channel.id, ts: message.ts }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
          },
        });
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  });

  res.status(200).end();
});

// Function to send response to requester
async function sendResponseToRequester(channelId, text) {
  const messageData = {
    channel: channelId,
    text: text,
  };

  try {
    await axios.post('https://slack.com/api/chat.postMessage', messageData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
      },
    });
  } catch (error) {
    console.error('Error sending message to requester:', error);
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
