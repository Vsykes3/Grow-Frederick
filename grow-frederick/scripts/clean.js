const fs = require('fs');
const path = require('path');

function removeDir(dirPath, retries = 3) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  for (let i = 0; i < retries; i++) {
    try {
      fs.rmSync(dirPath, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
      console.log(`Cleaned ${dirPath}`);
      return;
    } catch (error) {
      if (i === retries - 1) {
        console.warn(`Failed to remove ${dirPath} after ${retries} attempts:`, error.message);
      } else {
        // Wait a bit before retrying (synchronous wait)
        const start = Date.now();
        while (Date.now() - start < 200 * (i + 1)) {
          // Busy wait
        }
      }
    }
  }
}

function clean() {
  console.log('Cleaning .next...');
  removeDir(path.join(__dirname, '..', '.next'));
  
  console.log('Cleaning node_modules/.cache...');
  removeDir(path.join(__dirname, '..', 'node_modules', '.cache'));
  
  console.log('Clean complete!');
}

clean();
