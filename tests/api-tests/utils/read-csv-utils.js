import fs from 'fs';
import parse from 'csv-parse/lib/sync';

export function readCsvFile(filePath) {
  const csvData = fs.readFileSync(filePath, 'utf8');
  return parse(csvData, {
    columns: true,
    skip_empty_lines: true
  });
}