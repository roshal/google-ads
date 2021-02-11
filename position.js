
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
		position = keyword.getStatsFor('TODAY').getAveragePosition()
		cpc_estimated = keyword.getTopOfPageCpc() || keyword.getFirstPageCpc()
		cpc_old = bidding.getCpc()
		if (cpc_old && position && 4 < position) {
			cpc_new = cpc_old
			cpc_new *= position
			cpc_new /= 4
		} else
		if (cpc_estimated) {
			cpc_new = cpc_estimated
		}
		if (cpc_new) {
			bidding.setCpc(cpc_new)
			// if (cpc_old != Math.round(cpc_new * 100) / 100) {
			if (cpc_old - cpc_new) {
				text = keyword.getText()
				Logger.log([
					just(position),
					just(cpc_estimated),
					just(cpc_old),
					just(cpc_new),
					just(cpc_new / cpc_old),
					text,
				].join(' '))
			}
		}
	}
}
