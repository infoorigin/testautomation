Feature:Register and Login;Description: 

	Scenario:1~Register and Login~
		Given user is on 'Login' Page
		When User 'clicks' on 'Register' 'Link' and navigate to 'Register' page
		When User enters 'First name' as 'Ashishkumar'
		When User enters 'Username' as 'ashishchauhan'
		When User enters 'Password' as 'ashishchauhan'
		When User enters 'Last name' as 'Chauhan'
		When User 'clicks' on 'Register' 'Button' and navigate to 'Login' page
		When User enters 'Username' as 'ashishchauhan'
		When User enters 'Password' as 'ashishchauhan'
		When User 'clicks' on 'Login' 'Button'
		Then System should navigate user to 'Home' Page
		Then System should display 'Ashishkumar' in 'Firstname' field
		When User 'clicks' on 'Delete' 'Link'
		When User 'clicks' on 'Logout' 'Button'

