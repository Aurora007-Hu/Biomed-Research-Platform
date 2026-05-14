// Fix for Cloudflare Pages: install missing Linux rollup binding
import { execSync } from 'child_process';
import os from 'os';

if (os.platform() === 'linux') {
  try {
    execSync('npm install @rollup/rollup-linux-x64-gnu --no-save', { stdio: 'ignore' });
  } catch (e) {
    // Silently ignore - the optional dependency should handle it
  }
}
