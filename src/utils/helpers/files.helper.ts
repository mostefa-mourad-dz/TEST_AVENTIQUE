import fs from 'fs/promises';

export const readAllObjects = async (model: string) => {
  const data = await fs.readFile(`./src/db/${model}.json`, 'utf-8');
  const formattedData = JSON.parse(data);
  return formattedData[model] || [];
};

export const writeAllObjects = async (model: string, array: any) => {
  let converted = '';
  switch (model) {
    default:
      converted = JSON.stringify({ users: array });
      break;
  }
  const result = await fs.writeFile(`./src/db/${model}.json`, converted);
  return 'Success';
};
