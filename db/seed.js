import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createFile } from "#db/queries/files";
import { createFolder } from "#db/queries/folders";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const folders = [];

  // Create 5 folders with random names from faker
  for (let i = 0; i < 5; i++) {
    const folderName = faker.system.directoryPath();
    const folder = await createFolder(folderName);
    folders.push(folder);
  }

  // Create 8-12 files per folder with random names and sizes from faker
  for (const folder of folders) {
    const fileCount = faker.number.int({ min: 8, max: 12 });
    for (let i = 0; i < fileCount; i++) {
      const fileName = faker.system.fileName();
      const fileSize = faker.number.int({ min: 512, max: 500000 });
      await createFile(fileName, fileSize, folder.id);
    }
  }
}
