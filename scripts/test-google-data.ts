import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

async function main() {
  console.log("\nConnecting to Google Sheets...\n");

  const {
    readCategories,
    readProducts,
    readVariants,
    readWebsiteSettings,
  } = await import("./google/sheets");

  const categories = await readCategories();
  console.log("✓ Categories loaded");
  console.table(categories);

  const products = await readProducts();
  console.log("\n✓ Products loaded");
  console.table(products);

  const variants = await readVariants();
  console.log("\n✓ Variants loaded");
  console.table(variants);

  const settings = await readWebsiteSettings();
  console.log("\n✓ Website Settings loaded");
  console.table(settings);

  console.log("\n✓ All Google Sheet data loaded successfully\n");
}

main().catch((error) => {
  console.error("\n❌ Google data test failed\n");
  console.error(error);
  process.exit(1);
});