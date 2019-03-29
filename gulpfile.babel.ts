import { series } from 'gulp';
import terminalSpawn from 'terminal-spawn';

/* *****************************************************************************
 * Private
 **************************************************************************** */

// -----------------------------------------------------------------------------
// Tasks
// -----------------------------------------------------------------------------

const _runTest = () => terminalSpawn('npx jest --passWithNoTests').promise;

const _buildJs = () =>
  terminalSpawn(`npx babel src --out-dir lib --extensions ".ts"`).promise;

const _buildTypes = () => terminalSpawn('npx tsc').promise;

const _checkTypes = () => terminalSpawn('npx tsc -p "./tsconfig.json"').promise;

const _lintTS = () => {
  const rootFiles = '"./*.ts?(x)"';
  const srcFiles = '"./src/**/*.ts?(x)"';
  const configFiles = '"./config/**/*.ts?(x)"';
  const tsconfig = '--project tsconfig.json';
  return terminalSpawn(
    `npx tslint ${rootFiles} ${srcFiles} ${configFiles} ${tsconfig}`,
  ).promise;
};

const _gitStatus = () => terminalSpawn('npx git status').promise;

const _sleep = (seconds: number = 0) =>
  terminalSpawn(`sleep ${seconds}`).promise;

const _sleepForReview = () => {
  // giving 4 seconds to review the git commit status
  const reviewTime = 4;
  return _sleep(reviewTime);
};

const _gitStatusHumanReview = series(_gitStatus, _sleepForReview);

/* *****************************************************************************
 * Public
 **************************************************************************** */

// -----------------------------------------------------------------------------
// Tasks
// -----------------------------------------------------------------------------

const lint = series(_lintTS, _checkTypes);

const build = series(_buildJs, _buildTypes);

const test = series(build, _runTest);

const verify = series(_gitStatusHumanReview, build, lint, test);

const verifyCi = verify;

export { lint, build, test, verify, verifyCi};
