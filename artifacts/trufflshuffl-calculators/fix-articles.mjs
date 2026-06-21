import { readFileSync, writeFileSync } from 'fs';

const files = ['length','weight','temperature','area','volume','data','energy'];

const BROKEN_SUFFIX = '"}],';
const FIXED_SUFFIX = '</p></div>`,';

let totalFixed = 0;

files.forEach(name => {
  const filepath = `artifacts/trufflshuffl-calculators/src/lib/articles/${name}.ts`;
  const txt = readFileSync(filepath, 'utf8');
  const lines = txt.split('\n');
  let fileFixed = 0;

  lines.forEach((line, i) => {
    const ticks = (line.match(/`/g) || []).length;
    if (ticks % 2 !== 0) {
      // Odd backtick count — check what kind of issue
      const pos = [];
      for (let j = 0; j < line.length; j++) if (line[j] === '`') pos.push(j);
      if (ticks === 1 && line.endsWith(BROKEN_SUFFIX)) {
        lines[i] = line.slice(0, -BROKEN_SUFFIX.length) + FIXED_SUFFIX;
        fileFixed++;
        console.log(`${name}.ts L${i+1}: fixed (1 backtick, ends with broken suffix)`);
      } else if (ticks === 3) {
        // 3 backticks: likely opening tick + content + closing tick but one extra somewhere
        console.log(`${name}.ts L${i+1}: 3 backticks at positions ${pos.join(',')}, len=${line.length}`);
        console.log(`  END: ${JSON.stringify(line.slice(-80))}`);
      } else {
        console.log(`${name}.ts L${i+1}: ${ticks} backticks at pos ${pos.slice(0,5).join(',')}, len=${line.length}`);
        console.log(`  END: ${JSON.stringify(line.slice(-80))}`);
      }
    }
  });

  if (fileFixed > 0) {
    writeFileSync(filepath, lines.join('\n'), 'utf8');
    console.log(`Wrote ${name}.ts (${fileFixed} lines fixed)`);
    totalFixed += fileFixed;
  }
});

console.log(`\nTotal fixed: ${totalFixed} lines`);

// Final verification of ALL article files
const allFiles = ['length','weight','temperature','speed','area','volume','data','energy','power','pressure','time'];
console.log('\n=== Final Verification ===');
allFiles.forEach(name => {
  const filepath = `artifacts/trufflshuffl-calculators/src/lib/articles/${name}.ts`;
  const lines = readFileSync(filepath, 'utf8').split('\n');
  const bad = lines.filter(l => (l.match(/`/g) || []).length % 2 !== 0);
  if (bad.length) {
    console.log(`BROKEN: ${name}.ts — ${bad.length} lines`);
  } else {
    console.log(`OK: ${name}.ts`);
  }
});
