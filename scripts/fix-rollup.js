// Fix for Cloudflare Pages: install missing Linux rollup binding
import { execSync } from 'child_process';
import os from 'os';

if (os.platform() === 'linux') {
  try {
    execSync('npm install @rollup/rollup-linux-x64-gnu --no-save', { stdio: 'ignore' });
    execSync('chmod -R 755 node_modules/.bin', { stdio: 'ignore' });
  } catch (e) {
    // Silently ignore - the optional dependency should handle it
  }
}
