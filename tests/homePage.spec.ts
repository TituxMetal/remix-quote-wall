import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('has login link', async ({ page }) => {
    await page.goto('/')
    const loginBtn = await page.getByRole('link', { name: /login/i })

    await expect(loginBtn).toBeVisible()
  })
  test('has register link', async ({ page }) => {
    await page.goto('/')

    const registerBtn = await page.getByRole('link', { name: /register/i })

    await expect(registerBtn).toBeVisible()
  })
  test('has a link to add a quote', async ({ page }) => {
    await page.goto('/')

    const addBtn = await page.getByRole('link', { name: /add a quote/i })

    await expect(addBtn).toBeVisible()
  })
})
