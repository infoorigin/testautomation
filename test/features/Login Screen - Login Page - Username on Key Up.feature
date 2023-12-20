Feature:Login Screen - Login Page - Username on Key Up;Description: 

	Scenario:2~RQ - Username is required. COS - If User enters 'Username' as spaces, display message 'Username is required' in 'Username Message' field~
		Given User is on 'Login' Page
		When User enters 'Username' as ' '
		Then System should display 'Username is required' in 'Username Message' field

	Scenario:3~RQ - Username is required. COS - If User removes all contents of  'Username', display message 'Username is required' in 'Username Message' field~
		Given User is on 'Login' Page
		Given User entered 'Username' as 'A'
		When User hits 'backspace' Key
		Then System should Display 'Username is required' in 'Username Message' field

	Scenario:4~RQ - Username is required. COS - If System shows 'Username is required' in 'Username Message' field and enters Username, remove 'Username is required' message from 'Username Message' field~
		Given User is on 'Login' Page
		Given User entered 'Username' as 'A'
		Given User hits 'backspace' key
		When User enters 'Username' as 'A'
		Then System should hide 'Username Message'

	Scenario:5~RQ - If Username and Password is entered, enable Login button. COS - If 'Password' is entered and 'Username' is entered and User removes the 'Username', Disable 'Login' Button.~
		Given User on 'Login' Page
		Given User entered 'Password' as 'A'
		Given User entered 'Username' as 'A'
		When user hits 'backspace' Key
		Then System should disable 'Login' 'Button'

	Scenario:6~RQ - If Username and Password is entered, enable Login button. COS - If 'Password' is entered and User enters the 'Username', Enable 'Login' Button.~
		Given User on 'Login' Page
		Given User entered 'Password' as 'A'
		When User enters 'Username' as 'A'
		Then System should enable 'Login' 'Button'

