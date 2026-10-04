// import dotenv from "dotenv";
// import fs from "fs";
// import path from "path";

// dotenv.config({
//   path: ".env.local",
// });

// async function main() {
//   console.log(
//     "\n======================================"
//   );

//   console.log(
//     " Corporate Gifts Website Data Sync"
//   );

//   console.log(
//     "======================================\n"
//   );

//   /* =======================================================
//      1. LOAD MODULES
//   ======================================================= */

//   const {
//     readCategories,
//     readProducts,
//     readVariants,
//     readFAQs,
//     readAbout,
//     readWebsiteSettings,
//   } = await import(
//     "./google/sheets"
//   );

//   const {
//     parseCategories,
//     parseProducts,
//     attachVariants,
//     parseFAQs,
//   parseAbout,
//     parseSiteSettings,
//   } = await import(
//     "./google/validation"
//   );

//   const {
//     syncDriveImages,
//   } = await import(
//     "./google/drive"
//   );

  

//   /* =======================================================
//      2. GOOGLE SHEETS
//   ======================================================= */

//   console.log(
//     "Reading Google Sheets...\n"
//   );

//   const [
//     categoryRows,
//     productRows,
//     variantRows,
//     settingRows,
//   ] = await Promise.all([
//     readCategories(),
//     readProducts(),
//     readVariants(),
//     readWebsiteSettings(),
//   ]);

//   console.log(
//     "✓ Categories fetched"
//   );

//   console.log(
//     "✓ Products fetched"
//   );

//   console.log(
//     "✓ Variants fetched"
//   );

//   console.log(
//     "✓ Website Settings fetched"
//   );

//   /* =======================================================
//      3. VALIDATE SHEET DATA
//   ======================================================= */

//   console.log(
//     "\nValidating Google Sheets data...\n"
//   );

//   const categories =
//     parseCategories(
//       categoryRows
//     );

//   const products =
//     parseProducts(
//       productRows,
//       categories
//     );

//   attachVariants(
//     variantRows,
//     products
//   );

//   const siteSettings =
//     parseSiteSettings(
//       settingRows
//     );

//   const sheetVariantCount =
//     products.reduce(
//       (total, product) =>
//         total +
//         product.variants.length,
//       0
//     );

//   console.log(
//     `\n✓ ${categories.length} valid categories from Sheets`
//   );

//   console.log(
//     `✓ ${products.length} valid products from Sheets`
//   );

//   console.log(
//     `✓ ${sheetVariantCount} valid variants from Sheets`
//   );

//   /* =======================================================
//      4. GOOGLE DRIVE
//   ======================================================= */

//   const {
//     categories:
//       finalCategories,

//     products:
//       finalProducts,
//   } =
//     await syncDriveImages(
//       categories,
//       products
//     );

//   /* =======================================================
//      5. OUTPUT DIRECTORY
//   ======================================================= */

//   const outputDirectory =
//     path.resolve(
//       process.cwd(),
//       "data",
//       "generated"
//     );

//   fs.mkdirSync(
//     outputDirectory,
//     {
//       recursive: true,
//     }
//   );

//   /* =======================================================
//      6. FINAL CATALOG
//   ======================================================= */

//   const catalog = {
//     categories:
//       finalCategories,

//     products:
//       finalProducts,
//   };

//   /* =======================================================
//      7. WRITE CATALOG
//   ======================================================= */

//   fs.writeFileSync(
//     path.join(
//       outputDirectory,
//       "catalog.json"
//     ),

//     JSON.stringify(
//       catalog,
//       null,
//       2
//     ),

//     "utf8"
//   );

//   /* =======================================================
//      8. WRITE PUBLIC SITE SETTINGS
//   ======================================================= */

//   fs.writeFileSync(
//     path.join(
//       outputDirectory,
//       "site-settings.json"
//     ),

//     JSON.stringify(
//       siteSettings,
//       null,
//       2
//     ),

//     "utf8"
//   );

//   /* =======================================================
//      9. FINAL SUMMARY
//   ======================================================= */

//   const finalVariantCount =
//     finalProducts.reduce(
//       (total, product) =>
//         total +
//         product.variants.length,
//       0
//     );

//   console.log(
//     "\n======================================"
//   );

//   console.log(
//     " Sync Complete"
//   );

//   console.log(
//     "======================================"
//   );

//   console.log(
//     `Categories published : ${finalCategories.length}`
//   );

//   console.log(
//     `Products published   : ${finalProducts.length}`
//   );

//   console.log(
//     `Variants published   : ${finalVariantCount}`
//   );

//   console.log(
//     "\nGenerated:"
//   );

//   console.log(
//     "  data/generated/catalog.json"
//   );

//   console.log(
//     "  data/generated/site-settings.json"
//   );

//   console.log(
//     "  public/generated/..."
//   );

//   console.log(
//     "\n✓ Website data sync completed successfully.\n"
//   );
// }

// main().catch(
//   (error) => {
//     console.error(
//       "\n======================================"
//     );

//     console.error(
//       " ❌ DATA SYNC FAILED"
//     );

//     console.error(
//       "======================================\n"
//     );

//     console.error(error);

//     process.exit(1);
//   }
// );








import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({
  path: ".env.local",
});

async function main() {
  console.log(
    "\n======================================"
  );

  console.log(
    " Corporate Gifts Website Data Sync"
  );

  console.log(
    "======================================\n"
  );

  /* =====================================================
     1. LOAD MODULES
  ===================================================== */

  const {
    readCategories,
    readProducts,
    readVariants,
    readFAQs,
    readAbout,
    readWebsiteSettings,
  } = await import(
    "./google/sheets"
  );

  const {
    parseCategories,
    parseProducts,
    attachVariants,
    parseFAQs,
    parseAbout,
    parseSiteSettings,
  } = await import(
    "./google/validation"
  );

  const {
    syncDriveImages,
  } = await import(
    "./google/drive"
  );

  /* =====================================================
     2. READ GOOGLE SHEETS
  ===================================================== */

  console.log(
    "Reading Google Sheets...\n"
  );

  const [
    categoryRows,
    productRows,
    variantRows,
    faqRows,
    aboutRows,
    settingRows,
  ] = await Promise.all([
    readCategories(),
    readProducts(),
    readVariants(),
    readFAQs(),
    readAbout(),
    readWebsiteSettings(),
  ]);

  console.log(
    "✓ Categories fetched"
  );

  console.log(
    "✓ Products fetched"
  );

  console.log(
    "✓ Variants fetched"
  );

  console.log(
    "✓ FAQs fetched"
  );

  console.log(
    "✓ About fetched"
  );

  console.log(
    "✓ Website Settings fetched"
  );

  /* =====================================================
     3. VALIDATE SHEET DATA
  ===================================================== */

  console.log(
    "\nValidating Google Sheets data...\n"
  );

  const categories =
    parseCategories(
      categoryRows
    );

  const products =
    parseProducts(
      productRows,
      categories
    );

  attachVariants(
    variantRows,
    products
  );

  const faqs =
    parseFAQs(
      faqRows
    );

  const about =
    parseAbout(
      aboutRows
    );

  const siteSettings =
    parseSiteSettings(
      settingRows
    );

  const sheetVariantCount =
    products.reduce(
      (
        total,
        product
      ) =>
        total +
        product.variants.length,
      0
    );

  console.log(
    `\n✓ ${categories.length} valid categories from Sheets`
  );

  console.log(
    `✓ ${products.length} valid products from Sheets`
  );

  console.log(
    `✓ ${sheetVariantCount} valid variants from Sheets`
  );

  console.log(
    `✓ ${faqs.length} active FAQs from Sheets`
  );

  console.log(
    `✓ ${about.length} active About paragraphs from Sheets`
  );

  /* =====================================================
     4. GOOGLE DRIVE
  ===================================================== */

  const {
    categories:
      finalCategories,

    products:
      finalProducts,
  } =
    await syncDriveImages(
      categories,
      products
    );

  /* =====================================================
     5. OUTPUT DIRECTORY
  ===================================================== */

  const outputDirectory =
    path.resolve(
      process.cwd(),
      "data",
      "generated"
    );

  fs.mkdirSync(
    outputDirectory,
    {
      recursive: true,
    }
  );

  /* =====================================================
     6. FINAL CATALOG
  ===================================================== */

  const catalog = {
    categories:
      finalCategories,

    products:
      finalProducts,
  };

  /* =====================================================
     7. WRITE CATALOG
  ===================================================== */

  fs.writeFileSync(
    path.join(
      outputDirectory,
      "catalog.json"
    ),
    JSON.stringify(
      catalog,
      null,
      2
    ),
    "utf8"
  );

  /* =====================================================
     8. WRITE SITE SETTINGS
  ===================================================== */

  fs.writeFileSync(
    path.join(
      outputDirectory,
      "site-settings.json"
    ),
    JSON.stringify(
      siteSettings,
      null,
      2
    ),
    "utf8"
  );

  /* =====================================================
     9. WRITE FAQ
  ===================================================== */

  fs.writeFileSync(
    path.join(
      outputDirectory,
      "faqs.json"
    ),
    JSON.stringify(
      faqs,
      null,
      2
    ),
    "utf8"
  );

  /* =====================================================
     10. WRITE ABOUT
  ===================================================== */

  fs.writeFileSync(
    path.join(
      outputDirectory,
      "about.json"
    ),
    JSON.stringify(
      about,
      null,
      2
    ),
    "utf8"
  );

  /* =====================================================
     11. FINAL SUMMARY
  ===================================================== */

  const finalVariantCount =
    finalProducts.reduce(
      (
        total,
        product
      ) =>
        total +
        product.variants.length,
      0
    );

  const finalNoVariantCount =
    finalProducts.filter(
      (product) =>
        product.variants.length ===
        0
    ).length;

  console.log(
    "\n======================================"
  );

  console.log(
    " Sync Complete"
  );

  console.log(
    "======================================"
  );

  console.log(
    `Categories published : ${finalCategories.length}`
  );

  console.log(
    `Products published   : ${finalProducts.length}`
  );

  console.log(
    `Variants published   : ${finalVariantCount}`
  );

  console.log(
    `No-variant products  : ${finalNoVariantCount}`
  );

  console.log(
    `FAQs published       : ${faqs.length}`
  );

  console.log(
    `About paragraphs     : ${about.length}`
  );

  console.log(
    "\nGenerated:"
  );

  console.log(
    "  data/generated/catalog.json"
  );

  console.log(
    "  data/generated/site-settings.json"
  );

  console.log(
    "  data/generated/faqs.json"
  );

  console.log(
    "  data/generated/about.json"
  );

  console.log(
    "  public/generated/..."
  );

  console.log(
    "\n✓ Website data sync completed successfully.\n"
  );
}

main().catch(
  (error) => {
    console.error(
      "\n======================================"
    );

    console.error(
      " ❌ DATA SYNC FAILED"
    );

    console.error(
      "======================================\n"
    );

    console.error(error);

    process.exit(1);
  }
);