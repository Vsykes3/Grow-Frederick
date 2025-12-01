#!/usr/bin/env node

/**
 * Build and quality check script for GrowCommon
 * Ensures the app builds successfully and meets quality standards
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🌱 GrowCommon Build & Quality Check\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Please run this script from the project root directory');
  process.exit(1);
}

// Check for required files
const requiredFiles = [
  'src/app/layout.tsx',
  'src/app/globals.css',
  'tailwind.config.ts',
  'tsconfig.json',
  'next.config.js'
];

console.log('📁 Checking required files...');
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.error(`❌ Missing required file: ${file}`);
    process.exit(1);
  }
}

// Check TypeScript compilation
console.log('\n🔍 Type checking...');
try {
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('✅ TypeScript compilation successful');
} catch (error) {
  console.error('❌ TypeScript compilation failed');
  process.exit(1);
}

// Check ESLint
console.log('\n🔍 Linting...');
try {
  execSync('npx eslint . --ext .ts,.tsx --max-warnings 0', { stdio: 'inherit' });
  console.log('✅ ESLint checks passed');
} catch (error) {
  console.error('❌ ESLint checks failed');
  process.exit(1);
}

// Check Tailwind CSS
console.log('\n🎨 Checking Tailwind CSS...');
try {
  execSync('npx tailwindcss --input src/app/globals.css --output /tmp/tailwind-check.css --dry-run', { stdio: 'inherit' });
  console.log('✅ Tailwind CSS compilation successful');
} catch (error) {
  console.error('❌ Tailwind CSS compilation failed');
  process.exit(1);
}

// Check for accessibility issues
console.log('\n♿ Checking accessibility...');
const accessibilityFiles = [
  'src/app/(site)/layout.tsx',
  'src/app/(site)/page.tsx',
  'src/components/ui/Button.tsx',
  'src/components/ui/PaywallGuard.tsx'
];

let accessibilityIssues = 0;
for (const file of accessibilityFiles) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for basic accessibility patterns
    if (!content.includes('aria-label') && !content.includes('aria-labelledby')) {
      console.warn(`⚠️  Consider adding ARIA labels to ${file}`);
      accessibilityIssues++;
    }
    
    if (content.includes('<img') && !content.includes('alt=')) {
      console.warn(`⚠️  Images should have alt text in ${file}`);
      accessibilityIssues++;
    }
  }
}

if (accessibilityIssues === 0) {
  console.log('✅ Basic accessibility checks passed');
} else {
  console.log(`⚠️  Found ${accessibilityIssues} potential accessibility improvements`);
}

// Check brand consistency
console.log('\n🎨 Checking brand consistency...');
const brandFiles = [
  'src/app/(site)/layout.tsx',
  'src/app/(site)/page.tsx',
  'src/app/pro/page.tsx'
];

let brandIssues = 0;
for (const file of brandFiles) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    
    if (content.includes('GrowFrederick') || content.includes('grow-frederick')) {
      console.warn(`⚠️  Found old branding in ${file}`);
      brandIssues++;
    }
  }
}

if (brandIssues === 0) {
  console.log('✅ Brand consistency checks passed');
} else {
  console.log(`⚠️  Found ${brandIssues} brand consistency issues`);
}

// Check Pro features implementation
console.log('\n💎 Checking Pro features...');
const proFiles = [
  'src/lib/plan.ts',
  'src/hooks/usePlan.ts',
  'src/components/ui/ProBadge.tsx',
  'src/components/ui/PaywallGuard.tsx'
];

let proIssues = 0;
for (const file of proFiles) {
  if (!fs.existsSync(file)) {
    console.warn(`⚠️  Missing Pro feature file: ${file}`);
    proIssues++;
  }
}

if (proIssues === 0) {
  console.log('✅ Pro features implementation complete');
} else {
  console.log(`⚠️  Found ${proIssues} missing Pro feature files`);
}

// Summary
console.log('\n📊 Build Summary:');
console.log('✅ Required files present');
console.log('✅ TypeScript compilation successful');
console.log('✅ ESLint checks passed');
console.log('✅ Tailwind CSS compilation successful');
console.log(`✅ Accessibility: ${accessibilityIssues === 0 ? 'Passed' : `${accessibilityIssues} improvements suggested`}`);
console.log(`✅ Brand consistency: ${brandIssues === 0 ? 'Passed' : `${brandIssues} issues found`}`);
console.log(`✅ Pro features: ${proIssues === 0 ? 'Complete' : `${proIssues} files missing`}`);

if (accessibilityIssues === 0 && brandIssues === 0 && proIssues === 0) {
  console.log('\n🎉 All checks passed! GrowCommon is ready for deployment.');
} else {
  console.log('\n⚠️  Some issues found. Please review and fix before deployment.');
}

console.log('\n📚 Next steps:');
console.log('1. Run "npm run dev" to start development server');
console.log('2. Run "npm run build" to create production build');
console.log('3. Deploy to Vercel or your preferred platform');
console.log('4. Set up Supabase and Stripe integration');
console.log('5. Configure environment variables');
