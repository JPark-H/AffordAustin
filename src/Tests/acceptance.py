from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# options = Options()
# options.page_load_strategy = 'normal'
# options = webdriver.ChromeOptions()
# options.add_argument('--no-sandbox')
# options.add_argument('--headless')
# options.add_argument('--disable-gpu')

#URL = 'https://www.affordaustin.me/'
URL = 'https://development.d4sk31j15mtaj.amplifyapp.com/'
MODELS = ['#/Housing/', '#/Childcare/', '#/Jobs/']

def navigation():
    driver = webdriver.Remote(
        command_executor='http://gitlab-selenium-server:4545/wd/hub',
        options=Options())
    driver.get(URL)
    WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, '[class="nav-link"]'))
    )
    
    links = driver.find_elements(by=By.CSS_SELECTOR, value='[class="nav-link"]')
    assert len(links) >= 3

    for link in links:
        href = link.get_attribute('href')
        link_driver = webdriver.Remote(
            command_executor='http://gitlab-selenium-server:4545/wd/hub',
            options=Options())
        link_driver.get(f'{URL}{href}')
        link_driver.close()

    driver.close()

def grids():
    for model in MODELS:
        driver = webdriver.Remote(
            command_executor='http://gitlab-selenium-server:4545/wd/hub',
            options=Options())
        driver.get(f'{URL}{model}')

        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CLASS_NAME, 'card'))
        )

        links = driver.find_elements(by=By.CLASS_NAME, value='card')
        assert len(links) >= 9

        driver.close()

def pages():
    for model in MODELS:
        for id in range(1, 101):
            driver = webdriver.Remote(
                command_executor='http://gitlab-selenium-server:4545/wd/hub',
                options=Options())
            driver.get(f'{URL}{model}{id}')
            driver.close()

if __name__ == '__main__':
    navigation()
    grids()
    pages()
        