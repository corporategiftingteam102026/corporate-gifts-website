import { google, drive_v3 } from "googleapis";
import fs from "fs";
import path from "path";

import { createSlug } from "./slug";

import type {
  Category,
  Product,
  Variant,
} from "./types";

const FOLDER = "application/vnd.google-apps.folder";

const imageExt = /\.(jpe?g|png|webp)$/i;

/**
 * GitHub Pages hosts this repository under:
 *
 * https://corporategiftingteam102026.github.io/corporate-gifts-website/
 *
 * Locally, the site is hosted at the root:
 *
 * http://localhost:3000/
 *
 * Therefore:
 *
 * Local:
 * /generated/products/...
 *
 * GitHub Pages:
 * /corporate-gifts-website/generated/products/...
 */
const publicBasePath =
  process.env.GITHUB_ACTIONS === "true"
    ? "/corporate-gifts-website"
    : "";

function publicImagePath(relativePath: string) {
  return `${publicBasePath}${relativePath}`;
}

function driveClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve(
      process.cwd(),
      process.env.GOOGLE_APPLICATION_CREDENTIALS ||
        ".secrets/google-service-account.json"
    ),

    scopes: [
      "https://www.googleapis.com/auth/drive.readonly",
    ],
  });

  return google.drive({
    version: "v3",
    auth,
  });
}

const escapeDriveQuery = (value: string) =>
  value.replace(/'/g, "\\'");

async function findFolder(
  drive: drive_v3.Drive,
  parentId: string,
  name: string
) {
  const response = await drive.files.list({
    q:
      `'${parentId}' in parents ` +
      `and name = '${escapeDriveQuery(name)}' ` +
      `and mimeType = '${FOLDER}' ` +
      `and trashed = false`,

    fields: "files(id,name)",

    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  return response.data.files?.[0];
}

async function listFiles(
  drive: drive_v3.Drive,
  parentId: string
) {
  let pageToken: string | undefined;

  const all: drive_v3.Schema$File[] = [];

  do {
    const response = await drive.files.list({
      q:
        `'${parentId}' in parents ` +
        `and trashed = false`,

      fields:
        "nextPageToken,files(id,name,mimeType)",

      pageToken,

      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    all.push(...(response.data.files ?? []));

    pageToken =
      response.data.nextPageToken || undefined;
  } while (pageToken);

  return all;
}

async function downloadFile(
  drive: drive_v3.Drive,
  fileId: string,
  destination: string
) {
  fs.mkdirSync(path.dirname(destination), {
    recursive: true,
  });

  const response = await drive.files.get(
    {
      fileId,
      alt: "media",
      supportsAllDrives: true,
    },
    {
      responseType: "arraybuffer",
    }
  );

  fs.writeFileSync(
    destination,
    Buffer.from(response.data as ArrayBuffer)
  );
}

const sortImages = (
  a: drive_v3.Schema$File,
  b: drive_v3.Schema$File
) => {
  const aNumber = parseInt(
    (a.name || "").split(".")[0]
  );

  const bNumber = parseInt(
    (b.name || "").split(".")[0]
  );

  return (
    (Number.isFinite(aNumber)
      ? aNumber
      : Number.MAX_SAFE_INTEGER) -
      (Number.isFinite(bNumber)
        ? bNumber
        : Number.MAX_SAFE_INTEGER) ||
    (a.name || "").localeCompare(b.name || "")
  );
};

function getValidImages(
  items: drive_v3.Schema$File[]
) {
  return items
    .filter(
      (item) =>
        item.id &&
        item.name &&
        item.mimeType !== FOLDER &&
        imageExt.test(item.name)
    )
    .sort(sortImages);
}

function hasPrimaryImage(
  images: drive_v3.Schema$File[]
) {
  return images.some((image) =>
    /^1\.(jpe?g|png|webp)$/i.test(
      image.name || ""
    )
  );
}

/* =======================================================
   SYNC
======================================================= */

export async function syncDriveImages(
  categories: Category[],
  products: Product[]
) {
  const rootFolderId =
    process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

  if (!rootFolderId) {
    throw new Error(
      "GOOGLE_DRIVE_ROOT_FOLDER_ID is missing from .env.local"
    );
  }

  const drive = driveClient();

  console.log(
    "\nConnecting to Google Drive...\n"
  );

  const categoriesFolder =
    await findFolder(
      drive,
      rootFolderId,
      "Categories"
    );

  const productsFolder =
    await findFolder(
      drive,
      rootFolderId,
      "Products"
    );

  if (
    !categoriesFolder?.id ||
    !productsFolder?.id
  ) {
    throw new Error(
      'Required Drive folders "Categories" and "Products" were not found.'
    );
  }

  console.log(
    '✓ Drive folder "Categories" found'
  );

  console.log(
    '✓ Drive folder "Products" found'
  );

  /**
   * Clear previous generated images.
   */
  fs.rmSync(
    path.resolve(
      process.cwd(),
      "public/generated"
    ),
    {
      recursive: true,
      force: true,
    }
  );

  /* =====================================================
     CATEGORY IMAGES
  ===================================================== */

  const goodCategories: Category[] = [];

  console.log(
    "\nSyncing category images...\n"
  );

  for (const category of categories) {
    const categoryFolder =
      await findFolder(
        drive,
        categoriesFolder.id,
        category.name
      );

    if (!categoryFolder?.id) {
      console.warn(
        `⏭ [CATEGORY IMAGE SKIPPED] "${category.name}": folder not found.`
      );

      continue;
    }

    const folderContents =
      await listFiles(
        drive,
        categoryFolder.id
      );

    const images =
      getValidImages(folderContents);

    const cover =
      images.find((image) =>
        /^cover\.(jpe?g|png|webp)$/i.test(
          image.name || ""
        )
      );

    if (!cover?.id || !cover.name) {
      console.warn(
        `⏭ [CATEGORY IMAGE SKIPPED] "${category.name}": no valid cover image found.`
      );

      continue;
    }

    const extension =
      path.extname(
        cover.name
      ).toLowerCase();

    /**
     * IMPORTANT:
     *
     * relativePath is the physical location inside /public.
     *
     * We keep this WITHOUT the GitHub repository prefix
     * because the file must physically be written to:
     *
     * public/generated/...
     */
    const relativePath =
      `/generated/categories/${category.slug}/cover${extension}`;

    await downloadFile(
      drive,
      cover.id,
      path.resolve(
        process.cwd(),
        "public",
        relativePath.slice(1)
      )
    );

    /**
     * But the URL stored in catalog.json needs the
     * GitHub Pages base path when building on GitHub.
     */
    goodCategories.push({
      ...category,
      image: publicImagePath(relativePath),
    });

    console.log(
      `✓ Category image: ${category.name}`
    );
  }

  /* =====================================================
     PRODUCT IMAGES
  ===================================================== */

  const goodProducts: Product[] = [];

  console.log(
    "\nSyncing product images...\n"
  );

  for (const product of products) {
    /**
     * Product cannot be published if its
     * category failed Drive validation.
     */
    const validCategory =
      goodCategories.some(
        (category) =>
          category.slug ===
          product.categorySlug
      );

    if (!validCategory) {
      console.warn(
        `⏭ [PRODUCT SKIPPED] "${product.name}": category failed Drive validation.`
      );

      continue;
    }

    const productFolder =
      await findFolder(
        drive,
        productsFolder.id,
        product.name
      );

    if (!productFolder?.id) {
      console.warn(
        `⏭ [PRODUCT IMAGE SKIPPED] "${product.name}": Drive folder "Products/${product.name}" was not found.`
      );

      continue;
    }

    /**
     * ===================================================
     * CASE 1:
     * PRODUCT HAS ACTIVE VARIANTS
     *
     * Products/
     *   Executive Welcome Kit/
     *     Black/
     *       1.jpg
     *       2.jpg
     *     Blue/
     *       1.jpg
     *       2.jpg
     * ===================================================
     */

    if (product.variants.length > 0) {
      const validVariants: Variant[] = [];

      for (
        const variant of product.variants
      ) {
        const variantFolder =
          await findFolder(
            drive,
            productFolder.id,
            variant.colorName
          );

        if (!variantFolder?.id) {
          console.warn(
            `⏭ [VARIANT IMAGE SKIPPED] "${product.name} / ${variant.colorName}": Drive folder not found.`
          );

          continue;
        }

        const variantContents =
          await listFiles(
            drive,
            variantFolder.id
          );

        const images =
          getValidImages(
            variantContents
          );

        if (!hasPrimaryImage(images)) {
          console.warn(
            `⏭ [VARIANT IMAGE SKIPPED] "${product.name} / ${variant.colorName}": primary image "1.jpg/.jpeg/.png/.webp" was not found.`
          );

          continue;
        }

        const downloadedImages:
          string[] = [];

        for (const image of images) {
          if (
            !image.id ||
            !image.name
          ) {
            continue;
          }

          /**
           * Physical path inside public/.
           */
          const relativePath =
            `/generated/products/${product.slug}/${createSlug(
              variant.colorName
            )}/${image.name}`;

          /**
           * Download remains:
           *
           * public/generated/products/...
           *
           * We intentionally DO NOT add the GitHub
           * Pages base path here.
           */
          await downloadFile(
            drive,
            image.id,
            path.resolve(
              process.cwd(),
              "public",
              relativePath.slice(1)
            )
          );

          /**
           * URL stored in generated catalogue.
           *
           * Local:
           * /generated/products/...
           *
           * GitHub:
           * /corporate-gifts-website/generated/products/...
           */
          downloadedImages.push(
            publicImagePath(relativePath)
          );
        }

        validVariants.push({
          ...variant,
          images: downloadedImages,
        });

        console.log(
          `✓ Variant images: ${product.name} / ${variant.colorName} (${downloadedImages.length})`
        );
      }

      /**
       * Product had variants in Sheets,
       * but none passed Drive validation.
       *
       * Do NOT silently treat this as a
       * non-variant product because that
       * could hide a typo in variant folder
       * names.
       */
      if (!validVariants.length) {
        console.warn(
          `⏭ [PRODUCT IMAGE SKIPPED] "${product.name}": it has variants in Sheets, but no variant passed Drive image validation.`
        );

        continue;
      }

      /**
       * Re-establish a default after invalid
       * variants have been removed.
       */
      if (
        !validVariants.some(
          (variant) =>
            variant.isDefault
        )
      ) {
        validVariants[0].isDefault =
          true;
      }

      const defaultVariant =
        validVariants.find(
          (variant) =>
            variant.isDefault
        ) ||
        validVariants[0];

      goodProducts.push({
        ...product,
        variants: validVariants,
        image:
          defaultVariant.images[0],
      });

      continue;
    }

    /**
     * ===================================================
     * CASE 2:
     * PRODUCT HAS NO VARIANTS
     *
     * Images are directly inside product folder:
     *
     * Products/
     *   Wooden Desk Clock/
     *     1.jpg
     *     2.jpg
     *     3.jpg
     * ===================================================
     */

    const productContents =
      await listFiles(
        drive,
        productFolder.id
      );

    const productImages =
      getValidImages(
        productContents
      );

    if (
      !hasPrimaryImage(
        productImages
      )
    ) {
      console.warn(
        `⏭ [PRODUCT IMAGE SKIPPED] "${product.name}": product has no variants and no primary image "1.jpg/.jpeg/.png/.webp" directly inside its product folder.`
      );

      continue;
    }

    const downloadedImages:
      string[] = [];

    for (
      const image of productImages
    ) {
      if (
        !image.id ||
        !image.name
      ) {
        continue;
      }

      /**
       * Physical path inside public/.
       */
      const relativePath =
        `/generated/products/${product.slug}/${image.name}`;

      await downloadFile(
        drive,
        image.id,
        path.resolve(
          process.cwd(),
          "public",
          relativePath.slice(1)
        )
      );

      /**
       * Store the correct public URL.
       */
      downloadedImages.push(
        publicImagePath(relativePath)
      );
    }

    goodProducts.push({
      ...product,

      /**
       * Empty variants is intentional.
       */
      variants: [],

      image:
        downloadedImages[0],
    });

    console.log(
      `✓ Product images: ${product.name} (${downloadedImages.length}) [no variants]`
    );
  }

  /* =====================================================
     SUMMARY
  ===================================================== */

  const variantCount =
    goodProducts.reduce(
      (
        total,
        product
      ) =>
        total +
        product.variants.length,
      0
    );

  const noVariantProductCount =
    goodProducts.filter(
      (product) =>
        product.variants.length === 0
    ).length;

  console.log(
    "\nGoogle Drive image summary:"
  );

  console.log(
    `✓ ${goodCategories.length}/${categories.length} categories passed`
  );

  console.log(
    `✓ ${goodProducts.length}/${products.length} products passed`
  );

  console.log(
    `✓ ${variantCount} variants passed image validation`
  );

  console.log(
    `✓ ${noVariantProductCount} products published using direct product images`
  );

  return {
    categories: goodCategories,
    products: goodProducts,
  };
}