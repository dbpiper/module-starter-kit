import slackNotify from 'slack-notify';

import moment from 'moment';

let _startTime: moment.Moment;

const _getSlackMessage = (success: boolean) => {
  const _endTime = moment();

  let message: string;

  const timeTakenMs = _endTime.diff(_startTime);
  const timeTaken = moment.duration(timeTakenMs, 'milliseconds');
  const millisecondsInSecond = 1000;

  let timeTakenString: string;
  timeTakenString = `${timeTaken.minutes()} minutes, ${timeTaken.seconds() +
    timeTaken.milliseconds() / millisecondsInSecond} seconds`;

  if (timeTaken.minutes() < 1) {
    timeTakenString = `${timeTaken.seconds() +
      timeTaken.milliseconds() / millisecondsInSecond} seconds`;
  }

  if (timeTaken.seconds() < 1) {
    timeTakenString = `${timeTaken.milliseconds()} milliseconds`;
  }

  if (typeof success === 'boolean') {
    if (success) {
      message = `Verification script finished successfully in ${timeTakenString}.`;
    } else {
      message = `Verification script failed after ${timeTakenString}!`;
    }
  }

  return message;
};

const _slackSendMessageNetwork = (
  resolve: (value: string) => void,
  message: string,
) => {
  const _slackUrl =
    'https://hooks.slack.com/services/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';
  const _slack = slackNotify(_slackUrl);
  const timeout = 500;
  console.log('sending slack message...');
  _slack.send(
    {
      channel: '#euclid',
      text: message,
    },
    () => {
      console.warn('done sending slack message...');
      resolve('Finished sending the slack message.');
    },
  );
};

const slackSendMessage = (success: boolean = true) =>
  new Promise((resolve, _reject) => {
    const message = _getSlackMessage(success);

    _slackSendMessageNetwork(resolve, message);
  });

const startTimer = () => {
  _startTime = moment();
};

export { startTimer, slackSendMessage };
