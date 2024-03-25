import { test, expect } from '@playwright/test'

test('Тестовое задание для AQA', async ({ page }) => {
  // 1. Открыть браузер и развернуть на весь экран
  // в конфигурационном файле playwright.config.ts прописано разрешение экрана (56-я строка) - viewport: { width: 1920, height: 1080 }

  // 2. Зайти на dzen.ru
  await page.goto('https://dzen.ru/') // открываем страницу dzen.ru
  expect(page).toHaveTitle('Дзен') // проверяем title-заголовок на вкладке браузера

  // 3. Проскроллить до ленты дзена
  const lentaDzena = page.locator('div[aria-label="Лента Дзена"]')
  await lentaDzena.scrollIntoViewIfNeeded() // скроллим до Ленты Дзена

  // 4. Отображается лента, в разделах каналы отображаются корректно (есть аватарка, название, описание, кнопка «подписаться» при наведении курсора)
  const avatarKanala = page.locator('div[aria-label="Аватар канала"]').first()
  expect(avatarKanala).toBeVisible() // проверяем отображение аватарки канала
  const nameChannel = page.locator('div[aria-label="Название канала"]').first()
  expect(nameChannel).toBeVisible() // проверяем отображение названия канала
  const description = page.locator('.card-video-punch__title-25').first()
  expect(description).toBeVisible() // проверяем отображение описания
  const videoCard = page.locator('article[data-testid="floor-video-card"]').first()
  await videoCard.hover() // наводим курсор на видеокарточку
  const subscribeButton = page.locator('.floor-subscribe-button__buttonText-36').first()
  expect(subscribeButton).toContainText('Подписаться') // проверяем отображение кнопки "Подписаться" по ховеру

  // 5. Перейти в раздел «Видео»
  await page.getByLabel('Видео', { exact: true }).click() // переходим в раздел "Видео"
  await page.waitForLoadState() // ждем полной загрузки страницы

  // 6. Фокус на «Видео», лого изменён
  const videoNavigationTab = page.locator('.navigation-tab__tabContent-3o.navigation-tab__isActive-1J')
  expect(videoNavigationTab).toHaveAttribute('aria-selected', 'true') // проверяем отображение фокуса на "Видео"

  // 7. В строке поиска ввести «Синий трактор»
  await page.getByTestId('search-input').fill('синий трактор') // вводим текст "синий трактор"
  await page.waitForSelector('button.base-button__rootElement-12.base-button__m-2y.base-button__accentPrimary-3e') // ожидаем появления кнопки "Найти"
  await page.getByLabel('Кнопка Найти').click() // нажимаем на кнопку "Найти"

  // 8. Вкладка «Видео и Ролики» – Воспроизвести первый в списке мультик
  const page1Promise = page.waitForEvent('popup')
  const firstVdeoCard = page.locator('[data-testid="video-card-clickable"]').first()
  await firstVdeoCard.click() // выбираем первиый мультик в выдаче

  // 9. Видео запущено, таббар (контрол панель) видима. Дождаться исчезновения таббара
  const page1 = await page1Promise
  const controlPanel = page.locator('.zen-ui-cover__item _left _bottom _right')
  expect(controlPanel).toBeHidden() // ожидаем исчеззновения таббара
  const videoPlayer = page1.locator('.zen-ui-video-video-player__control-toggle')
  await videoPlayer.hover() // наводим курсор на виедо

  // 10. Развернуть плеер в полноэкранный режим.
  const fullscreenControl = page1.locator('.zen-ui-video-video-controls__fullscreen')
  await fullscreenControl.click() // нажимаем на кнопку раскрытия видео на полный экран
})