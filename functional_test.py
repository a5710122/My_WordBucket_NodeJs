
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from django.test import Client

class NewVisitorTest(LiveServerTestCase):  

    def setUp(self):  
        self.browser = webdriver.Firefox()

    def tearDown(self):  
        self.browser.quit()

    def check_for_row_in_list_table(self, row_text):
        table = self.browser.find_element_by_id('id_list_table')
        rows = table.find_elements_by_tag_name('tr')
        self.assertIn(row_text, [row.text for row in rows])
   

    def test_can_start_a_list_and_retrieve_it_later(self): 
        
        c = Client()
        response = c.post('/login/', {'username' : 'admin', 'password' : 'wordbucket'})   
        response.status_code
        response = c.get('')
        response.content
        print("Response.status_code : ", response.status_code)

          
        # Ann has heard about a cool new online word app. She goes
        # to check out its homepage
        self.browser.get(self.live_server_url)

        # She notices the page title and header mention Word Bucket lists
        self.assertIn('Word Bucket', self.browser.title)
        header_text = self.browser.find_element_by_tag_name('h1').text  
        self.assertIn('Word Bucket', header_text) 
        
        # She is invited to enter a word item straight away
        inputbox = self.browser.find_element_by_id('id_new_item')
        self.assertEqual(
            inputbox.get_attribute('placeholder'),
            'Add new word'
        )
        
        # She types "weeb" into a text box
        inputbox.send_keys('weeb')
        
        # When she hits enter, the page updates, and now the page word lists
        # "1: weeb" as an item in a word list table
        inputbox.send_keys(Keys.ENTER)  
        time.sleep(1)
        self.check_for_row_in_list_table('1: weeb')
        
        # There is still a text box inviting her to add another item. She
        # enters "PogChamp"
        inputbox = self.browser.find_element_by_id('id_new_item')
        inputbox.send_keys('PogChamp')
        inputbox.send_keys(Keys.ENTER)
        time.sleep(1)

        # The page updates again, and now shows both items on her list
        self.check_for_row_in_list_table('1: weeb')
        self.check_for_row_in_list_table('2: PogChamp')
        
        self.fail('Finish the test!') 

if __name__ == '__main__':  
    unittest.main(warnings='ignore')
