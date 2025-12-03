const { execSync } = require('child_process');
const os = require('os');

function killNode() {
  try {
    if (os.platform() === 'win32') {
      // Windows
      try {
        execSync('taskkill /F /IM node.exe /T', { stdio: 'ignore' });
        console.log('Killed Node.js processes');
      } catch (err) {
        // No processes found or already killed
        console.log('No Node.js processes to kill');
      }
    } else {
      // Unix-like
      try {
        execSync('pkill -f node || true', { stdio: 'ignore' });
        console.log('Killed Node.js processes');
      } catch (err) {
        console.log('No Node.js processes to kill');
      }
    }
  } catch (err) {
    console.log('Could not kill Node.js processes (this is usually fine)');
  }
}

killNode();

