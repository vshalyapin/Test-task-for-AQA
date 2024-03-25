1) Настроить Allure Report для получения результатов автотестов при локальном прогоне: 
- команда для запуска автотестов с генерацией отчетов
npx playwright test --reporter=allure-playwright
- команда для просмотра отчета после запуска автотестов
npx allure serve allure-results

2) Настроить запуск автотестов в docker контейнере при локальном прогоне^
- чтобы запустить docker контейнер, используйте следующую команду
docker run -it --rm --ipc=host mcr.microsoft.com/playwright:v1.42.1-jammy /bin/bash