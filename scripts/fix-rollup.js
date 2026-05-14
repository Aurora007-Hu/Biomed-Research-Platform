// Fix for Cloudflare Pages: install missing Linux rollup binding
const { execSync } = require('child_process');
const os = require('os');

if (os.platform() === 'linux') {
  try {
    execSync('npm install @rollup/rollup-linux-x64-gnu --no-save', { stdio: 'ignore' });
  } catch (e) {
    // Silently ignore - the optional dependency should handle it
  }
}
