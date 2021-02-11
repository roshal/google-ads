
justify = function (l, r, num) {
	list = []
	string = num.toString()
	length = l - Math.floor(num).toString().length
	for (i = 0; i <= l + r; ++i) {
		if (length <= i && i - length < string.length) {
			list[i] = string[i - length]
		} else {
			list[i] = ' '
		}
	}
	return list.join('')
}

just = function (num) {
	return justify(3, 3, num)
}

main = function () {
	keywords = AdWordsApp.keywords()
		.withCondition('CampaignStatus = ENABLED')
		.withCondition('AdGroupStatus = ENABLED')
		.withCondition('Status = ENABLED')
		.get()
	while (keywords.hasNext()) {
		keyword = keywords.next()
		bidding = keyword.bidding()
		cpc_old = bidding.getCpc()
		cpc_new = keyword.getTopOfPageCpc() || keyword.getFirstPageCpc()
		if (cpc_new) {
			cpc_new *= 10 / 9
			bidding.setCpc(cpc_new)
			if (cpc_old - cpc_new) {
				text = keyword.getText()
				Logger.log([
					just(cpc_old),
					just(cpc_new),
					just(cpc_new / cpc_old),
					text,
				].join(' '))
			}
		}
	}
}
