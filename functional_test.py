from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import unittest


class NewVisitorTest(webdriver):  

    def setUp(self):  
        self.browser = webdriver.Firefox()
        browser.get('http://localhost:3000')

    def tearDown(self):  
        self.browser.quit()

    def test_can_start_a_list_and_retrieve_it_later(self): 
        
          
        # Ann has heard about a cool new online word app. She goes
        # to check out its homepage
        self.browser.get(self.live_server_url)

        # She notices the page title and header mention Word Bucket lists
        self.assertIn(' WordBucket ', self.browser.title)
        header_text = self.browser.find_element_by_tag_name('h1').text  
        self.assertIn(' A Simple WordBucket App ', header_text) 
        

        

        
        self.fail('Finish the test!') 

if __name__ == '__main__':  
    unittest.main(warnings='ignore') 	
