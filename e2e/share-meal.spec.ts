import { expect, test } from '@playwright/test'

test('should render share meal form', async ({ page }) => {
  await page.goto('/meals/share')

  await expect(
    page.getByRole('heading', {
      name: /Share your favorite meal/i,
    }),
  ).toBeVisible()

  await expect(page.getByLabel('Your name')).toBeVisible()
  await expect(page.getByLabel('Your email')).toBeVisible()
  await expect(page.getByLabel('Title')).toBeVisible()
  await expect(page.getByLabel('Short Summary')).toBeVisible()
  await expect(page.getByLabel('Instructions')).toBeVisible()

  await expect(
    page.getByRole('button', {
      name: 'Pick an Image',
    }),
  ).toBeVisible()

  await expect(
    page.getByRole('button', {
      name: /Share Meal/i,
    }),
  ).toBeVisible()
})

test('should allow user to fill the share meal form', async ({ page }) => {
  await page.goto('/meals/share')

  await page.getByLabel('Your name').fill('Andrii')
  await page.getByLabel('Your email').fill('andrii@example.com')
  await page.getByLabel('Title').fill('Test Burger')
  await page.getByLabel('Short Summary').fill('Delicious test burger')
  await page.getByLabel('Instructions').fill('Cook the burger for 10 minutes')

  await expect(page.getByLabel('Your name')).toHaveValue('Andrii')
  await expect(page.getByLabel('Your email')).toHaveValue('andrii@example.com')
  await expect(page.getByLabel('Title')).toHaveValue('Test Burger')
  await expect(page.getByLabel('Short Summary')).toHaveValue('Delicious test burger')
  await expect(page.getByLabel('Instructions')).toHaveValue('Cook the burger for 10 minutes')
})

test('should upload an image and show preview', async ({ page }) => {
  await page.goto('/meals/share')

  const imageInput = page.getByLabel('Your image')

  await imageInput.setInputFiles('e2e/fixtures/test-image.png')

  await expect(imageInput).toHaveValue(/test-image\.png/)

  await expect(
    page.getByRole('img', {
      name: 'The image selected by the user.',
    }),
  ).toBeVisible()

  await expect(page.getByText('No image picked yet.')).not.toBeVisible()
})

test('should create a new meal', async ({ page }) => {
  await page.goto('/meals/share')

  await page.getByLabel('Your name').fill('Andrii')
  await page.getByLabel('Your email').fill('andrii@example.com')
  await page.getByLabel('Title').fill('E2E Test Burger')
  await page.getByLabel('Short Summary').fill('Burger created by Playwright')
  await page.getByLabel('Instructions').fill('Cook the burger for 10 minutes')

  await page.getByLabel('Your image').setInputFiles('e2e/fixtures/test-image.png')

  const submitButton = page.getByRole('button', {
    name: /Share Meal/i,
  })

  await submitButton.click()

  const submittingButton = page.getByRole('button', {
    name: /Submitting/i,
  })

  await expect(submittingButton).toBeVisible()
})
