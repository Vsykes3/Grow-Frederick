const fs = require('fs');
const path = require('path');

function deleteDir(dir) {
  if (!fs.existsSync(dir)) return;
  
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const curPath = path.join(dir, file);
      try {
        const stat = fs.lstatSync(curPath);
        if (stat.isDirectory()) {
          deleteDir(curPath);
        } else {
          // Retry logic for locked files
          let retries = 5;
          while (retries > 0) {
            try {
              fs.unlinkSync(curPath);
              break;
            } catch (err) {
              if (err.code === 'EBUSY' || err.code === 'EACCES') {
                retries--;
                if (retries > 0) {
                  // Wait 100ms before retry
                  const start = Date.now();
                  while (Date.now() - start < 100) {}
                }
              } else {
                throw err;
              }
            }
          }
        }
      } catch (err) {
        // Ignore errors for individual files
        console.warn(`Warning: Could not delete ${curPath}: ${err.message}`);
      }
    }
    
    // Retry logic for directory removal
    let retries = 5;
    while (retries > 0) {
      try {
        fs.rmdirSync(dir);
        break;
      } catch (err) {
        if (err.code === 'EBUSY' || err.code === 'EACCES' || err.code === 'ENOTEMPTY') {
          retries--;
          if (retries > 0) {
            const start = Date.now();
            while (Date.now() - start < 200) {}
            // Try to delete remaining files
            try {
              const remaining = fs.readdirSync(dir);
              remaining.forEach(file => {
                try {
                  const filePath = path.join(dir, file);
                  if (fs.lstatSync(filePath).isFile()) {
                    fs.unlinkSync(filePath);
                  }
                } catch (e) {}
              });
            } catch (e) {}
          }
        } else {
          throw err;
        }
      }
    }
  } catch (err) {
    console.warn(`Warning: Could not delete directory ${dir}: ${err.message}`);
  }
}

// Delete .next and node_modules/.cache
const dirsToDelete = ['.next', 'node_modules/.cache'];
dirsToDelete.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`Cleaning ${dir}...`);
    deleteDir(dir);
  }
});

console.log('Clean complete!');

