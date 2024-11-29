import fs from 'node:fs';
import path from 'node:path';

import { SRC_PATH } from '../paths';

import {
  addProperty,
  removeProperty,
  updateProperty,
  moveProperty,
  type JSONObj,
} from './utils/object';
import options from '../options';
import { isErrorWithMessage } from '../utils/error';
import { SIBLING_OPERATOR } from './utils/pathParser';

const LOCALES_DIR = path.join(SRC_PATH, 'i18n', 'locales');

const errorsMap = {
  fileRead: (filePath: string) => `Error reading locale file "${filePath}": `,
  propertyExists: (propertyPath: string) => `CLI locale: property ${propertyPath} already exists`,
  invalidOperation: 'Invalid operation or missing arguments.',
};

const readLocaleFile = (file: string) => {
  const filePath = path.join(LOCALES_DIR, file);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    return JSON.parse(fileContent) as JSONObj;
  } catch (error) {
    const errorMessage = isErrorWithMessage(error) ? error.message : 'Unknown error';

    throw new Error(`${errorsMap.fileRead(filePath)}${errorMessage}`);
  }
};

const writeLocaleFile = (file: string, localeData: Record<string, unknown>) => {
  const filePath = path.join(LOCALES_DIR, file);

  fs.writeFileSync(filePath, JSON.stringify(localeData, null, 2));

  if (process.env.NODE_ENV !== 'test') {
    console.log(`Processed locale file "${filePath}".`);
  }
};

const processLocaleFile = (file: string) => {
  let localeData: JSONObj;

  try {
    localeData = readLocaleFile(file);
  } catch (error) {
    console.error(error);
    return; // Skip processing if there's an error reading the file
  }

  const { properties, value } = options;

  const propertyPath = properties?.join(SIBLING_OPERATOR);

  // Validate propertyPath
  if (!propertyPath) {
    console.error(errorsMap.invalidOperation);
    return;
  }

  const operations = {
    add: () => {
      if (localeData[propertyPath]) {
        console.error(errorsMap.propertyExists(propertyPath));
        return;
      }
      return addProperty(localeData, propertyPath);
    },
    update: () => {
      if (!value) {
        console.error(errorsMap.invalidOperation);
        return;
      }
      return updateProperty(localeData, propertyPath, value);
    },
    remove: () => removeProperty(localeData, propertyPath),

    move: () => {
      const [from, to] = properties as [string, string];

      return moveProperty(localeData, from, to);
    },
  };

  const operationKeys = Object.keys(operations);

  const validOperations = operationKeys.filter((op) => options[op]);

  if (validOperations.length !== 1) {
    console.error(errorsMap.invalidOperation);
    return;
  }

  const result = operations[validOperations[0] as keyof typeof operations];

  localeData = result() ?? {};

  writeLocaleFile(file, localeData);
};

const main = () => {
  try {
    const files = fs.readdirSync(LOCALES_DIR);

    files.map(processLocaleFile);
  } catch (error: unknown) {
    const message = isErrorWithMessage(error) ? error.message : 'main(): Unknown error';

    console.error(`Error reading locales directory: ${message}`);
  }
};

main();
