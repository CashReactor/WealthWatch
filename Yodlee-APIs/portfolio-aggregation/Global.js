exports.properties = {
		headers  :  {
			'User-Agent':            'Mozilla/5.0',
			'Content-Type': 'application/json; charset=utf-8'
			//'Content-Type':'text/plain;charset=UTF-8'
			//'Content-Type' : 'application/x-www-form-urlencoded' 
		},
		options  :  {
			url: '',
			method:  '',
			headers: '',
			form:  '',
			json: ''
		},
		userSessionToken : '',
		cobSessionToken : '',
		post : 'POST',
		get : 'GET',
		put : 'PUT',
		cobrandLoginURL : 'cobrand/login',
		userLoginURL : 'user/login',
		siteURL : 'providers',
		siteURLNEW: 'providerAccounts?providerId=',
		sitesURL:'providers/providerAccounts?providerAccountIds=',
		accountURL : 'accounts',
		investmentOptionsURL : 'accounts/investmentPlan/investmentOptions',
		investmentOptionsAssetClassificationURL : 'accounts/investmentPlan/investmentOptions?include=assetClassification',
		statementsURL : 'statements',
		transactionsURL : 'transactions',
		holdingsURL : 'holdings',
		holdingsAssetClassificationURL : 'holdings?include=assetClassification',
		holdingsAssetClassificationFilterURL : 'holdings?include=assetClassification&assetClassification.classificationType=COUNTRY&assetClassification.classificationValue<>US',
		portfolioSummaryURL : 'derived/networth',
		portfolioSummaryDetailsURL : 'derived/holdingSummary?include=details',
		refreshURLNEW : 'providerAccounts/',
		refreshURL : 'refresh'
}  