Feature:Sample Page Test Screen - Form page - click Submit Button User Action;Description: 

	Scenario:8~RQ - Valid email is required. COS - If User enters invalid 'Email' , display message 'Email requires a valid email address' in 'ERROR!' field~
		Given User is on 'SAMPLE PAGE TEST' Page
		When User checks 'Expertise' as 'Functional Testing'
		When User checks 'Education' as 'Graduate'
		When User enters 'Email' as 'ram@gmail'
		When User 'clicks' on 'SUBMIT' 'Button'
		Then System should display 'Email requires a valid email address' in 'ERROR! Message' field
